import { createBrowserRouter } from "react-router-dom";
import Login from "@/Auth/login";

import Landingpage from '@/pages/landingpage';

import Contract from '@/pages/Contrats/ListContrat';
import NotFound from '@/pages/notFound';
import Register from '@/Auth/signup';
import Admindashboard from '@/pages/admin-dashboard';
import AddClient from '@/pages/Client/addClient';
import ClientList from '@/pages/Client/clientList';
import Logout from '@/Auth/logout';
import AddVoiture from '@/pages/Voiture/addVoiture';
import ListVoiture from '@/pages/Voiture/listVoiture';
import ListType from '@/pages/typeVoiture/listType';
import Sidebar from "@/components/global/sidebar";
import ListReservation from "@/pages/Reservation/listReservation";
import AjouterReservation from "@/pages/Reservation/AjouterReservation";
import AjouterContrat from "@/pages/Contrats/AjouterContrat";
import AddTypeDialog from "@/pages/typeVoiture/addType";
import EditTypeDialog from "@/pages/typeVoiture/editType";
import Navbar from "@/components/global/navbar";
import AddMaison from "@/pages/maisonVoiture/addMaison";
import EditMaison from "@/pages/maisonVoiture/editMaison";
import EditModele from "@/pages/modeleVoiture/editModele";
import AddModele from "@/pages/modeleVoiture/addModele";
import ListModele from "@/pages/modeleVoiture/listModele";
import ListMaison from "@/pages/maisonVoiture/listMaison";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landingpage />, 
    errorElement: <NotFound />, 
    children: [
      
      
      
    ],
  },
  {
    path: "/register",
    element: <Register />
    
  },
  {
    path: "/login",
    element: <Login />
    
  },
  {
    path: "logout",
    element: <Logout />
  },
  
  {
    path: "/admin",
    element: <Sidebar />,
    children: [
      {
        index:true,
        path: "home",
        element: <Admindashboard />,
      },
      {
        path: "clients",
        element: <ClientList />,
        children: [
          {
            path: "add", 
            element: <AddClient />,
          }
        ]
      },
      {
        path: "types", 
        element: <ListType />,
      },
      {
        path: "types/addType",
        element: <AddTypeDialog />
      },
      {
        path: "types/editType/:id", 
        element: <EditTypeDialog />
      },
      {
        path: "modele", 
        element: <ListModele />,
      },
      {
        path: "modele/addModele",
        element: <AddModele />
      },
      {
        path: "modele/editModele/:id", 
        element: <EditModele />
      },
      {
        path: "maison", 
        element: <ListMaison />,
      },
      {
        path: "maison/addMaison",
        element: <AddMaison />
      },
      {
        path: "maison/editMaison/:id", 
        element: <EditMaison />
      },
      {
        path: "voitures",
        element: <ListVoiture />,
        children: [
          {
            path: "voitures/addVoiture",
            element: <AddVoiture />
          }
        ]
      },
      {
        path: "contrats",
        element: <Contract />,
        children: [
          {
            path: "ajouterContrat",
            element: <AjouterContrat />
          }
        ]
      },
      {
        path: "reservations",
        element: <ListReservation />,
        children: [
          {
            path: "ajouterReservation",
            element: <AjouterReservation />
          }
        ]
      },
    ],
  },
  {
    path: "/client",
    element: <Navbar />,
    children: [
      {
        path: "home",
        element: <Landingpage />,
      }
    ],
  }
]);



export default router;
