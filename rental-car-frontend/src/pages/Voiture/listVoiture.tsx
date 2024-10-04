import { useEffect, useState } from 'react';
import axios from 'axios';

interface Voiture {
  _id?: string; 
  matricule: string;
  name: string;
  model: string;
  type: string;
  disponibilite: string;
  pricePerDay: number;
  visibility: boolean;
  deposit: number;
  tax_fees: number;
  min_days: number;
}

const ListVoiture = () => {
  const [voitures, setVoitures] = useState<Voiture[]>([]);  
  
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchVoitures = async () => {
      try {
        const response = await axios.get('http://localhost:4000/car/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,  
          },
        });
        if (response.data && response.data.data) {
          setVoitures(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching voitures:", error);
        setErrorMessage("Erreur lors de la récupération des voitures.");
      }
    };

    fetchVoitures();
  }, []);


  const handleDelete = async (id?: string) => {
    if (!id) return; 
    try {
      await axios.delete(`http://localhost:4000/car/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,  
        },
      });
      setVoitures(voitures.filter(voiture => voiture._id !== id));
    } catch (error) {
      console.error("Error deleting voiture:", error);
      setErrorMessage("Erreur lors de la suppression de la voiture.");
    }
  };

  return (
    <div>
      <h2 className="text-center text-xl font-semibold mt-6"> Liste des voitures </h2>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      

      <h2>Liste des Voitures</h2>
      <ul>
        {voitures.length > 0 ? (
          voitures.map((voiture) => (
            <li key={voiture._id}>
              {voiture.name} - {voiture.matricule}
              <button onClick={() => handleDelete(voiture._id)}>Supprimer</button>
            </li>
          ))
        ) : (
          <p>Aucune voiture disponible.</p>
        )}
      </ul>
    </div>
  );
};

export default ListVoiture;