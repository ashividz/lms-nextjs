"use client";
import { useEffect, useState } from "react";

import Container from "@/components/container";
import AlumniCard from "@/components/alumni/alumni-card";
import PageTitle from "@/components/sections/page-title";
import TestimonialCard from "@/components/student-speaks/testimonial-card";
import axios from "axios";
import { Testimonials } from "@prisma/client";
import Pagination from "@/components/pagination";
import TestimonialLoadingCard from "@/components/student-speaks/testimonial-loading-card";

const StudentSpeaksPage = () => {
  const [testimonials, setTestimonials] = useState<Testimonials[]>([]);
  const [isReady, setIsReady] = useState(false);

  const fetchTestimonial = async () => {
    const response = await axios.get("/api/testimonials");
    const data = await response.data;
    setTestimonials(data);
    setIsReady(true);
  };

  useEffect(() => {
    fetchTestimonial();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12; // Number of alumni per page

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedTestimonials = testimonials.slice(startIndex, endIndex);
  const totalPages = Math.ceil(testimonials.length / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div className="w-full bg-slate-100 pb-20">
      <PageTitle title="Student Speaks" className="py-12" />
      <Container>
        {!isReady && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-10 gap-4">
            <TestimonialLoadingCard />
            <TestimonialLoadingCard />
            <TestimonialLoadingCard />
            <TestimonialLoadingCard />
            <TestimonialLoadingCard />
            <TestimonialLoadingCard />
            <TestimonialLoadingCard />
            <TestimonialLoadingCard />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-10 gap-4 animate-slide-up">
          {paginatedTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
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

export default StudentSpeaksPage;
