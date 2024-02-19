import React from 'react';
import logo from '../static/img/logo.png';
import backgroundImg from '../static/img/background.jpg';

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

            <div className={'hero__content__right'}>
                <h3 className={'hero__content__right__header'}>
                    Generator odpowiedzi
                </h3>

                <textarea className={'hero__content__textarea'}
                          placeholder={'Wklej komentarz antyfajerwerkowca...'}>

                </textarea>
                <button className={'btn btn--submit'}>
                    Generuj
                </button>
                <button className={'btn--simple'}>
                    Manualnie wskaż argumenty, do których chcesz się odnieść
                </button>
            </div>
        </div>

        <div className={'section'}>
            <h3 className={'section__header'}>
                Zobacz nasze wszystkie odpowiedzi na argumenty antyfajerwerkowców
            </h3>
        </div>
    </div>
};

export default Homepage;
