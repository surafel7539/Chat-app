import arcjet, { detectBot, shield, slidingWindow } from "@arcjet/node";
import { ENV } from "./env.js";


const isDevelopment = ENV.NODE_ENV === "development";

const aj = arcjet({
  key: ENV.ARCJET_KEY, 
  rules: [
    
    shield({ 
      mode: isDevelopment ? "DRY_RUN" : "LIVE" 
    }),
    
    
    detectBot({
      mode: isDevelopment ? "DRY_RUN" : "LIVE", 
      allow: [
        "CATEGORY:SEARCH_ENGINE", 
      ],
    }),
    
    
    slidingWindow({
      mode: isDevelopment ? "DRY_RUN" : "LIVE",
      max: 100, 
      interval: 60, 
    }),
  ],
});

export default aj;
