import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface Type {
  _id: string;
  name: string;
}

interface Model {
  _id: string;
  name: string;
}

const AddVoiture = () => {
  const [form, setForm] = useState({
    matricule: "",
    name: "",
    model: "",
    type: "",
    disponibilité: "dispo",
    pricePerDay: 0,
    deposit: 50,
    min_days: 1,
  });
  const [types, setTypes] = useState<Type[]>([]); 
  const [models, setModels] = useState<Model[]>([]); 
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTypesAndModels = async () => {
      try {
        const token = localStorage.getItem("authToken");

        // Fetch types
        const typesResponse = await axios.get("http://localhost:4000/type/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTypes(typesResponse.data.data || []);

        // Fetch models
        const modelsResponse = await axios.get("http://localhost:4000/model/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setModels(modelsResponse.data.data || []);
      } catch  {
        setErrorMessage("Erreur lors de la récupération des types et modèles.");
      }
    };

    fetchTypesAndModels();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    setForm((prevForm) => ({
      ...prevForm,
      [name]: name === "pricePerDay" || name === "deposit" || name === "min_days"
        ? parseInt(value, 10) 
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (
      !form.matricule ||
      !form.name ||
      !form.model ||
      !form.type ||
      !form.disponibilité ||
      !form.pricePerDay ||
      !form.deposit ||
      !form.min_days
    ) {
      setErrorMessage("Tous les champs sont obligatoires.");
      return;
    }
  
    console.log("Form Data:", form);
  
    try {
      const token = localStorage.getItem("authToken");
  
      await axios.post(
        "http://localhost:4000/car/",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      navigate("/voitures");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.errormessage || "Erreur lors de l'ajout de la voiture");
      } else {
        setErrorMessage("Une erreur inconnue s'est produite");
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Ajouter Voiture</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter Voiture</DialogTitle>
          <DialogDescription>
            Remplissez les informations pour ajouter une nouvelle voiture.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="matricule" className="block mb-3 mt-3 text-muted-foreground">Matricule</Label>
            <Input
              type="text"
              name="matricule"
              placeholder="Matricule"
              value={form.matricule}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="name" className="block mb-3 mt-3 text-muted-foreground">Nom</Label>
            <Input
              type="text"
              name="name"
              placeholder="Nom"
              value={form.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="model" className="block mb-3 mt-3 text-muted-foreground">Modèle</Label>
            <select
              name="model"
              value={form.model}
              onChange={handleInputChange}
              className="block w-full mt-1 p-2 border rounded"
              required
            >
              <option value="">Sélectionnez un modèle</option>
              {models.map((model) => (
                <option key={model._id} value={model._id}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="type" className="block mb-3 mt-3 text-muted-foreground">Type</Label>
            <select
              name="type"
              value={form.type}
              onChange={handleInputChange}
              className="block w-full mt-1 p-2 border rounded"
              required
            >
              <option value="">Sélectionnez un type</option>
              {types.map((type) => (
                <option key={type._id} value={type._id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="disponibilité" className="block mb-3 mt-3 text-muted-foreground">Disponibilité</Label>
            <select
              name="disponibilité"
              value={form.disponibilité}
              onChange={handleInputChange}
              className="block w-full mt-1 p-2 border rounded"
            >
              <option value="dispo">Disponible</option>
              <option value="maintenance">Maintenance</option>
              <option value="louée">Louée</option>
            </select>
          </div>

          <div>
            <Label htmlFor="pricePerDay" className="block mb-3 mt-3 text-muted-foreground">Prix par jour</Label>
            <Input
              type="number"
              name="pricePerDay"
              value={form.pricePerDay}
              onChange={handleInputChange}
              placeholder="Prix par jour"
              required
            />
          </div>

          <div>
            <Label htmlFor="deposit" className="block mb-3 mt-3 text-muted-foreground">Dépôt</Label>
            <Input
              type="number"
              name="deposit"
              value={form.deposit}
              onChange={handleInputChange}
              placeholder="Dépôt"
              required
            />
          </div>

          <div>
            <Label htmlFor="min_days" className="block mb-3 mt-3 text-muted-foreground">Jours minimum</Label>
            <Input
              type="number"
              name="min_days"
              value={form.min_days}
              onChange={handleInputChange}
              placeholder="Jours minimum"
              required
            />
          </div>

          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

          <DialogFooter>
            <Button type="submit">Ajouter Voiture</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddVoiture;