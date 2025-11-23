// import { useEffect, useState } from "react";
// import axios from "axios";
// import Header from "./Navbar";
// import Footer from "./Footer";

// const API_URL = "http://10.130.195.204:5000/api/soil/latest"; // Replace with your LAN IP
// const POLL_INTERVAL = 2000;

// function SoilEnquiry() {
//   const [soilData, setSoilData] = useState(null);

//   // Fetch soil data
//   useEffect(() => {
//     const fetchSoilData = async () => {
//       try {
//         const res = await axios.get(API_URL, {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         });
//         setSoilData(res.data);
//       } catch (err) {
//         if (err.response && err.response.status === 401) {
//           console.error("Unauthorized: Please login first.");
//         } else {
//           console.error("Error fetching soil data:", err);
//         }
//       }
//     };

//     fetchSoilData();
//     const interval = setInterval(fetchSoilData, POLL_INTERVAL);
//     return () => clearInterval(interval);
//   }, []);

//   // Custom color mapping
//   const getColor = (status) => {
//     switch (status) {
//       case "High":
//       case "Dry":
//       case "Alkaline":
//         return "text-red-600";
//       case "Medium":
//         return "text-yellow-600";
//       case "Low":
//       case "Optimal":
//       case "Normal":
//       case "Acidic":
//         return "text-green-600";
//       default:
//         return "text-gray-600";
//     }
//   };

//   // Custom soil moisture status logic
//   const getMoistureStatus = (value) => {
//     if (value > 2000) return "Low";
//     if (value >= 1000 && value <= 2000) return "Medium";
//     return "High"; // < 1000
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       <Header />
//       <main className="flex-grow flex items-center justify-center p-6">
//         <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6 text-center">
//           <h2 className="text-2xl font-semibold mb-4">🌱 Soil Details</h2>

//           {!soilData ? (
//             <p className="text-gray-500">Loading...</p>
//           ) : (
//             <div className="space-y-4 text-left">
//               {/* Soil Moisture */}
//               {soilData.moisture !== undefined && (
//                 <div>
//                   <h3 className="font-medium">Soil Moisture</h3>
//                   <p
//                     className={`text-lg font-semibold ${getColor(
//                       getMoistureStatus(soilData.moisture)
//                     )}`}
//                   >
//                     {soilData.moisture} ({getMoistureStatus(soilData.moisture)})
//                   </p>
//                 </div>
//               )}

//               {/* pH */}
//               {soilData.ph !== undefined && (
//                 <div>
//                   <h3 className="font-medium">pH</h3>
//                   <p
//                     className={`text-lg font-semibold ${getColor(
//                       soilData.status.ph
//                     )}`}
//                   >
//                     {soilData.ph} ({soilData.status.ph})
//                   </p>
//                 </div>
//               )}

//               {/* Nitrogen */}
//               {soilData.nitrogen !== undefined && (
//                 <div>
//                   <h3 className="font-medium">Nitrogen (N)</h3>
//                   <p
//                     className={`text-lg font-semibold ${getColor(
//                       soilData.status.nitrogen
//                     )}`}
//                   >
//                     {soilData.nitrogen} ({soilData.status.nitrogen})
//                   </p>
//                 </div>
//               )}

//               {/* Phosphorus */}
//               {soilData.phosphorus !== undefined && (
//                 <div>
//                   <h3 className="font-medium">Phosphorus (P)</h3>
//                   <p
//                     className={`text-lg font-semibold ${getColor(
//                       soilData.status.phosphorus
//                     )}`}
//                   >
//                     {soilData.phosphorus} ({soilData.status.phosphorus})
//                   </p>
//                 </div>
//               )}

//               {/* Potassium */}
//               {soilData.potassium !== undefined && (
//                 <div>
//                   <h3 className="font-medium">Potassium (K)</h3>
//                   <p
//                     className={`text-lg font-semibold ${getColor(
//                       soilData.status.potassium
//                     )}`}
//                   >
//                     {soilData.potassium} ({soilData.status.potassium})
//                   </p>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default SoilEnquiry;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import Header from "./Navbar";
// import Footer from "./Footer";

// const LIVE_URL = "http://10.130.195.204:5000/api/esp/latest"; // live reading (not saved)
// const SAVE_URL = "http://10.130.195.204:5000/api/soil/save"; // manual save route
// const POLL_INTERVAL = 2000;

// function SoilEnquiry() {
//   const [soilData, setSoilData] = useState(null);
//   const [message, setMessage] = useState("");

