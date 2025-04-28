
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRole } from "../../types/auth";
import { useToast } from "@/hooks/use-toast";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole>("resident");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      setStep(2);
      return;
    }

    setIsLoading(true);
    try {
      await signup(email, password, name, role);
      toast({
        title: "Registration successful",
        description: "Your account has been created. Please check your email to verify your account.",
      });
      navigate("/");
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration failed",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const stepOne = (
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input
          id="confirm-password"
          type="password"
          required
        />
      </div>
    </CardContent>
  );

  const stepTwo = (
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Select defaultValue={role} onValueChange={(value) => setRole(value as UserRole)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="resident">Resident</SelectItem>
            <SelectItem value="leader">Community Leader</SelectItem>
            <SelectItem value="service-provider">Service Provider</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          placeholder="123 Main Street"
          required
        />
      </div>
    </CardContent>
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary">
            <span className="text-xl font-bold text-white">CC</span>
          </div>
          <h1 className="mt-4 text-2xl font-bold">Community Connect</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Create an account to join your neighborhood portal
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign Up - Step {step} of 2</CardTitle>
            <CardDescription>
              {step === 1
                ? "Create your account credentials"
                : "Complete your profile information"}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            {step === 1 ? stepOne : stepTwo}
            <CardFooter className="flex flex-col">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {step === 1
                  ? "Continue"
                  : isLoading
                  ? "Creating account..."
                  : "Create Account"}
              </Button>

              {step === 2 && (
                <Button
                  variant="ghost"
                  className="mt-2"
                  onClick={() => setStep(1)}
                  type="button"
                >
                  Back
                </Button>
              )}

              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-primary hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/login");
                  }}
                >
                  Sign In
                </a>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
