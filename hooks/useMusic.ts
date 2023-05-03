import useSWR, { Fetcher } from "swr";
import axios from "axios";

export type Music = {
  id: number;
  nome: string;
  url: string;
  image: string;
  duration: number;
};

const fetcher: Fetcher<Music[], string> = (url: string) =>
  axios.get(url).then((res) => JSON.parse(res.data));

const useMusics = () => {
  const { data, error } = useSWR("/api/musicsData", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return { data, error };
};

export default useMusics;
