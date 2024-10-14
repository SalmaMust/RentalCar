import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Brand {
  _id: string;
  name: string;
}

const AddModele= () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "", 
    image: null as File | null,
  });
  const [brands, setBrands] = useState<Brand[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://localhost:4000/brand", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);  

    setBrands(response.data.data);  
      } catch  {
        setErrorMessage("Erreur lors de la récupération des marques.");
      }
    };

    fetchBrands();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("brand", formData.brand);

    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      await axios.post(`http://localhost:4000/model/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      window.location.reload();
    } catch {
      setErrorMessage("Erreur lors de l'ajout du modèle.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Ajouter </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Ajouter Modèle</DialogTitle>
          <DialogDescription>Remplissez les informations pour ajouter un nouveau modèle de voiture.</DialogDescription>
        </DialogHeader>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="name" className="block mb-2">Nom</Label>
            <Input
              type="text"
              name="name"
              placeholder="Nom du modèle"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="block mb-2">Description</Label>
            <Textarea
              name="description"
              placeholder="Description du modèle"
              value={formData.description}
              onChange={handleInputChange}
              required
              className="w-full border rounded"
            />
          </div>

          <div>
            <Label htmlFor="brand" className="block mb-2">Marque</Label>
            <select name="brand" value={formData.brand} onChange={handleInputChange} required>
              <option value="">Sélectionnez une marque</option>
              {brands.map((brand) => (
                <option key={brand._id} value={brand._id}>{brand.name}</option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="image" className="block mb-2">Image</Label>
            <Input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full">Ajouter Modèle</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddModele;