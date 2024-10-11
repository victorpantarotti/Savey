import { VideosContext, VideosObject } from "@/contexts/VideosContext";
import { useContext } from "react";

export const useVideosContext = () => {
    const { videos, setVideos, favoriteListState, setFavoriteListState, timestampState, setTimestampState } = useContext(VideosContext);

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

    const favoriteAction = (video: VideosObject) => {
        if (video.favorite) return remFavorite(video);
        return addFavorite(video);
    };

    const addFavorite = (video: VideosObject) => {
        let favorites = videos.filter((v) => v.favorite === true);

        setVideos(videos.map((v) => {
            if (v.id === video.id) return { ...v, favorite: true, favoriteOrder: favorites.length };
            return { ...v };
        }));
    };

    const remFavorite = (video: VideosObject) => {
        setVideos(videos.map((v) => {
            if (v.id === video.id) return { ...v, favorite: false, favoriteOrder: 0 };
            if (v.favoriteOrder > video.favoriteOrder) return { ...v, favoriteOrder: v.favoriteOrder-- };
            return { ...v };
        }));
    };

    const saveTimestamp = (video: VideosObject, timestamp: string) => {
        setVideos(videos.map((v) => {
            if (v.id === video.id) return { ...v, lastTime: timestamp };
            return { ...v };
        }));
    };

    return {
        videos,
        favoriteListState,
        setFavoriteListState,
        timestampState,
        setTimestampState,
        changeVideosOrder,
        deleteVideo,
        favoriteAction,
        saveTimestamp
    };
};