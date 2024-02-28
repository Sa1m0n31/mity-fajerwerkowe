import React from 'react';
import ArgumentsList from "../components/ArgumentsList";
import HomepageStaticContent from "../components/HomepageStaticContent";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import {Helmet} from "react-helmet";
import ArgumentsSelectedCounter from "../components/ArgumentsSelectedCounter";

const Homepage = () => {
    return <div className={'container'}>
        <Helmet>
            <title>Mity fajerwerkowe</title>
        </Helmet>

        <Hero />
        <ArgumentsList />
        <HomepageStaticContent />
        <Footer />

        <ArgumentsSelectedCounter />
    </div>
};

export default Homepage;
