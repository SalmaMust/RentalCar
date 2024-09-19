import  { useState } from 'react';

function Contract() {
  const [agreed, setAgreed] = useState(false);

  const handleAgree = () => {
    setAgreed(!agreed);
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Rental Agreement</h1>
      <p className="mb-4">
        By signing this contract, you agree to the following terms and conditions:
      </p>

      <div className="space-y-4 mb-6">
        <h2 className="text-xl font-semibold">1. Rental Duration</h2>
        <p>
          The rental period begins on [Pickup Date] and ends on [Drop-off Date].
          Any extension of the rental period must be agreed upon with the rental company.
        </p>

        <h2 className="text-xl font-semibold">2. Payment Terms</h2>
        <p>
          The total rental fee is [Amount]. Payment must be made upon pickup of the vehicle.
        </p>

        <h2 className="text-xl font-semibold">3. Insurance</h2>
        <p>
          The rental includes basic insurance coverage. Additional insurance options are available for purchase.
        </p>

        <h2 className="text-xl font-semibold">4. Responsibilities</h2>
        <p>
          You are responsible for the care of the vehicle during the rental period, including any damages incurred.
        </p>
      </div>

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="agree"
          checked={agreed}
          onChange={handleAgree}
          className="mr-2"
        />
        <label htmlFor="agree" className="text-gray-700">
          I agree to the terms and conditions
        </label>
      </div>

      <button
        type="submit"
        disabled={!agreed}
        className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded-full ${!agreed ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Confirm
      </button>
    </div>
  );
}

export default Contract;