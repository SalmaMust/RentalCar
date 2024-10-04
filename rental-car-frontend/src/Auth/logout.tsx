import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");

    
    navigate("/login");
  };

  return (
      <Button  onClick={handleLogout}>
        Logout
      </Button>
  );
};

export default Logout;