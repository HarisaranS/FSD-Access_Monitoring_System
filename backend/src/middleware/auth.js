import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { recordAudit } from "./auditLogger.js";

const getToken = (req) => {
  const header = req.headers.authorization || "";
  if (!header.startsWith("Bearer ")) return null;
  return header.slice(7);
};

export const requireAuth = async (req, res, next) => {
  const token = getToken(req);
  if (!token) {
    await recordAudit({
      req,
      eventType: "UNAUTHORIZED_ACCESS_ATTEMPT",
      outcome: "denied",
      severity: "medium",
      riskScore: req.riskScore + 20
    });
    return res.status(401).json({ message: "Authentication required." });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret");
    const user = await User.findById(payload.sub).select("_id email role name");
    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }
    req.user = user;
    return next();
  } catch (error) {
    await recordAudit({
      req,
      eventType: "INVALID_TOKEN_PRESENTED",
      outcome: "denied",
      severity: "high",
      riskScore: 85,
      metadata: { error: error.message }
    });
    return res.status(401).json({ message: "Session expired or invalid." });
  }
};

export const requireAdmin = async (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    await recordAudit({
      req,
      eventType: "PRIVILEGED_ACCESS_DENIED",
      outcome: "denied",
      severity: "high",
      riskScore: 95,
      actor: {
        userId: req.user?._id,
        email: req.user?.email,
        role: req.user?.role
      }
    });
    return res.status(403).json({ message: "Restricted to Security Administrators." });
  }
  return next();
};
