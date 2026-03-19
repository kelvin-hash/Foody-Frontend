import React from 'react';
import Navbar from '../components/navbar';
import Hero from '../components/hero';
import Restaurant from '../components/restaurant';
import Partners from '../components/partners';
import Footer from '../components/footer';

function Home(){
    return(
        <>
        <Navbar />
        <Hero />
        <Restaurant />
        <Partners />
        <Footer />
        </>
    );
}
export default Home;