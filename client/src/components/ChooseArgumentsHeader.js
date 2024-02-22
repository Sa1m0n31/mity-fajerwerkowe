import React from 'react';

const ChooseArgumentsHeader = ({continuation}) => {
    if(continuation === 0) {
        return <h1 className={'chooseArgumentsHeader'}>
            Wybierz argumenty, na które chcesz odpowiedzieć
        </h1>
    }
    else if(continuation === 1) {
        return <h1 className={'chooseArgumentsHeader'}>
            Nasz system nie rozpoznał żadnych argumentów. Wybierz je manualnie z listy
        </h1>
    }
    else if(continuation === 2) {
        return <h1 className={'chooseArgumentsHeader'}>
            Nasz system rozpoznał następujące argumenty poruszone w komentarzu
        </h1>
    }
    else {
        return <h1 className={'chooseArgumentsHeader'}>
            Twoja odpowiedź
        </h1>
    }
};

export default ChooseArgumentsHeader;
