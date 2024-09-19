import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Auth/login';
import Signup from './Auth/signup';
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


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
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
      </Routes>
    </Router>
  );
};

export default App;