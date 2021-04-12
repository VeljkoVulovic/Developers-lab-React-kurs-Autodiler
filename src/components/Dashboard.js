import React from "react";
import DataTableCars from "../datatable/DataTableCars";
import DataTableUsers from "../datatable/DataTableUsers";

const Dashboard = () => {
  return (
    <div>
      <DataTableCars></DataTableCars>
      <DataTableUsers></DataTableUsers>
    </div>
  );
};

export default Dashboard;
