import { resendClient, sender } from "../LIB/resend.js";
import { createWelcomeEmailTemplate } from "./emailTemplates.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
    try {
        const { data, error } = await resendClient.emails.send({
            from: `${sender.name} <${sender.email}>`,
            to: [email], 
            subject: "Welcome to Chatify",
            html: createWelcomeEmailTemplate(sender.name, clientURL)
        });

        if (error) {
            console.error("Resend error:", error);
            return;
        }

        console.log("Welcome email sent successfully:", data);
    } catch (err) {
        console.error("Email send failed:", err);
    }
};
