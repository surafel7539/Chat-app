import "dotenv/config";

export const ENV = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET,
    MONGO_DB: process.env.MONGO_DB,

   
    RESEND_API_KEY: process.env.RESEND_APIKEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME,
    CLIENT_URL: process.env.CLIENT_URL,
    ClOUD_NAME: process.env.CLOUD_NAME,
    CLOUD_API_KEY: process.env.CLOUD_API_KEY ,
    CLOUD_API_SECRET:process.env.CLOUD_API_SECRET,
    ARCJET_KEY:process.env.ARCJET_KEY,
    ARCJET_ENV:process.env.ARCJET_ENV
    
};
