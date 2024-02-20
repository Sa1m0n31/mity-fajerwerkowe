import React from 'react';

const ArgumentBadge = ({type}) => {
    return <div className={`arguments__item__badge arguments__item__badge--${type.toLowerCase()}`}>
        {type}
    </div>
};

export default ArgumentBadge;