//   // Fetch live soil data (from ESP, not DB)
//   useEffect(() => {
//     const fetchSoilData = async () => {
//       try {
//         const res = await axios.get(LIVE_URL, {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         });
//         setSoilData(res.data);
//       } catch (err) {
//         console.error("Error fetching soil data:", err);
//       }
//     };

//     fetchSoilData();
//     const interval = setInterval(fetchSoilData, POLL_INTERVAL);
//     return () => clearInterval(interval);
//   }, []);

//   // Save manually
//   const handleSave = async () => {
//     if (!soilData) return;

//     try {
//       await axios.post(
//         SAVE_URL,
//         {
//           moisture: soilData.moisture,
//           ph: soilData.ph,
//           nitrogen: soilData.nitrogen,
//           phosphorus: soilData.phosphorus,
//           potassium: soilData.potassium,
//         },
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         }
//       );
//       setMessage("✅ Reading saved successfully!");
//     } catch (err) {
//       console.error("Save error:", err);
//       setMessage("❌ Failed to save reading.");
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       <Header />
//       <main className="flex-grow flex items-center justify-center p-6">
//         <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6 text-center">
//           <h2 className="text-2xl font-semibold mb-4">🌱 Current Soil Reading</h2>

//           {!soilData ? (
//             <p className="text-gray-500">Loading live data...</p>
//           ) : (
//             <div className="space-y-4 text-left">
//               {/* Soil Moisture */}
//               {soilData.moisture !== undefined && (
//                 <div>
//                   <h3 className="font-medium">Soil Moisture</h3>
//                   <p className="text-lg font-semibold text-green-600">
//                     {soilData.moisture}
//                   </p>
//                 </div>
//               )}

//               {/* pH */}
//               {soilData.ph !== undefined && (
//                 <div>
//                   <h3 className="font-medium">pH</h3>
//                   <p className="text-lg font-semibold text-green-600">
//                     {soilData.ph}
//                   </p>
//                 </div>
//               )}

//               {/* Nitrogen */}
//               {soilData.nitrogen !== undefined && (
//                 <div>
//                   <h3 className="font-medium">Nitrogen (N)</h3>
//                   <p className="text-lg font-semibold text-green-600">
//                     {soilData.nitrogen}
//                   </p>
//                 </div>
//               )}

//               {/* Phosphorus */}
//               {soilData.phosphorus !== undefined && (
//                 <div>
//                   <h3 className="font-medium">Phosphorus (P)</h3>
//                   <p className="text-lg font-semibold text-green-600">
//                     {soilData.phosphorus}
//                   </p>
//                 </div>
//               )}

//               {/* Potassium */}
//               {soilData.potassium !== undefined && (
//                 <div>
//                   <h3 className="font-medium">Potassium (K)</h3>
//                   <p className="text-lg font-semibold text-green-600">
//                     {soilData.potassium}
//                   </p>
//                 </div>
//               )}

//               {/* Save button */}
//               <div className="text-center mt-6">
//                 <button
//                   onClick={handleSave}
//                   className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
//                 >
//                   Save This Reading
//                 </button>
//                 {message && <p className="mt-2 text-sm">{message}</p>}
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default SoilEnquiry;


// import { useEffect, useState } from "react";
// import axios from "axios";
// import Header from "./Navbar";
// import Footer from "./Footer";

// const LIVE_URL = "http://10.130.195.204:5000/api/esp/latest"; // live reading (only moisture)
// const SAVE_URL = "http://10.130.195.204:5000/api/soil/save"; // manual save route
// const POLL_INTERVAL = 2000;

// function SoilEnquiry() {
//   const [soilData, setSoilData] = useState({});
//   const [message, setMessage] = useState("");

//   // Fetch live soil data (only moisture for now)
//   useEffect(() => {
//     const fetchSoilData = async () => {
//       try {
//         const res = await axios.get(LIVE_URL, {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         });

//         // Fill other nutrients with null
//         setSoilData({
//           moisture: res.data.moisture ?? null,
//           ph: null,
//           nitrogen: null,
//           phosphorus: null,
//           potassium: null,
//         });
//       } catch (err) {
//         console.error("Error fetching soil data:", err);
//       }
//     };

//     fetchSoilData();
//     const interval = setInterval(fetchSoilData, POLL_INTERVAL);
//     return () => clearInterval(interval);
//   }, []);

