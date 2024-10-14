import { useEffect, useState } from "react";
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
  } | null;
  type: {
    _id: string;
    name: string;
  } | null;
  disponibilité: string;
  pricePerDay: number;
  deposit: number;
  min_days: number;
}

const ListVoiture = () => {
  const [voitures, setVoitures] = useState<Voiture[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVoitures = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://localhost:4000/car/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVoitures(response.data.data);
      } catch {
        setError("Erreur lors de la récupération des voitures.");
      }
    };
    fetchVoitures();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`http://localhost:4000/car/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVoitures(voitures.filter((voiture) => voiture._id !== id));
    } catch {
      setError("Erreur lors de la suppression de la voiture.");
    }
  };

  return (
    <div>
      <h2>Liste des Voitures</h2>
      <AddVoiture />
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Matricule</th>
            <th>Nom</th>
            <th>Modèle</th>
            <th>Type</th>
            <th>Disponibilité</th>
            <th>Prix par jour</th>
            <th>Dépôt</th>
            <th>Jours minimum</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {voitures.map((voiture) => (
            <tr key={voiture._id}>
              <td>{voiture.matricule}</td>
              <td>{voiture.name}</td>
              <td>
                {voiture.model ? voiture.model.name : "Aucun modèle disponible"}
              </td>
              <td>
                {voiture.type ? voiture.type.name : "Aucun type disponible"}
              </td>
              <td>{voiture.disponibilité}</td>
              <td>{voiture.pricePerDay} €</td>
              <td>{voiture.deposit} €</td>
              <td>{voiture.min_days}</td>
              <td>
                <Button onClick={() => handleDelete(voiture._id)}>
                  Supprimer
                </Button>
                <EditVoiture id={voiture._id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListVoiture;
