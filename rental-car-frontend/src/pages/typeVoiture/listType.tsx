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
import AddTypeDialog from "./addType";
import EditTypeDialog from "./editType";

interface Type {
  _id: string;
  name: string;
  description: string;
  image: string;
}

const ListType = () => {
  const [types, setTypes] = useState<Type[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchTypes = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:4000/type/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTypes(response.data.data);
    } catch {
      setErrorMessage("Erreur lors de la récupération des types");
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("authToken");
    try {
      await axios.delete(`http://localhost:4000/type/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTypes(types.filter((type) => type._id !== id));
    } catch {
      setErrorMessage("Erreur lors de la suppression du type");
    }
  };

  return (
    <div>
      <h2 className="text-center text-xl font-semibold mt-6">Liste des Types</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <div className="row">
        <AddTypeDialog />
      </div>
      <br />
      <div className="row">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-center">Image</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {types.length > 0 ? (
              types.map((type) => (
                <TableRow key={type._id}>
                  <TableCell className="font-medium">{type.name}</TableCell>
                  <TableCell>{type.description}</TableCell>
                  <TableCell className="text-center">
                    {type.image && (
                      <img
                        src={`http://localhost:4000/${type.image}`}
                        alt={type.name}
                        className="w-20 h-20 object-cover"
                      />
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <EditTypeDialog id={type._id} />
                    <Button
                      variant="destructive"
                      className="ml-2"
                      onClick={() => handleDelete(type._id)}
                    >
                      Supprimer
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Aucun type trouvé
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ListType;
