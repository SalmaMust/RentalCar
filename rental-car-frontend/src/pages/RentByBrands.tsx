// src/components/RentByBrands.tsx
import nissan from '../assets/images/brandsCars/nissan.png'; // Adjust paths as needed
import audi from '../assets/images/brandsCars/audi.png';
import bmw from '../assets/images/brandsCars/bmw.png';
import kia from '../assets/images/brandsCars/Kia-logo-2560x1440.png';
import ford from '../assets/images/brandsCars/ford.png';
import citroen from '../assets/images/brandsCars/Citroen.png';

export default function RentByBrands() {
  const brands = [
    { name: 'nissan', image: nissan },
    { name: 'audi', image: audi },
    { name: 'bmw', image: bmw },
    { name: 'kia', image: kia },
    { name: 'ford', image: ford },
    { name: 'citroen', image: citroen },
  ];

  return (
    <section className="py-6 px-4 ml-14 mr-14">
      <br></br>
      <div className="flex justify-between items-center mb-6 ">
        <h2 className="text-xl font-semibold">Rent by Brands</h2>
        <button className="flex items-center text-black-500 font-medium">
          See All
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6  gap-6 justify-center ">
        {brands.map((brand, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-lg text-center">
            <img 
              src={brand.image} 
              alt={brand.name} 
              className="w-full h-24 object-contain mb-2"
            />
            <h3 className="text-lg font-medium">{brand.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}