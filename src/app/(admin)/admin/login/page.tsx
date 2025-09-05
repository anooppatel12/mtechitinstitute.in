
"use client";

import { useState, useEffect }from "react";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/logo";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber, type ConfirmationResult } from "firebase/auth";
import { authorizedAdminPhoneNumbers } from "@/lib/authorized-admins";


export default function AdminLoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const { toast } = useToast();
  const router = useRouter();

  // Set up reCAPTCHA verifier
  useEffect(() => {
    if (typeof window !== 'undefined') {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible',
            'callback': (response: any) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                console.log("reCAPTCHA solved");
            }
        });
    }
  }, []);


  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!phoneNumber) {
        toast({ title: "Error", description: "Please enter a phone number.", variant: "destructive" });
        setIsLoading(false);
        return;
    }
    
    if (!authorizedAdminPhoneNumbers.includes(phoneNumber)) {
        toast({ title: "Unauthorized", description: "This phone number is not authorized for admin access.", variant: "destructive" });
        setIsLoading(false);
        return;
    }

    try {
        const verifier = window.recaptchaVerifier;
        const result = await signInWithPhoneNumber(auth, phoneNumber, verifier);
        setConfirmationResult(result);
        setStep('otp');
        toast({
            title: "OTP Sent",
            description: `An OTP has been sent to ${phoneNumber}.`,
        });
    } catch (error: any) {
         let errorMessage = "An unknown error occurred.";
         if (error.code) {
            switch (error.code) {
                case 'auth/invalid-phone-number':
                    errorMessage = 'The phone number is not valid.';
                    break;
                case 'auth/too-many-requests':
                     errorMessage = 'Too many requests. Please try again later.';
                     break;
                default:
                    errorMessage = 'Failed to send OTP. Please check the number and try again.';
                    break;
            }
        }
        console.error("Firebase Phone Auth Error:", error);
        toast({
            title: "Failed to Send OTP",
            description: errorMessage,
            variant: "destructive",
        });
    } finally {
        setIsLoading(false);
    }
  };
  
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!confirmationResult) {
        toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
        setIsLoading(false);
        return;
    }

    try {
        await confirmationResult.confirm(otp);
        toast({
            title: "Login Successful",
            description: "Redirecting to dashboard...",
        });
        router.push('/admin/dashboard');

    } catch (error: any) {
        let errorMessage = "An unknown error occurred.";
        if (error.code) {
            switch (error.code) {
                case 'auth/invalid-verification-code':
                    errorMessage = 'The OTP you entered is incorrect.';
                    break;
                 case 'auth/code-expired':
                    errorMessage = 'The OTP has expired. Please request a new one.';
                    break;
                default:
                    errorMessage = 'Failed to verify OTP. Please try again.';
                    break;
            }
        }
        console.error("Firebase OTP Verification Error:", error);
        toast({
            title: "Invalid OTP",
            description: errorMessage,
            variant: "destructive",
        });
        setIsLoading(false);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Logo />
            </div>
             <CardTitle className="text-2xl font-headline">Admin Login</CardTitle>
            {step === 'phone' ? (
                <CardDescription>Enter your phone number to receive an OTP</CardDescription>
            ) : (
                <CardDescription>Check your phone for the verification code.</CardDescription>
            )}
        </CardHeader>
        <CardContent>
          {step === 'phone' ? (
            <form onSubmit={handlePhoneSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="+919876543210" 
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required 
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="otp">One-Time Password</Label>
                    <Input 
                        id="otp" 
                        type="text" 
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="123456" 
                        required 
                    />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                   {isLoading ? 'Verifying...' : 'Verify OTP'}
                </Button>
                 <Button variant="link" size="sm" onClick={() => setStep('phone')}>
                    Use a different number
                </Button>
            </form>
          )}
        </CardContent>
      </Card>
      <div id="recaptcha-container"></div>
    </div>
  );
}

// Extend the Window interface to include the reCAPTCHA verifier
declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
}
