import { isSpoofedBot } from "@arcjet/inspect";
import aj from "../LIB/arcjet.js";

const arcjetProtection = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 5 });

    console.log("Arcjet decision:", decision);

    // Handle Arcjet errors
    if (decision.isErrored()) {
      console.warn("Arcjet error:", decision.reason);

      // During development, allow the request to continue
      return next();
    }

    // Handle denied requests
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

    // Block hosting provider IPs
    if (decision.ip.isHosting()) {
      return res.status(403).json({
        error: "Forbidden - Hosting Provider IP",
      });
    }

    // Block spoofed bots
    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({
        error: "Forbidden - Spoofed Bot Detected",
      });
    }

    next();
  } catch (error) {
    console.error("Arcjet Protection Error:", error);

    // Don't let Arcjet failure break the application
    next();
  }
};

export default arcjetProtection;