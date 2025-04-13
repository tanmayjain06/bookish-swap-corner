
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useData } from "@/context/DataContext";
import { UserRole } from "@/types";
import { BookOpen } from "lucide-react";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("seeker");
  
  const { register } = useData();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userData = { name, email, mobile, password, role };
    const success = register(userData);
    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-book-brown flex items-center justify-center text-white">
            <BookOpen size={32} />
          </div>
        </div>
        <CardTitle className="text-2xl text-center">Create an account</CardTitle>
        <CardDescription className="text-center">
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input
              id="mobile"
              placeholder="1234567890"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
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
            <Label>I want to:</Label>
            <RadioGroup defaultValue={role} onValueChange={(value) => setRole(value as UserRole)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="owner" id="owner" />
                <Label htmlFor="owner" className="cursor-pointer">Share my books (Owner)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="seeker" id="seeker" />
                <Label htmlFor="seeker" className="cursor-pointer">Find books to borrow (Seeker)</Label>
              </div>
            </RadioGroup>
          </div>
          <Button type="submit" className="w-full bg-book-burgundy hover:bg-opacity-90">
            Create Account
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Button
            variant="link"
            className="p-0 text-book-burgundy"
            onClick={() => navigate("/login")}
          >
            Sign In
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