//   // Save manually
//   const handleSave = async () => {
//     try {
//       await axios.post(
//         SAVE_URL,
//         {
//           moisture: soilData.moisture,
//           ph: soilData.ph,
//           nitrogen: soilData.nitrogen,
//           phosphorus: soilData.phosphorus,
//           potassium: soilData.potassium,
//         },
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         }
//       );

//       setMessage("✅ Reading saved successfully!");
//       // Hide message after 1 second
//       setTimeout(() => setMessage(""), 1000);
//     } catch (err) {
//       console.error("Save error:", err);
//       setMessage("❌ Failed to save reading.");
//       setTimeout(() => setMessage(""), 1000);
//     }
//   };

//   // Helper to render each reading card
//   const renderCard = (label, value) => (
//     <div className="bg-gray-100 p-4 rounded-lg shadow-md">
//       <h3 className="font-medium">{label}</h3>
//       <p className="text-lg font-semibold text-green-600">
//         {value !== null ? value : "Null"}
//       </p>
//     </div>
//   );

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       <Header />
//       <main className="flex-grow flex items-center justify-center p-6">
//         <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6 text-center">
//           <h2 className="text-2xl font-semibold mb-4">🌱 Current Soil Reading</h2>

//           {!soilData ? (
//             <p className="text-gray-500">Loading live data...</p>
//           ) : (
//             <div className="space-y-4">
//               {renderCard("Soil Moisture", soilData.moisture)}
//               {renderCard("pH", soilData.ph)}
//               {renderCard("Nitrogen (N)", soilData.nitrogen)}
//               {renderCard("Phosphorus (P)", soilData.phosphorus)}
//               {renderCard("Potassium (K)", soilData.potassium)}

//               {/* Save button below all readings */}
//               <div className="text-center mt-6">
//                 <button
//                   onClick={handleSave}
//                   className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
//                 >
//                   Save This Reading
//                 </button>
//                 {message && <p className="mt-2 text-sm">{message}</p>}
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default SoilEnquiry;


import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Navbar";
import Footer from "./Footer";

const LIVE_URL = "http://10.130.195.204:5000/api/esp/latest"; // live reading (only moisture)
const SAVE_URL = "http://10.130.195.204:5000/api/soil/save"; // manual save route
const POLL_INTERVAL = 2000;

function SoilEnquiry() {
  const [soilData, setSoilData] = useState({});
  const [message, setMessage] = useState("");

  // Fetch live soil data (only moisture for now)
  useEffect(() => {
    const fetchSoilData = async () => {
      try {
        const res = await axios.get(LIVE_URL, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        // Fill other nutrients with null
        setSoilData({
          moisture: res.data.moisture ?? null,
          ph: null,
          nitrogen: null,
          phosphorus: null,
          potassium: null,
        });
      } catch (err) {
        console.error("Error fetching soil data:", err);
      }
    };

    fetchSoilData();
    const interval = setInterval(fetchSoilData, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  // Save manually
  const handleSave = async () => {
    try {
      await axios.post(
        SAVE_URL,
        {
          moisture: soilData.moisture,
          ph: soilData.ph,
          nitrogen: soilData.nitrogen,
          phosphorus: soilData.phosphorus,
          potassium: soilData.potassium,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setMessage("✅ Reading saved successfully!");
      setTimeout(() => setMessage(""), 1000);
    } catch (err) {
      console.error("Save error:", err);
      setMessage("❌ Failed to save reading.");
      setTimeout(() => setMessage(""), 1000);
    }
  };

  // Helper to render each reading card
  const renderCard = (label, value) => (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md flex-1 text-center">
      <h3 className="font-medium">{label}</h3>
      <p className="text-lg font-semibold text-green-600">
        {value !== null ? value : "Null"}
      </p>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl p-6 text-center">
          <h2 className="text-2xl font-semibold mb-6">🌱 Current Soil Reading</h2>

          {!soilData ? (
            <p className="text-gray-500">Loading live data...</p>
          ) : (
            <>
              {/* Horizontal grid for cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                {renderCard("Soil Moisture", soilData.moisture)}
                {renderCard("pH", soilData.ph)}
                {renderCard("Nitrogen (N)", soilData.nitrogen)}
                {renderCard("Phosphorus (P)", soilData.phosphorus)}
                {renderCard("Potassium (K)", soilData.potassium)}
              </div>

              {/* Save button below all cards */}
              <div className="text-center">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
                >
                  Save This Reading
                </button>
                {message && <p className="mt-2 text-sm">{message}</p>}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default SoilEnquiry;
