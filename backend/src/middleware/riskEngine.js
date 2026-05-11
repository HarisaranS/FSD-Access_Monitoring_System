/**
 * Adaptive Risk Engine
 * Calculates a risk score (0-100) for every request based on telemetry.
 */
export const calculateRisk = (req) => {
  let score = 0;
  
  const userAgent = req.headers["user-agent"] || "";
  const ip = req.ip || req.connection.remoteAddress || "0.0.0.0";
  
  // 1. User Agent Analysis
  if (!userAgent || userAgent.includes("curl") || userAgent.includes("Postman")) {
    score += 40; // High risk: Automated/Non-browser traffic
  }
  
  if (userAgent.length < 20) {
    score += 20; // Suspiciously short UA
  }

  // 2. IP Analysis (Mocked reputation check)
  const suspiciousIps = ["1.1.1.1", "8.8.8.8"]; // Just examples
  if (suspiciousIps.includes(ip)) {
    score += 50;
  }

  // 3. Sensitive Path Analysis
  const sensitivePaths = ["/api/admin", "/api/auth/login", "/api/checkout"];
  if (sensitivePaths.some(path => req.path.startsWith(path))) {
    score += 15; // Increased sensitivity for critical paths
  }

  // 4. Time-based anomalies (e.g., late night requests in user's timezone)
  const hour = new Date().getHours();
  if (hour >= 1 && hour <= 5) {
    score += 10; // Slightly higher risk during unusual hours
  }

  return Math.min(score, 100);
};

export const riskMiddleware = (req, res, next) => {
  const riskScore = calculateRisk(req);
  req.riskLevel = riskScore > 70 ? "high" : riskScore > 40 ? "medium" : "low";
  req.riskScore = riskScore;
  next();
};
