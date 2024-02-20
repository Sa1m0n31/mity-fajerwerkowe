import React from 'react';
import {Rings} from "react-loader-spinner";

const LoadingPage = () => {
    return <div className={'loadingPage'}>
        <Rings visible={true}
               height="50"
               width="50"
               color="#201245"
               ariaLabel="rings-loading"
               wrapperStyle={{}}
               wrapperClass="" />
    </div>
};

export default LoadingPage;
