import React, {useState} from 'react';

const Playlist = ({list}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    return <div className={'playlist flex'}>
        <div className={`playlist__main ${list?.length === 1 ? 'playlist__main--only' : ''}`}>
            <div className={'video-container'}>
                <iframe className={'playlist__main__iframe'}
                        src={list[currentIndex].video}></iframe>
            </div>
        </div>

        {list?.length > 1 ? <div className={'playlist__list'}>
            {list.map((item, index) => {
                if(index !== currentIndex) {
                    return <button className={'playlist__list__item flex'}
                                   onClick={() => { setCurrentIndex(index); }}
                                   key={index}>
                        <figure className={'playlist__list__item__img'}>
                            <img className={'img'} src={item.image} alt={item.title} />
                        </figure>
                        <h5 className={'playlist__list__item__title'}>
                            {item.title}
                        </h5>
                    </button>
                }
            })}
        </div> : ''}
    </div>
};

export default Playlist;
