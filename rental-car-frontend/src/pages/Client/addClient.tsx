import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

const AddClient = () => {
  const [form, setForm] = useState({
    Nom: "",
    Email: "",
    Mot_de_passe: "",
    telephone: "",
    adresse: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [role, setRole] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    setRole(userRole);
  }, []);

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
      const token = localStorage.getItem("authToken");

      await axios.post(
        "http://localhost:4000/user/",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        
      );
      window.location.reload(); 

      navigate("/admin/clients"); 
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.errormessage || "Erreur lors de l'ajout du client");
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Une erreur inconnue s'est produite");
      }
    }
  };

  if (role == "Client") {
    return <div>Access denied. Only Admins can add new clients.</div>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Ajouter un Client</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Ajouter Client</DialogTitle>
          <DialogDescription>Remplissez les informations pour ajouter un nouveau client.</DialogDescription>
        </DialogHeader>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <Label htmlFor="nom" className="block mb-3 mt-3 text-muted-foreground">
            Nom
          </Label>
          <Input
            type="text"
            name="Nom"
            placeholder="Nom"
            value={form.Nom}
            onChange={handleInputChange}
            required
          />
          <Label htmlFor="email" className="block mb-3 mt-3 text-muted-foreground">
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
          <Label htmlFor="Mot_de_passe" className="block mb-3 mt-3 text-muted-foreground">
            Mot de passe
          </Label>
          <Input
            type="password"
            name="Mot_de_passe"
            placeholder="Mot de Passe"
            value={form.Mot_de_passe}
            onChange={handleInputChange}
            required
          />
          <Label htmlFor="telephone" className="block mb-3 mt-3 text-muted-foreground">
            Telephone
          </Label>
          <Input
            type="text"
            name="telephone"
            placeholder="Téléphone"
            value={form.telephone}
            onChange={handleInputChange}
            required
          />
          <Label htmlFor="adresse" className="block mb-3 mt-3 text-muted-foreground">
            Adresse
          </Label>
          <Input
            type="text"
            name="adresse"
            placeholder="Adresse"
            value={form.adresse}
            onChange={handleInputChange}
            required
          />
          <DialogFooter className="sm:justify-start mt-4">
            <DialogTrigger asChild>
            <Button  variant="secondary" type="submit">Ajouter</Button>
            </DialogTrigger>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddClient;