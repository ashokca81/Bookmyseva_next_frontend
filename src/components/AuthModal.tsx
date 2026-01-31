import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Lock, Phone, Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";

interface AuthModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const AuthModal = ({ open, onOpenChange }: AuthModalProps) => {
    const [activeTab, setActiveTab] = useState("login");
    const [showPassword, setShowPassword] = useState(false);

    // OTP Login states
    const [mobileNumber, setMobileNumber] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [otpSent, setOtpSent] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);

    // Registration OTP states
    const [regMobileNumber, setRegMobileNumber] = useState("");
    const [regOtp, setRegOtp] = useState(["", "", "", "", "", ""]);
    const [regOtpSent, setRegOtpSent] = useState(false);
    const [regResendTimer, setRegResendTimer] = useState(0);
    const [regName, setRegName] = useState("");
    const [regEmail, setRegEmail] = useState("");

    // Timer effect for resend OTP
    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendTimer]);

    // Timer effect for registration resend OTP
    useEffect(() => {
        if (regResendTimer > 0) {
            const timer = setTimeout(() => setRegResendTimer(regResendTimer - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [regResendTimer]);

    const handleSendOtp = (e: React.FormEvent) => {
        e.preventDefault();
        if (mobileNumber.length === 10) {
            // TODO: Implement actual OTP sending logic
            console.log("Sending OTP to:", mobileNumber);
            setOtpSent(true);
            setResendTimer(30); // 30 seconds timer
        }
    };

    const handleVerifyOtp = (e: React.FormEvent) => {
        e.preventDefault();
        const otpValue = otp.join("");
        if (otpValue.length === 6) {
            // TODO: Implement actual OTP verification logic
            console.log("Verifying OTP:", otpValue);
            onOpenChange(false); // Close modal on successful verification
        }
    };

    const handleOtpChange = (index: number, value: string) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Auto-focus next input
            if (value && index < 5) {
                const nextInput = document.getElementById(`otp-${index + 1}`);
                nextInput?.focus();
            }
        }
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handleResendOtp = () => {
        if (resendTimer === 0) {
            // TODO: Implement actual resend OTP logic
            console.log("Resending OTP to:", mobileNumber);
            setOtp(["", "", "", "", "", ""]);
            setResendTimer(30);
        }
    };

    const resetOtpForm = () => {
        setOtpSent(false);
        setOtp(["", "", "", "", "", ""]);
        setMobileNumber("");
        setResendTimer(0);
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        if (!regOtpSent && regMobileNumber.length === 10 && regName && regEmail) {
            // Send OTP for registration
            console.log("Sending OTP for registration to:", regMobileNumber);
            setRegOtpSent(true);
            setRegResendTimer(30);
        }
    };

    const handleRegVerifyOtp = (e: React.FormEvent) => {
        e.preventDefault();
        const otpValue = regOtp.join("");
        if (otpValue.length === 6) {
            // TODO: Implement actual registration OTP verification logic
            console.log("Verifying registration OTP:", otpValue, "Name:", regName, "Email:", regEmail, "Phone:", regMobileNumber);
            onOpenChange(false); // Close modal on successful registration
        }
    };

    const handleRegOtpChange = (index: number, value: string) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newOtp = [...regOtp];
            newOtp[index] = value;
            setRegOtp(newOtp);

            // Auto-focus next input
            if (value && index < 5) {
                const nextInput = document.getElementById(`reg-otp-${index + 1}`);
                nextInput?.focus();
            }
        }
    };

    const handleRegOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !regOtp[index] && index > 0) {
            const prevInput = document.getElementById(`reg-otp-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handleRegResendOtp = () => {
        if (regResendTimer === 0) {
            console.log("Resending OTP for registration to:", regMobileNumber);
            setRegOtp(["", "", "", "", "", ""]);
            setRegResendTimer(30);
        }
    };

    const resetRegOtpForm = () => {
        setRegOtpSent(false);
        setRegOtp(["", "", "", "", "", ""]);
        setRegResendTimer(0);
    };

    // Auto-scroll to focused input when keyboard opens (mobile)
    useEffect(() => {
        const handleFocus = (e: FocusEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
                // Small delay to ensure keyboard is opening
                setTimeout(() => {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                        inline: 'nearest'
                    });
                }, 300);
            }
        };

        // Add focus listener to all inputs
        document.addEventListener('focusin', handleFocus);

        return () => {
            document.removeEventListener('focusin', handleFocus);
        };
    }, []);


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="sm:max-w-md bg-gradient-to-br from-marigold/20 via-marigold/10 to-marigold/5 border-maroon/30 animate-slide-up backdrop-blur-sm safe-bottom"
                onInteractOutside={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 font-heading text-2xl text-maroon">
                        <User className="h-6 w-6 text-maroon" />
                        Welcome to Book My Seva
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                        Login or Register to access Book My Seva services
                    </DialogDescription>
                </DialogHeader>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-card/50 border border-maroon/20">
                        <TabsTrigger
                            value="login"
                            className="data-[state=active]:bg-spiritual-green data-[state=active]:text-white data-[state=inactive]:text-maroon font-semibold transition-all"
                        >
                            Login
                        </TabsTrigger>
                        <TabsTrigger
                            value="register"
                            className="data-[state=active]:bg-spiritual-green data-[state=active]:text-white data-[state=inactive]:text-maroon font-semibold transition-all"
                        >
                            Register
                        </TabsTrigger>
                    </TabsList>

                    {/* Login Tab - OTP Based */}
                    <TabsContent value="login" className="space-y-4 mt-4">
                        {!otpSent ? (
                            // Mobile Number Input
                            <form onSubmit={handleSendOtp} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="mobile-number" className="flex items-center gap-2 text-maroon font-semibold">
                                        <Phone className="h-4 w-4 text-maroon" />
                                        Mobile Number
                                    </Label>
                                    <Input
                                        id="mobile-number"
                                        type="tel"
                                        placeholder="Enter 10-digit mobile number"
                                        value={mobileNumber}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, "");
                                            if (value.length <= 10) {
                                                setMobileNumber(value);
                                            }
                                        }}
                                        required
                                        maxLength={10}
                                        className="border-maroon/30 focus:border-spiritual-green focus:ring-2 focus:ring-spiritual-green/20 bg-white/80"
                                    />
                                    {mobileNumber.length > 0 && mobileNumber.length < 10 && (
                                        <p className="text-xs text-sacred-red">Please enter a valid 10-digit mobile number</p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-spiritual-green hover:bg-spiritual-green/90 text-white font-semibold shadow-lg shadow-spiritual-green/30"
                                    disabled={mobileNumber.length !== 10}
                                >
                                    Send OTP
                                </Button>

                                <p className="text-xs text-center text-muted-foreground">
                                    You will receive a 6-digit OTP on your mobile number
                                </p>
                            </form>
                        ) : (
                            // OTP Verification
                            <form onSubmit={handleVerifyOtp} className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label className="flex items-center gap-2 text-maroon font-semibold">
                                            <Lock className="h-4 w-4 text-maroon" />
                                            Enter OTP
                                        </Label>
                                        <button
                                            type="button"
                                            onClick={resetOtpForm}
                                            className="text-xs text-spiritual-green hover:text-spiritual-green/80 font-medium transition-colors"
                                        >
                                            Change Number
                                        </button>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        OTP sent to +91 {mobileNumber}
                                    </p>
                                </div>

                                {/* OTP Input Fields */}
                                <div className="flex gap-2 justify-center">
                                    {otp.map((digit, index) => (
                                        <Input
                                            key={index}
                                            id={`otp-${index}`}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                            className="w-12 h-12 text-center text-lg font-semibold border-border focus:border-maroon"
                                        />
                                    ))}
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-spiritual-green hover:bg-spiritual-green/90 text-white font-semibold shadow-lg shadow-spiritual-green/30"
                                    disabled={otp.join("").length !== 6}
                                >
                                    Verify & Login
                                </Button>

                                {/* Resend OTP */}
                                <div className="text-center">
                                    {resendTimer > 0 ? (
                                        <p className="text-sm text-muted-foreground">
                                            Resend OTP in {resendTimer}s
                                        </p>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={handleResendOtp}
                                            className="text-sm text-spiritual-green hover:text-spiritual-green/80 transition-colors font-semibold"
                                        >
                                            Resend OTP
                                        </button>
                                    )}
                                </div>
                            </form>
                        )}
                    </TabsContent>

                    {/* Register Tab - OTP Based */}
                    <TabsContent value="register" className="space-y-4 mt-4">
                        {!regOtpSent ? (
                            // User Details Input
                            <form onSubmit={handleRegister} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="register-name" className="flex items-center gap-2 text-maroon font-semibold">
                                        <User className="h-4 w-4 text-maroon" />
                                        Full Name
                                    </Label>
                                    <Input
                                        id="register-name"
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={regName}
                                        onChange={(e) => setRegName(e.target.value)}
                                        required
                                        className="border-maroon/30 focus:border-spiritual-green focus:ring-2 focus:ring-spiritual-green/20 bg-white/80"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="register-email" className="flex items-center gap-2 text-maroon font-semibold">
                                        <Mail className="h-4 w-4 text-maroon" />
                                        Email
                                    </Label>
                                    <Input
                                        id="register-email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={regEmail}
                                        onChange={(e) => setRegEmail(e.target.value)}
                                        required
                                        className="border-maroon/30 focus:border-spiritual-green focus:ring-2 focus:ring-spiritual-green/20 bg-white/80"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="register-phone" className="flex items-center gap-2 text-maroon font-semibold">
                                        <Phone className="h-4 w-4 text-maroon" />
                                        Phone Number
                                    </Label>
                                    <Input
                                        id="register-phone"
                                        type="tel"
                                        placeholder="Enter 10-digit mobile number"
                                        value={regMobileNumber}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, "");
                                            if (value.length <= 10) {
                                                setRegMobileNumber(value);
                                            }
                                        }}
                                        required
                                        maxLength={10}
                                        className="border-maroon/30 focus:border-spiritual-green focus:ring-2 focus:ring-spiritual-green/20 bg-white/80"
                                    />
                                    {regMobileNumber.length > 0 && regMobileNumber.length < 10 && (
                                        <p className="text-xs text-sacred-red">Please enter a valid 10-digit mobile number</p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-spiritual-green hover:bg-spiritual-green/90 text-white font-semibold shadow-lg shadow-spiritual-green/30"
                                    disabled={!regName || !regEmail || regMobileNumber.length !== 10}
                                >
                                    Send OTP
                                </Button>

                                <p className="text-xs text-center text-muted-foreground mt-4">
                                    By creating an account, you agree to our{" "}
                                    <a href="#" className="text-maroon hover:underline">
                                        Terms of Service
                                    </a>{" "}
                                    and{" "}
                                    <a href="#" className="text-maroon hover:underline">
                                        Privacy Policy
                                    </a>
                                </p>
                            </form>
                        ) : (
                            // OTP Verification for Registration
                            <form onSubmit={handleRegVerifyOtp} className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label className="flex items-center gap-2 text-maroon font-semibold">
                                            <Lock className="h-4 w-4 text-maroon" />
                                            Enter OTP
                                        </Label>
                                        <button
                                            type="button"
                                            onClick={resetRegOtpForm}
                                            className="text-xs text-spiritual-green hover:text-spiritual-green/80 font-medium transition-colors"
                                        >
                                            Edit Details
                                        </button>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        OTP sent to +91 {regMobileNumber}
                                    </p>
                                </div>

                                {/* OTP Input Fields */}
                                <div className="flex gap-2 justify-center">
                                    {regOtp.map((digit, index) => (
                                        <Input
                                            key={index}
                                            id={`reg-otp-${index}`}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleRegOtpChange(index, e.target.value)}
                                            onKeyDown={(e) => handleRegOtpKeyDown(index, e)}
                                            className="w-12 h-12 text-center text-lg font-semibold border-border focus:border-maroon"
                                        />
                                    ))}
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-spiritual-green hover:bg-spiritual-green/90 text-white font-semibold shadow-lg shadow-spiritual-green/30"
                                    disabled={regOtp.join("").length !== 6}
                                >
                                    Verify & Create Account
                                </Button>

                                {/* Resend OTP */}
                                <div className="text-center">
                                    {regResendTimer > 0 ? (
                                        <p className="text-sm text-muted-foreground">
                                            Resend OTP in {regResendTimer}s
                                        </p>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={handleRegResendOtp}
                                            className="text-sm text-spiritual-green hover:text-spiritual-green/80 transition-colors font-semibold"
                                        >
                                            Resend OTP
                                        </button>
                                    )}
                                </div>
                            </form>
                        )}
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};

export default AuthModal;
