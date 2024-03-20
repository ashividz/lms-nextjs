"use client";
import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";

const DashboardPage = () => {
  const user = useCurrentUser();
  const onClick = () => {
    logout();
  };
  return (
    <div>
      DashboardPage(Protected)
      {JSON.stringify(user)}
      <button onClick={onClick}>Sign Out</button>
    </div>
  );
};

export default DashboardPage;
