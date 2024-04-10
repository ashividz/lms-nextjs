import { getCourses } from "@/actions/get-courses";
import Container from "@/components/container";
import CourseCard from "@/components/courses/course-card";
import { db } from "@/lib/db";

const PopularCourses = async () => {
  const courses = await getCourses({});

  return (
    <div className="w-full flex items-center justify-center pt-12 pb-10 mt-10 mb-10 bg-[#f9f9ff]">
      <Container>
        <h3 className="text-3xl font-bold text-center text-webprimary mb-10">
          Our Popular Courses
        </h3>
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-start">
          {courses.map((course, index) => (
            <div key={index} className="m-4">
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default PopularCourses;
