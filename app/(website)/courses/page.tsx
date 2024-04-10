import { getCourses } from "@/actions/get-courses";
import Container from "@/components/container";
import CourseCard from "@/components/courses/course-card";
import PageTitle from "@/components/sections/page-title";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Categories, Courses } from "@prisma/client";

type CourseWithProgressWithCategory = Courses & {
  category: Categories | null;
  chapters: { id: string }[];
  progress: number | null;
};

interface CourseWithProgress {
  courses: CourseWithProgressWithCategory;
}

const CoursesPage = async () => {
  const courses = await getCourses({});

  return (
    <div>
      <PageTitle
        title="Our Courses"
        className="py-10 items-center justify-center"
      />
      <div className="py-12 bg-slate-100">
        <Container>
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-start">
            {courses.map((course, index) => (
              <div key={index} className="m-4">
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default CoursesPage;
