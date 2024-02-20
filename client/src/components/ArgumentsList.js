import React, {useEffect, useState} from 'react';
import {getAllArguments} from "../helpers/api";
import ArgumentItem from "./ArgumentItem";

const ArgumentsList = () => {
    const [allArguments, setAllArguments] = useState([]);

    useEffect(() => {
        getAllArguments()
            .then((res) => {
                if(res) {
                   setAllArguments(res.data);
               }
            });
    }, []);

    const getRandomVariant = (variants) => {
        return variants[Math.floor(Math.random() * variants.length)];
    }

    return <div className={'section section--arguments w'}>
        <h3 className={'section__header'}>
            Zobacz nasze wszystkie odpowiedzi na argumenty antyfajerwerkowców
        </h3>

        <div className={'arguments'}>
            {allArguments.map((item, index) => {
                const { counterargument_variants, counterargument_yt_link,
                    miniature_img, name, flag } = item;
                const counterargument = getRandomVariant(counterargument_variants);

                return <ArgumentItem counterargument={counterargument}
                                     flag={flag}
                                     image={miniature_img}
                                     name={name}
                                     ytLink={counterargument_yt_link} />
            })}
        </div>
    </div>
};

export default ArgumentsList;
