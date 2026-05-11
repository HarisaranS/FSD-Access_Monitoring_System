import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { recordAudit } from "../middleware/auditLogger.js";

const router = Router();

const signToken = (user) => {
  return jwt.sign({ sub: user._id, role: user.role }, process.env.JWT_SECRET || "fallback_secret", {
    expiresIn: "12h"
  });
};

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Identity fields missing." });
  }

  const existing = await User.findOne({ email });
  if (existing) {
    await recordAudit({
      req,
      eventType: "IDENTITY_REGISTRATION_FAILED",
      outcome: "failure",
      severity: "medium",
      metadata: { reason: "duplicate_email", email }
    });
    return res.status(409).json({ message: "Identity already registered." });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash, role: "user" });

  await recordAudit({
    req,
    eventType: "IDENTITY_REGISTRATION_SUCCESS",
    outcome: "success",
    severity: "low",
    actor: { userId: user._id, email: user.email, role: user.role }
  });

  const token = signToken(user);
  return res.json({ token, user: { name: user.name, email: user.email, role: user.role } });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Credentials missing." });
  }

  const user = await User.findOne({ email });
  if (!user) {
    await recordAudit({
      req,
      eventType: "IDENTITY_LOGIN_DENIED",
      outcome: "failure",
      severity: "medium",
      metadata: { reason: "non_existent_identity", email }
    });
    return res.status(401).json({ message: "Identity verification failed." });
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    await recordAudit({
      req,
      eventType: "IDENTITY_LOGIN_DENIED",
      outcome: "failure",
      severity: "high",
      actor: { userId: user._id, email: user.email, role: user.role },
      metadata: { reason: "invalid_access_key" }
    });
    return res.status(401).json({ message: "Identity verification failed." });
  }

  await recordAudit({
    req,
    eventType: "IDENTITY_LOGIN_SUCCESS",
    outcome: "success",
    severity: "low",
    actor: { userId: user._id, email: user.email, role: user.role }
  });

  const token = signToken(user);
  return res.json({ token, user: { name: user.name, email: user.email, role: user.role } });
});

export default router;
