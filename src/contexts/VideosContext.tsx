import React, { createContext, ReactElement, SetStateAction, useEffect, useState } from "react";
import { useLoginContext } from "@/hooks/useLoginContext";
import { useGlobalContext } from "@/hooks/useGlobalContext";

import firebaseConfig from "@/utils/initDatabase";
import { get, getDatabase, ref, update } from "firebase/database";

export interface VideosObject {
    channel: string,
    favorite: boolean,
    favoriteOrder: number,
    id: string,
    lastTime: string,
    order: number,
    thumb: string,
    time: string,
    title: string
}

interface StateInferface {
    active: boolean,
    video: VideosObject
}

export interface FilterInterface {
    active: boolean,
    filter: string
}

interface VideosContextInterface {
    videos: Array<VideosObject>,
    setVideos: React.Dispatch<SetStateAction<Array<VideosObject>>>,
    favoriteListState: boolean,
    setFavoriteListState: React.Dispatch<SetStateAction<boolean>>
    timestampState: StateInferface,
    setTimestampState: React.Dispatch<SetStateAction<StateInferface>>,
    customOrder: StateInferface,
    setCustomOrder: React.Dispatch<SetStateAction<StateInferface>>,
    filter: FilterInterface,
    setFilter: React.Dispatch<SetStateAction<FilterInterface>>,
    searchState: boolean,
    setSearchState: React.Dispatch<SetStateAction<boolean>>,
    addVideoState: boolean,
    setAddVideoState: React.Dispatch<SetStateAction<boolean>>,
    isVideosLoaded: boolean
}

interface VideosProviderProps {
    children: ReactElement
}

export const VideosContext = createContext<VideosContextInterface>({} as VideosContextInterface);
VideosContext.displayName = "Videos";

export const VideosProvider = ({ children }: VideosProviderProps) => {
    const { user } = useLoginContext();
    const { showLoading, createAlert } = useGlobalContext();
    
    const db = getDatabase(firebaseConfig);
    const [videos, setVideos] = useState<VideosObject[]>([]);
    const [favoriteListState, setFavoriteListState] = useState(false);
    const [timestampState, setTimestampState] = useState<StateInferface>({
        active: false,
        video: {} as VideosObject
    });
    const [customOrder, setCustomOrder] = useState<StateInferface>({
        active: false,
        video: {} as VideosObject
    });
    const [filter, setFilter] = useState<FilterInterface>({
        active: false,
        filter: ""
    });
    const [searchState, setSearchState] = useState(false);
    const [addVideoState, setAddVideoState] = useState(false);
    const [isVideosLoaded, setIsVideosLoaded] = useState(false);

    const getVideos = () => get(ref(db, user?.uuid)).then(async (snap) => {
        if (snap.exists() && snap.val().videos) {
            const array = snap.val().videos;
            const sortedArray = array.sort((a: VideosObject, b: VideosObject) => a.order - b.order);
            
            setIsVideosLoaded(true);
            return setVideos(sortedArray);
        }
        setIsVideosLoaded(true);
        return setVideos([]);
    });

    useEffect(() => {
        showLoading("show");
        
        if (user?.uuid) getVideos();
    }, [user]);

    useEffect(() => {
        window.addEventListener('beforeunload', getVideos);
        return () => {
            window.removeEventListener('beforeunload', getVideos);
        }
    }, []);

    useEffect(() => {
        if (user?.uuid) {
            update(ref(db, user.uuid), {
                videos: videos
            })
            .catch((err) => {
                console.error(err);
                return createAlert({
                    type: "fail",
                    message: "Algo deu errado!",
                    duration: "8s"
                });
            });
        }
    }, [videos]);

    return (
        <VideosContext.Provider value={{ 
            videos, 
            setVideos, 
            favoriteListState, 
            setFavoriteListState,
            timestampState,
            setTimestampState,
            customOrder,
            setCustomOrder,
            filter,
            setFilter,
            searchState,
            setSearchState,
            addVideoState,
            setAddVideoState,
            isVideosLoaded
        }}>
            {children}
        </VideosContext.Provider>
    );
};