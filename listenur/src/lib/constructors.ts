import { uint8ArrayToBase64 } from "uint8array-extras";

export function constructSongObj(path: string, metadata: any, albumID: string, artistID: string, genreID: string) {
    return {
        path: path,
        title: metadata.common.title,
        duration: metadata.format.duration,
        yearReleased: metadata.common.year,
        trackNumber: metadata.common.track.no,
        album: albumID,
        artist: artistID,
        genre: genreID,
    };
};

export function constructGenreObj(metadata: any) {
    return {
        name: metadata.common.genre[0],
    };
};

export function constructArtistObj(metadata: any) {
    return  {
        name: metadata.common.artist,
    };
};

export function constructAlbumObj(metadata: any) {
    const picture = metadata.common.picture?.[0];
    return  {
        title: metadata.common.album,
        data: picture ? uint8ArrayToBase64(picture.data) : undefined,
        imageType: picture?.format,
    };
};