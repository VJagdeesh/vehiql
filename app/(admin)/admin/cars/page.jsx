import React from "react";
import CarsList from "./_components/CarsList";

export const metadata = {
  title: "cars | admin",
  description: "Add or Edit cars",
};

const CarsPage = () => {
  return (
    <div className="p-6">
      <h1 className="font-bold text-2xl mb-6">Car Inventory Management</h1>
      <CarsList />
    </div>
  );
};

export default CarsPage;
