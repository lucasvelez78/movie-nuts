import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Head from "next/head";

const Home = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <Head>
          <title>Movie Nuts</title>
        </Head>
        <div className="text-center items-center m-auto mt-48 text-gray-400">
          <h1 className="text-4xl mb-12">Welcome, {session.user?.name}</h1>
          <Link
            className="block w-48 h-12 mb-12 bg-gray-400 rounded-md mx-auto text-[#20262E] align-middle pt-2 text-lg hover:bg-[#20262E] hover:text-gray-400 border border-solid border-gray-400"
            href="/movie-nuts"
          >
            Let&apos;s get nuts ►
          </Link>
          <button
            className="w-48 h-10  border border-solid border-gray-400 rounded-md text-xl hover:bg-gray-400 hover:text-[#20262E] "
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>Movie Nuts</title>
        </Head>
        <div className="text-center items-center m-auto mt-48 text-gray-400">
          <h1 className="text-4xl mb-12">Please sign in</h1>
          <button
            className="w-48 h-10 mb-12 border border-solid border-gray-400 rounded-md text-xl hover:bg-gray-400 hover:text-[#20262E]"
            onClick={() => signIn()}
          >
            Sign In
          </button>
        </div>
      </>
    );
  }
};

export default Home;
