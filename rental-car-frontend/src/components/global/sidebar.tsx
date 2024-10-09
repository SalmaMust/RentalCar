import { BarChart2, DollarSign, Menu, ShoppingBag, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, Outlet, useLocation } from "react-router-dom";
import Logout from "@/Auth/logout";

const SIDEBAR_ITEMS = [
  {
    name: "Home",
    icon: BarChart2,
    color: "#6366f1",
    href: "/admin/home",
  },
  { name: "client", icon: ShoppingBag, color: "#8B5CF6", href: "/admin/clients" },
  { name: "Car", icon: Users, color: "#EC4899", href: "/admin/voitures" },
  { name: "Type", icon: DollarSign, color: "#10B981", href: "/admin/types" },
  { name: "Modele", icon: DollarSign, color: "#10B981", href: "/admin/modele" },
  { name: "Maison", icon: DollarSign, color: "#10B981", href: "/admin/maison" },
  { name: "Contrat", icon: Users, color: "#EC4899", href: "/admin/Contrats" },

  {
    name: "Reservation",
    icon: DollarSign,
    color: "#10B981",
    href: "/admin/reservations",
  }, {
    name: "avis",
    icon: DollarSign,
    color: "#10B981",
    href: "/admin/avis",
  },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation(); 
  const [activeItem, setActiveItem] = useState(location.pathname); 

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location]);

  return (
    <div className="flex h-screen gap-8">
      <motion.div
        className={`relative z-10 transition-all duration-100 ease-in-out flex-shrink-0 ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
        animate={{ width: isSidebarOpen ? 256 : 80 }}
      >
        <div className="h-full bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors max-w-fit"
          >
            <Menu size={24} />
          </motion.button>

          <nav className="mt-8 flex-grow">
            {SIDEBAR_ITEMS.map((item) => (
              <Link key={item.href} to={item.href} onClick={() => setActiveItem(item.href)}>
                <motion.div
                  className={`flex items-center p-4 text-sm font-medium rounded-lg transition-colors mb-2 ${
                    activeItem === item.href ? "bg-gray-100 text-gray" : "hover:bg-gray-100"
                  }`}
                >
                  <item.icon
                    size={20}
                    style={{ color: item.color, minWidth: "20px" }}
                  />
                  <AnimatePresence>
                    {isSidebarOpen && (
                      <motion.span
                        className="ml-4 whitespace-nowrap"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2, delay: 0.3 }}
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            ))}
          </nav>
          <Logout />
        </div>
      </motion.div>
      <div className="p-8 flex justify-center items-start w-full h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;