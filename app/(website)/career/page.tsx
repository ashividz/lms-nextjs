import PageTitle from "@/components/sections/page-title";

import Container from "@/components/container";
import CareerForm from "@/components/career/career-form";
import Image from "next/image";

const CareerPage = () => {
  return (
    <div className="w-full bg-slate-100 pb-20">
      <PageTitle title="Career" className="py-12" />
      <div className="w-full bg-[#edeff3] py-12">
        <Container>
          <div className=" flex flex-col lg:flex-row">
            <div className="w-full lg:w-3/5 lg:mr-4">
              <CareerForm />
            </div>
            <div className="w-full lg:w-2/5 ">
              <h1 className="text-3xl font-bold border-b-2 border-slate-200 pb-2 text-gray-700 mb-4">
                Why Work With Us?
              </h1>
              <p className="text-md">
                Are you passionate about making a difference? Do you thrive in a
                dynamic and collaborative environment? Look no further! Unitus
                Health Academy is seeking talented individuals to join our team
                and contribute to our mission of Unitus.
              </p>
              <p className="text-md">
                At Unitus, we value innovation, creativity, and diversity. We
                offer exciting opportunities for career growth and development
                in various fields, including Academy. Whether you&apos;re an
                experienced professional or just starting your career, we have
                positions for individuals at all levels.
              </p>
              <Image
                src="/assets/career.png"
                alt="Career Page"
                width={600}
                height={800}
                className="mx-auto lg:mx-0 mt-2 lg:mt-4"
              />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default CareerPage;
