import Head from "next/head";
import { useEffect, useState, FormEventHandler } from "react";
import MovieCard from "@/components/MovieCard";
import type { Movies } from "@/types/types";
import Link from "next/link";
import { useSession, signOut, getSession } from "next-auth/react";
import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  const { results }: { results: Movies } = await res.json();
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { movies: results, session },
  };
};

const Home = ({ movies }: { movies: Movies }) => {
  const [fetchedMovies, setFetchedMovies] = useState<Movies>([]);
  const [searchKeyWord, setSearchKeyWord] = useState<string>("");
  const { status } = useSession({ required: true });

  useEffect(() => {
    setFetchedMovies(movies);
  }, [movies]);

  const handleChange: FormEventHandler<HTMLInputElement> = (event) => {
    const input = event.currentTarget.value;
    setSearchKeyWord(input);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    let movies = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${searchKeyWord}`
    );
    const { results }: { results: Movies } = await movies.json();
    setFetchedMovies(results);
  };

  if (status === "authenticated") {
    return (
      <>
        <Head>
          <title>Movie Nuts</title>
        </Head>
        <header className="mb-32 flex justify-between fixed w-full">
          <Link href="/movie-nuts">
            <h1 className="text-5xl font-rampart text-[#A9333A] pl-12 mt-3">
              Movie Nuts
            </h1>
          </Link>
          <form onSubmit={onSubmit} className="p-4 mt-0">
            <label className="text-[#ECDBBA] pr-2 text-2xl">title: </label>
            <input
              className="rounded-3xl px-3 py-2 bg-[#ECDBBA] text-[#C84B31] placeholder-[#C84B31] border-0 opacity-80"
              placeholder="Search"
              value={searchKeyWord}
              onChange={handleChange}
            ></input>
            <button type="submit" className="p-2 w-4">
              <svg
                className="ml-1  text-[#ECDBBA]  -mb-1.5"
                stroke="currentColor"
                fill="none"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
                height="1.7em"
                width="1.7em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>
          <button className="text-[#ECDBBA] mr-8" onClick={() => signOut()}>
            Sign Out
          </button>
        </header>
        <div className="my-10 ml-6 grid gap-8 grid-cols-5 ">
          {fetchedMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              poster_path={movie.poster_path}
              title={movie.title}
            />
          ))}
        </div>
      </>
    );
  } else {
    return;
  }
};

export default Home;
