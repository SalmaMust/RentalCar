import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
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
  }| null;  
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
      <h2>Liste des Modèles</h2>
      <AddModele />
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Marque</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {models.map((model) => (
            <tr key={model._id}>
              <td>{model.name}</td>
              <td>{model.description}</td>

              {model.brand ? model.brand.name : "Aucun type disponible"}


              <td>
                <img
                  src={`http://localhost:4000/${model.image}`}
                  alt={model.name}
                  width="50"
                />
              </td>
              <td>
                <Button onClick={() => handleDelete(model._id)}>
                  Supprimer
                </Button>
                <EditModele id={model._id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListModele;
