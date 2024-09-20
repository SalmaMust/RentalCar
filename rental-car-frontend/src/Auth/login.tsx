import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Login = () => {
  const [form, setForm] = useState({
    Email: "",
    Mot_de_passe: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/auth/signin", form);
      const { token, user } = response.data; 

      
      localStorage.setItem("authToken", token);

      
      if (user.role === "Client") {
        navigate("/clientDashboard");
      } else if (user.role === "Admin") {
        navigate("/adminDashboard");
      } else {
        setErrorMessage("Role not recognized.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.errormessage || "Erreur lors de la connexion");
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Une erreur inconnue s'est produite");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-background p-8 rounded-lg shadow-lg w-full max-w-md">
        <div>
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <div>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <Label htmlFor="email" className="block mb-1 text-muted-foreground">
                Email
              </Label>
              <Input
                type="email"
                name="Email"
                placeholder="Email"
                value={form.Email}
                onChange={handleInputChange}
                required
              />
              <Label htmlFor="password" className="block mb-1 text-muted-foreground">
                Password
              </Label>
              <Input
                type="password"
                name="Mot_de_passe"
                placeholder="Mot de Passe"
                value={form.Mot_de_passe}
                onChange={handleInputChange}
                required
              />

              <div className="mt-6 text-center">
                <Button className="w-[3cm] mx-auto mb-5" type="submit">
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;