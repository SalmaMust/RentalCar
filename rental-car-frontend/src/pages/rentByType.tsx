

// src/components/RentByBrands.tsx
import sedan from '../assets/images/carsType/sedan-car-model-svgrepo-com.svg'; // Adjust paths as needed
import audi from '../assets/images/carsType/car-city-model-svgrepo-com.svg';
import bmw from '../assets/images/carsType/car-muscle-design-svgrepo-com.svg';
import kia from '../assets/images/carsType/car-suv-svgrepo-com.svg';
import ford from '../assets/images/carsType/pick-up-svgrepo-com.svg';
import citroen from '../assets/images/carsType/jeep-svgrepo-com.svg';

export default function RentByType() {
  const brands = [
    { name: 'Sedan', image: sedan },
    { name: 'audi', image: audi },
    { name: 'bmw', image: bmw },
    { name: 'kia', image: kia },
    { name: 'ford', image: ford },
    { name: 'citroen', image: citroen },
  ];

  return (
    <section className="py-6 px-4 ml-14 mr-14">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Rent by Types</h2>
        <button className="flex items-center text-black-500 font-medium">
          See All
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 marginLeft: '30px' marginRight: '30px'  gap-6 justify-center">
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
      <br></br>
    </section>
  );
}