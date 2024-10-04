import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { useParams, useNavigate } from "react-router-dom";

const EditClient = () => {
  const { id } = useParams<{ id: string }>();  
  const navigate = useNavigate();
  
  const [Nom, setNom] = useState('');
  const [Email, setEmail] = useState('');
  const [Mot_de_passe, setMotdepasse] = useState('');
  const [Telephone, setTelephone] = useState('');
  const [Adresse, setAdresse] = useState('');
  const [Role, setRole] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const getuserById = async (id: string) => {
    try {
      const res = await axios.get(`http://localhost:4000/user/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      const client = res.data.data; 
      console.log("Fetched client data:", client);

      setNom(client.Nom);
      setEmail(client.Email);
      setMotdepasse(client.Mot_de_passe);
      setTelephone(client.telephone); 
      setAdresse(client.adresse); 
      setRole(client.role); 
      
    } catch (error) {
      console.error("Error fetching client:", error);
      setErrorMessage("Erreur lors de la récupération des informations du client.");
    }
  };

  useEffect(() => {
    if (id) {
      getuserById(id);
    }
  }, [id]);

  // Handle client update
  const updateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    const client = { Nom, Email, Mot_de_passe, telephone: Telephone, adresse: Adresse, role: Role };
    
    try {
      await axios.put(`http://localhost:4000/user/${id}`, client, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      navigate("/client-list");
    } catch (error) {
      setErrorMessage("Erreur lors de la mise à jour du client.");
      console.error("Error updating client:", error);
    }
  };

  return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-background p-8 rounded-lg shadow-lg w-full max-w-md">
          <h3 className="text-xl font-semibold">Modifier client</h3>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <form onSubmit={updateClient}>
            <Label htmlFor="nom" className="block mb-3 mt-3 text-muted-foreground">Nom</Label>
            <Input
              type="text"
              name="Nom"
              value={Nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
            <Label htmlFor="email" className="block mb-3 mt-3 text-muted-foreground">Email</Label>
            <Input
              type="email"
              name="Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Label htmlFor="motdepasse" className="block mb-3 mt-3 text-muted-foreground">Mot de passe</Label>
            <Input
              type="password"
              name="Mot_de_passe"
              value={Mot_de_passe}
              onChange={(e) => setMotdepasse(e.target.value)}
              required
            />
            <Label htmlFor="telephone" className="block mb-3 mt-3 text-muted-foreground">Téléphone</Label>
            <Input
              type="text"
              name="Telephone"
              value={Telephone}
              onChange={(e) => setTelephone(e.target.value)}
              required
            />
            <Label htmlFor="adresse" className="block mb-3 mt-3 text-muted-foreground">Adresse</Label>
            <Input
              type="text"
              name="Adresse"
              value={Adresse}
              onChange={(e) => setAdresse(e.target.value)}
              required
            />
            <Label htmlFor="role" className="block mb-3 mt-3 text-muted-foreground">Role</Label>
            <select
              name="Role"
              value={Role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="block w-full mt-1 p-2 border rounded"
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option> 
              <option value="Client">Client</option> 
            </select>
            <div className="mt-6 text-center">
              <Button className="w-[3cm] mx-auto mb-5" type="submit">Modifier</Button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default EditClient;