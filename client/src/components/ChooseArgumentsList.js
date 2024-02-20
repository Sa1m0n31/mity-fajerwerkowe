import React from 'react';
import checkIcon from '../static/img/check.svg';

const ChooseArgumentsList = ({allArguments, argumentsSelected, setArgumentsSelected}) => {
    const selectArgument = (i) => {
        if(argumentsSelected.includes(i)) {
            setArgumentsSelected((prevState) => (prevState.filter((item) => (item !== i))));
        }
        else {
            setArgumentsSelected((prevState) => ([...prevState, i]));
        }
    }

    return <div className={'chooseList'}>
        {allArguments.map((item, index) => {
            const isItemSelected = argumentsSelected.includes(index);

            return <button className={`chooseList__item ${isItemSelected ? 'chooseList__item--selected' : 'shadow'}`}
                           onClick={() => { selectArgument(index); }}
                           key={index}>
                {argumentsSelected.includes(index) ? <img className={'chooseList__item__check'}
                                                          src={checkIcon}
                                                          alt={'check'} /> : ''}

                <h4 className={'arguments__item__title'}>
                    {item.name}
                </h4>
            </button>
        })}
    </div>
};

export default ChooseArgumentsList;
