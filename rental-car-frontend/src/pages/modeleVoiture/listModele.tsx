import { useState, useEffect } from "react";
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
import AddModele from "./addModele";
import EditModele from "./editModele";

interface Model {
  _id: string;
  name: string;
  description: string;
  image: string;
  brand: {
    _id: string;
    name: string;
  } | null;
}

const ListModele = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://localhost:4000/model/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setModels(response.data.data);
      } catch {
        setError("Erreur lors de la récupération des modèles.");
      }
    };
    fetchModels();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`http://localhost:4000/model/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setModels(models.filter((model) => model._id !== id));
    } catch {
      setError("Erreur lors de la suppression du modèle.");
    }
  };

  return (
    <div>
      <h2 className="text-center text-xl font-semibold mt-6">Liste des Modèles</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="row">
        <AddModele />
      </div>
      <br />
      <div className="row">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-center">Marque</TableHead>
              <TableHead className="text-center">Image</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {models.length > 0 ? (
              models.map((model) => (
                <TableRow key={model._id}>
                  <TableCell className="font-medium">{model.name}</TableCell>
                  <TableCell>{model.description}</TableCell>
                  <TableCell className="text-center">
                    {model.brand ? model.brand.name : "Aucune marque disponible"}
                  </TableCell>
                  <TableCell className="text-center">
                    <img
                      src={`http://localhost:4000/${model.image}`}
                      alt={model.name}
                      width="50"
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <EditModele id={model._id} />
                    <Button
                      variant="destructive"
                      style={{ marginLeft: "10px" }}
                      onClick={() => handleDelete(model._id)}
                    >
                      Supprimer
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Aucun modèle trouvé
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ListModele;
