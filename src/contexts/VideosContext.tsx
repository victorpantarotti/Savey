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

interface VideosContextInterface {
    videos: Array<VideosObject>,
    setVideos: React.Dispatch<SetStateAction<Array<VideosObject>>>
}

interface VideosProviderProps {
    children: ReactElement
}

export const VideosContext = createContext<VideosContextInterface>({} as VideosContextInterface);
VideosContext.displayName = "Videos";

export const VideosProvider = ({ children }: VideosProviderProps) => {
    const db = getDatabase(firebaseConfig);
    const [videos, setVideos] = useState([]);
    const { user } = usePreferencesContext();

    useEffect(() => {
        if (user) {
            get(ref(db, user)).then((snap) => {
                if (snap.exists()) {
                    const array = utils.objectToArray(snap.val());
                    const sortedArray = array.sort((a, b) => a.order - b.order);
                    return setVideos(sortedArray);

                    /* to show favorites
                    const filterFavorites = array.filter((item) => item.favoriteOrder > 0);
                    const sortedArray = filterFavorites.sort((a, b) => a.favoriteOrder - b.favoriteOrder);
                    return setVideos(sortedArray); 
                    */
                }
                return setVideos([]);
            });
        }
    }, [user]);


    return (
        <VideosContext.Provider value={{ videos, setVideos }}>
            {children}
        </VideosContext.Provider>
    );
};