import arcjet, { detectBot, shield, slidingWindow } from "@arcjet/node";
import { ENV } from "./env.js";

// Determine if the app is currently running in development
const isDevelopment = ENV.NODE_ENV === "development";

const aj = arcjet({
  key: ENV.ARCJET_KEY, 
  rules: [
    // Shield blocks malicious common web exploits
    shield({ 
      mode: isDevelopment ? "DRY_RUN" : "LIVE" 
    }),
    
    // Bot detection stops scrapers, automated scripts, and Postman
    detectBot({
      mode: isDevelopment ? "DRY_RUN" : "LIVE", 
      allow: [
        "CATEGORY:SEARCH_ENGINE", 
      ],
    }),
    
    // Rate limiting window setup
    slidingWindow({
      mode: isDevelopment ? "DRY_RUN" : "LIVE",
      max: 100, 
      interval: 60, 
    }),
  ],
});

export default aj;
