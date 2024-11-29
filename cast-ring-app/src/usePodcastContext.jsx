import { useContext } from "react";
import PodcastContext from "./components/PodcastContext";

export function usePodcastContext() {
  return useContext(PodcastContext);
}