import { isSpoofedBot } from "@arcjet/inspect";
import http from "node:http";


const arcjetProtection = async function (req, res, next) {
  try {
    const decision = await aj.protect(req, { requested: 5 }); 
  console.log("Arcjet decision", decision);

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      res.writeHead(429, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Too many requests" }));
    } else if (decision.reason.isBot()) {
      res.writeHead(403, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "No bots allowed" }));
    } else {
      res.writeHead(403, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Forbidden" }));
    }
  } else if (decision.ip.isHosting()) {
    
    res.writeHead(403, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Forbidden" }));
  } else if (decision.results.some(isSpoofedBot)) {
    
    res.writeHead(403, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Forbidden" }));
  } else {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Hello world" }));
  }
  next();
  } catch (error) {
    console.error("Arcjet Protection Error:", error);
    next();
    
  }
}

export default arcjetProtection;

