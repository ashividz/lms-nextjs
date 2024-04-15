import { Faculty } from "@prisma/client";
import Image from "next/image";

interface FacultyCardProps {
  faculty: Faculty;
}

const FacultyCard = ({ faculty }: FacultyCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 my-5 lg:flex lg:items-center lg:space-x-6 transform transition-scale">
      <div className="relative lg:w-1/4">
        <Image
          src={faculty.imageUrl || "/placeholder.jpg"}
          alt={faculty.name}
          width={200}
          height={200}
          className="rounded-full mx-auto"
        />
      </div>
      <div className="flex flex-col lg:w-3/4">
        <div className="text-center lg:text-left">
          <h3 className="text-2xl text-emerald-500 font-bold">
            {faculty.name}
          </h3>
          <p className="text-gray-600 text-lg font-bold mb-2">
            {faculty.shortDescription}
          </p>
        </div>
        <p className="text-gray-600 text-md text-center lg:text-left">
          {faculty.description}
        </p>
      </div>
    </div>
  );
};

export default FacultyCard;
