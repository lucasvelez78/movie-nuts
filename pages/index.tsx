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
        <div className="text-center items-center m-auto mt-48 text-[#ECDBBA]">
          <h1 className="text-4xl mb-12">Welcome, {session.user?.name}</h1>
          <Link
            className="block w-48 h-12 mb-12 bg-[#ECDBBA] rounded-md mx-auto text-gray-800 align-middle pt-2 text-lg hover:bg-transparent hover:text-[#ECDBBA] border border-solid border-[#ECDBBA]"
            href="/movie-nuts"
          >
            Let&apos;s get nuts ►
          </Link>
          <button
            className="w-48 h-10  border border-solid border-[#ECDBBA] rounded-md text-xl hover:bg-[#ECDBBA] hover:text-gray-800 "
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
        <div className="text-center items-center m-auto mt-48 text-[#ECDBBA]">
          <h1 className="text-4xl mb-12">Please sign in</h1>
          <button
            className="w-48 h-10 mb-12 border border-solid border-[#ECDBBA] rounded-md text-xl hover:bg-[#ECDBBA] hover:text-[#20262E]"
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
