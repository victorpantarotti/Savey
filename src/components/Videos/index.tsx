import { useVideosContext } from "@/hooks/useVideosContext";
import { useEffect, useState } from "react";
import Video from "./Video";

import styled from "styled-components";
import utils from "@/utils";

const VideosContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 24px;
    flex-wrap: wrap;
    margin: 24px 24px 0 24px;
`;

const CenterText = styled.p`
    width: 75%;
    margin: 0 auto;
    margin-top: 15px;
    font-size: 12px;
    text-align: center;
`

const NoVideos = styled.p`
    margin: 0 auto;
`;

const Videos = () => {
    const { videos } = useVideosContext();
    const [stats, setStats] = useState({
        amount: 0,
        totalTime: "0:00:00"
    });

    useEffect(() => {
        let times: Array<string> = [];

        videos.map((video) => {
            times.push(video.time);
        });

        setStats({
            amount: videos.length,
            totalTime: utils.sumTime(times)
        });
    }, [videos]);

    return (
        <>
            <CenterText>Total de vídeos: {stats.amount} • Horas somadas: {stats.totalTime}</CenterText>
            <VideosContainer>
                {
                    videos.length > 0
                    ? videos.map((video) => {
                        return <Video video={video} key={video.id} />;
                    })
                    : <NoVideos>Você não tem nenhum vídeo salvo!</NoVideos>
                }
            </VideosContainer>
        </>
    );

};

export default Videos;