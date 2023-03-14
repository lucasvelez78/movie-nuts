import Head from "next/head";
import { useEffect, useState, FormEventHandler } from "react";
import MovieCard from "@/components/MovieCard";
import type { Movies } from "@/types/types";
import Link from "next/link";

export const getServerSideProps = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  const { results }: { results: Movies } = await res.json();

  return {
    props: { movies: results },
  };
};

const Home = ({ movies }: { movies: Movies }) => {
  const [fetchedMovies, setFetchedMovies] = useState<Movies>([]);
  const [searchKeyWord, setSearchKeyWord] = useState<string>("");

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

  return (
    <>
      <Head>
        <title>Movie Nuts</title>
      </Head>
      <header className="mb-32 flex justify-between">
        <Link href="/">
          <h1 className="text-5xl font-rampart text-gray-400 pl-12">
            Movie Nuts
          </h1>
        </Link>
        <form onSubmit={onSubmit} className="p-4 pr-12">
          <label className="text-[#474E68] pr-2 text-2xl">title: </label>
          <input
            className="rounded-3xl px-3 py-2 bg-[#474E68] text-slate-50"
            placeholder="Search"
            value={searchKeyWord}
            onChange={handleChange}
          ></input>
          <button type="submit" className="p-2 w-4">
            <svg
              className="ml-3  text-[#474E68]  -mb-1.5"
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
      </header>
      <div className="my-10 ml-6 grid gap-8 grid-cols-5 ">
        {fetchedMovies.map((movie) => (
          <MovieCard
            id={movie.id}
            poster_path={movie.poster_path}
            title={movie.title}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
