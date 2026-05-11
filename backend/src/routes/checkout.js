import { Router } from "express";
import { recordAudit } from "../middleware/auditLogger.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/", requireAuth, async (req, res) => {
  const { items, total, shipping } = req.body;
  if (!Array.isArray(items) || !items.length) {
    return res.status(400).json({ message: "Cart container is empty." });
  }

  const orderId = `ZTX-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
  
  await recordAudit({
    req,
    eventType: "FINANCIAL_TRANSACTION_INITIATED",
    outcome: "success",
    severity: "medium",
    actor: { userId: req.user._id, email: req.user.email, role: req.user.role },
    target: { type: "order", id: orderId },
    metadata: { 
      amount: total, 
      units: items.length, 
      coordinates: shipping?.address || "ENCRYPTED" 
    }
  });

  return res.json({ 
    orderId, 
    status: "dispatched",
    eta: "T+48H",
    tracking: `ZT-TRK-${Date.now()}`
  });
});

export default router;
