import React from "react";
import Usernav from "@/app/Components/userNav/Usernav";
import Redirect from "@/app/Components/(Misc)/Utils/Redirect";

export default function DashboardLayout({ children }) {
  return (
    <main className="dashboardLayout">
      <Redirect />
      <Usernav />
      {children}
    </main>
  );
}
