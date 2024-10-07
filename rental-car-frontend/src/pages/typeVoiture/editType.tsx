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

interface EditTypeDialogProps {
  id: string;
}

const EditTypeDialog = ({ id }: EditTypeDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null as File | null,
    imageUrl: "" // Add this to track the existing image URL
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchType = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`http://localhost:4000/type/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { name, description, image } = response.data.data;

        setFormData({ name, description, image: null, imageUrl: image }); 
      } catch {
        setErrorMessage("Erreur lors de la récupération du type");
      }
    };

    fetchType();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      await axios.put(`http://localhost:4000/type/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      window.location.reload(); 
    } catch {
      setErrorMessage("Erreur lors de la mise à jour du type");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Modifier Type</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Modifier Type</DialogTitle>
          <DialogDescription>Mettez à jour les informations du type.</DialogDescription>
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

            {formData.imageUrl && (
              <img src={`http://localhost:4000/${formData.imageUrl}`} alt="Current Type" className="w-32 h-32 object-cover mb-4" />
            )}

            <Input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full">Modifier Type</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTypeDialog;