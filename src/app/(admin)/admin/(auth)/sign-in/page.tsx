"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { login, logout } from "@/store/slices/authSlice";
import { signin } from "@/apis/auth.api";
import { useAppSelector } from "@/store/hooks";
import { Eye, EyeOff } from "lucide-react";

export default function AdminSignIn() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const mutation = useMutation({
    mutationFn: () => signin({ email, password }),
    onSuccess: (data) => {
      if (data.success) {
        dispatch(login(data.data));
      } else {
        setError(data.message);
      }
    },
    onError: (error: any) => {
      setError(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Email and password are required!");
      return;
    }
    mutation.mutate();
  };

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/admin"; // or use router.push("/admin")
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 space-y-4">
          <h1 className="text-2xl font-bold text-center">Admin Login</h1>
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            <div className="flex flex-col justify-center gap-y-2">
              <Button
                type="submit"
                className="w-full"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Logging in..." : "Login"}
              </Button>
              {error && <p className="text-center text-red-500">{error}</p>}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
