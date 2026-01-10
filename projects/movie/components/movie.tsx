// components/movie.tsx
import Link from "next/link";
import Image from "next/image";
import { MovieType } from "@/types/global";

const url = "http://image.tmdb.org/t/p/w185";

export default function Movie({ movie }: { movie: MovieType }) {
    return (
        <div className="w-46 text-center">
            <Link href={`/view/${movie.id}`}>
                <div className="relative w-46.25 aspect-2/3 overflow-hidden">
                    <Image
                        src={url + movie.poster_path}
                        alt={movie.title}
                        fill
                        sizes="185px"
                        className="object-cover hover:scale-105 transition-all"
                    />
                </div>
            </Link>
            <h3 className="mt-2">{movie.title}</h3>
            <div className="text-sm text-gray-600">
                {movie.release_date.split("-")[0]}
            </div>
        </div>
    );
}
