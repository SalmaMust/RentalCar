import  { useState } from 'react';
import carFace from '../../assets/images/carFace.png'; 
import { Link } from 'react-router-dom';
import { MdCancel } from "react-icons/md";
import { TiThMenu } from "react-icons/ti";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from '@/components/ui/button';
export default function Header() {
  

  const [open, setOpen] = useState(false);


  return (
    <header className="relative bg-black text-white">
      {/* Large Photo with Overlay */}
      <div className="relative w-full h-85">
        <img
          src={carFace}
          alt="Car Rental"
          className="w-full h-full object-cover"
        />

     
          {/* Menu Bar (left side) */}
          
      <Drawer open={open} onOpenChange={setOpen} direction='left'>
        <DrawerTrigger asChild>
          <Button onClick={() => setOpen(true)}
            className="text-white  absolute flex justify-between  top-4 left-5">
              <TiThMenu className="w-6 h-6" />
            </Button>

        </DrawerTrigger>
        <DrawerContent className="h-[103dvh] w-[400px] flex flex-col justify-center items-center bg-black text-white">
  <DrawerHeader className="w-full flex justify-end p-4">
    <DrawerClose>
      <Button variant="ghost" onClick={() => setOpen(false)}>
        <MdCancel className="w-9 h-9" />
      </Button>
    </DrawerClose>
  </DrawerHeader>
  <div className="p-8 text-center">
    <ul className="space-y-4 text-lg font-bold">
      <li><a href="#home" className="hover:text-gray-400">Home</a></li>
      <li><a href="#about" className="hover:text-gray-400">About</a></li>
      <li><a href="#services" className="hover:text-gray-400">Services</a></li>
  <li>
    <Link to="/landingpage/footer" className="hover:text-gray-400">
      Contact
    </Link>
  </li>
</ul>
  </div>
</DrawerContent>
      </Drawer>
            

         
           {/* Login/Signup Button (right side) */}
      <Link to="/signup">
        <button className="border border-white absolute flex justify-between top-4 right-6 text-white font-semibold py-2 px-4 rounded-full">
          Login / Signup
        </button>
      </Link>
    </div>

        {/* Text Overlay */}
        <div className="absolute bottom-80 left-1/2 top-11 transform -translate-x-1/2 text-center">
          <h1 className="text-4xl font-bold mb-5 text-white">
            Discover the world on wheels with our car rental service
          </h1>
        </div>

       
  

    </header>
  );
}