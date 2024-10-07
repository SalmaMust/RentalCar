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
import EditClient from "./editClient";
import AddClient from "./addClient";

interface Client {
  _id: string;
  Nom: string;
  Email: string;
  telephone: number;
  adresse: string;
  role: string;
}

const ClientList = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://localhost:4000/user/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClients(response.data.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrorMessage(
            error.response?.data?.errormessage || "Erreur lors de la récupération des clients"
          );
        } else {
          setErrorMessage("Une erreur inconnue s'est produite");
        }
      }
    };

    fetchClients();
  }, []);

  const deleteClient = async (id: string) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`http://localhost:4000/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClients(clients.filter((client) => client._id !== id));
    } catch {
      setErrorMessage("Erreur lors de la suppression du client");
    }
  };

  

  

  return (
    <div>
      <h2 className="text-center text-xl font-semibold mt-6">Liste des Clients</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <div className="row">
        <AddClient />
      </div>
      <br />
      <div className="row">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead className="text-right">Adresse</TableHead>
              <TableHead className="text-right">Rôle</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.length > 0 ? (
              clients.map((user) => (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">{user.Nom}</TableCell>
                  <TableCell>{user.Email}</TableCell>
                  <TableCell>{user.telephone}</TableCell>
                  <TableCell className="text-right">{user.adresse}</TableCell>
                  <TableCell className="text-right">{user.role}</TableCell>
                  <TableCell className="text-center">
                    <EditClient id={user._id} />
                    <Button
                      variant="destructive"
                      style={{ marginLeft: "10px" }}
                      onClick={() => deleteClient(user._id)}
                    >
                      Supprimer
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Aucun client trouvé
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ClientList;