import React from 'react';
import logo from '../static/img/logo-footer.png';
import youtubeIcon from '../static/img/youtube.svg';
import facebookIcon from '../static/img/facebook.svg';

const STORE_LINK = 'https://arkafajerwerki.pl/';
const YOUTUBE_LINK = 'https://www.youtube.com/@Arkadiusz_Fajerwerkiewicz';
const FACEBOOK_LINK = 'https://www.facebook.com/arkadiusz.fajerwerkiewicz';

const Footer = () => {
    return <footer className={'footer flex w'}>
        <h6 className={'footer__header'}>
            &copy; {new Date().getFullYear()} Arka Fajerwerki
        </h6>

        <div className={'footer__links flex'}>
            <a href={STORE_LINK} target={'_blank'}>
                <img className={'img'} src={logo} alt={'arka-fajerwerki'} />
            </a>
            <a href={YOUTUBE_LINK} target={'_blank'}>
                <img className={'img'} src={youtubeIcon} alt={'arka-fajerwerki'} />
            </a>
            <a href={FACEBOOK_LINK} target={'_blank'}>
                <img className={'img'} src={facebookIcon} alt={'arka-fajerwerki'} />
            </a>
        </div>
    </footer>
};

export default Footer;
