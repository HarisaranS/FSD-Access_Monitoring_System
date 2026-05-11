import { AuditLog } from "../models/AuditLog.js";

/**
 * Record an audit event with full security telemetry.
 */
export const recordAudit = async (data) => {
  try {
    const { req, eventType, outcome, severity, metadata = {} } = data;
    
    const log = new AuditLog({
      eventType,
      outcome,
      severity,
      actor: {
        userId: req?.user?._id || null,
        email: req?.user?.email || "anonymous",
        role: req?.user?.role || "guest"
      },
      target: data.target || { type: "system", id: "system" },
      ip: req?.ip || "0.0.0.0",
      userAgent: req?.headers["user-agent"] || "unknown",
      path: req?.path || "unknown",
      method: req?.method || "UNKNOWN",
      riskScore: req?.riskScore || 0,
      metadata
    });

    await log.save();
    console.log(`[AUDIT] ${eventType} - ${outcome} (Risk: ${req?.riskScore})`);
  } catch (error) {
    console.error("Failed to record audit log:", error);
  }
};

export const auditMiddleware = (req, res, next) => {
  // Capture the original send to log the outcome after response
  const originalSend = res.send;
  res.send = function(body) {
    res.send = originalSend;
    const statusCode = res.statusCode;
    
    // Auto-log sensitive operations
    if (req.method !== "GET" || req.path.includes("admin")) {
      recordAudit({
        req,
        eventType: `${req.method}:${req.path}`,
        outcome: statusCode < 400 ? "success" : "failure",
        severity: req.riskScore > 70 ? "high" : "low",
        metadata: { statusCode }
      });
    }
    
    return res.send(body);
  };
  next();
};
