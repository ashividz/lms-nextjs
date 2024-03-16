import { Button } from "@/components/ui/button";
import Link from "next/link";

const CoursesPage = () => {
  return (
    <div className="p-6">
      <Link href="/admin/courses/create">
        <Button variant="default" size="default">
          Add New Course
        </Button>
      </Link>
    </div>
  );
};

export default CoursesPage;
