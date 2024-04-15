"use client";
import { useEffect, useState } from "react";

import Container from "@/components/container";

import PageTitle from "@/components/sections/page-title";
import FacultyCard from "@/components/faculty/faculty-card";
import { Faculty } from "@prisma/client";
import axios from "axios";

import Pagination from "@/components/pagination";
import FacultyLoadingCard from "@/components/faculty/faculty-loading-card";

const FacultyPage = () => {
  const [isReady, setIsReady] = useState(false);
  const [faculties, setFaculties] = useState<Faculty[]>([]);

  const fetchFaculties = async () => {
    const response = await axios.get("/api/faculties");
    const data = await response.data;
    setFaculties(data);
    setIsReady(true);
  };

  useEffect(() => {
    fetchFaculties();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedFaculty = faculties.slice(startIndex, endIndex);
  const totalPages = Math.ceil(faculties.length / pageSize);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div className="w-full bg-slate-100 pb-20">
      <PageTitle title="Our Faculties" className="py-12" />
      <Container>
        <div className="flex w-full items-center justify-center py-12 flex-col animate-slide-up">
          {isReady &&
            paginatedFaculty.map((faculty) => (
              <FacultyCard key={faculty.id} faculty={faculty} />
            ))}
          {!isReady && (
            <>
              <FacultyLoadingCard />
              <FacultyLoadingCard />
              <FacultyLoadingCard />
              <FacultyLoadingCard />
            </>
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </Container>
    </div>
  );
};

export default FacultyPage;
