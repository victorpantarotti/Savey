import { VideosContext, VideosObject } from "@/contexts/VideosContext";
import { useContext } from "react";

export const useVideosContext = () => {
    const { videos, setVideos } = useContext(VideosContext);

    const changeVideosOrder = (currentPos: number, newPos: number) => {
        const newArray = videos.map((video) => {
            if (video.order === currentPos) {
                return { ...video, order: newPos };
            }

            // de baixo pra cima
            if (currentPos > newPos) {
                if (video.order > newPos && video.order <= currentPos || video.order === newPos) {
                    return { ...video, order: video.order + 1 };
                }
            }

            // de cima pra baixo
            if (video.order < newPos && video.order >= currentPos || video.order === newPos) {
                return { ...video, order: video.order - 1 };
            }

            return video;
        }).sort((a, b) => a.order - b.order);
        
        return setVideos(newArray); 
    };

    const deleteVideo = (video: VideosObject) => {
        let index = videos.indexOf(video);
        if (index > -1) {
            videos.splice(index, 1);
        }

        setVideos(videos.map((v) => {
            if (v.order > video.order) return { ...v, order: v.order-- };
            return { ...v };
        }));
    };

    return {
        videos,
        changeVideosOrder,
        deleteVideo
    };
};