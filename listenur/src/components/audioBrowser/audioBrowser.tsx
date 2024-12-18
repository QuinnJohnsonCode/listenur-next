import styles from "./audioBrowser.module.css";

const AudioBrowser = () => {
    return (
        <div className="bg-gray-700 rounded-lg shadow-lg p-6 flex flex-col h-full">
            <h2 className="text-2xl font-semibold mb-4 text-teal-300">Browse Songs</h2>
            <ul className="max-h-[calc(100vh-20rem)] flex-1 overflow-y-auto space-y-2">
                <li className="flex cursor-pointer justify-between p-3 bg-gray-600 rounded hover:bg-teal-600 transition-colors">
                    <div className="font-medium text-white">Title - Band</div>
                    <div className="text-gray-300">Album</div>
                    <div className="text-gray-300">Duration</div>
                </li>
            </ul>
        </div>
    );
};

export default AudioBrowser;