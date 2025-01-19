import styles from "./player.module.css";
import AudioBrowser from "@/components/audioBrowser/audioBrowser";
import AudioPlayer from "@/components/audioPlayer/audioPlayer";
import { AudioProvider } from "@/contexts/AudioProvider";

const PlayerPage = async () => {
  return (
    <main className="flex-1 container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
      <AudioProvider>
        {/* @ts-ignore */}
        <AudioBrowser />
        <AudioPlayer />
      </AudioProvider>
    </main>
  );
};

export default PlayerPage;
