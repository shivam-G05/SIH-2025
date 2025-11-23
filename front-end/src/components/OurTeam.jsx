import React from "react";
import akash from "../assets/akash.jpeg"
import shivam from "../assets/shivam.jpeg";
import anshika from "../assets/anshika.jpeg";
import abhishek from "../assets/abhishek.jpeg";
import madhav from "../assets/madhav.jpeg";
import kshitij from "../assets/kshitij.jpeg";
import Header from './Navbar';
import Footer from './Footer'

const teamMembers = [
  {
    name: "Akash Varshney-TEAM LEADER",
    role: "Banckend Developer",
    image: akash, // replace with actual image
  },
  {
    name: "Anshika Singh",
    role: "Hardware Specialist",
    image: anshika,
  },
  {
    name: "Abhishek Chaudhary",
    role: "ML Engineer",
    image: abhishek,
  },
  {
    name: "Madhav Goel",
    role: "ML Engineer",
    image: madhav,
  },
  {
    name: "Kshitij Sharma",
    role: "App Developer",
    image: kshitij,
  },
  {
    name: "Shivam Goel",
    role: "Front-end Developer",
    image: shivam,
  },
];

function OurTeam() {
  return (
    <>
    <section className="py-12 px-6 bg-gray-100 min-h-screen">
        <Header></Header>
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-gray-200"
              />
              <h3 className="mt-4 text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
      
    </section>
    <Footer></Footer>
    </>
  );
}

export default OurTeam;
