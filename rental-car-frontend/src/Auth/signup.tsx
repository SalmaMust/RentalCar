import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-background p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <p className="text-muted-foreground mb-6">Create a new account to get started.</p>
        <form className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="John Doe" required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          <Button className="w-full">Sign Up</Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-muted-foreground mb-4">
            Already have an account?
          </p>
          <Link to="/login">
            <Button
              variant="outline"
              className="w-[3cm] mx-auto"
            >
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}