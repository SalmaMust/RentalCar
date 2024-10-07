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
interface EditModeleDialogProps {
  id: string;
}

const EditModele = ({ id }: EditModeleDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "", 
    image: null as File | null,
    imageUrl: ""
  });
  const [brands, setBrands] = useState<Brand[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchModele = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`http://localhost:4000/model/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { name, description, brand, image } = response.data.data;
        setFormData({ name, description, brand, image: null, imageUrl: image });
      } catch {
        setErrorMessage("Erreur lors de la récupération du modèle.");
      }
    };

    const fetchBrands = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://localhost:4000/brand/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBrands(response.data.data);
      } catch {
        setErrorMessage("Erreur lors de la récupération des marques.");
      }
    };

    fetchModele();
    fetchBrands();
  }, [id]);

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
    data.append("maison", formData.brand);

    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      await axios.put(`http://localhost:4000/model/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      window.location.reload(); 
    } catch {
      setErrorMessage("Erreur lors de la mise à jour du modèle.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Modifier </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Modifier Modèle</DialogTitle>
          <DialogDescription>Mettez à jour les informations du modèle.</DialogDescription>
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

            {/* Display the current image */}
            {formData.imageUrl && (
              <img src={`http://localhost:4000/${formData.imageUrl}`} alt="Current Modele" className="w-32 h-32 object-cover mb-4" />
            )}

            <Input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full">Modifier Modèle</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditModele;