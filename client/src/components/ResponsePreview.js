import React, {useEffect, useRef, useState} from 'react';
import ReactSwitch from "react-switch";
import copyIcon from '../static/img/copy.svg';
import checkIcon from '../static/img/check-black.svg';
import {togglePlaylistWithText, updatePlaylist} from "../helpers/api";

const linkPrefix = 'https://test-mity.skylo-test3.pl/odpowiedz/';

const ResponsePreview = ({playlistId, fullResponse, shortResponse}) => {
    const [recipientName, setRecipientName] = useState('');
    const [link, setLink] = useState('');
    const [visibleShort, setVisibleShort] = useState(true);
    const [withText, setWithText] = useState(true);

    const copiedNotice = useRef(null);

    useEffect(() => {
        if(playlistId > 0) {
            const newLink = generateRandomString(16);
            setLink(newLink);

            updatePlaylist(playlistId, '', `${linkPrefix}${newLink}`);
        }
    }, [playlistId]);

    useEffect(() => {
        if(playlistId > 0) {
            togglePlaylistWithText(playlistId, withText);
        }
    }, [withText, playlistId]);

    const toggleVisibleShort = () => {
        setVisibleShort(p => !p);
    }

    const toggleWithText = () => {
        setWithText(p => !p);
    }

    const generateRandomString = (length) => {
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for(let i=0; i<length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    const regenerateLink = () => {
        const newLink = `${recipientName}_${generateRandomString(6)}`;
        setLink(newLink);

        updatePlaylist(playlistId, recipientName, `${linkPrefix}${newLink}`)
    }

    const copyToClipboard = (content) => {
        const input = document.createElement('textarea');
        input.innerHTML = content;
        document.body.appendChild(input);
        input.select();
        const result = document.execCommand('copy');
        document.body.removeChild(input);

        copiedAnimation();

        return result;
    }

    const copiedAnimation = () => {
        copiedNotice.current.style.opacity = '1';
        copiedNotice.current.style.bottom = '35px';

        setTimeout(() => {
            copiedNotice.current.style.opacity = '0';
            copiedNotice.current.style.bottom = '15px';
        }, 2000);
    }

    return <div className={'preview w flex'}>
        <p className={'copied'}
           ref={copiedNotice}>
            Skopiowano odpowiedź
        </p>

        <div className={'preview__left'}>
            <h3 className={'preview__header'}>
                Odpisz komentarzem
            </h3>

            <div className={'center preview__switchWrapper'}>
                <p>
                    Pełna wersja
                </p>
                <ReactSwitch onChange={toggleVisibleShort}
                             offColor={'#201245'}
                             onColor={'#201245'}
                             uncheckedIcon={false}
                             checkedIcon={false}
                             checked={visibleShort} />
                <p>
                    Skrótowo
                </p>
            </div>

            <div className={'preview__contentWrapper'}>
                <button className={'btn--copy center'}
                        onClick={() => { copyToClipboard(visibleShort ? shortResponse : fullResponse); }}>
                    <img className={'img'} src={copyIcon} alt={'kopiuj'} />
                </button>

                <div className={'preview__content'} dangerouslySetInnerHTML={{
                    __html: visibleShort ? shortResponse : fullResponse
                }}>
                </div>
            </div>
        </div>
        <div className={'preview__right'}>
            <h3 className={'preview__header'}>
                Lub skrótowo samym linkiem
            </h3>

            <p className={'preview__right__text'}>
                Wpisz imię osoby, której odpowiadasz - umieścimy je w linku, wtedy kliknie go na 100%
            </p>

            <div className={'preview__right__form flex'}>
                <input className={'input'}
                       value={recipientName}
                       onChange={(e) => { setRecipientName(e.target.value); }}
                       placeholder={'Imię adresata'} />
                <button className={'btn--preview'}
                        disabled={recipientName.length === 0}
                        onClick={regenerateLink}>
                    Regeneruj link
                </button>
            </div>

            <label className={'preview__right__checkbox flex'}>
                <button className={'btn--checkbox center'}
                        onClick={toggleWithText}>
                    {withText ? <img className={'img'} src={checkIcon} alt={'zalacz-odpowiedz-tekstowa'} /> : ''}
                </button>
                Załącz tekstową odpowiedź na docelowej stronie
            </label>

            <div className={'preview__contentWrapper'}>
                <button className={'btn--copy center'}
                        onClick={() => { copyToClipboard(`Przykro mi, ale siejesz dezinformację, nie mam czasu wdawać się w dyskusję, ale nie mogę też zostawić
                    tych kłamstw bez odpowiedzi - przygotowałem krótki film w odpowiedzi na Twój komentarz -
                    obejrzyj i nie pisz głupot: ${linkPrefix}${link}`); }}>
                    <img className={'img'} src={copyIcon} alt={'kopiuj'} />
                </button>

                <p className={'preview__content preview__content--link'}>
                    Przykro mi, ale siejesz dezinformację, nie mam czasu wdawać się w dyskusję, ale nie mogę też zostawić
                    tych kłamstw bez odpowiedzi - przygotowałem krótki film w odpowiedzi na Twój komentarz -
                    obejrzyj i nie pisz głupot: <a target={'_blank'} href={`${linkPrefix}${link}`}>{linkPrefix}{link}</a>
                </p>
            </div>
        </div>
    </div>
};

export default ResponsePreview;
