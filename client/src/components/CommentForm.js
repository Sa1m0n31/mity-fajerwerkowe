import React, {useEffect, useRef, useState} from 'react';
import {findArgumentsInText} from "../helpers/api";
import { Rings } from "react-loader-spinner";
import {ERROR_MESSAGE} from "../helpers/constans";

const CommentForm = () => {
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const loaderRef = useRef(null);
    const submitBtnRef = useRef(null);

    useEffect(() => {
        if(error) {
            setError('');
        }
    }, [comment]);

    useEffect(() => {
        if(error) {
            setTimeout(() => {
                setError('');
            }, 3000);
        }
    }, [error]);

    useEffect(() => {
        if(loaderRef && submitBtnRef) {
            if(loading) {
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
    }, [loading, submitBtnRef, loaderRef]);

    const sendComment = () => {
        if(comment.length < 3) {
            setError('Komentarz jest za krótki');
        }
        else if(comment.length > 5000) {
            setError('Komentarz jest za długi');
        }
        else {
            setLoading(true);

            findArgumentsInText(comment)
                .then((res) => {
                    let argumentsFound = [];

                    if(res) {
                        argumentsFound = res.data;
                    }

                    localStorage.setItem('argumentsFound', JSON.stringify(argumentsFound));
                    setLoading(false);

                    window.location.href = '/wybierz-argumenty';
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                    setError(ERROR_MESSAGE);
                })
        }
    }

    return <div className={'hero__content__right'}>
        <h3 className={'hero__content__right__header'}>
            Generator odpowiedzi
        </h3>

        <textarea className={'hero__content__textarea'}
                  value={comment}
                  onChange={(e) => { setComment(e.target.value); }}
                  placeholder={'Wklej komentarz antyfajerwerkowca...'}>

                </textarea>

        <div className={'submitBtnWrapper'}>
            {!error ? <>
                <button className={'btn btn--submit'}
                        ref={submitBtnRef}
                        onClick={sendComment}>
                    Generuj
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

        <a href={'/wybierz-argumenty'} className={'btn--simple'}>
            Manualnie wskaż argumenty, do których chcesz się odnieść
        </a>
    </div>
};

export default CommentForm;
