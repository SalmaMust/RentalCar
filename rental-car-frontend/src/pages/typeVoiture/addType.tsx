import React, { useState } from "react";
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



const AddTypeDialog = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null as File | null,  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      await axios.post("http://localhost:4000/type/", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      window.location.reload(); 
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.errormessage || "Erreur lors de l'ajout du type");
      } else {
        setErrorMessage("Une erreur inconnue s'est produite");
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Ajouter Type</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Ajouter Type</DialogTitle>
          <DialogDescription>Remplissez les informations pour ajouter un nouveau type.</DialogDescription>
        </DialogHeader>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="name" className="block mb-2">Nom</Label>
            <Input
              type="text"
              name="name"
              placeholder="Nom du type"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="block mb-2">Description</Label>
            <Textarea
              name="description"
              placeholder="Description du type"
              value={formData.description}
              onChange={handleInputChange}
              required
              className="w-full border rounded"
            />
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
            <DialogTrigger asChild>
            <Button variant="secondary" type="submit" className="w-full">Ajouter Type</Button>
            </DialogTrigger>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTypeDialog;