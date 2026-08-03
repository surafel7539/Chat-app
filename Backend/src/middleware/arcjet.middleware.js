import { isSpoofedBot } from "@arcjet/inspect";
import aj from "../LIB/arcjet.js";

const arcjetProtection = async function (req, res, next) {
  try {
    const decision = await aj.protect(req, { requested: 5 }); 
    console.log("Arcjet decision", decision);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ error: "Too many requests" });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({ error: "No bots allowed" });
      } else {
        return res.status(403).json({ error: "Forbidden" });
      }
    } 
    
    if (decision.ip.isHosting()) {
      return res.status(403).json({ error: "Forbidden - Hosting Provider IP" });
    } 
    
    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({ error: "Forbidden - Spoofed Bot Detected" });
    }

    // ✅ FIXED: Do NOT use res.end() or send "Hello World" here. 
    // Simply call next() to let authorized traffic pass safely to your routes.
    next();

  } catch (error) {
    console.error("Arcjet Protection Error:", error);
    // Safe fallback: let request proceed if security provider fails or times out
    next();
  }
}

export default arcjetProtection;
