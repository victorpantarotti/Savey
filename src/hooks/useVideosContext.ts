import { useContext } from "react";
import { FilterInterface, VideosContext, VideosObject } from "@/contexts/VideosContext";
import { useGlobalContext } from "./useGlobalContext";
import { SendIntent } from "send-intent";
import utils from "@/utils";

export const useVideosContext = () => {
    const { videos, setVideos, favoriteListState, setFavoriteListState, timestampState, setTimestampState, customOrder, setCustomOrder, filter, setFilter, searchState, setSearchState, addVideoState, setAddVideoState, isVideosLoaded } = useContext(VideosContext);
    const { createAlert } = useGlobalContext();

    const changeVideosOrder = (id: string, currentPos: number, newPos: number) => {
        if (newPos >= videos.length || newPos < 0) return;

        const newArray = videos.map((video) => {
            if (video.id === id && video.order === currentPos) {
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

    const changeFavoriteVideosOrder = (id: string, currentPos: number, newPos: number) => {
        if (newPos >= videos.filter((v) => v.favorite).length || newPos < 0) return;

        const newArray = videos.map((video) => {
            if (video.favorite) {
                if (video.id === id, video.favoriteOrder === currentPos) {
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

    const addVideo = (id: string, lastTime: string, isIntent?: boolean) => {
        const intentTimeoutDelay = 2000;

        if (videos && videos.some((video) => video.id === id)) {
            if (lastTime) {
                const formattedTime = utils.convertDurationToTime(lastTime);

                setVideos(videos.map((v) => {
                    if (v.id === videos.find((video) => video.id === id)!.id) return { 
                        ...v, 
                        lastTime: formattedTime === "0s" ? "" : formattedTime
                    };
                    return { ...v };
                }));

                if (addVideoState === true) setAddVideoState(false);
                return createAlert({
                    type: "success",
                    message: "O tempo que você parou foi atualizado!",
                    duration: "8s"
                });
            }

            if (isIntent) setTimeout(() => SendIntent.finish(), intentTimeoutDelay);

            return createAlert({
                type: "fail",
                message: "Este vídeo já foi adicionado!",
                duration: "8s"
            });
        }

        const fetchData = async () => {
            try {
                const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}&part=snippet,statistics,contentDetails`);
                
                if (!response.ok) {
                    if (isIntent) setTimeout(() => SendIntent.finish(), intentTimeoutDelay);
                    return createAlert({
                        type: "fail",
                        message: "Algo deu errado!",
                        duration: "8s"
                    });
                }
                
                const data = await response.json();

                const formattedTime = utils.convertDurationToTime(lastTime);
                
                setVideos([
                    ...videos,
                    {
                        id: id,
                        title: data.items[0].snippet.title,
                        channel: data.items[0].snippet.channelTitle,
                        thumb: data.items[0].snippet.thumbnails.medium.url,
                        time: utils.convertYTDuration(data.items[0].contentDetails.duration),
                        lastTime: formattedTime === "0s" ? "" : formattedTime,
                        favorite: false,
                        order: videos.length,
                        favoriteOrder: -1
                    }
                ]);
                
                if (isIntent) setTimeout(() => SendIntent.finish(), intentTimeoutDelay);
                createAlert({
                    type: "success",
                    message: "Vídeo adicionado com sucesso!",
                    duration: "8s"
                });
                
                if (addVideoState === true) setAddVideoState(false);
            } catch (err) {
                if (isIntent) setTimeout(() => SendIntent.finish(), intentTimeoutDelay);
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
            .map((v, i) => {
                const checkFavorite = () => {
                    if (v.favorite) {
                        if (v.favoriteOrder > video.favoriteOrder) return true;
                        return false;
                    }
                    return false;
                };
                const checkedFavorite = checkFavorite();

                const favoriteOrderVerif = v.favoriteOrder - 1 < 0 ? 0 : v.favoriteOrder - 1;

                return { ...v, order: i, favoriteOrder: checkedFavorite ? favoriteOrderVerif : v.favoriteOrder };
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
        const formattedTime = utils.convertDurationToTime(timestamp);
        const lastTime = formattedTime === "0s" ? "" : formattedTime;

        setVideos(videos.map((v) => {
            if (v.id === video.id) return { ...v, lastTime };
            return { ...v };
        }));
    };

    const filterItems = ({ filter }: FilterInterface) => {
        let list = favoriteListState ? getFavoriteList() : videos;

        const timeFilters: { operator: ">" | "<", seconds: number }[] = [];
        const keywords: string[] = [];
    
        const timeRegex = /([<>])(\d+h)?(\d+m)?(\d+s)?/g;
        const keywordRegex = /\b(?!\d+[hms])[^\s<>]+/g;

        let match;
        while ((match = timeRegex.exec(filter)) !== null) {
            const [, operator, h, m, s] = match;
            const hours = h ? parseInt(h.replace("h", "")) : 0;
            const minutes = m ? parseInt(m.replace("m", "")) : 0;
            const seconds = s ? parseInt(s.replace("s", "")) : 0;

            const totalSeconds = hours * 3600 + minutes * 60 + seconds;
            timeFilters.push({ operator: operator as ">" | "<", seconds: totalSeconds });
        }

        const keywordMatches = filter.match(keywordRegex);
        if (keywordMatches) {
            keywords.push(...keywordMatches);
        }

        if (timeFilters.length === 0 && keywords.length === 0) {
            return list;
        }

        const filteredByTime = list.filter((video) => {
            const videoTime = utils.parseTimeToSeconds(video.time);

            if (timeFilters.length === 0) return true;

            return timeFilters.every((t) => {
                if (t.operator === ">") return videoTime >= t.seconds;
                if (t.operator === "<") return videoTime <= t.seconds;
                return false;
            });
        });

        const filteredByKeywords = filteredByTime.filter((video) => {
            if (keywords.length === 0) return true;

            return keywords.every((keyword) => {
                if (
                    video.title.toLowerCase().includes(keyword.toLowerCase()) 
                    || video.channel.toLowerCase().includes(keyword.toLowerCase())
                ) return true;

                return false;
            });
        });

        return filteredByKeywords;
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
        setAddVideoState,
        isVideosLoaded
    };
};