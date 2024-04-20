"use client";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full overflow-auto flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#36c8f9] to-[#0b7fa6]">
      {children}
    </div>
  );
};

export default AuthLayout;
