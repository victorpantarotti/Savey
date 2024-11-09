import { useState } from "react";
import { VideosObject } from "@/contexts/VideosContext";
import { useVideosContext } from "@/hooks/useVideosContext";
import { FaArrowDown, FaArrowUp, FaClock, FaHeart, FaPlay, FaRegHeart, FaTrash } from "react-icons/fa";

import styles from "./Video.module.css";

interface VideoProps {
    video: VideosObject
}

const Video = ({ video }: VideoProps) => {
    const { channel, favorite, id, lastTime, thumb, time, title, order, favoriteOrder } = video;
    const { changeVideosOrder, changeFavoriteVideosOrder, deleteVideo, favoriteAction, favoriteListState, setTimestampState, setCustomOrder } = useVideosContext();
    const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);
    let url = `https://youtube.com/watch?v=${id}&t=${lastTime}`;

    const handleArrowUp = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        if (clickTimeout) { // double click
            clearTimeout(clickTimeout);
            setClickTimeout(null);

            setCustomOrder({
                active: true,
                video: video
            });
        } else {
            const timeout = setTimeout(() => { // single click
                changeVideosOrder(id, order, order - 1);
                if (favoriteListState) changeFavoriteVideosOrder(id, favoriteOrder, favoriteOrder - 1);
                setClickTimeout(null);
            }, 200);
            setClickTimeout(timeout);
        }
    };

    return (
        <div className={styles.video}>
            <p className={styles.order}>{favoriteListState ? favoriteOrder : order}</p>
            <a href={url} target="_blank" className={styles.thumb}>
                <img src={thumb} alt={title} />
            </a>
            <div className={styles.container}>
                <h3 title={title}>{title}</h3>
                <h5>{channel} • {time}</h5>
                {
                    lastTime !== "0h0m0s"
                    ? <h5 className={styles.lastTime}>Você parou em: {lastTime}</h5>
                    : ""
                }
            </div>
            <div className={styles.buttons}>
                <a onClick={handleArrowUp}>
                    <FaArrowUp />
                </a>
                <a href={url} target="_blank">
                    <FaPlay />
                </a>
                <a onClick={(e) => {
                    e.preventDefault();
                    favoriteAction(video);
                }}>
                    {favorite ? <FaHeart /> : <FaRegHeart /> }
                </a>
                <a onClick={(e) => {
                    e.preventDefault();
                    changeVideosOrder(id, order, order + 1);
                    if (favoriteListState) changeFavoriteVideosOrder(id, favoriteOrder, favoriteOrder + 1);
                }}>
                    <FaArrowDown />
                </a>
                <a onClick={(e) => {
                    e.preventDefault();
                    setTimestampState({
                        active: true,
                        video: video
                    });
                }}>
                    <FaClock />
                </a>
                <a onClick={(e) => {
                    e.preventDefault();
                    deleteVideo(video);
                }}>
                    <FaTrash />
                </a>
            </div>
        </div>
    );
};

export default Video;