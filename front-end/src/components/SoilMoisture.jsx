// SoilMoisture.jsx
import React from "react";

function SoilMoisture({ moisture }) {
  // classify moisture level
  const getMoistureStatus = (value) => {
    if (value > 2000) return "Dry";
    if (value >= 1000) return "Medium";
    return "High"; // value < 1000
  };

  return (
    <div className="p-4 bg-green-50 rounded text-center">
      {moisture !== null ? (
        <>
          <p className="text-xl font-bold text-gray-800">{moisture}</p>
          <p
            className={`mt-1 text-sm font-semibold ${
              moisture > 2000
                ? "text-red-600"
                : moisture >= 1000
                ? "text-yellow-600"
                : "text-green-600"
            }`}
          >
            {getMoistureStatus(moisture)}
          </p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SoilMoisture;
