import React from 'react';
import './Home.css'
import { Container } from 'react-bootstrap';
import Data from '../../Data/Data';
import Car from '../Car/Car';

const Home = () => {
    return (
        <main>
            <Container>
                <section className="row py-5 py-md-0">
                    {Data.map(car => <Car key={car.id} car={car} />)}
                </section>
            </Container>
        </main>
    );
};

export default Home;