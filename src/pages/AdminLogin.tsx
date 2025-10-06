import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { adminLogin, ApiError } from "@/lib/api";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { Lock } from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (auth) {
      navigate("/admin", { replace: true });
    }
  }, [auth, navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      const result = await adminLogin(email.trim(), password);
      setAuth(result);
      toast({
        title: "Signed in",
        description: `Welcome back, ${result.admin.name}`
      });
      navigate("/admin", { replace: true });
    } catch (error) {
      if (error instanceof ApiError) {
        setErrors((error.details as Record<string, string[]>) ?? {});
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Something went wrong",
          description: "Please try again",
          variant: "destructive"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFieldError = (field: "email" | "password") => {
    const fieldErrors = errors[field];
    if (!fieldErrors || fieldErrors.length === 0) {
      return null;
    }
    return (
      <p className="mt-1 text-sm text-destructive" role="alert">
        {fieldErrors[0]}
      </p>
    );
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md border border-border/60">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/15">
            <Lock className="h-6 w-6 text-gold" />
          </div>
          <CardTitle className="text-2xl font-semibold text-foreground">
            Admin Dashboard
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Sign in to review booking requests and respond to clients.
          </p>
        </CardHeader>
        <form onSubmit={handleSubmit} noValidate>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="admin@mountainmixology.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              {renderFieldError("email")}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              {renderFieldError("password")}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-gold text-gold-foreground hover:bg-gold/90" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AdminLogin;
