import React from 'react';
import { useHistory } from 'react-router';
import './Car.css'

const Car = (props) => {
    const history = useHistory();
    const { typeOfRides, rideImage } = props.car
    return (
        <article className="col-md-3 text-center mt-5 mt-md-0" onClick={() => history.push(`/destination/${typeOfRides}`)}>
            <div className="single-ride">
                <img src={rideImage} alt={typeOfRides} className="w-50" />
                <h4 className="mt-3">{typeOfRides}</h4>
                <button className="btn btn-danger mt-2">Booking Now</button>
            </div>
        </article>
    );
};
export default Car;