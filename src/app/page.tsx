import Link from "next/link";

export default function Home() {
  return (
    <main>
      <ul className="my-6 flex flex-col gap-4">
        {[1, 2, 3, 4].map((item) => (
          <li key={item} className="border py-6 px-4 flex justify-between rounded">
            <div>
              <h2 className="text-2xl font-medium uppercase">Abu Raihan</h2>
              <p className="lowercase">raihan@gmail.com</p>
              <p className="capitalize">35 years</p>
            </div>
            <div className="flex gap-2 items-start">
              <button className="c-btn bg-red-600">delete</button>

              <Link href={`/updateUser/123`}>
                <button className="c-btn bg-green-600">update</button>
              </Link>

              <Link href={`/userDetails/123`}>
                <button className="c-btn bg-blue-600">details</button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
