import React from 'react';
import backgroundImg from "../static/img/background.jpg";
import logo from "../static/img/logo.png";
import CommentForm from "./CommentForm";

const Hero = () => {
    return <div className={'hero'}>
        <div className={'backgroundOverlay'}></div>
        <figure className={'background'}>
            <img className={'background__img'} src={backgroundImg} alt={'mity-fajerwerkowe'} />
        </figure>
        <div className={'backgroundBottom'}></div>

        <div className={'hero__content flex'}>
            <div className={'hero__content__left'}>
                <div className={'logo'}>
                    <img className={'img'} src={logo} alt={'arka-fajerwerki'} />
                </div>

                <h1 className={'hero__content__header'}>
                    Jałowa dyskusja z antyfajerwerkowcem?
                </h1>
                <h2 className={'hero__content__subheader'}>
                    Kolejny bezrefleksyjnie powiela te same mity? Nie trać czasu! Wklej jego komentarz,
                    a my wygenerujemy odpowiedź.
                </h2>
            </div>
        </div>

        <CommentForm />
    </div>
};

export default Hero;
