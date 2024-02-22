import React, {useEffect, useState} from 'react';
import LoadingPage from "../components/LoadingPage";
import backgroundImg from "../static/img/background.jpg";
import logo from "../static/img/logo.png";
import {getAllArguments, getFullTextResponse, getPlaylistByLink} from "../helpers/api";
import Playlist from "../components/Playlist";
import Footer from "../components/Footer";
import {Helmet} from "react-helmet";

const ResponsePage = () => {
    const [loading, setLoading] = useState(true);
    const [recipientName, setRecipientName] = useState('');
    const [argumentsIds, setArgumentsIds] = useState([]);
    const [withText, setWithText] = useState(false);
    const [fullTextResponse, setFullTextResponse] = useState('');
    const [allArguments, setAllArguments] = useState([]);
    const [playlist, setPlaylist] = useState([]);

    useEffect(() => {
        const link = window.location.href.split('/').slice(-1)[0];

        getAllArguments()
            .then((res) => {
                if(res?.data) {
                    setAllArguments(res.data);
                }
            });

        getPlaylistByLink(link)
            .then((res) => {
                if(res) {
                    setLoading(false);

                    const obj = res.data;

                    if(obj) {
                        setArgumentsIds(JSON.parse(obj.arguments_array));
                        setWithText(obj.with_text);
                        setRecipientName(obj.recipient_name);
                    }
                }
            });
    }, []);

    useEffect(() => {
        if(allArguments?.length && argumentsIds?.length) {
            setPlaylist(allArguments
                .filter((item) => (argumentsIds.includes(item.id)))
                .map((item) => {
                    const { miniature_title, miniature_img, counterargument_yt_link } = item;

                    return {
                        title: miniature_title,
                        image: miniature_img,
                        video: counterargument_yt_link
                    }
                }));
        }
    }, [allArguments, argumentsIds]);

    useEffect(() => {
        if(argumentsIds?.length && withText) {
            getFullTextResponse(argumentsIds)
                .then((res) => {
                    if(res.data) {
                        setFullTextResponse(res.data);
                    }
                });
        }
    }, [argumentsIds, withText]);

    return loading ? <LoadingPage /> : <div className={'container container--responsePage'}>
        <Helmet>
            <title>Mity fajerwerkowe</title>
        </Helmet>

        <div className={'w'}>
            <div className={`chooseArgumentsHeading`}>
                <div className={'backgroundOverlay'}></div>
                <figure className={'background'}>
                    <img className={'background__img'} src={backgroundImg} alt={'mity-fajerwerkowe'} />
                </figure>
                <div className={'backgroundBottom'}></div>

                <div className={'hero__content flex'}>
                    <div className={'hero__content__left'}>
                        <a href={'/'}
                           className={'logo'}>
                            <img className={'img'} src={logo} alt={'arka-fajerwerki'} />
                        </a>
                    </div>
                    <div className={'hero__content__right'}>
                        <h1 className={'chooseArgumentsHeader chooseArgumentsHeader--responsePage'}>
                            {recipientName ? `${recipientName}, poniżej` : 'Poniżej'} playlista argumentów
                            przez Ciebie poruszonych i odpowiedzi na nie - specjalnie
                            przygotowana dla Ciebie:
                        </h1>
                    </div>
                </div>
            </div>

            <div className={'preview preview--response flex'}>
                {fullTextResponse ? <div className={'preview__left'}>
                    <div className={'preview__contentWrapper'}>
                        <div className={'preview__content'} dangerouslySetInnerHTML={{
                            __html: fullTextResponse
                        }}>
                        </div>
                    </div>
                </div> : ''}
                <div className={'preview__right'}>
                    {playlist?.length ? <Playlist list={playlist} /> : ''}
                </div>
            </div>
        </div>

        <Footer />
    </div>
};

export default ResponsePage;
