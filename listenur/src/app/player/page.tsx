import styles from "./player.module.css";
import AudioBrowser from "@/components/audioBrowser/audioBrowser";
import AudioPlayer from "@/components/audioPlayer/audioPlayer";

const getSongs = async () => {
    const res = await fetch(`http://localhost:3000/api/songs/`);
  
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
  
    return res.json();
};

const getAlbums = async () => {
    const res = await fetch(`http://localhost:3000/api/albums/`);
  
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
  
    return res.json();
};
  

const PlayerPage = async () => {
    const songs = await getSongs();
    const albums = await getAlbums();

    return (
        <main className="flex-1 container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* @ts-ignore */}
            <AudioBrowser songs={ songs } albums={ albums } />
            <AudioPlayer />
        </main>

    );
};

export default PlayerPage;