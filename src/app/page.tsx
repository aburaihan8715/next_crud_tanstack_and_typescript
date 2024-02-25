"use client";
import Link from "next/link";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function Home() {
  const {
    isPending,
    refetch: userRefetch,
    error,
    data: users = [],
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetch("http://localhost:3004/users").then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <main>
      <ul className="my-6 flex flex-col gap-4">
        {users?.map((item: User) => (
          <li key={item?.id} className="border py-6 px-4 flex justify-between rounded">
            <div>
              <h2 className="text-2xl font-medium uppercase">{item?.name}</h2>
              <p className="lowercase">{item?.email}</p>
              <p className="capitalize">{item?.age} years</p>
            </div>
            <div className="flex gap-2 items-start">
              <UserDeleteBtn id={item?.id} userRefetch={userRefetch} />

              <Link href={`/updateUser/${item?.id}`}>
                <button className="c-btn bg-green-600">update</button>
              </Link>

              <Link href={`/userDetails/${item?.id}`}>
                <button className="c-btn bg-blue-600">details</button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

// user delete button component
function UserDeleteBtn({ id, userRefetch }: { id: string; userRefetch: any }) {
  // const queryClient = new QueryClient();

  // Mutations
  const mutation: any = useMutation({
    mutationFn: (id) => {
      return axios.delete(`http://localhost:3004/users/${id}`);
    },
    onSuccess: () => {
      // Invalidate and refetch
      // queryClient.invalidateQueries({ queryKey: ["users"] });
      userRefetch();
    },
  });

  const deleteHandler = () => {
    mutation.mutate(id);
  };
  return (
    <button onClick={deleteHandler} className="c-btn bg-red-600">
      delete
    </button>
  );
}
