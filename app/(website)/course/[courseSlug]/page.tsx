import BannerCard from "@/components/courses/banner-card";
import CoursePage from "@/components/courses/course-page";
import RelatedCourseSlider from "@/components/courses/related-course-slider";
import StickySidebar from "@/components/courses/sticky-sidebar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { currentUser } from "@/lib/auth";

import { db } from "@/lib/db";

const SingleCoursePage = async ({
  params,
}: {
  params: { courseSlug: string };
}) => {
  const slug = params.courseSlug;

  const relatedCourses = await db.courses.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  const user = await currentUser();
  const isAuthenticated = !!user;

  const course = await db.courses.findUnique({
    include: {
      chapters: {
        orderBy: {
          position: "asc", // Sort chapters by position in ascending order
        },
      },
      faqs: {
        orderBy: {
          position: "asc", // Sort FAQs by position in ascending order
        },
      },
    },
    where: { slug },
  });
  if (!course) {
    throw new Error("Course not found");
  }
  const { id, title, price, imageUrl } = course;
  const validPrice = typeof price === "number" ? price : 0;
  const courseDataSendToCart = {
    id,
    title,
    price: validPrice,
    imageUrl,
    quantity: 1,
    slug,
  };
  return (
    <div className="w-full bg-slate-100 pb-8">
      <div className=" flex flex-col lg:flex-row">
        <div className="w-full lg:w-4/6">
          <BannerCard
            course={course}
            className="py-10 lg:py-12 mb-7 md:mb-8 xl:mb-10"
          />
          <CoursePage course={course} />
        </div>
        <div className="w-full lg:w-2/6 lg:pr-20">
          <StickySidebar
            course={courseDataSendToCart}
            isAuthenticated={isAuthenticated}
            imageUrl={course.imageUrl || ""}
            coursePrice={course.price || 0}
            videoUrl={course.chapters[0]?.videoUrl || ""}
            isFree={course.chapters[0]?.isFree}
          />
        </div>
      </div>
      <RelatedCourseSlider relatedCourses={relatedCourses} />
    </div>
  );
};

export default SingleCoursePage;
