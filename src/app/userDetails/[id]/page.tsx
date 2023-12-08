"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const UserDetails = ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const { isPending, error, data } = useQuery({
    queryKey: ["users", id],
    queryFn: () => axios.get(`http://localhost:3004/users/${id}`),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const user = data.data;
  return (
    <div className="shadow-md shadow-white mt-10 text-center p-5 rounded space-y-2">
      <button className="bg-green-600 py-1 px-2 rounded cursor-pointer">go back</button>
      <h2 className="text-2xl font-medium uppercase">{user?.name}</h2>
      <p className="lowercase">{user?.email}</p>
      <p className="capitalize">{user?.age} years</p>
    </div>
  );
};

export default UserDetails;
