import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-background p-8 rounded-lg shadow-lg w-full max-w-md">
        <div>
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-1 text-muted-foreground">
                Email
              </label>
              <Input id="email" type="email" placeholder="example@email.com" required />
            </div>
            <div>
              <label htmlFor="password" className="block mb-1 text-muted-foreground">
                Password
              </label>
              <Input id="password" type="password" required />
            </div>
            <Button className="w-full">Sign In</Button>
          </form>
          <div className="mt-6 text-center">
          <p className="text-muted-foreground mb-4">Don't have an account?{" "}
            </p><Link to="/signup">
            <Button
              variant="outline"
              className="w-[3cm] mx-auto"
            >
              Sign Up
            </Button>
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
}