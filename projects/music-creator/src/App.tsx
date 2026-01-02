import { Button } from "./components/ui/button";

function App() {
    const musicList = [
        {
            id: 1,
            title: "Synthwave Dreams",
            artist: "AI Composer",
            audioUrl:
                "https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3",
            coverUrl:
                "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center",
        },
        {
            id: 2,
            title: "Jazz Fusion",
            artist: "Neural Network",
            audioUrl:
                "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
            coverUrl:
                "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop&crop=center",
        },
        {
            id: 3,
            title: "Ambient Spaces",
            artist: "Deep Learning",
            audioUrl:
                "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3",
            coverUrl:
                "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop&crop=center",
        },
    ];

    const playMusic = (audioUrl: string) => {
        const audio = new Audio(audioUrl);
        audio.play();
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">音楽一覧ページ</h1>

            {/* 作成した音楽 section */}
            <section>
                <h2 className="text-xl font-bold mb-4">作成した音楽</h2>
                <p>このあと実装する</p>
            </section>
            {/* おすすめ音楽 section */}
            <section>
                <h2 className="text-xl font-bold mb-4">おすすめ音楽</h2>
                <div className="flex gap-4">
                    {musicList.map((music) => (
                        <div key={music.id} className=""></div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default App;
