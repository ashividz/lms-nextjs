import { getCourseBySlug } from "@/actions/get-course";
import { getCourses } from "@/actions/get-courses";
import { getProgress } from "@/actions/get-progress";
import BannerCard from "@/components/courses/banner-card";
import CoursePage from "@/components/courses/course-page";
import RelatedCourseSlider from "@/components/courses/related-course-slider";
import StickySidebar from "@/components/courses/sticky-sidebar";
import { currentUser } from "@/lib/auth";

const SingleCoursePage = async ({
  params,
}: {
  params: { courseSlug: string };
}) => {
  const slug = params.courseSlug;

  const user = await currentUser();
  if (!user) {
    const userId = undefined;
  }

  const userId = user?.id;

  const relatedCourses = await getCourses({});

  const course = await getCourseBySlug({ courseSlug: slug as string });

  if (!course) {
    throw new Error("Course not found");
  }
  const { id, title, price, int_price, imageUrl } = course;
  const validPrice = typeof price === "number" ? price : 0;
  const validIntPrice = typeof int_price === "number" ? int_price : 0;
  const courseDataSendToCart = {
    id,
    title,
    price: validPrice,
    int_price: validIntPrice,
    imageUrl,
    quantity: 1,
    type: "course",
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
          <StickySidebar course={course} cartItems={courseDataSendToCart} />
        </div>
      </div>
      <RelatedCourseSlider relatedCourses={relatedCourses} />
    </div>
  );
};

export default SingleCoursePage;
