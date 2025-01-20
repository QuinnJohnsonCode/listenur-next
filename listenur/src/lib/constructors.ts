import { uint8ArrayToBase64 } from "uint8array-extras";

export function constructSongObj(
  path: string,
  metadata: any,
  albumTitle: string,
  albumID: string,
  artistID: string,
  genreID: string
) {
  return {
    path: path,
    title:
      metadata.common.title === undefined
        ? path.split("/").at(-1)?.split(".").slice(0, -1).join()
        : metadata.common.title,
    duration: metadata.format.duration,
    yearReleased:
      metadata.common.year === undefined ? "????" : metadata.common.year,
    trackNumber:
      metadata.common.track.no === undefined ? "?" : metadata.common.track.no,
    albumTitle: albumTitle,
    album: albumID,
    artist: artistID,
    genre: genreID,
  };
}

export function constructGenreObj(metadata: any) {
  return {
    name:
      metadata.common.genre === undefined
        ? "Unknown Genre"
        : metadata.common.genre[0],
  };
}

export function constructArtistObj(metadata: any) {
  return {
    name:
      metadata.common.artist === undefined
        ? "Unknown Artist"
        : metadata.common.artist,
  };
}

export function constructAlbumObj(path: string, metadata: any) {
  return {
    title:
      metadata.common.album == undefined
        ? "Unknown Album"
        : metadata.common.album,
    coverPath: path,
  };
}
