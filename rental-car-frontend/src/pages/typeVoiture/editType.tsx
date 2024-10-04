import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";

const EditType = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchType = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`http://localhost:4000/type/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { name, description } = response.data.data;
        setFormData({ name, description, image: null });
      } catch  {
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
      await axios.put(`http://localhost:4000/type/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/listType");
    } catch  {
      setErrorMessage("Erreur lors de la mise à jour du type");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-background p-8 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-xl font-semibold">Modifier Type</h3>
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
            <textarea
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

          <Button type="submit" className="w-full">Modifier Type</Button>
        </form>
      </div>
    </div>
  );
};

export default EditType;