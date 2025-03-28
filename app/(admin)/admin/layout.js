import { getAdmin } from "@/actions/admin";
import Header from "@/components/header";
import { notFound } from "next/navigation";
import React from "react";
import Sidebar from "./_components/Sidebar";

const AdminLayout = async ({ children }) => {
  const user = await getAdmin();
  if (!user.authorized) return notFound();
  return (
    <div className="h-full">
      <Header isAdminPage={user.authorized} />
      <div className="flex h-full w-56 flex-col top-20 fixed insect-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[80px] h-full">{children}</main>
    </div>
  );
};

export default AdminLayout;
