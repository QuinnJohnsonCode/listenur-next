const PlayerPage = async () => {

    return (
        <div>
            <h1>Player</h1>
            <audio controls src="http://localhost:3000/api/stream/4"></audio>
        </div>
    );
};

export default PlayerPage;