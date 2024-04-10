import { currentUser } from "@/lib/auth";

import Container from "@/components/container";
import BannerCard from "./_components/banner-card";
import StickySidebar from "./_components/sticky-sidebar";

const UserLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();
  const userData = {
    name: user?.name as string,
    email: user?.email as string,
    image: user?.image as string,
  };
  return (
    <>
      <div className="relative h-full">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-cyan-50 via-teal-300 to-sky-400" />

        <div className="z-10 relative flex justify-center items-center h-full">
          <BannerCard
            user={userData}
            className="py-10 lg:py-12 mb-7 md:mb-8 xl:mb-10"
          />
        </div>
      </div>

      <div className="w-full bg-slate-100 py-12">
        <Container>
          <div className=" flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/3 lg:pr-2">
              <StickySidebar />
            </div>
            <div className="w-full lg:w-2/3">{children}</div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default UserLayout;
