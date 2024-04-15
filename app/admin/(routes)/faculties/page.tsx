import { DataTable } from "@/components/data-table/data-table";
import { db } from "@/lib/db";
import { columns } from "./_components/columns";

const FacultiesPage = async () => {
  const faculties = await db.faculty.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <div className="p-6">
      <DataTable
        columns={columns}
        data={faculties}
        title="Faculty"
        href="/admin/faculties/create"
      />
    </div>
  );
};

export default FacultiesPage;
