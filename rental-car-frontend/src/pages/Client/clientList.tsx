import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
  const navigate = useNavigate();

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
          setErrorMessage(error.response?.data?.errormessage || "Erreur lors de l'ajout du client");
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

  const editClient = (id: string) => {
    navigate(`/editClient/${id}`);
  };

  const addClient = () => {
    navigate("/addClient");
  };

  return (
    
    <div>
      <h2 className="text-center text-xl font-semibold mt-6">Clients List</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <div className="row">
        <Button className="btn btn-primary " onClick={addClient}>
          Add Client
        </Button>
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
      <TableHead className="text-right">Role</TableHead>
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
      <TableCell className="text-right" ><Button onClick={() => editClient(user._id)} className="btn btn-primary">
                      Update
                    </Button>
                    <Button
                      style={{ marginLeft: "10px" }}
                      onClick={() => deleteClient(user._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </Button>
                    
                    </TableCell>

    </TableRow>
     ))
    ) : (
      <TableRow>
              <TableCell  colSpan={5} className="text-center">Aucun client trouvé</TableCell>
              </TableRow>
)}
  </TableBody>
</Table>            
                 
             
              
        
      </div>
    </div>
    
  );
};

export default ClientList;