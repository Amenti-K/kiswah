"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Eye, EyeOff } from "lucide-react";
import { requestOtp, register } from "@/apis/auth.api";
import { RegisterAdmin } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminSignUp() {
  const [form, setForm] = useState<RegisterAdmin>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    role: "NORMAL",
    code: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [error, setError] = useState(null);

  // ---- Mutations ----
  const otpMutation = useMutation({
    mutationFn: () => requestOtp(form.email),
    onSuccess: (data) => {
      if (data.success) {
        setShowOtpModal(true);
      } else {
        setError(data.message);
      }
    },
    onError: (err: any) => {
      setError(err.message || "Failed to send OTP");
    },
  });

  const registerMutation = useMutation({
    mutationFn: () => register(form),
    onSuccess: (data) => {
      if (data.success) {
        alert("Registration successful!");
        window.location.href = "/admin";
      } else {
        setError(data.message);
      }
    },
    onError: (err: any) => {
      setError(err.message || "Failed to register");
    },
  });

  // ---- Handlers ----
  const handleChange = (field: keyof RegisterAdmin, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email.includes("@")) {
      alert("Please enter a valid email");
      return;
    }
    if (form.password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }
    otpMutation.mutate();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code) {
      alert("Please enter the OTP code");
      return;
    }
    registerMutation.mutate();
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 space-y-4">
          <h1 className="text-2xl font-bold text-center">Register Admin</h1>
          <form onSubmit={handleRequestOtp} className="space-y-3">
            <Input
              placeholder="First Name"
              value={form.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              required
            />
            <Input
              placeholder="Last Name"
              value={form.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              required
            />
            <div className="flex gap-2 relative">
              <Input
                placeholder="Username"
                value={form.username}
                onChange={(e) => handleChange("username", e.target.value)}
                required
              />
              <Select
                value={form.role}
                onValueChange={(value) => handleChange("role", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SUPER">Super Admin</SelectItem>
                  <SelectItem value="NORMAL">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
            />
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="flex flex-col justify-center gap-x-4">
              <Button
                type="submit"
                className="w-full"
                disabled={otpMutation.isPending}
              >
                {otpMutation.isPending ? "Sending OTP..." : "Send OTP"}
              </Button>
              {error && <p className="text-red-100">{error}</p>}
            </div>
          </form>
        </CardContent>
      </Card>
      <Dialog open={showOtpModal} onOpenChange={setShowOtpModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter OTP Code</DialogTitle>
            <DialogDescription>
              We've sent a one-time password to your email. Please enter it
              below to complete your registration.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleRegister} className="space-y-4 mt-2">
            <Input
              placeholder="OTP Code"
              value={form.code}
              onChange={(e) => handleChange("code", e.target.value)}
              required
            />
            <Button
              type="submit"
              className="w-full"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? "Registering..." : "Register"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
