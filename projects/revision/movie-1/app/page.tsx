import { MovieType } from "@/types/global";
import Link from "next/link";

const img_url = "https://image.tmdb.org/t/p/w185";

async function fetchPopular(): Promise<MovieType[]> {
    try {
        const res = await fetch("https://api.themoviedb.org/3/movie/popular", {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
            },
            next: { revalidate: 60 * 60 }, // Next.js 推奨: キャッシュ制御　- 1時間
        });

        if (!res.ok) {
            throw new Error(`Http error: ${res.status}`);
        }
        const data = await res.json();

        if (!Array.isArray(data.results)) {
            throw new Error("Invalid response format.");
        }

        return data.results;
    } catch (error) {
        console.error("fetchPopular failed: ", error);
        return [];
    }
}

export default async function Home() {
    const popularMovieList = await fetchPopular();
    const hasError = popularMovieList.length === 0;
    return (
        <div>
            <h2 className="pb-2 mb-4 border-b font-bold">Popular</h2>
            {hasError && (
                <div>
                    <p className="text-sm text-red-500">
                        Failed to fetch Popular Movie List.
                    </p>
                </div>
            )}
            <div className="flex flex-wrap gap-3">
                {!hasError &&
                    popularMovieList.map((movie) => {
                        return (
                            <div key={movie.id}>
                                <Link
                                    href={`view/${
                                        movie.id
                                    }/${encodeURIComponent(movie.title)}`}
                                >
                                    <img
                                        className="hover:scale-105 transition-all"
                                        src={img_url + movie.poster_path}
                                    />
                                </Link>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
