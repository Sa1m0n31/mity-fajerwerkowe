import React from 'react';
import ArgumentsList from "../components/ArgumentsList";
import HomepageStaticContent from "../components/HomepageStaticContent";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

const Homepage = () => {
    return <div className={'container'}>
        <Hero />
        <ArgumentsList />
        <HomepageStaticContent />
        <Footer />
    </div>
};

export default Homepage;
