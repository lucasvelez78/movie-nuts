import { GetServerSideProps } from "next";
import type { Movie, Cast } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  const movie: Movie = await res.json();

  const credits = await fetch(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  const { cast }: { cast: Cast } = await credits.json();
  const mainCast = cast.slice(0, 10);

  return {
    props: { movie: movie, cast: mainCast },
  };
};

const MovieDetail = ({ movie, cast }: { movie: Movie; cast: Cast }) => {
  return (
    <>
      <Head>
        <title>{movie.title}</title>
      </Head>
      <div className="flex content-between w-full">
        <Link href="/movie-nuts" className="w-96 block">
          <h1 className="text-5xl font-rampart text-gray-400 pl-12 mb-12">
            Movie Nuts
          </h1>
        </Link>
        <Link href="/movie-nuts" className="w-10 inline-block ml-auto mr-20">
          <h1 className="text-4xl text-gray-400 pl-12 mb-12">X</h1>
        </Link>
      </div>
      <div className="flex max-[760px]:flex-col">
        <Image
          src={
            movie.poster_path !== null
              ? `${process.env.NEXT_PUBLIC_IMAGE_PATH}${movie.poster_path}`
              : "/no-poster.jpeg"
          }
          width={440}
          height={800}
          alt={movie.title}
          className="min-w-[460px]"
        />
        <div className="pl-8 text-[#adb2c7]">
          <div className="flex justify-between">
            <h1 className="text-4xl mb-6 max-[760px]:mt-16">{movie.title}</h1>
            <p className="mr-20 bg-[#adb2c7] text-[#474E68] max-h-10 p-2 rounded-full max-[760px]:mt-16">
              {movie.vote_average?.toFixed(1)}
            </p>
          </div>
          <p className="w-[90%] tracking-wide">{movie.overview}</p>
          <div className="mt-6 grid gap-1 grid-cols-5 max-[1000px]:hidden">
            {cast.map((person) => (
              <div className="mt-6 flex-row">
                <Image
                  src={
                    person.profile_path !== null
                      ? `${process.env.NEXT_PUBLIC_IMAGE_PATH}${person.profile_path}`
                      : "/no-picture.jpeg"
                  }
                  width={150}
                  height={160}
                  alt={movie.title}
                  className="min-h-[180px]"
                />
                <p>{person.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
