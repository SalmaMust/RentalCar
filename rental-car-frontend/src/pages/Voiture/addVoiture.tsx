import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";

const AddVoiture = () => {
  const [form, setForm] = useState({
    Matricule: "",
    Name: "",
    Model: "",
    type: "",
    disponibilite: "dispo",
    pricePerDay: 0,
    deposit: 0,
    min_days: 1,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    setRole(userRole);
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

      navigate("/voiture-list");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.errormessage || "Erreur lors de l'ajout de la voiture");
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Une erreur inconnue s'est produite");
      }
    }
  };

  if (role === "Client") {
    return <div>Access denied. Only Admins can add new cars.</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-background p-8 rounded-lg shadow-lg w-full max-w-md">
        <div>
          <h3 className="text-xl font-semibold">Ajouter Voiture</h3>
          <div>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="matricule" className="block mb-3 mt-3 text-muted-foreground">Matricule</Label>
                <Input
                  type="text"
                  name="Matricule"
                  placeholder="Matricule"
                  value={form.Matricule}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="name" className="block mb-3 mt-3 text-muted-foreground">Name</Label>
                <Input
                  type="text"
                  name="Name"
                  placeholder="Name"
                  value={form.Name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="model" className="block mb-3 mt-3 text-muted-foreground">Model</Label>
                <Input
                  type="text"
                  name="Model"
                  placeholder="Model"
                  value={form.Model}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="type" className="block mb-3 mt-3 text-muted-foreground">Type</Label>
                <Input
                  type="text"
                  name="type"
                  placeholder="Type"
                  value={form.type}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="disponibilite" className="block mb-3 mt-3 text-muted-foreground">Disponibilité</Label>
                <select
                  name="disponibilite"
                  value={form.disponibilite}
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

              <div className="col-span-2 mt-6 text-center">
                <Button className="w-full mx-auto mb-5" type="submit">Ajouter Voiture</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVoiture;