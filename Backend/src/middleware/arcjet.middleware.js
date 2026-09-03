import { isSpoofedBot } from "@arcjet/inspect";
import aj from "../LIB/arcjet.js";

const arcjetProtection = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 5 });

    console.log("Arcjet decision:", decision);

    
    if (decision.isErrored()) {
      console.warn("Arcjet error:", decision.reason);

      
      return next();
    }

    
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({
          error: "Too many requests",
        });
      }

      if (decision.reason.isBot()) {
        return res.status(403).json({
          error: "No bots allowed",
        });
      }

      return res.status(403).json({
        error: "Forbidden",
      });
    }

    
    if (decision.ip.isHosting()) {
      return res.status(403).json({
        error: "Forbidden - Hosting Provider IP",
      });
    }

    
    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({
        error: "Forbidden - Spoofed Bot Detected",
      });
    }

    next();
  } catch (error) {
    console.error("Arcjet Protection Error:", error);

    
    next();
  }
};

export default arcjetProtection;