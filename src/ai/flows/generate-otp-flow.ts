
'use server';

/**
 * @fileOverview An OTP generation AI agent.
 *
 * - generateOtp - A function that generates a one-time password.
 * - GenerateOtpInput - The input type for the generateOtp function.
 * - GenerateOtpOutput - The return type for the generateOtp function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {generate} from 'crypto';

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
    // In a real application, you would use a secure OTP generation library
    // and an email service to send the code.
    // For this prototype, we'll just generate a random 6-digit number.
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    console.log(`OTP for ${input.email}: ${otp}`);

    return { otp };
  }
);

