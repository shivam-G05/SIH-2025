// import { useEffect, useState } from "react";
// import axios from "axios";
// import Header from "./Navbar";
// import Footer from "./Footer";

// function Dashboard() {
//   const [readings, setReadings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchReadings = async () => {
//       try {
//         const res = await axios.get("http://10.130.195.204:5000/api/soil", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         // Sort by date descending (latest first)
//         const sorted = res.data.sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setReadings(sorted);
//       } catch (err) {
//         console.error("Failed to fetch readings:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReadings();
//   }, [token]);

//   // Helper to render a single reading card
//   const renderCard = (reading) => {
//     const { sensorReadings, createdAt, states } = reading;

//     return (
//       <div
//         key={reading._id}
//         className="bg-gray-100 p-4 rounded-lg shadow-md flex-1 flex flex-col justify-between"
//       >
//         <p className="text-sm text-gray-500 mb-2">
//           {new Date(createdAt).toLocaleString()}
//         </p>
//         <div className="grid grid-cols-2 gap-2 text-left">
//           <div>
//             <p className="font-medium">Soil Moisture</p>
//             <p className={`font-semibold ${states.moisture === "High" ? "text-red-600" : states.moisture === "Medium" ? "text-yellow-600" : "text-green-600"}`}>
//               {sensorReadings.moisture ?? "Null"} ({states.moisture})
//             </p>
//           </div>

//           <div>
//             <p className="font-medium">pH</p>
//             <p className={`font-semibold ${states.ph === "High" ? "text-red-600" : states.ph === "Low" ? "text-yellow-600" : "text-green-600"}`}>
//               {sensorReadings.ph ?? "Null"} ({states.ph})
//             </p>
//           </div>

//           <div>
//             <p className="font-medium">Nitrogen (N)</p>
//             <p className={`font-semibold ${states.nitrogen === "High" ? "text-red-600" : states.nitrogen === "Low" ? "text-yellow-600" : "text-green-600"}`}>
//               {sensorReadings.N ?? "Null"} ({states.nitrogen})
//             </p>
//           </div>

//           <div>
//             <p className="font-medium">Phosphorus (P)</p>
//             <p className={`font-semibold ${states.phosphorus === "High" ? "text-red-600" : states.phosphorus === "Low" ? "text-yellow-600" : "text-green-600"}`}>
//               {sensorReadings.P ?? "Null"} ({states.phosphorus})
//             </p>
//           </div>

//           <div>
//             <p className="font-medium">Potassium (K)</p>
//             <p className={`font-semibold ${states.potassium === "High" ? "text-red-600" : states.potassium === "Low" ? "text-yellow-600" : "text-green-600"}`}>
//               {sensorReadings.K ?? "Null"} ({states.potassium})
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       <Header />
//       <main className="flex-grow flex flex-col items-center justify-start p-6 pt-24">
//         <h2 className="text-2xl font-semibold mb-6">📊 Previous Soil Readings</h2>

//         {loading ? (
//           <p className="text-gray-500">Loading saved readings...</p>
//         ) : readings.length === 0 ? (
//           <p className="text-gray-500">No saved readings yet.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl">
//             {readings.map((reading) => renderCard(reading))}
//           </div>
//         )}
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default Dashboard;


import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Navbar";
import Footer from "./Footer";

function Dashboard() {
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchReadings = async () => {
      try {
        const res = await axios.get("http://10.130.195.204:5000/api/soil", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Sort by date descending (latest first)
        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setReadings(sorted);
      } catch (err) {
        console.error("Failed to fetch readings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReadings();
  }, [token]);

  // Helper to determine moisture status based on your custom ranges
  const getMoistureStatus = (value) => {
    if (value > 2000) return "Low";
    if (value >= 1000 && value <= 2000) return "Medium";
    return "High"; // < 1000
  };

  // Helper to render a single reading card
  const renderCard = (reading) => {
    const { sensorReadings, createdAt, states } = reading;

    return (
      <div
        key={reading._id}
        className="bg-gray-100 p-4 rounded-lg shadow-md flex-1 flex flex-col justify-between"
      >
        <p className="text-sm text-gray-500 mb-2">
          {new Date(createdAt).toLocaleString()}
        </p>
        <div className="grid grid-cols-2 gap-2 text-left">
          <div>
            <p className="font-medium">Soil Moisture</p>
            <p
              className={`font-semibold ${
                getMoistureStatus(sensorReadings.moisture) === "High"
                  ? "text-green-600"
                  : getMoistureStatus(sensorReadings.moisture) === "Medium"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {sensorReadings.moisture ?? "Null"} (
              {getMoistureStatus(sensorReadings.moisture)})
            </p>
          </div>

          <div>
            <p className="font-medium">pH</p>
            <p
              className={`font-semibold ${
                states.ph === "High"
                  ? "text-red-600"
                  : states.ph === "Low"
                  ? "text-yellow-600"
                  : "text-green-600"
              }`}
            >
              {sensorReadings.ph ?? "Null"} ({states.ph})
            </p>
          </div>

          <div>
            <p className="font-medium">Nitrogen (N)</p>
            <p
              className={`font-semibold ${
                states.nitrogen === "High"
                  ? "text-red-600"
                  : states.nitrogen === "Low"
                  ? "text-yellow-600"
                  : "text-green-600"
              }`}
            >
              {sensorReadings.N ?? "Null"} ({states.nitrogen})
            </p>
          </div>

          <div>
            <p className="font-medium">Phosphorus (P)</p>
            <p
              className={`font-semibold ${
                states.phosphorus === "High"
                  ? "text-red-600"
                  : states.phosphorus === "Low"
                  ? "text-yellow-600"
                  : "text-green-600"
              }`}
            >
              {sensorReadings.P ?? "Null"} ({states.phosphorus})
            </p>
          </div>

          <div>
            <p className="font-medium">Potassium (K)</p>
            <p
              className={`font-semibold ${
                states.potassium === "High"
                  ? "text-red-600"
                  : states.potassium === "Low"
                  ? "text-yellow-600"
                  : "text-green-600"
              }`}
            >
              {sensorReadings.K ?? "Null"} ({states.potassium})
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-start p-6 pt-24">
        <h2 className="text-2xl font-semibold mb-6">📊 Previous Soil Readings</h2>

        {loading ? (
          <p className="text-gray-500">Loading saved readings...</p>
        ) : readings.length === 0 ? (
          <p className="text-gray-500">No saved readings yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl">
            {readings.map((reading) => renderCard(reading))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Dashboard;
