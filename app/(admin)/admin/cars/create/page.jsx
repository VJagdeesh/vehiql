import React from "react";
import AddCarForm from "../../_components/AddCarForm";

export const metadata = {
  title: "Add Car | Admin",
  description: "Place for adding new car...",
};

const AddCarPage = () => {
  return (
    <div className="p-6">
      <h1 className="font-bold text-2xl mb-6">Add New Car</h1>
      <AddCarForm />
    </div>
  );
};

export default AddCarPage;
