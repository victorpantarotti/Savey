import { VideosObject } from "@/contexts/VideosContext";

import styles from "./Video.module.css";
import { CgArrowUp, CgPlayButton } from "react-icons/cg";
import { FaArrowDown, FaArrowUp, FaClock, FaHeart, FaPlay, FaRegClock, FaRegHeart, FaTrash } from "react-icons/fa";

interface VideoProps {
    video: VideosObject
}

const Video = ({ video }: VideoProps) => {
    const {channel, favorite, id, lastTime, thumb, time, title } = video;

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
                <a onClick={(e) => e.preventDefault()}>
                    <FaArrowUp />
                </a>
                <a href={`https://youtube.com/watch?v=${id}`} target="_blank">
                    <FaPlay />
                </a>
                <a onClick={(e) => e.preventDefault()}>
                    {favorite ? <FaHeart /> : <FaRegHeart /> }
                </a>
                <a onClick={(e) => e.preventDefault()}>
                    <FaArrowDown />
                </a>
                <a onClick={(e) => e.preventDefault()}>
                    <FaClock />
                </a>
                <a onClick={(e) => e.preventDefault()}>
                    <FaTrash />
                </a>
            </div>
        </div>
    );
};

export default Video;