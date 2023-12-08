"use client";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useState } from "react";

const UpdateUser = ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const { isPending, error, data } = useQuery({
    queryKey: ["users", id],
    queryFn: () => axios.get(`http://localhost:3004/users/${id}`),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const user = data.data;

  return (
    <div className="border max-w-xl mx-auto p-4 mt-10 rounded">
      <h1 className="text-center text-3xl font-medium uppercase">update user</h1>
      <UpdateUserForm user={user} />
    </div>
  );
};

export default UpdateUser;

// update user form component
type UpdateUserFormProps = {
  user: User;
};

const UpdateUserForm = ({ user }: UpdateUserFormProps) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [age, setAge] = useState(user.age);

  const router = useRouter();

  const queryClient = new QueryClient();
  // Mutations
  const userMutation: any = useMutation({
    mutationFn: (updatedUser) => {
      return axios.put(`http://localhost:3004/users/${user?.id}`, updatedUser);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["users"] });
      router.push("/");
    },
  });

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedUser = {
      name,
      email,
      age,
    };
    userMutation.mutate(updatedUser);
  };

  return (
    <form onSubmit={submitHandler} className="space-y-3">
      <div className="flex flex-col gap-1">
        <label>Name</label>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="text-black w-full p-3 border rounded"
          type="text"
          placeholder="Enter name"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label>Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="text-black w-full p-3 border rounded"
          type="email"
          placeholder="Enter email"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label>Age</label>
        <input
          onChange={(e) => setAge(Number(e.target.value))}
          value={age}
          className="text-black w-full p-3 border rounded appearance-none"
          type="number"
          placeholder="Enter age"
        />
      </div>

      <div>
        <button className="c-btn bg-green-600 w-full p-3" type="submit">
          submit
        </button>
      </div>
    </form>
  );
};
