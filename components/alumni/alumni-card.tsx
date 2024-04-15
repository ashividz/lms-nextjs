import React from "react";
import Image from "next/image";

interface Alumni {
  id: string;
  name: string;
  location: string;
  education: string;
  courses: string[];
  photoUrl: string;
}

interface AlumniCardProps {
  alumni: Alumni;
}

const AlumniCard: React.FC<AlumniCardProps> = ({ alumni }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-4 flex items-center justify-center md:justify-start md:space-x-4 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
      <div className="rounded-md overflow-hidden w-24 h-24 flex-shrink-0">
        <Image
          src={alumni.photoUrl}
          alt={alumni.name}
          width={200}
          height={200}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="text-center md:text-left">
        <h3 className="text-xl font-semibold">{alumni.name}</h3>
        <p className="text-gray-600">{alumni.location}</p>
        <p className="text-gray-600">{alumni.education}</p>
        <ul className="text-gray-600">
          {alumni.courses.map((course, index) => (
            <li key={index}>{course}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AlumniCard;
