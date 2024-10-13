import React, { createContext, ReactElement, SetStateAction, useEffect, useState } from "react";
import firebaseConfig from "@/utils/initDatabase";
import { get, getDatabase, ref } from "firebase/database";
import utils from "@/utils/index";
import { usePreferencesContext } from "@/hooks/usePreferencesContext";

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
    setSearchState: React.Dispatch<SetStateAction<boolean>>
}

interface VideosProviderProps {
    children: ReactElement
}

export const VideosContext = createContext<VideosContextInterface>({} as VideosContextInterface);
VideosContext.displayName = "Videos";

export const VideosProvider = ({ children }: VideosProviderProps) => {
    const { user } = usePreferencesContext();
    
    const db = getDatabase(firebaseConfig);
    const [videos, setVideos] = useState<Array<VideosObject>>([]);
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

    useEffect(() => {
        if (user) {
            get(ref(db, user)).then((snap) => {
                if (snap.exists()) {
                    const array = utils.objectToArray(snap.val());
                    const sortedArray = array.sort((a, b) => a.order - b.order);
                    return setVideos(sortedArray);
                }
                return setVideos([]);
            });
        }
    }, [user]);


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
            setSearchState
        }}>
            {children}
        </VideosContext.Provider>
    );
};