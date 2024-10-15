import { useContext } from "react";
import { FilterInterface, VideosContext, VideosObject } from "@/contexts/VideosContext";
import utils from "@/utils";
import { useGlobalContext } from "./useGlobalContext";

export const useVideosContext = () => {
    const { videos, setVideos, favoriteListState, setFavoriteListState, timestampState, setTimestampState, customOrder, setCustomOrder, filter, setFilter, searchState, setSearchState, addVideoState, setAddVideoState } = useContext(VideosContext);
    const { createAlert } = useGlobalContext();

    const changeVideosOrder = (currentPos: number, newPos: number) => {
        if (newPos >= videos.length || newPos < 0) return;

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

    const changeFavoriteVideosOrder = (currentPos: number, newPos: number) => {
        if (newPos >= videos.filter((v) => v.favorite).length || newPos < 0) return;

        const newArray = videos.map((video) => {
            if (video.favorite) {
                if (video.favoriteOrder === currentPos) {
                    return { ...video, favoriteOrder: newPos };
                }
    
                // de baixo pra cima
                if (currentPos > newPos) {
                    if (video.favoriteOrder > newPos && video.favoriteOrder <= currentPos || video.favoriteOrder === newPos) {
                        return { ...video, favoriteOrder: video.favoriteOrder + 1 };
                    }
                }
    
                // de cima pra baixo
                if (video.favoriteOrder < newPos && video.favoriteOrder >= currentPos || video.favoriteOrder === newPos) {
                    return { ...video, favoriteOrder: video.favoriteOrder - 1 };
                }
            }

            return video;
        }).sort((a, b) => a.order - b.order);
        
        return setVideos(newArray); 
    };

    const addVideo = (id: string, lastTime: string) => {
        if (videos.some((video) => video.id === id)) return createAlert({
            type: "fail",
            message: "Este vídeo já foi adicionado!",
            duration: "8s"
        });

        const fetchData = async () => {
            try {
                const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}&part=snippet,statistics,contentDetails`);
                
                if (!response.ok) return createAlert({
                    type: "fail",
                    message: "Algo deu errado!",
                    duration: "8s"
                });
                
                const data = await response.json();
                    
                setVideos([ ...videos, {
                    id: id,
                    title: data.items[0].snippet.title,
                    channel: data.items[0].snippet.channelTitle,
                    thumb: data.items[0].snippet.thumbnails.medium.url,
                    time: utils.convertYTDuration(data.items[0].contentDetails.duration),
                    lastTime: lastTime ? lastTime : "0h0m0s",
                    favorite: false,
                    order: videos.length,
                    favoriteOrder: -1
                }]);

                createAlert({
                    type: "success",
                    message: "Vídeo adicionado com sucesso!",
                    duration: "8s"
                });

                if (addVideoState === true) setAddVideoState(false);
            } catch (err) {
                createAlert({
                    type: "fail",
                    message: "Algo deu errado!",
                    duration: "8s"
                });
            } finally {
                return;
            }
        };

        fetchData();
    };

    const deleteVideo = (video: VideosObject) => {
        setVideos(
            videos.filter((v) => v.id !== video.id)
            .map((v) => {
                if (v.order > video.order && !v.favorite) return { ...v, order: v.order - 1 };
                if (v.order > video.order && v.favorite && v.favoriteOrder > video.favoriteOrder) return { ...v, order: v.order - 1, favoriteOrder: v.favoriteOrder - 1 };
                if (v.favorite && v.favoriteOrder > video.favoriteOrder) return { ...v, favoriteOrder: v.favoriteOrder - 1 };
                if (v.favorite && v.favoriteOrder < video.favoriteOrder && v.order > video.order) return { ...v, order: v.order - 1 };

                return { ...v };
            })
        );
    };

    const getFavoriteList = () => {
        const filterFavorites = videos.filter((item) => item.favorite && item.favoriteOrder >= 0);
        const sortedArray = filterFavorites.sort((a, b) => a.favoriteOrder - b.favoriteOrder);
        return sortedArray;
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
            if (v.id === video.id) return { ...v, favorite: false, favoriteOrder: -1 };
            if (v.favoriteOrder > video.favoriteOrder) return { ...v, favoriteOrder: v.favoriteOrder - 1 };
            return { ...v };
        }));
    };

    const saveTimestamp = (video: VideosObject, timestamp: string) => {
        setVideos(videos.map((v) => {
            if (v.id === video.id) return { ...v, lastTime: timestamp };
            return { ...v };
        }));
    };

    const filterItems = ({ filter }: FilterInterface) => {
        let list = favoriteListState ? getFavoriteList() : videos;

        if (utils.checkTimeFormat(filter)) return list.filter((video) => {
            return utils.compareTimes(video.time, filter);
        });
        
        return list.filter((video) => {
            return video.title.toLowerCase().includes(filter.toLowerCase()) 
                || video.channel.toLowerCase().includes(filter.toLowerCase()); 
        });
    };
    
    return {
        videos,
        setVideos,
        favoriteListState,
        setFavoriteListState,
        timestampState,
        setTimestampState,
        changeVideosOrder,
        changeFavoriteVideosOrder,
        deleteVideo,
        getFavoriteList,
        favoriteAction,
        saveTimestamp,
        customOrder,
        setCustomOrder,
        filter,
        setFilter,
        filterItems,
        searchState,
        setSearchState,
        addVideo,
        addVideoState,
        setAddVideoState
    };
};