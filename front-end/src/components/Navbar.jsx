// // 

// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";


// function Navbar() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const [showProfile, setShowProfile] = useState(false);
//   const [userInfo, setUserInfo] = useState({ name: "User" }); // default name

//   const links = [
//     { to: "/", label: "Home" },
//     { to: "/about", label: "About us" },
//     { to: "/team", label: "Our Team" },
//     { to: "/vision", label: "Our Vision" },
//   ];

//   // Fetch user info if token exists
//   useEffect(() => {
//     if (token) {
//       // Replace this with your API call to fetch user info
//       fetch("http://10.130.195.204:5000/api/auth/me", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           setUserInfo({ name: data.name || "User", email: data.email });
//         })
//         .catch((err) => console.error("Failed to fetch user info", err));
//     }
//   }, [token]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <nav className="fixed top-0 left-0 w-full z-20 bg-black bg-opacity-70 text-white px-6 py-3 flex items-center justify-between backdrop-blur-md">
//       {/* Center Links */}
//       <div className="flex space-x-6">
//         {links.map((link) => {
//           const isActive = location.pathname === link.to;
//           return (
//             <div key={link.to} className="relative">
//               <Link
//                 to={link.to}
//                 className={`pb-1 hover:text-gray-300 transition ${
//                   isActive ? "text-white" : "text-gray-300"
//                 }`}
//               >
//                 {link.label}
//               </Link>
//               {isActive && (
//                 <div className="absolute left-0 bottom-0 w-full h-[2px] bg-amber-300"></div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* Right - Auth Links & Profile */}
//       <div className="flex items-center space-x-4 relative">
//         {token ? (
//           <div className="relative">
//             <button
//               onClick={() => setShowProfile(!showProfile)}
//               className="flex items-center space-x-2 bg-gray-800 px-3 py-1 rounded-md hover:bg-gray-700 transition"
//             >
//               <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center text-black font-bold">
//                 {userInfo.name ? userInfo.name[0].toUpperCase() : "U"}
//               </div>
//               <span className="text-sm">{userInfo.name}</span>
//             </button>

//             {/* Profile Dropdown */}
//             {showProfile && (
//               <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-50">
//                 <div className="p-4 border-b">
//                   <p className="font-medium">{userInfo.name}</p>
//                   <p className="text-sm text-gray-600">{userInfo.email}</p>
//                 </div>
//                 <Link
//                   to="/dashboard"
//                   className="block px-4 py-2 hover:bg-gray-100"
//                   onClick={() => setShowProfile(false)}
//                 >
//                   Previous Dashboard
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 font-medium"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <>
//             <Link
//               to="/login"
//               className="text-sm font-medium my-auto hover:text-amber-300"
//             >
//               Login
//             </Link>
//             <Link
//               to="/register"
//               className="text-sm font-medium bg-amber-400 text-black px-3 py-1 rounded-md hover:bg-amber-500 transition"
//             >
//               Register
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;


// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";

// function Navbar() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const [showProfile, setShowProfile] = useState(false);
//   const [userInfo, setUserInfo] = useState({ name: "", email: "" });

//   const links = [
//     { to: "/", label: "Home" },
//     { to: "/about", label: "About us" },
//     { to: "/team", label: "Our Team" },
//     { to: "/vision", label: "Our Vision" },
//   ];

//   // Fetch user info if token exists
//   useEffect(() => {
//     if (token) {
//       fetch("http://10.130.195.204:5000/api/auth/me", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           // Make sure we have name and email
//           setUserInfo({
//             name: data.name || "User",
//             email: data.email || "",
//           });
//         })
//         .catch((err) => console.error("Failed to fetch user info", err));
//     }
//   }, [token]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <nav className="fixed top-0 left-0 w-full z-20 bg-black bg-opacity-70 text-white px-6 py-3 flex items-center justify-between backdrop-blur-md">
//       {/* Center Links */}
//       <div className="flex space-x-6">
//         {links.map((link) => {
//           const isActive = location.pathname === link.to;
//           return (
//             <div key={link.to} className="relative">
//               <Link
//                 to={link.to}
//                 className={`pb-1 hover:text-gray-300 transition ${
//                   isActive ? "text-white" : "text-gray-300"
//                 }`}
//               >
//                 {link.label}
//               </Link>
//               {isActive && (
//                 <div className="absolute left-0 bottom-0 w-full h-[2px] bg-amber-300"></div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* Right - Auth Links & Profile */}
//       <div className="flex items-center space-x-4 relative">
//         {token ? (
//           <div className="relative">
//             <button
//               onClick={() => setShowProfile(!showProfile)}
//               className="flex items-center space-x-2 bg-gray-800 px-3 py-1 rounded-md hover:bg-gray-700 transition"
//             >
//               <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center text-black font-bold">
//                 {userInfo.name ? userInfo.name[0].toUpperCase() : "U"}
//               </div>
//               <span className="text-sm">{userInfo.name || "User"}</span>
//             </button>

