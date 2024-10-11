import { createContext, ReactElement, SetStateAction, useEffect, useState } from "react";
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

interface TimestampStateInferface {
    active: boolean,
    video: VideosObject | object
}

interface VideosContextInterface {
    videos: Array<VideosObject>,
    setVideos: React.Dispatch<SetStateAction<Array<VideosObject>>>,
    favoriteListState: boolean,
    setFavoriteListState: React.Dispatch<SetStateAction<boolean>>
    timestampState: object,
    setTimestampState: React.Dispatch<SetStateAction<object>>
}

interface VideosProviderProps {
    children: ReactElement
}

export const VideosContext = createContext<VideosContextInterface>({} as VideosContextInterface);
VideosContext.displayName = "Videos";

export const VideosProvider = ({ children }: VideosProviderProps) => {
    const { user } = usePreferencesContext();
    
    const db = getDatabase(firebaseConfig);
    const [videos, setVideos] = useState([]);
    const [favoriteListState, setFavoriteListState] = useState(false);
    const [timestampState, setTimestampState] = useState<TimestampStateInferface>({
        active: false,
        video: {}
    });

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
            setTimestampState
        }}>
            {children}
        </VideosContext.Provider>
    );
};