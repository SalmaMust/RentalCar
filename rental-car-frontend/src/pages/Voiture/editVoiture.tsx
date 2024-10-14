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

interface EditVoitureProps {
  id: string; // ID of the voiture being edited
}

const EditVoiture = ({ id }: EditVoitureProps) => {
  const [formData, setFormData] = useState({
    matricule: "",
    name: "",
    model: "",
    type: "",
    disponibilité: "dispo",
    pricePerDay: 0,
    deposit: 0,
    min_days: 1,
  });

  const [types, setTypes] = useState<Type[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

        const voitureResponse = await axios.get(`http://localhost:4000/car/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const voitureData = voitureResponse.data.data;
        setFormData({
          matricule: voitureData.matricule,
          name: voitureData.name,
          model: voitureData.model._id,
          type: voitureData.type._id,
          disponibilité: voitureData.disponibilité,
          pricePerDay: voitureData.pricePerDay,
          deposit: voitureData.deposit,
          min_days: voitureData.min_days,
        });
      } catch {
        setErrorMessage("Erreur lors de la récupération des données.");
      }
    };

    fetchTypesAndModels();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");

      await axios.put(`http://localhost:4000/car/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      window.location.reload(); 
    } catch {
      setErrorMessage("Erreur lors de la mise à jour de la voiture.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Modifier </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Modifier Voiture</DialogTitle>
          <DialogDescription>Mettez à jour les informations de la voiture.</DialogDescription>
        </DialogHeader>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="matricule" className="block mb-3 mt-3 text-muted-foreground">Matricule</Label>
            <Input
              type="text"
              name="matricule"
              placeholder="Matricule"
              value={formData.matricule}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="name" className="block mb-3 mt-3 text-muted-foreground">Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Nom"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="model" className="block mb-3 mt-3 text-muted-foreground">Modèle</Label>
            <select
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              required
              className="block w-full mt-1 p-2 border rounded"
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
              value={formData.type}
              onChange={handleInputChange}
              required
              className="block w-full mt-1 p-2 border rounded"
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
              value={formData.disponibilité}
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
              value={formData.pricePerDay}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="deposit" className="block mb-3 mt-3 text-muted-foreground">Dépôt</Label>
            <Input
              type="number"
              name="deposit"
              value={formData.deposit}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="min_days" className="block mb-3 mt-3 text-muted-foreground">Jours minimum</Label>
            <Input
              type="number"
              name="min_days"
              value={formData.min_days}
              onChange={handleInputChange}
              required
            />
          </div>

          <DialogFooter className="col-span-2 mt-6 text-center">
            <Button className="w-full mx-auto mb-5" type="submit">Mettre à jour la voiture</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditVoiture;
