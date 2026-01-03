import { useState } from "react";
const apiUrl = "https://soundtracks.loudly.com/api/ai/prompt/songs";

function CreatePage() {
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [prompt, setPrompt] = useState("");
    const [generatedMusic, setGeneratedMusic] = useState("");

    const handleGenerate = async () => {
        if (!title || !genre || !prompt) {
            alert("title, genre and prompt are required.");
            return;
        }

        const apiKey = import.meta.env.VITE_LOUDLY_API_KEY;

        const musicPrompt = `Create a ${genre} song with title "${title}" and music style of "${prompt}".`;

        const formData = new FormData();
        formData.append("prompt", musicPrompt);
        formData.append("duration", "30"); // 空にしない（重要）

        try {
            const res = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "API-KEY": apiKey,
                    Accept: "application/json",
                },
                body: formData,
            });

            if (!res.ok) {
                console.error("Status:", res.status);
                const text = await res.text();
                console.error(text);
                return;
            }

            const data = await res.json();
            if (data?.music_file_path) {
                setGeneratedMusic(data.music_file_path);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSave = () => {
        if (!generatedMusic) {
            alert("音楽を生成してから保存してください。");
        }

        const musicData = {
            id: Date.now().toString(),
            title: title,
            genre: genre,
            artist: "AI Generated",
            prompt: prompt,
            audioUrl: generatedMusic,
            coverUrl: `https://picsum.photos/400/400?random=${Date.now()}`,
        };

        const saveMusic = JSON.parse(
            localStorage.getItem("generatedMusic") || "[]"
        );
        saveMusic.push(musicData);
        localStorage.setItem("generatedMusic", JSON.stringify(saveMusic));
        alert("音楽を保存しました！");
    };

    return (
        <div>
            <h1>音楽生成ページ</h1>
            <div>
                <div>
                    <label>楽曲タイトル</label>
                    <input
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        type="text"
                        placeholder="楽曲のタイトルを入力"
                    />
                </div>
                <div>
                    <label>ジャンル</label>
                    <select
                        value={genre}
                        onChange={(e) => {
                            setGenre(e.target.value);
                        }}
                    >
                        <option value="">ジャンルを選択</option>
                        <option value="electronic">electronic</option>
                        <option value="jazz">jazz</option>
                        <option value="classic">classic</option>
                        <option value="ambient">ambient</option>
                        <option value="rock">rock</option>
                        <option value="pop">pop</option>
                    </select>
                </div>
                <div>
                    <label>音楽の説明</label>
                    <textarea
                        value={prompt}
                        onChange={(e) => {
                            setPrompt(e.target.value);
                        }}
                        placeholder="どんな音楽を作りたいか説明してください..."
                    />
                </div>
                <button onClick={handleGenerate}>音楽を生成</button>

                {generatedMusic && (
                    <div>
                        <h3>生成された音楽</h3>
                        <audio controls>
                            <source src={generatedMusic} type="audio/mpeg" />
                        </audio>
                    </div>
                )}
                <button onClick={handleSave}>音楽を保存</button>
            </div>
        </div>
    );
}

export default CreatePage;
