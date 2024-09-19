import { useEffect, useState } from 'react';
import axios from 'axios';
import IVoiture from '@/types/voiture.type';

const Voiture = () => {
  const [voitures, setVoitures] = useState<IVoiture[]>([]);  // Use IVoiture[] instead of any[]
  const [formData, setFormData] = useState<IVoiture>({
    matricule: '',
    name: '',
    model: '',
    type: '',
    disponibilite: 'dispo',
    pricePerDay: 0,
    visibility: true,
    deposit: 0,
    tax_fees: 0.19,
    min_days: 1,
  });

  useEffect(() => {
    fetchVoitures();
  }, []);

  const fetchVoitures = async () => {
    try {
      const response = await axios.get('/api/voitures');
      setVoitures(response.data.data);
    } catch (error) {
      console.error("Error fetching voitures:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/voitures', formData);
      setVoitures([...voitures, response.data.data]);
      setFormData({
        matricule: '',
        name: '',
        model: '',
        type: '',
        disponibilite: 'dispo',
        pricePerDay: 0,
        visibility: true,
        deposit: 0,
        tax_fees: 0.19,
        min_days: 1,
      });
    } catch (error) {
      console.error("Error creating voiture:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/voitures/${id}`);
      setVoitures(voitures.filter(voiture => voiture._id !== id));
    } catch (error) {
      console.error("Error deleting voiture:", error);
    }
  };

  return (
    <div>
      <h1>Gestion des Voitures</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="matricule" value={formData.matricule} onChange={handleInputChange} placeholder="Matricule" required />
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Nom" required />
        <input type="text" name="model" value={formData.model} onChange={handleInputChange} placeholder="Modèle" required />
        <input type="text" name="type" value={formData.type} onChange={handleInputChange} placeholder="Type" required />
        <select name="disponibilite" value={formData.disponibilite} onChange={handleInputChange}>
          <option value="dispo">Disponible</option>
          <option value="maintenance">Maintenance</option>
          <option value="louée">Louée</option>
        </select>
        <input type="number" name="pricePerDay" value={formData.pricePerDay} onChange={handleInputChange} placeholder="Prix par jour" required />
        <input type="number" name="deposit" value={formData.deposit} onChange={handleInputChange} placeholder="Dépôt" required />
        <input type="number" name="min_days" value={formData.min_days} onChange={handleInputChange} placeholder="Jours minimum" required />
        <button type="submit">Ajouter Voiture</button>
      </form>

      <h2>Liste des Voitures</h2>
      <ul>
        {voitures.map(voiture => (
          <li key={voiture._id}>
            {voiture.name} - {voiture.matricule}
            <button onClick={() => handleDelete(voiture._id!)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Voiture;