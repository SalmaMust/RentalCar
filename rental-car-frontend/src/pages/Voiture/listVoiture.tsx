import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
      <h2 className="text-center text-xl font-semibold mt-6">Liste des Voitures</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="row">
        <AddVoiture />
      </div>
      <br />
      <div className="row">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Matricule</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Modèle</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Disponibilité</TableHead>
              <TableHead>Prix par jour</TableHead>
              <TableHead>Dépôt</TableHead>
              <TableHead>Jours minimum</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {voitures.length > 0 ? (
              voitures.map((voiture) => (
                <TableRow key={voiture._id}>
                  <TableCell className="font-medium">{voiture.matricule}</TableCell>
                  <TableCell>{voiture.name}</TableCell>
                  <TableCell>{voiture.model ? voiture.model.name : "Aucun modèle disponible"}</TableCell>
                  <TableCell>{voiture.type ? voiture.type.name : "Aucun type disponible"}</TableCell>
                  <TableCell>{voiture.disponibilité}</TableCell>
                  <TableCell>{voiture.pricePerDay} €</TableCell>
                  <TableCell>{voiture.deposit} €</TableCell>
                  <TableCell>{voiture.min_days}</TableCell>
                  <TableCell className="text-center">
                    <EditVoiture id={voiture._id} />
                    <Button
                      variant="destructive"
                      style={{ marginLeft: "10px" }}
                      onClick={() => handleDelete(voiture._id)}
                    >
                      Supprimer
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center">
                  Aucune voiture disponible
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ListVoiture;
