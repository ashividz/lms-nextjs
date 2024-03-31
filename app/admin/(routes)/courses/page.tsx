import Link from "next/link";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { db } from "@/lib/db";

import { Button } from "@/components/ui/button";

const CoursesPage = async () => {
  const courses = await db.courses.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <div className="p-6">
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default CoursesPage;
