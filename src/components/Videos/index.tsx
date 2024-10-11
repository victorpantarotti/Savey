import { useVideosContext } from "@/hooks/useVideosContext";
import { useEffect, useState } from "react";
import Video from "./Video";

import styled from "styled-components";
import utils from "@/utils";
import Timestamp from "./Timestamp";

const VideosContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 24px;
    flex-wrap: wrap;
    margin: 24px 24px 0 24px;
    padding-bottom: 50px;
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
    const { videos, favoriteListState } = useVideosContext();
    const [stats, setStats] = useState({
        amount: 0,
        totalTime: "0:00:00"
    });

    const getList = () => {
        if (favoriteListState) {
            const filterFavorites = videos.filter((item) => item.favoriteOrder > 0);
            const sortedArray = filterFavorites.sort((a, b) => a.favoriteOrder - b.favoriteOrder);
            return sortedArray;
        }
        return videos;
    };

    useEffect(() => {
        let times: Array<string> = [];

        getList().map((video) => {
            times.push(video.time);
        });

        setStats({
            amount: getList().length,
            totalTime: utils.sumTime(times)
        });
    }, [videos, favoriteListState]);

    return (
        <>
            <Timestamp />
            <CenterText>Total de vídeos: {stats.amount} • Horas somadas: {stats.totalTime}</CenterText>
            <VideosContainer>
                {
                    getList().length > 0
                    ? getList().map((video) => {
                        return <Video video={video} key={video.id} />;
                    })
                    : favoriteListState ? <NoVideos>Você não tem nenhum vídeo favorito!</NoVideos> : <NoVideos>Você não tem nenhum vídeo salvo!</NoVideos>
                }
            </VideosContainer>
        </>
    );

};

export default Videos;