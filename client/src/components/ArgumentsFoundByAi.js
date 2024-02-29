import React, {useEffect, useState} from 'react';
import {getAllArguments} from "../helpers/api";
import checkIcon from "../static/img/check.svg";

const ArgumentsFoundByAi = ({argumentsIndexes}) => {
    const [allArguments, setAllArguments] = useState([]);

    useEffect(() => {
        if(argumentsIndexes?.length) {
            getAllArguments()
                .then((res) => {
                    if(res) {
                        setAllArguments(res.data.filter((item, index) =>
                            (argumentsIndexes.includes(index))));
                    }
                });
        }
    }, [argumentsIndexes]);

    return <div className={'chooseList chooseList--foundByAi'}>
        {allArguments.map((item, index) => {
            return <button className={`flex chooseList__item chooseList__item--selected`}
                           key={index}>
                <img className={'chooseList__item__check'}
                     src={checkIcon}
                     alt={'check'} />

                <figure className={'chooseList__item__image center'}>
                    <img className={'img'} src={item.miniature_img} alt={item.miniature_title} />
                </figure>

                <h4 className={'arguments__item__title'}>
                    {item.name}
                </h4>
            </button>
        })}
    </div>
};

export default ArgumentsFoundByAi;
