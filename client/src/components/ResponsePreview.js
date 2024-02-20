import React, {useEffect, useState} from 'react';
import ReactSwitch from "react-switch";

const linkPrefix = 'http://localhost:3000/odpowiedz/';

const ResponsePreview = ({fullResponse, shortResponse}) => {
    const [recipientName, setRecipientName] = useState('');
    const [link, setLink] = useState('');
    const [visibleShort, setVisibleShort] = useState(true);

    useEffect(() => {
        setLink(generateRandomString(16));
    }, []);

    const toggleVisibleShort = () => {
        setVisibleShort(p => !p);
    }

    const generateRandomString = (length) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for(let i=0; i<length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    const regenerateLink = () => {
        setLink(`${recipientName}_${generateRandomString(6)}`);
    }

    return <div className={'preview w flex'}>
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

            <div className={'preview__content'} dangerouslySetInnerHTML={{
                __html: visibleShort ? shortResponse : fullResponse
            }}></div>
        </div>
        <div className={'preview__right'}>
            <h3 className={'preview__header'}>
                Lub skrótowo samym linkiem
            </h3>

            <p className={'preview__right__text'}>
                Wpisz imię osoby, której odpowiadasz - umieścimy je w linku, wtedy kliknie go na 100% :)
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

            <p className={'preview__content preview__content--link'}>
                Przykro mi, ale siejesz dezinformację, nie mam czasu wdawać się w dyskusję, ale nie mogę też zostawić
                tych kłamstw bez odpowiedzi - przygotowałem krótki film w odpowiedzi na Twój komentarz -
                obejrzyj i nie pisz głupot: {linkPrefix}{link}
            </p>
        </div>
    </div>
};

export default ResponsePreview;
