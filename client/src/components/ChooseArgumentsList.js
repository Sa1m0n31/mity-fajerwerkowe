import React, {useState} from 'react';
import checkIcon from '../static/img/check.svg';
import iconLong from "../static/img/long.svg";
import iconShort from "../static/img/short.svg";
import ArgumentItem from "./ArgumentItem";
import ArgumentItemShort from "./ArgumentItemShort";

const ChooseArgumentsList = ({allArguments, argumentsSelected, setArgumentsSelected}) => {
    const [longView, setLongView] = useState(false);

    const selectArgument = (i) => {
        if(argumentsSelected.includes(i)) {
            setArgumentsSelected((prevState) => (prevState.filter((item) => (item !== i))));
        }
        else {
            setArgumentsSelected((prevState) => ([...prevState, i]));
        }
    }

    const getRandomVariant = (variants) => {
        return variants[Math.floor(Math.random() * variants.length)];
    }

    return <div className={'chooseListWrapper'}>
        <div className={'section__choice center'}>
            <button className={longView ? 'btn btn--view btn--view--selected' : 'btn btn--view'}
                    onClick={() => { setLongView(true); }}>
                <img className={'img'} src={iconLong} alt={'long'} />
                Widok rozbudowany
            </button>

            <button className={longView ? 'btn btn--view' : 'btn btn--view btn--view--selected'}
                    onClick={() => { setLongView(false); }}>
                <img className={'img'} src={iconShort} alt={'short'} />
                Widok skrótowy
            </button>
        </div>

        <div className={`chooseList ${!longView ? 'chooseList--small' : ''}`}>
            {allArguments.map((item) => {
                const { counterargument_variants, counterargument_yt_link,
                    miniature_img, name, flag, id } = item;
                const counterargument = getRandomVariant(counterargument_variants);

                return longView ? <ArgumentItem id={id}
                                                counterargument={counterargument}
                                                flag={flag}
                                                image={miniature_img}
                                                name={name}
                                                ytLink={counterargument_yt_link} /> : <ArgumentItemShort id={id}
                                                                                                         image={miniature_img}
                                                                                                         name={name} />
            })}
        </div>
    </div>
};

export default ChooseArgumentsList;
