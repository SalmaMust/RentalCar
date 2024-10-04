import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Custom Button Component (optional)

interface Type {
  _id: string;
  name: string;
  description: string;
  image: string;
}

const ListType = () => {
  const [types, setTypes] = useState<Type[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
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
      setTypes(types.filter(type => type._id !== id)); // Remove the deleted type from the list
    } catch {
      setErrorMessage("Erreur lors de la suppression du type");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Liste des Types</h1>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <table className="w-full text-left table-auto">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {types.map(type => (
            <tr key={type._id}>
              <td>{type.name}</td>
              <td>{type.description}</td>
              <td>
                {type.image && <img src={`http://localhost:4000/${type.image}`} alt={type.name} className="w-20 h-20 object-cover" />}
              </td>
              <td>
                <Button onClick={() => navigate(`/editType/${type._id}`)}>Modifier</Button>
                <Button onClick={() => handleDelete(type._id)} className="ml-2 bg-red-500 text-white">Supprimer</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListType;