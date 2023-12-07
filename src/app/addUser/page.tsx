"use client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useMutation, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const router = useRouter();

  const queryClient = new QueryClient();

  // Mutations
  const userMutation: any = useMutation({
    mutationFn: (newTodo) => {
      return axios.post("http://localhost:3004/users", newTodo);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["users"] });
      router.push("/");
    },
  });

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUser = {
      id: uuidv4(),
      name,
      email,
      age,
    };
    userMutation.mutate(newUser);
  };

  return (
    <div className="border max-w-xl mx-auto p-4 mt-10 rounded">
      <h1 className="text-center text-3xl font-medium uppercase">add user</h1>
      <form onSubmit={submitHandler} className="space-y-3">
        <div className="flex flex-col gap-1">
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded text-black"
            type="text"
            placeholder="Enter name"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded text-black"
            type="email"
            placeholder="Enter email"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Age</label>
          <input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-3 border rounded appearance-none text-black"
            type="number"
            placeholder="Enter age"
            required
          />
        </div>

        <div>
          <button className="c-btn bg-green-600 w-full p-3" type="submit">
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
