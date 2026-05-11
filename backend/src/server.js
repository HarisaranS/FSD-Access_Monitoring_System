import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDb } from "./db.js";
import { User } from "./models/User.js";
import { riskMiddleware } from "./middleware/riskEngine.js";
import { auditMiddleware } from "./middleware/auditLogger.js";

import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import adminRoutes from "./routes/admin.js";
import checkoutRoutes from "./routes/checkout.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Security Middleware
app.use(helmet());
app.use(  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
  })
);
app.use(express.json());
app.use(morgan("dev"));

// Zero Trust Adaptive Middlewares
app.use(riskMiddleware);
app.use(auditMiddleware);

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/checkout", checkoutRoutes);

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "operational", 
    riskContext: { score: req.riskScore, level: req.riskLevel } 
  });
});

const setupAdmin = async () => {
  const email = process.env.ADMIN_EMAIL || "admin@zerotrust.com";
  const password = process.env.ADMIN_PASSWORD || "Admin123!";
  
  const existing = await User.findOne({ email });
  if (!existing) {
    const bcrypt = await import("bcryptjs");
    const passwordHash = await bcrypt.default.hash(password, 10);
    await User.create({ 
      name: "Security Administrator", 
      email, 
      passwordHash, 
      role: "admin" 
    });
    console.log(">>> Admin account initialized.");
  }
};

const startServer = async () => {
  try {
    await connectDb();
    await setupAdmin();
    app.listen(PORT, () => {
      console.log(`>>> Security Engine active on port ${PORT}`);
    });
  } catch (error) {
    console.error(">>> Failed to ignite Security Engine:", error.message);
    process.exit(1);
  }
};

startServer();
