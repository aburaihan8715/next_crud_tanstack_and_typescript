import React from "react";

const UserDetails = () => {
  return (
    <div className="shadow-md shadow-white mt-10 text-center p-5 rounded space-y-2">
      <button className="bg-green-600 py-1 px-2 rounded cursor-pointer">go back</button>
      <h2 className="text-2xl font-medium uppercase">Abu Raihan</h2>
      <p className="lowercase">raihan@gmail.com</p>
      <p className="capitalize">35 years</p>
    </div>
  );
};

export default UserDetails;
