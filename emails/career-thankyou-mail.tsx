import Image from "next/image";
import dynamic from "next/dynamic";

interface CareerThankyouMailProps {
  name: string;
  jobPosition?: string;
}
const CareerThankyouMail = ({ name, jobPosition }: CareerThankyouMailProps) => {
  const DynamicImage = dynamic(() => import("next/image"), { ssr: false });
  return (
    <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#36c8f9] to-[#0b7fa6]">
      {/* Header */}
      <div className="bg-blue-500 py-4 text-white text-center">
        <DynamicImage
          alt="logo"
          src="/unitus-logo.png"
          width={170}
          height={100}
        />
        <h1 className="text-3xl font-bold">Dear {name} !</h1>
        <h1 className="text-2xl font-semibold mt-2">
          Greetings from Unitus Health Academy. Thank you for applying to the
          {jobPosition} position.
        </h1>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto p-8">
        <p className="text-lg">
          We would like to inform you that we have received your job
          application. Our hiring team is currently reviewing all the
          applications and planning to schedule interviews in the next two
          weeks. If you are among qualified candidates, you will receive a
          call/email from our one of our hiring team.
        </p>
        <p className="text-lg">
          Thank you, again, for taking the time to apply to this role.
        </p>
      </div>
      <h1 className="text-3xl font-bold">Thanks</h1>
      <h1 className="text-2xl font-semibold mt-2">
        Team Unitus Health Academy
      </h1>

      {/* Footer */}
      <div className="bg-blue-500 py-4 text-white text-center">
        <p>&copy; 2024 Unitus Health Academy. All rights reserved.</p>
      </div>
    </div>
  );
};

export default CareerThankyouMail;
