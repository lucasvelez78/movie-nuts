import Link from "next/link";
import Image from "next/image";
import type { Movie } from "@/types/types";

const MovieCard = ({ id, poster_path, title }: Movie): JSX.Element => {
  return (
    <div className="items-center max-w-[230px]">
      <Link href={`/${id}`}>
        <Image
          key={id}
          src={
            poster_path !== null
              ? `${process.env.NEXT_PUBLIC_IMAGE_PATH}${poster_path}`
              : "/no-poster.jpeg"
          }
          alt="poster"
          width={230}
          height={264}
          className="max-h-[330px]"
        ></Image>
      </Link>
    </div>
  );
};

export default MovieCard;
