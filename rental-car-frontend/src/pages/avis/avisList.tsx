import React, { useEffect, useState } from 'react';



import axios, { AxiosError } from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import './styles.css'; // Assurez-vous d'importer votre fichier CSS


interface Avis {
    _id: string;
    commentaire: string;
    reservation: {
        _id: string;
        dateDebut: string;
        voiture: {
            _id: string;
            name: string;
        };
        client: {
            _id: string;
            Email: string;
        };
    };
}

const AvisList: React.FC = () => {
    const [avis, setAvis] = useState<Avis[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchAvis = async () => {
            setLoading(true);
            try {
                const response = await axios.get<{ successmessage: string, data: Avis[] }>('http://localhost:4000/avis/');
                console.log('Data fetched:', response.data);
                setAvis(response.data.data);
                setLoading(false);
            } catch (err: unknown) {
                const axiosError = err as AxiosError;
                setError(`Erreur lors du chargement des avis: ${axiosError.message}`);
                setLoading(false);
            }
        };
        fetchAvis();
    }, []);

    const deleteAvis = async (id: string) => {
        try {
            await axios.delete(`http://localhost:4000/avis/${id}`);
            setAvis(avis.filter(a => a._id !== id));
            setMessage("Avis supprimé avec succès !");
        } catch (err: unknown) {
            const axiosError = err as AxiosError;
            setError(`Erreur lors de la suppression de l'avis : ${axiosError.message}`);
        }
    };

    return (
        <div className="table-container">
            <h2 className="table-title">Liste des Avis des Clients</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {loading ? <p>Chargement des avis...</p> : null}

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="table-header-center">Commentaire</TableHead>
                        <TableHead className="table-header-center">Date de Réservation</TableHead>
                        <TableHead className="table-header-center">Voiture</TableHead>
                        <TableHead className="table-header-center">Client</TableHead>
                        <TableHead className="table-header-center text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {avis.length === 0 && !loading && (
                        <TableRow>
                            <TableCell colSpan={5}>Aucun avis trouvé.</TableCell>
                        </TableRow>
                    )}
                    {avis.map((a) => (
                        <TableRow key={a._id}>
                            <TableCell>{a.commentaire}</TableCell>
                            <TableCell>{a.reservation?.dateDebut || 'N/A'}</TableCell>
                            <TableCell>{a.reservation?.voiture?.name || 'N/A'}</TableCell>
                            <TableCell>{a.reservation?.client?.Email || 'Inconnu'}</TableCell>
                            <TableCell className="text-right">
                                <button
                                    onClick={() => deleteAvis(a._id)}
                                    style={{
                                        backgroundColor: 'red',
                                        color: 'white',
                                        border: 'none',
                                        padding: '8px 12px',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Supprimer
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AvisList;
