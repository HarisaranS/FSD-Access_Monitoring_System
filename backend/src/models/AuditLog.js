import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    eventType: { type: String, required: true },
    outcome: { type: String, enum: ["success", "failure", "denied"], required: true },
    severity: { type: String, enum: ["low", "medium", "high"], default: "low" },
    actor: {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      email: { type: String, default: "" },
      role: { type: String, default: "guest" }
    },
    target: {
      type: { type: String, default: "" },
      id: { type: String, default: "" }
    },
    ip: { type: String, default: "" },
    userAgent: { type: String, default: "" },
    path: { type: String, default: "" },
    method: { type: String, default: "" },
    riskScore: { type: Number, default: 0 },
    metadata: { type: Object, default: {} }
  },
  { timestamps: true }
);

export const AuditLog = mongoose.model("AuditLog", auditLogSchema);
