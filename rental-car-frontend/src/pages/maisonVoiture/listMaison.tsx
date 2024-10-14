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
import AddMaison from "./addMaison";
import EditMaison from "./editMaison";

interface Maison {
  _id: string;
  name: string;
  description: string;
  image: string;
}

const ListMaison = () => {
  const [maisons, setMaisons] = useState<Maison[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchMaisons = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://localhost:4000/brand", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMaisons(response.data.data);
      } catch {
        setErrorMessage("Erreur lors de la récupération des Maisons.");
      }
    };

    fetchMaisons();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`http://localhost:4000/brand/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMaisons(maisons.filter((maison) => maison._id !== id));
    } catch {
      setErrorMessage("Erreur lors de la suppression de la maison.");
    }
  };

  return (
    <div>
      <h2 className="text-center text-xl font-semibold mt-6">Liste des Maisons</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <div className="row">
        <AddMaison />
      </div>
      <br />
      <div className="row">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Nom</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-center">Image</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {maisons.length > 0 ? (
              maisons.map((maison) => (
                <TableRow key={maison._id}>
                  <TableCell className="font-medium">{maison.name}</TableCell>
                  <TableCell>{maison.description}</TableCell>
                  <TableCell className="text-center">
                    <img
                      src={`http://localhost:4000/${maison.image}`}
                      alt={maison.name}
                      width="50"
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <EditMaison id={maison._id} />
                    <Button
                      variant="destructive"
                      style={{ marginLeft: "10px" }}
                      onClick={() => handleDelete(maison._id)}
                    >
                      Supprimer
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Aucune maison trouvée
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ListMaison;
