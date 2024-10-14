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
    pricePerDay: 50,
    deposit: 50,
    min_days: 1,
  });
  

  const [types, setTypes] = useState<Type[]>([]); 
  const [models, setModels] = useState<Model[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  
  useEffect(() => {
    const fetchTypesAndModels = async () => {
      try {
        const token = localStorage.getItem("authToken");
        
        const typesResponse = await axios.get("http://localhost:4000/type", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTypes(typesResponse.data.data);
        
        const modelsResponse = await axios.get("http://localhost:4000/model", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setModels(modelsResponse.data.data);
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
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting form data:", form);
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

      window.location.reload(); 
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
        <Button variant="outline">Ajouter une Voiture</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Ajouter Voiture</DialogTitle>
          <DialogDescription>Remplissez les informations ci-dessous pour ajouter une nouvelle voiture.</DialogDescription>
        </DialogHeader>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
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
            <Label htmlFor="name" className="block mb-3 mt-3 text-muted-foreground">Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="model" className="block mb-3 mt-3 text-muted-foreground">Model</Label>
            <select
              name="model"
              value={form.model}
              onChange={handleInputChange}
              required
              className="block w-full mt-1 p-2 border rounded"
            >
              <option value="">Sélectionner un modèle</option>
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
              required
              className="block w-full mt-1 p-2 border rounded"
            >
              <option value="">Sélectionner un type</option>
              {types.map((type) => (
                <option key={type._id} value={type._id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="disponibilite" className="block mb-3 mt-3 text-muted-foreground">Disponibilité</Label>
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

          <DialogFooter className="col-span-2 mt-6 text-center">
            <Button className="w-full mx-auto mb-5" type="submit">Ajouter Voiture</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddVoiture;
