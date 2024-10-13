import { useContext } from "react";
import { FilterInterface, VideosContext, VideosObject } from "@/contexts/VideosContext";
import utils from "@/utils";

export const useVideosContext = () => {
    const { videos, setVideos, favoriteListState, setFavoriteListState, timestampState, setTimestampState, customOrder, setCustomOrder, filter, setFilter, searchState, setSearchState } = useContext(VideosContext);

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
        setSearchState
    };
};