
'use server';

/**
 * @fileOverview An OTP generation and email sending AI agent.
 *
 * - generateOtp - A function that generates a one-time password and sends it via email.
 * - GenerateOtpInput - The input type for the generateOtp function.
 * - GenerateOtpOutput - The return type for the generateOtp function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import sgMail from '@sendgrid/mail';

if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}


const GenerateOtpInputSchema = z.object({
  email: z.string().email().describe('The email address to send the OTP to.'),
});
export type GenerateOtpInput = z.infer<typeof GenerateOtpInputSchema>;

const GenerateOtpOutputSchema = z.object({
  otp: z.string().length(6).describe('The 6-digit one-time password.'),
});
export type GenerateOtpOutput = z.infer<typeof GenerateOtpOutputSchema>;


export async function generateOtp(
  input: GenerateOtpInput
): Promise<GenerateOtpOutput> {
  return generateOtpFlow(input);
}


const generateOtpFlow = ai.defineFlow(
  {
    name: 'generateOtpFlow',
    inputSchema: GenerateOtpInputSchema,
    outputSchema: GenerateOtpOutputSchema,
  },
  async (input) => {
    
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    console.log(`Generated OTP for ${input.email}: ${otp}`);

    if (!process.env.SENDGRID_API_KEY) {
        console.error("SendGrid API Key not found. Skipping email.");
        // In a real app, you'd want to handle this more gracefully.
        // For the prototype, we can proceed without email for local testing.
    } else {
        const msg = {
            to: input.email,
            from: 'anooppbh8@gmail.com', // Use a verified sender email in your SendGrid account
            subject: 'Your MTech IT Institute Login OTP',
            html: `<div style="font-family: sans-serif; text-align: center; padding: 20px;">
                     <h2>MTech IT Institute Admin Login</h2>
                     <p>Your One-Time Password (OTP) is:</p>
                     <p style="font-size: 24px; font-weight: bold; letter-spacing: 4px; border: 1px solid #ccc; padding: 10px; display: inline-block;">${otp}</p>
                     <p>This code will expire in 5 minutes.</p>
                   </div>`,
        };

        try {
            await sgMail.send(msg);
            console.log(`OTP email sent to ${input.email}`);
        } catch (error) {
            console.error('Error sending email:', error);
            // It's important to decide if the flow should fail if the email doesn't send.
            // For now, we'll log the error but still return the OTP.
        }
    }

    return { otp };
  }
);
