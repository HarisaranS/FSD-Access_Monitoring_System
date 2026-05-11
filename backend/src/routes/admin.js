import { Router } from "express";
import { Product } from "../models/Product.js";
import { AuditLog } from "../models/AuditLog.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import { recordAudit } from "../middleware/auditLogger.js";

const router = Router();

router.use(requireAuth, requireAdmin);

// Get Monitoring Logs
router.get("/audit", async (req, res) => {
  const logs = await AuditLog.find().sort({ createdAt: -1 }).limit(100);
  res.json(logs);
});

// Real Product Seed
router.post("/seed", async (req, res) => {
  await Product.deleteMany({});
  
  const products = [
    {
      name: "Neural Link VR-Goggles",
      description: "Next-gen immersive interface with encrypted neural bypass. High-fidelity retina display and 0.1ms latency.",
      price: 2499.0,
      image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=800",
      tags: ["hardware", "premium", "neural"],
      stock: 12
    },
    {
      name: "Zero Trust Mesh Router",
      description: "Enterprise-grade mesh router with built-in traffic analysis and AI-driven threat mitigation.",
      price: 850.0,
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800",
      tags: ["network", "security"],
      stock: 28
    },
    {
      name: "Sentinel Watch OS",
      description: "Privacy-first smartwatch with E-Ink display and physical hardware cutoffs for mic/GPS.",
      price: 420.0,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
      tags: ["wearable", "privacy"],
      stock: 15
    },
    {
      name: "Bio-Metric Key Card",
      description: "NFC key card with embedded fingerprint scanner for 3-factor physical access control.",
      price: 125.0,
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800",
      tags: ["access", "security"],
      stock: 100
    },
    {
      name: "Encrypted Comms Node",
      description: "Satellite-linked communication terminal with end-to-end hardware encryption.",
      price: 1100.0,
      image: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&q=80&w=800",
      tags: ["comms", "satellite"],
      stock: 10
    },
    {
      name: "Ghost Server Unit",
      description: "Liquid-cooled, silent server unit with automated data shredding on unauthorized access.",
      price: 4500.0,
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
      tags: ["server", "privacy"],
      stock: 3
    }
  ];

  await Product.insertMany(products);
  
  await recordAudit({
    req,
    eventType: "ADMIN_SEED_PRODUCTS",
    outcome: "success",
    severity: "medium",
    target: { type: "system", id: "database" }
  });

  res.status(201).json({ message: "Infrastructure seeded with real assets." });
});

export default router;
