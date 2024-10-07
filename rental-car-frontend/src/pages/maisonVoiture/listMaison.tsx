import  { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import AddMaison from "./addMaison";
import EditMaison from "./editMaison";

interface Brand {
    _id: string;
    name: string;
    description: string;
    image: string;
  }

export const ListMaison = () => {
  const [brands, setBrands] =  useState<Brand[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://localhost:4000/brand", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBrands(response.data.data);
      } catch  {
        setErrorMessage("Erreur lors de la récupération des Brands.");
      }
    };
    fetchBrands();
  }, []);

  const handleDelete = async (id : string) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`http://localhost:4000/brand/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBrands(brands.filter((brand) => brand._id !== id));
    } catch {
      setErrorMessage("Erreur lors de la suppression de la maison.");
    }
  };

  return (
    <div>
      <h2>Liste des Maisons</h2>
      <AddMaison  />
      {errorMessage && <p>{errorMessage}</p>}
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand) => (
            <tr key={brand._id}>
              <td>{brand.name}</td>
              <td>{brand.description}</td>
              <td>
                <img src={`http://localhost:4000/${brand.image}`} alt={brand.name} width="50" />
              </td>
              <td>
                <Button onClick={() => handleDelete(brand._id)}>Supprimer</Button>
                <EditMaison id={brand._id} />

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListMaison;