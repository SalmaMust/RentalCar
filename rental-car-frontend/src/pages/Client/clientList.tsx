import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Client from '@/types/client.type';
import './clientListItems.css';

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [form, setForm] = useState<Partial<Client>>({});
  const [editing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const fetchClients = async () => {
    try {
      // Fetch all clients from the server
      const response = await axios.get<Client[]>('http://localhost:4000/user');
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (editing && form.id !== undefined) {
        // Use backticks for dynamic URL with client id
        await axios.put(`http://localhost:4000/user/${form.id}`, form);
      } else {
        // For adding a new client
        await axios.post('http://localhost:4000/user', form);
      }
      fetchClients(); // Refresh the client list
      setForm({
        Nom: '',
        Email: '',
        Mot_de_passe: '',
        telephone: '',
        adresse: '',
      });
      setEditing(false);
    } catch (error) {
      console.error('Error saving client', error);
    }
  };

  const handleEdit = (client: Client) => {
    setForm(client);
    setEditing(true);
  };

  const handleDelete = async (id: number) => {
    try {
      // Dynamically insert the id into the URL
      await axios.delete(`http://localhost:4000/user/${id}`);
      fetchClients(); // Refresh the client list after deletion
    } catch (error) {
      console.error('Error deleting client', error);
    }
  };

  return (
    <section className="py-6 px-4 ml-14 mr-14">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold ml-9 mt-9">Clients Management</h2>
      </div>
      <br />
      <form className="form-inside" onSubmit={handleSubmit}>
        <Input
          type="text"
          name="nom"
          placeholder="Nom"
          value={form.Nom || ''}
          onChange={handleInputChange}
          required
          style={{ marginBottom: '10px', width: '30%' }}
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={form.Email || ''}
          onChange={handleInputChange}
          required
          style={{ marginBottom: '10px', width: '30%' }}
        />
        <Input
          type="password"
          name="motDePasse"
          placeholder="Mot de Passe"
          value={form.Mot_de_passe || ''}
          onChange={handleInputChange}
          required
          style={{ marginBottom: '10px', width: '30%' }}
        />
        <Input
          type="text"
          name="telephone"
          placeholder="Telephone"
          value={form.telephone || ''}
          onChange={handleInputChange}
          required
          style={{ marginBottom: '10px', width: '30%' }}
        />
        <Input
          type="text"
          name="adresse"
          placeholder="Adresse"
          value={form.adresse || ''}
          onChange={handleInputChange}
          required
          style={{ marginBottom: '10px', width: '30%' }}
        />
        <Button type="submit" style={{ display: 'block', margin: '0 auto' }}>
          {editing ? 'Update' : 'Add'} Client
        </Button>
      </form>

      <section className="py-6 px-4 ml-14 mr-14">
        <div className="flex justify-between items-right">
          <h2 className="text-xl font-semibold ml-9 mt-9">Clients List</h2>
        </div>
        <ul>
          {Array.isArray(clients) &&
            clients.map((client) => (
              <li key={client.id}>
                {client.Nom} - {client.Email} - {client.telephone} - {client.adresse}
                <Button onClick={() => handleEdit(client)}>Edit</Button>
                <Button onClick={() => handleDelete(client.id!)}>Delete</Button>
              </li>
            ))}
        </ul>
      </section>
    </section>
  );
};

export default Clients;