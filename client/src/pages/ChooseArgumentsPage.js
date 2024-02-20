import React, {useEffect, useRef, useState} from 'react';
import LoadingPage from "../components/LoadingPage";
import ChooseArgumentsHeader from "../components/ChooseArgumentsHeader";
import ChooseArgumentsList from "../components/ChooseArgumentsList";
import backgroundImg from "../static/img/background.jpg";
import logo from "../static/img/logo.png";
import ArgumentsFoundByAi from "../components/ArgumentsFoundByAi";
import {generateTextResponse, getAllArguments} from "../helpers/api";
import ResponsePreview from "../components/ResponsePreview";
import {Rings} from "react-loader-spinner";

const ChooseArgumentsPage = () => {
    const [loading, setLoading] = useState(true);
    const [responseGenerationLoading, setResponseGenerationLoading] = useState(false);
    const [continuation, setContinuation] = useState(0);
    const [argumentsSelected, setArgumentsSelected] = useState([]);
    const [argumentsFoundByAI, setArgumentsFoundByAI] = useState([]);
    const [allArguments, setAllArguments] = useState([]);
    const [shortResponse, setShortResponse] = useState('');
    const [fullResponse, setFullResponse] = useState('');
    const [error, setError] = useState('');

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
    }, []);

    useEffect(() => {
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

    const generateResponse = () => {
        if(argumentsSelected.length) {
            setResponseGenerationLoading(true);

            const argumentsIds = argumentsSelected.map((item) => {
                const argumentId = item;
                return allArguments.find((item) => (item.id === argumentId))?.id;
            }).filter((item) => (item));

            generateTextResponse(argumentsIds)
                .then((res) => {
                   if(res) {
                       setShortResponse(res.data.shortResponse);
                       setFullResponse(res.data.fullResponse);
                   }
                   else {
                       setError('Coś poszło nie tak... Prosimy spróbować później');
                   }

                   setResponseGenerationLoading(false);
                })
                .catch((e) => {
                    console.log(e);
                    setResponseGenerationLoading(false);
                    setError('Coś poszło nie tak... Prosimy spróbować później');
                });
        }
    }

    return loading ? <LoadingPage /> : <div className={'container'}>
        <div className={'w'}>
            <div className={'chooseArgumentsHeading'}>
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

            {fullResponse ? <ResponsePreview fullResponse={fullResponse}
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
    </div>
};

export default ChooseArgumentsPage;
