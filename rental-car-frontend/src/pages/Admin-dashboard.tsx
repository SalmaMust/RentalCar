import { Route, Routes } from "react-router-dom";
import Sidebar from "@/components/global/sidebar";
import Home from "./home";
import ClientList from "./Client/clientList";

const Admindashboard = () => {
  return (
    <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
      {/* BG */}
      <div className='fixed inset-0 z-0'>
        <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
        <div className='absolute inset-0 backdrop-blur-sm' />
      </div>

      <Sidebar />
      <div className="flex-1 z-10">

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/clients" element={<ClientList />} />

          <Route path="*" element={<Home />} />
        </Routes>

      </div>
    </div>
  );
}

export default Admindashboard;