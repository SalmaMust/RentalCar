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
import { Sidebar } from 'lucide-react';
import NotFound from './pages/notFound';
import Clients from './pages/Client/clientList';
import Voiture from './pages/Voiture/voiture';
import Register from './Auth/signup';
import Admindashboard from './pages/Admin-dashboard';
import Clientdashboard from './pages/client-dashboard';


const App = () => {
  return (
    <Router>
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
        <Route path='/sidebar' element={<Sidebar/>}/>
        <Route path="*" element={<NotFound />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/voitures" element={<Voiture />} />
        <Route path="/adminDashboard" element={<Admindashboard />} />
        <Route path="/clientDashboard" element={<Clientdashboard />} />


      </Routes>
    </Router>
  );
};

export default App;