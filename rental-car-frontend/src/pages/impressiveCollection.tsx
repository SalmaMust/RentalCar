import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import audi from '../assets/images/Cars/audi.jpg'; 
import mercedes from '../assets/images/Cars/mercedes.jpg'; 
import peugeot from '../assets/images/Cars/peugeot.jpg'; 
import { useState } from "react";

const ButtonGroup = () => {
  // State to track the selected button
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  // Function to handle button click
  const handleButtonClick = (buttonId: string) => {
    setSelectedButton(buttonId);
  };

  return (
    <div className="text-center mb-8">
      <div className="inline-flex gap-2 flex-wrap  justify-center">
        <Button
          variant="outline"
          className={`py-2 px-4 rounded-full ${
            selectedButton === 'popular' ? 'bg-black-500 text-white' : 'bg-gray-200 text-gray-800'
          }`}
          onClick={() => handleButtonClick('popular')}
        >
          Popular Car
        </Button>
        <Button
          variant="outline"
          className={`py-2 rounded-full px-4 ${
            selectedButton === 'family' ? 'bg-black-500 text-white' : 'bg-gray-200 text-gray-800'
          }`}
          onClick={() => handleButtonClick('family')}
        >
          Family Car
        </Button>
        <Button
          variant="outline"
          className={`py-2 rounded-full px-4 ${
            selectedButton === 'vintage' ? 'bg-black-500 text-white' : 'bg-gray-200 text-gray-800'
          }`}
          onClick={() => handleButtonClick('vintage')}
        >
          Vintage Car
        </Button>
        <Button
          variant="outline"
          className={`py-2  rounded-full px-4 ${
            selectedButton === 'luxury' ? 'bg-black-500 text-white' : 'bg-gray-200 text-gray-800'
          }`}
          onClick={() => handleButtonClick('luxury')}
        >
          Luxury Car
        </Button>
      </div>
    </div>
  );
};

export default function CarCollection() {
  return (
    <section className="bg-black py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl text-white font-bold mb-2">Our Impressive Collection of Cars</h2>
          <p className="text-muted-foreground">Explore our diverse range of cars tailored for all your needs.</p>
        </div>

        {/* Include the ButtonGroup */}
        <ButtonGroup />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Example car 1 */}
          <div className="bg-white p-4 rounded-lg">
            <img src={audi} alt="Car 1" className="w-full h-48 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold text-white">Car 1</h3>
          </div>
          
          {/* Example car 2 */}
          <div className="bg-white p-4 rounded-lg">
            <img src={mercedes} alt="Car 2" className="w-full h-48 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold text-white">Car 2</h3>
          </div>
          
          {/* Example car 3 */}
          <div className="bg-white p-4 rounded-lg">
            <img src={peugeot} alt="Car 3" className="w-full h-48 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold text-white">Car 3</h3>
          </div>
        </div>
        <br />
        <div className="text-center">
          <button className="bg-white text-black py-2 px-8 rounded-full hover:bg-gray-400 w-full sm:w-auto">
            <Link to="/all-cars" className="flex items-center justify-center gap-2 text-black">
              <span>See All Cars</span>
              <ArrowRight size={16} />
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
}