import React from 'react';
import logo from '../static/img/logo.png';
import backgroundImg from '../static/img/background.jpg';
import ArgumentsList from "../components/ArgumentsList";
import CommentForm from "../components/CommentForm";
import HomepageStaticContent from "../components/HomepageStaticContent";
import Footer from "../components/Footer";

const Homepage = () => {
    return <div className={'container'}>
        <div className={'hero'}>
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
                        Kolejny bezrefleksyjnie powiela te same mity? Nie trać czasu! Wklej jego komentarz, a my wygenerujemy odpowiedź
                    </h2>
                </div>
            </div>

            <CommentForm />
        </div>

        <ArgumentsList />
        <HomepageStaticContent />
        <Footer />
    </div>
};

export default Homepage;
