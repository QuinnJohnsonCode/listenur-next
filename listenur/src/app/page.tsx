import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { IoMdMusicalNote } from "react-icons/io";

const Home = () => {
  return (
    <main className="flex flex-col flex-grow items-center justify-center">
      <div className="text-3xl mb-4">
        <span className="font-bold text-teal-400">listenur</span> successfully
        installed!
      </div>

      <div className="flex space-x-4 max-w-md mx-auto">
        {/* Listen Button */}
        <Link
          prefetch={false}
          shallow={true}
          href="/player"
          className="min-w-[200px] bg-teal-400 text-white text-lg font-semibold py-3 rounded-lg shadow-md flex items-center justify-center space-x-2 hover:bg-teal-500"
        >
          <IoMdMusicalNote className="w-6 h-6" />
          <span>Listen</span>
        </Link>

        {/* Documentation Button */}
        <Link
          href="https://github.com/QuinnJohnsonCode/listenur-next/tree/main/docs"
          target="_blank"
          className="min-w-[200px] bg-black text-white text-lg font-semibold py-3 rounded-lg shadow-md flex items-center justify-center space-x-2 hover:bg-gray-800"
        >
          <FaGithub className="w-6 h-6" />
          <span>Documentation</span>
        </Link>
      </div>
    </main>
  );
};

export default Home;
