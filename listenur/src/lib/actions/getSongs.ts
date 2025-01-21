// https://medium.com/@ferlat.simon/infinite-scroll-with-nextjs-server-actions-a-simple-guide-76a894824cfd

"use server";

const getSongs = async (
  offset: number,
  limit: number,
  filter: string = "none",
  order: string = "asc",
  search: string = ""
) => {
  try {
    const url = `http://localhost:3000/api/songs/?filter=${filter}&order=${order}&offset=${offset}&limit=${limit}&search=${search}`;
    const response = await fetch(url);
    return response.json();
  } catch (error: unknown) {
    console.error(error);
    throw new Error("Error fetching songs!");
  }
};

export default getSongs;