//             {/* Profile Dropdown */}
//             {showProfile && (
//               <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-50">
//                 <div className="p-4 border-b">
//                   <p className="font-medium">{userInfo.name || "User"}</p>
//                   <p className="text-sm text-gray-600">{userInfo.email || ""}</p>
//                 </div>
//                 <Link
//                   to="/dashboard"
//                   className="block px-4 py-2 hover:bg-gray-100"
//                   onClick={() => setShowProfile(false)}
//                 >
//                   Previous Dashboard
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 font-medium"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <>
//             <Link
//               to="/login"
//               className="text-sm font-medium my-auto hover:text-amber-300"
//             >
//               Login
//             </Link>
//             <Link
//               to="/register"
//               className="text-sm font-medium bg-amber-400 text-black px-3 py-1 rounded-md hover:bg-amber-500 transition"
//             >
//               Register
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";

// function Navbar() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const [showProfile, setShowProfile] = useState(false);
//   const [userInfo, setUserInfo] = useState({ name: "", email: "" });

//   const links = [
//     { to: "/", label: "Home" },
//     { to: "/about", label: "About us" },
//     { to: "/team", label: "Our Team" },
//     { to: "/vision", label: "Our Vision" },
//   ];

//   // Fetch user info from backend
//   useEffect(() => {
//     if (token) {
//       fetch("http://10.130.195.204:5000/api/auth/me", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           setUserInfo({
//             name: data.name || "",
//             email: data.email || "",
//           });
//         })
//         .catch((err) => console.error("Failed to fetch user info", err));
//     }
//   }, [token]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <nav className="fixed top-0 left-0 w-full z-20 bg-black bg-opacity-70 text-white px-6 py-3 flex items-center justify-between backdrop-blur-md">
//       {/* Center Links */}
//       <div className="flex space-x-6">
//         {links.map((link) => {
//           const isActive = location.pathname === link.to;
//           return (
//             <div key={link.to} className="relative">
//               <Link
//                 to={link.to}
//                 className={`pb-1 hover:text-gray-300 transition ${
//                   isActive ? "text-white" : "text-gray-300"
//                 }`}
//               >
//                 {link.label}
//               </Link>
//               {isActive && (
//                 <div className="absolute left-0 bottom-0 w-full h-[2px] bg-amber-300"></div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* Right - Auth Links & Profile */}
//       <div className="flex items-center space-x-4 relative">
//         {token ? (
//           <div className="relative">
//             <button
//               onClick={() => setShowProfile(!showProfile)}
//               className="flex items-center space-x-2 bg-gray-800 px-3 py-1 rounded-md hover:bg-gray-700 transition"
//             >
//               <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center text-black font-bold">
//                 {userInfo.name ? userInfo.name[0].toUpperCase() : "U"}
//               </div>
//               <span className="text-sm">{userInfo.name || "User"}</span>
//             </button>

//             {/* Profile Dropdown */}
//             {showProfile && (
//               <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-50">
//                 <div className="p-4 border-b">
//                   <p className="font-medium">{userInfo.name || "User"}</p>
//                   <p className="text-sm text-gray-600">{userInfo.email || ""}</p>
//                 </div>
//                 <Link
//                   to="/dashboard"
//                   className="block px-4 py-2 hover:bg-gray-100"
//                   onClick={() => setShowProfile(false)}
//                 >
//                   Previous Dashboard
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 font-medium"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <>
//             <Link
//               to="/login"
//               className="text-sm font-medium my-auto hover:text-amber-300"
//             >
//               Login
//             </Link>
//             <Link
//               to="/register"
//               className="text-sm font-medium bg-amber-400 text-black px-3 py-1 rounded-md hover:bg-amber-500 transition"
//             >
//               Register
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;


import React, { useState, useEffect } from "react"; // ✅ make sure to import these
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [showProfile, setShowProfile] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: "Shivam", email: "shivamkgjj2005@gmail.com" });

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About us" },
    { to: "/ourteam", label: "Our Team" },
    { to: "/vision", label: "Our Vision" },
  ];

  // Fetch user info from backend
  useEffect(() => {
    if (token) {
      fetch("http://10.130.195.204:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch user info");
          return res.json();
        })
        .then((data) => {
          // Make sure data has name and email
          setUserInfo({
            name: data.name || "",
            email: data.email || "",
          });
        })
        .catch((err) => console.error(err));
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-20 bg-black bg-opacity-70 text-white px-6 py-3 flex items-center justify-between backdrop-blur-md">
      {/* Center Links */}
      <div className="flex space-x-6">
        {links.map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <div key={link.to} className="relative">
              <Link
                to={link.to}
                className={`pb-1 hover:text-gray-300 transition ${
                  isActive ? "text-white" : "text-gray-300"
                }`}
              >
                {link.label}
              </Link>
              {isActive && (
                <div className="absolute left-0 bottom-0 w-full h-[2px] bg-amber-300"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Right - Auth Links & Profile */}
      <div className="flex items-center space-x-4 relative">
        {token ? (
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-2 bg-gray-800 px-3 py-1 rounded-md hover:bg-gray-700 transition"
            >
              <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center text-black font-bold">
                {userInfo.name ? userInfo.name[0].toUpperCase() : "U"}
              </div>
              <span className="text-sm">{userInfo.name || "User"}</span>
            </button>

            {/* Profile Dropdown */}
            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-50">
                <div className="p-4 border-b">
                  <p className="font-medium">{userInfo.name || "User"}</p>
                  <p className="text-sm text-gray-600">{userInfo.email || ""}</p>
                </div>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setShowProfile(false)}
                >
                  Previous Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 font-medium"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="text-sm font-medium my-auto hover:text-amber-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-sm font-medium bg-amber-400 text-black px-3 py-1 rounded-md hover:bg-amber-500 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
