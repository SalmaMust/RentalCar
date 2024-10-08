import  { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import AddVoiture from "./addVoiture";
import EditVoiture from "./editVoiture";

interface Voiture {
  _id: string;
  matricule: string;
  name: string;
  model: {
    _id: string;
    name: string;
  };
  type: {
    _id: string;
    name: string;
  };
  disponibilité: string;
  pricePerDay: number;
  deposit: number;
  min_days: number;
}

const ListVoiture = () => {
  const [voitures, setVoitures] = useState<Voiture[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchVoitures = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const response = await axios.get("http://localhost:4000/car", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setVoitures(response.data.data || []);
      } catch  {
        setErrorMessage("Erreur lors de la récupération des voitures.");
      }
    };

    fetchVoitures();
  }, []);

  return (
    <div>
      <h2>Liste des Voitures</h2>
      <AddVoiture/>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <table>
        <thead>
          <tr>
            <th>Matricule</th>
            <th>Nom</th>
            <th>Modèle</th>
            <th>Type</th>
            <th>Disponibilité</th>
            <th>Prix/Jour</th>
            <th>Dépôt</th>
            <th>Jours Min.</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {voitures.map((voiture) => (
            <tr key={voiture._id}>
              <td>{voiture.matricule}</td>
              <td>{voiture.name}</td>
              <td>{voiture.model?.name}</td>
              <td>{voiture.type?.name}</td>
              <td>{voiture.disponibilité}</td>
              <td>{voiture.pricePerDay} €</td>
              <td>{voiture.deposit} €</td>
              <td>{voiture.min_days} jours</td>
              <td>
                <EditVoiture />
                <Button variant="destructive">Supprimer</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListVoiture;