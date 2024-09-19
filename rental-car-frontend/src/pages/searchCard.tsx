function CarSearchCard() {
    return (
      <div className="border p-6 rounded-lg shadow-md max-w-7xl mx-auto mt-8">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Pickup Location */}
          <div className="flex flex-col w-full sm:w-auto">
            <label htmlFor="pickup-location" className="font-semibold mb-2">
              Pickup Location
            </label>
            <input
              type="text"
              id="pickup-location"
              placeholder="Enter pickup location"
              className="border p-2 rounded w-full sm:w-60"
            />
          </div>
  
          {/* Pickup Date */}
          <div className="flex flex-col w-full sm:w-auto">
            <label htmlFor="pickup-date" className="font-semibold mb-2">
              Pickup Date
            </label>
            <input
              type="date"
              id="pickup-date"
              className="border p-2 rounded w-full sm:w-60"
            />
          </div>
  
          {/* Drop-off Location */}
          <div className="flex flex-col w-full sm:w-auto">
            <label htmlFor="dropoff-location" className="font-semibold mb-2">
              Drop-off Location
            </label>
            <input
              type="text"
              id="dropoff-location"
              placeholder="Enter drop-off location"
              className="border p-2 rounded w-full sm:w-60"
            />
          </div>
  
          {/* Drop-off Date */}
          <div className="flex flex-col w-full sm:w-auto">
            <label htmlFor="dropoff-date" className="font-semibold mb-2">
              Drop-off Date
            </label>
            <input
              type="date"
              id="dropoff-date"
              className="border p-2 rounded w-full sm:w-60"
            />
          </div>
  
          {/* Search Vehicle Button */}
          <div className="flex flex-col w-full sm:w-auto sm:mt-6 sm:mt-0">
            <button className="bg-black text-white font-semibold py-2 px-8 rounded-full hover:bg-gray-800 w-full sm:w-auto">
              Search Vehicle
            </button>
          </div>
        </div>
        <br></br>
      </div>
      
    );
  }
  
  export default CarSearchCard;