import { Header } from "@/components/header/header";

const WebsiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full ">
      <Header />

      <main className="pt-[70px] h-full">{children}</main>
    </div>
  );
};

export default WebsiteLayout;
