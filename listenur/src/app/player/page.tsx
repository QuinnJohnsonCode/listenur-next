import styles from "./player.module.css";
import AudioBrowser from "@/components/audioBrowser/audioBrowser";
import AudioPlayer from "@/components/audioPlayer/audioPlayer";

const PlayerPage = async () => {
    return (
        <div>

            {/* Browser/Player */}
            <div className={styles.container}>
                <AudioBrowser />
                <AudioPlayer />
            </div>

        </div>

    );
};

export default PlayerPage;