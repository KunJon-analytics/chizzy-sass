import React from "react";

import AppHeader from "./app-header";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AppHeader />
      {children}
    </>
  );
};

export default DashboardLayout;
