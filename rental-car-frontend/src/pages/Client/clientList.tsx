import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';



const Clients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);  
  const [form, setForm] = useState<Partial<Client>>({});
  const [editing, setEditing] = useState<boolean>(false); 
  
  // Fetch clients when component mounts
  useEffect(() => {
    fetchClients();
  }, []);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  // Fetch all clients (READ operation)
  const fetchClients = async () => {
    try {
      const response = await axios.get<Client[]>('/api/clients'); 
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients', error);
    }
  };

  // Add or update client (CREATE/UPDATE operation)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (editing && form.id !== undefined) {
        // Update client
        await axios.put(`/api/clients/${form.id}`, form); 
      } else {
        // Add new client
        await axios.post('/api/clients', form); 
      }
      fetchClients();
      setForm({
        nom: '',
        email: '',
        motDePasse: '',
        telephone: '',
        adresse: ''
      });
      setEditing(false);
    } catch (error) {
      console.error('Error saving client', error);
    }
  };

  // Edit client
  const handleEdit = (client: Client) => {
    setForm(client);
    setEditing(true);
  };

  // Delete client (DELETE operation)
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/clients/${id}`); 
      fetchClients();
    } catch (error) {
      console.error('Error deleting client', error);
    }
  };

  return (
    <section className="py-6 px-4 ml-14 mr-14">
    <div className="flex justify-between ">
        <h2 className="text-xl font-semibold ml-9 mt-9" >Clients Management</h2>
        </div>
<br></br>
      <Form onSubmit={handleSubmit} >
        <Input
          type="text"
          name="nom"
          placeholder="Nom"
          value={form.nom || ''}
          onChange={handleInputChange}
          required
          style={{ marginBottom: '10px', width : '30%' }}
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email || ''}
          onChange={handleInputChange}
          required
          style={{ marginBottom: '10px' , width : '30%' }}
        />
        <Input
          type="password"
          name="motDePasse"
          placeholder="Mot de Passe"
          value={form.motDePasse || ''}
          onChange={handleInputChange}
          required
          style={{ marginBottom: '10px', width : '30%' }}
        />
        <Input
          type="text"
          name="telephone"
          placeholder="Telephone"
          value={form.telephone || ''}
          onChange={handleInputChange}
          required
          style={{ marginBottom: '10px', width : '30%' }}
        />
        <Input
          type="text"
          name="adresse"
          placeholder="Adresse"
          value={form.adresse || ''}
          onChange={handleInputChange}
          required
          style={{ marginBottom: '10px' , width : '30%'}}
        />
        <Button type="submit" style={{ display: 'block', margin: '0 auto' }}>
          {editing ? 'Update' : 'Add'} Client
        </Button>
      </Form>
      

      <section className="py-6 px-4 ml-14 mr-14">
    <div className="flex justify-between items-right ">
        <h2 className="text-xl font-semibold ml-9 mt-9" >Clients List</h2>
        </div>
      <ul>
        {Array.isArray(clients) && clients.map((client) => (
          <li key={client.id}>
            {client.nom} - {client.email} - {client.telephone} - {client.adresse}
            <Button onClick={() => handleEdit(client)}>Edit</Button>
            <Button onClick={() => handleDelete(client.id)}>Delete</Button>
            </li>
          ))}
          </ul>
         </section>
          </section>
          );
        };

export default Clients;