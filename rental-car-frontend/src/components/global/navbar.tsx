import Logout from "@/Auth/logout"
import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full bg-background shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div  className="flex items-center gap-2" >
        </div>
        <nav className="hidden space-x-4 md:flex">
          <Link to="/client/home" className="text-sm font-medium hover:underline underline-offset-4" >
            Home
          </Link>
          <Link to="/client/about" className="text-sm font-medium hover:underline underline-offset-4" >
            About
          </Link>
          <Link to="/client/services" className="text-sm font-medium hover:underline underline-offset-4" >
            Services
          </Link>
          <Link to="/client/contacts" className="text-sm font-medium hover:underline underline-offset-4" >
            Contact
          </Link>
        </nav>
        <Logout />      </div>
    </header>
  )
}


