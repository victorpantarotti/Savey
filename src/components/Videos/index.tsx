import { useVideosContext } from "@/hooks/useVideosContext";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { useEffect, useState } from "react";
import utils from "@/utils";

import Video from "./Video";
import Timestamp from "./Timestamp";
import SetOrder from "./SetOrder";
import Search from "./Search";
import AddVideo from "./AddVideo";

import styled from "styled-components";

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
    const { videos, favoriteListState, getFavoriteList, filter, filterItems } = useVideosContext();
    const { showLoading } = useGlobalContext();
    const [stats, setStats] = useState({
        amount: 0,
        totalTime: "0:00:00"
    });

    const getList = () => {
        if (filter.active) return filterItems(filter);
        if (favoriteListState) return getFavoriteList();

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

        showLoading("hide");
    }, [videos, favoriteListState, filter]);

    return (
        <>
            <AddVideo />
            <Search />
            <Timestamp />
            <SetOrder />
            <CenterText>Total de vídeos: {stats.amount} • Horas somadas: {stats.totalTime} {favoriteListState ? "• Favoritos" : ""} {filter.active ? "• Filtro ativo": ""}</CenterText>
            <VideosContainer>
                {
                    getList().length > 0
                    ? getList().map((video) => {
                        return <Video video={video} key={video.id} />;
                    })
                    : favoriteListState 
                    ? <NoVideos>Você não tem nenhum vídeo favorito!</NoVideos> : 
                        filter.active 
                        ? <NoVideos>Nenhum vídeo encontrado!</NoVideos> 
                            : <NoVideos>Você não tem nenhum vídeo salvo!</NoVideos>
                }
            </VideosContainer>
        </>
    );

};

export default Videos;