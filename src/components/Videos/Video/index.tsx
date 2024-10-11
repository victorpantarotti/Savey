import { VideosObject } from "@/contexts/VideosContext";

import styles from "./Video.module.css";
import { FaArrowDown, FaArrowUp, FaClock, FaHeart, FaPlay, FaRegHeart, FaTrash } from "react-icons/fa";
import { useVideosContext } from "@/hooks/useVideosContext";

interface VideoProps {
    video: VideosObject
}

const Video = ({ video }: VideoProps) => {
    const { channel, favorite, id, lastTime, thumb, time, title, order } = video;
    const { changeVideosOrder, deleteVideo } = useVideosContext();

    return (
        <div className={styles.video}>
            <a href={`https://youtube.com/watch?v=${id}`} target="_blank" className={styles.thumb}>
                <img src={thumb} alt={title} />
            </a>
            <div className={styles.container}>
                <h3>{title}</h3>
                <h5>{channel} • {time}</h5>
                {
                    lastTime !== "0h0m0s"
                    ? <h5>Você parou em: {lastTime}</h5>
                    : ""
                }
            </div>
            <div className={styles.buttons}>
                <a onClick={(e) => {
                    e.preventDefault();
                    changeVideosOrder(order, order - 1);
                }}>
                    <FaArrowUp />
                </a>
                <a href={`https://youtube.com/watch?v=${id}`} target="_blank">
                    <FaPlay />
                </a>
                <a onClick={(e) => e.preventDefault()}>
                    {favorite ? <FaHeart /> : <FaRegHeart /> }
                </a>
                <a onClick={(e) => {
                    e.preventDefault();
                    changeVideosOrder(order, order + 1);
                }}>
                    <FaArrowDown />
                </a>
                <a onClick={(e) => e.preventDefault()}>
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