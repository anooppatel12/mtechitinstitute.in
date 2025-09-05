
"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/logo";
import { useToast } from "@/hooks/use-toast";
import { generateOtp } from "@/ai/flows/generate-otp-flow";
import { verifyAdminCredentials } from "@/lib/actions";

export default function AdminLoginPage() {
  const [step, setStep] = useState('credentials'); // 'credentials' or 'otp'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleCredentialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const result = await verifyAdminCredentials(formData);

    if (!result.success) {
      toast({
        title: "Invalid Credentials",
        description: result.message,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    try {
      const otpResponse = await generateOtp({ email });
      setGeneratedOtp(otpResponse.otp);
      setStep('otp');
      toast({
        title: "OTP Sent",
        description: `An OTP has been sent to your email. (Hint: It's ${otpResponse.otp})`,
      });
    } catch(error) {
        console.error("OTP Generation failed", error);
        toast({
            title: "Error",
            description: "Could not generate an OTP. Please try again.",
            variant: "destructive",
        });
    }

    setIsLoading(false);
  };
  
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (otp === generatedOtp) {
        toast({
            title: "Login Successful",
            description: "Redirecting to dashboard...",
        });
        // In a real app, you'd set a secure session/cookie here
        router.push('/admin/dashboard');
    } else {
        toast({
            title: "Invalid OTP",
            description: "The OTP you entered is incorrect.",
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
            {step === 'credentials' ? (
                <>
                    <CardTitle className="text-2xl font-headline">Admin Login</CardTitle>
                    <CardDescription>Enter your credentials to access the dashboard</CardDescription>
                </>
            ) : (
                 <>
                    <CardTitle className="text-2xl font-headline">Enter OTP</CardTitle>
                    <CardDescription>Check your email for the verification code.</CardDescription>
                </>
            )}
        </CardHeader>
        <CardContent>
          {step === 'credentials' ? (
            <form onSubmit={handleCredentialSubmit} className="grid gap-4" autoComplete="off">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="m@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  autoComplete="off"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  autoComplete="new-password"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Verifying...' : 'Login'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="otp">One-Time Password</Label>
                    <Input 
                        id="otp" 
                        type="text" 
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="123456" 
                        required 
                        autoComplete="off"
                    />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                   {isLoading ? 'Verifying...' : 'Verify OTP'}
                </Button>
                 <Button variant="link" size="sm" onClick={() => setStep('credentials')}>
                    Back to login
                </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
