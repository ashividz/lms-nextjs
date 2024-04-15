"use client";
import { useState } from "react";

import Container from "@/components/container";
import AlumniCard from "@/components/alumni/alumni-card";
import PageTitle from "@/components/sections/page-title";
interface Alumni {
  id: string;
  name: string;
  location: string;
  education: string;
  courses: string[];
  photoUrl: string;
}
const AlumniPage = () => {
  const sampleAlumni: Alumni[] = [
    {
      id: "1",
      name: "John Doe",
      location: "New York",
      education: "Computer Science",
      courses: ["Web Development", "Data Science"],
      photoUrl: "https://via.placeholder.com/150",
    },
    {
      id: "2",
      name: "John Doe",
      location: "New York",
      education: "Computer Science",
      courses: ["Web Development", "Data Science"],
      photoUrl: "https://via.placeholder.com/150",
    },
    {
      id: "3",
      name: "John Doe",
      location: "New York",
      education: "Computer Science",
      courses: ["Web Development", "Data Science"],
      photoUrl: "https://via.placeholder.com/150",
    },
    {
      id: "4",
      name: "John Doe",
      location: "New York",
      education: "Computer Science",
      courses: ["Web Development", "Data Science"],
      photoUrl: "https://via.placeholder.com/150",
    },
    {
      id: "5",
      name: "John Doe",
      location: "New York",
      education: "Computer Science",
      courses: ["Web Development", "Data Science"],
      photoUrl: "https://via.placeholder.com/150",
    },
    {
      id: "6",
      name: "John Doe",
      location: "New York",
      education: "Computer Science",
      courses: ["Web Development", "Data Science"],
      photoUrl: "https://via.placeholder.com/150",
    },
    {
      id: "7",
      name: "John Doe",
      location: "New York",
      education: "Computer Science",
      courses: ["Web Development", "Data Science"],
      photoUrl: "https://via.placeholder.com/150",
    },
    {
      id: "8",
      name: "John Doe",
      location: "New York",
      education: "Computer Science",
      courses: ["Web Development", "Data Science"],
      photoUrl: "https://via.placeholder.com/150",
    },
    {
      id: "9",
      name: "John Doe",
      location: "New York",
      education: "Computer Science",
      courses: ["Web Development", "Data Science"],
      photoUrl: "https://via.placeholder.com/150",
    },
    {
      id: "10",
      name: "John Doe",
      location: "New York",
      education: "Computer Science",
      courses: ["Web Development", "Data Science"],
      photoUrl: "https://via.placeholder.com/150",
    },
    // Add more alumni data as needed
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of alumni per page

  // Paginate alumni data
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedAlumni = sampleAlumni.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div className="w-full bg-slate-100 pb-20">
      <PageTitle title="Our Alumni" className="py-12" />
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10 gap-4">
          {paginatedAlumni.map((alumni) => (
            <AlumniCard key={alumni.id} alumni={alumni} />
          ))}
        </div>
        {/* <div className="flex justify-center mt-4">
        {[...Array(Math.ceil(sampleAlumni.length / pageSize)).keys()].map(
          (page) => (
            <button
              key={page}
              className={`mx-1 px-3 py-1 rounded-full ${
                page + 1 === currentPage
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </button>
          )
        )}
      </div> */}
      </Container>
    </div>
  );
};

export default AlumniPage;
