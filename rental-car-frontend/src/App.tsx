import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Auth/login';
import Footer from './components/global/footer';
import Testimonials from './pages/testimonials';
import Landingpage from './pages/landingpage';
import Header from './components/global/header';
import RentByBrands from './pages/RentByBrands';
import RentByType from './pages/rentByType';
import Contract from './pages/Contrats/ListContrat';
import Reservation from './pages/Reservation/listReservation';
import CarCollection from './pages/impressiveCollection';
import NotFound from './pages/notFound';
import Clients from './pages/Client/clientList';
import Register from './Auth/signup';
import Clientdashboard from './pages/client-dashboard';
import Admindashboard from './pages/admin-dashboard';
import AddClient from './pages/Client/addClient';
import ClientList from './pages/Client/clientList';
import EditClient from './pages/Client/editClient';
import Logout from './Auth/logout';
import AddVoiture from './pages/Voiture/addVoiture';
import ListVoiture from './pages/Voiture/listVoiture';
import AddType from './pages/typeVoiture/addType';
import ListType from './pages/typeVoiture/listType';
import EditType from './pages/typeVoiture/editType';


const App = () => {
  return (
       
      
    <Router >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/footer" element={<Footer/>} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/landingpage" element={<Landingpage/>} />
        <Route path="/header" element={<Header/>} />
        <Route path="/rentbybrands" element={<RentByBrands />} />
        <Route path="/rentbytypes" element={<RentByType />} />
        <Route path="/listContrat" element={<Contract/>} />
        <Route path="/reservation" element={<Reservation/>} />
        <Route path="/impressive" element={<CarCollection/>} />
        <Route path="*" element={<NotFound />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/adminDashboard" element={<Admindashboard />} />
        <Route path="/clientDashboard" element={<Clientdashboard />} />
        <Route path="/addClient" element={<AddClient />} />
        <Route path="/client-list" element={<ClientList />} />
        <Route path="/addClient" element={<AddClient />} />
        <Route path="/editClient/:id" element={<EditClient />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="/contract" element={<Contract />} />
        
        <Route path="/voiture-list" element={<ListVoiture />} />

        <Route path="/addVoiture" element={<AddVoiture />} />
        <Route path="/addType" element={<AddType />} />
        <Route path="/listType" element={<ListType />} />
        <Route path="/editType/:id" element={<EditType />} />

      
      </Routes>
    </Router>
 

  );
};

export default App;