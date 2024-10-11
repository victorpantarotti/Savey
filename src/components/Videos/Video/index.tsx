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
    const { changeVideosOrder, deleteVideo, favoriteAction, favoriteListState, setTimestampState } = useVideosContext();
    const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);

    const handleArrowUp = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        if (clickTimeout) { // double click
            clearTimeout(clickTimeout);
            setClickTimeout(null);

            alert('Double click detected!');
        } else {
            const timeout = setTimeout(() => { // single click
                changeVideosOrder(order, order - 1);
                setClickTimeout(null);
            }, 150);
            setClickTimeout(timeout);
        }
    };

    return (
        <div className={styles.video}>
            <p className={styles.order}>{favoriteListState ? favoriteOrder : order}</p>
            <a href={`https://youtube.com/watch?v=${id}`} target="_blank" className={styles.thumb}>
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
                <a href={`https://youtube.com/watch?v=${id}&t=${lastTime}`} target="_blank">
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
                    changeVideosOrder(order, order + 1);
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