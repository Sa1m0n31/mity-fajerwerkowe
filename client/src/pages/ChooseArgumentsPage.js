import React, {useContext, useEffect, useRef, useState} from 'react';
import LoadingPage from "../components/LoadingPage";
import ChooseArgumentsHeader from "../components/ChooseArgumentsHeader";
import ChooseArgumentsList from "../components/ChooseArgumentsList";
import backgroundImg from "../static/img/background.jpg";
import logo from "../static/img/logo.png";
import ArgumentsFoundByAi from "../components/ArgumentsFoundByAi";
import {generateTextResponse, getAllArguments} from "../helpers/api";
import ResponsePreview from "../components/ResponsePreview";
import {Rings} from "react-loader-spinner";
import Footer from "../components/Footer";
import {ERROR_MESSAGE} from "../helpers/constans";
import {Helmet} from "react-helmet";
import {ArgumentsContext} from "../App";

const ChooseArgumentsPage = () => {
    const [loading, setLoading] = useState(true);
    const [responseGenerationLoading, setResponseGenerationLoading] = useState(false);
    const [continuation, setContinuation] = useState(0);
    const [argumentsFoundByAI, setArgumentsFoundByAI] = useState([]);
    const [allArguments, setAllArguments] = useState([]);
    const [shortResponse, setShortResponse] = useState('');
    const [fullResponse, setFullResponse] = useState('');
    const [error, setError] = useState('');
    const [playlistId, setPlaylistId] = useState(-1);

    const { argumentsSelected, setArgumentsSelected } = useContext(ArgumentsContext);

    const loaderRef = useRef(null);
    const submitBtnRef = useRef(null);

    useEffect(() => {
        if(loaderRef?.current && submitBtnRef?.current) {
            if(responseGenerationLoading) {
                submitBtnRef.current.style.opacity = '0';
                loaderRef.current.style.zIndex = '1';
                loaderRef.current.style.opacity = '1';
            }
            else {
                submitBtnRef.current.style.opacity = '1';
                loaderRef.current.style.zIndex = '-1';
                loaderRef.current.style.opacity = '0';
            }
        }
    }, [responseGenerationLoading, submitBtnRef, loaderRef]);

    useEffect(() => {
        getAllArguments()
            .then((res) => {
                if(res) {
                    setAllArguments(res.data);
                }
            });

        const argumentsSelectedAndReady = localStorage.getItem('argumentsSelectedAndReady');

        if(argumentsSelectedAndReady) {
            localStorage.removeItem('argumentsSelectedAndReady');

            if(argumentsSelectedAndReady[0] === '[') {
                const arr = JSON.parse(argumentsSelectedAndReady);

                generateResponse(arr);
            }
        }
        else {
            const argumentsFound = localStorage.getItem('argumentsFound');

            if(argumentsFound !== null) {
                localStorage.removeItem('argumentsFound');

                if(argumentsFound[0] === '[') {
                    const arr = JSON.parse(argumentsFound);
                    setArgumentsSelected(arr);
                    setArgumentsFoundByAI(arr);

                    if(arr.length) {
                        setContinuation(2);
                    }
                    else {
                        setContinuation(1);
                    }
                }
                else {
                    setContinuation(1);
                }
            }

            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if(fullResponse) {
            setContinuation(3);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [fullResponse]);

    const selectOwnArguments = () => {
        setArgumentsFoundByAI([]);
    }

    const generateResponse = (argumentsSelectedProp = null) => {
        const selectedArguments = argumentsSelectedProp?.length ? argumentsSelectedProp : argumentsSelected;

        console.log(selectedArguments);

        if(selectedArguments.length) {
            setResponseGenerationLoading(true);

            const argumentsIds = argumentsSelectedProp ? selectedArguments : selectedArguments.map((item) => {
                const argumentIndex = item;
                return allArguments.find((item, index) => (index === argumentIndex))?.id;
            }).filter((item) => (item));

            generateTextResponse(argumentsIds)
                .then((res) => {
                   if(res) {
                       setShortResponse(res.data.shortResponse);
                       setFullResponse(res.data.fullResponse);
                       setPlaylistId(res.data.id);

                       localStorage.setItem('updateToken', res.data.updateToken);
                   }
                   else {
                       setError(ERROR_MESSAGE);
                   }

                   setResponseGenerationLoading(false);
                   setLoading(false);
                })
                .catch((e) => {
                    console.log(e);
                    setResponseGenerationLoading(false);
                    setLoading(false);
                    setError(ERROR_MESSAGE);
                });
        }
    }

    return loading ? <LoadingPage /> : <div className={'container'}>
        <Helmet>
            <title>Mity fajerwerkowe</title>
        </Helmet>

        <div className={'w'}>
            <div className={`chooseArgumentsHeading ${fullResponse ? 'chooseArgumentsHeading--response' : ''}`}>
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
                        <ChooseArgumentsHeader continuation={continuation} />
                    </div>
                </div>
            </div>

            {fullResponse ? <ResponsePreview playlistId={playlistId}
                                             fullResponse={fullResponse}
                                             shortResponse={shortResponse} /> : <>
                {argumentsFoundByAI.length ? <>
                    <ArgumentsFoundByAi argumentsIndexes={argumentsFoundByAI} />

                    <button onClick={selectOwnArguments}
                            className={'btn--simple btn--addOwnArguments'}>
                        Zaznacz swoje własne argumenty
                    </button>
                </> : <>
                    <ChooseArgumentsList argumentsSelected={argumentsSelected}
                                         allArguments={allArguments}
                                         setArgumentsSelected={setArgumentsSelected} />
                </>}

                <div className={'submitBtnWrapper'}>
                    {!error ? <>
                        <button className={'btn btn--submit btn--submitBig'}
                                ref={submitBtnRef}
                                onClick={generateResponse}
                                disabled={!argumentsSelected?.length}>
                            Wygeneruj odpowiedź
                        </button>

                        <div className={'loader'} ref={loaderRef}>
                            <Rings visible={true}
                                   height="50"
                                   width="50"
                                   color="#201245"
                                   ariaLabel="rings-loading"
                                   wrapperStyle={{}}
                                   wrapperClass="" />
                        </div>
                    </> : <p className={'error'}>
                        {error}
                    </p>}
                </div>
            </>}
        </div>

        <Footer />
    </div>
};

export default ChooseArgumentsPage;
