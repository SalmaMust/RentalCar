
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";  
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Register = () => {
  const [form, setForm] = useState({
    Nom: "",
    Email: "",
    Mot_de_passe: "",
    telephone: "",
    adresse: "",
    role: "", 
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
    try {
      const response = await axios.post("http://localhost:4000/auth/signup", form);
      setSuccessMessage(response.data.successmessage);
      setErrorMessage("");

      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.errormessage || "Erreur lors de l'inscription");
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Une erreur inconnue s'est produite");
      }
    }
  };

  return (
    <div>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <div className="flex justify-center items-center h-screen">
        <div className="bg-background p-9 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-1">Sign Up</h2>
          <form  onSubmit={handleSubmit}>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              name="Nom"
              placeholder="Nom"
              value={form.Nom}
              onChange={handleInputChange}
              required
            />
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="Email"
              placeholder="Email"
              value={form.Email}
              onChange={handleInputChange}
              required
            />
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="Mot_de_passe"
              placeholder="Mot de Passe"
              value={form.Mot_de_passe}
              onChange={handleInputChange}
              required
            />
            <Label htmlFor="telephone">Phone</Label>
            <Input
              type="text"
              name="telephone"
              placeholder="Téléphone"
              value={form.telephone}
              onChange={handleInputChange}
              required
            />
            <Label htmlFor="adresse">Adress</Label>
            <Input
              type="text"
              name="adresse"
              placeholder="Adress"
              value={form.adresse}
              onChange={handleInputChange}
              required
            />
            
           
            <div className="mt-3 text-center">
              <Button className="w-[3cm] mx-auto" type="submit">Register</Button>
            </div>
          </form>
          <div className="mt-3 text-center">
            <p className="text-muted-foreground mb-1">
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
    </div>
  );
};

export default Register;