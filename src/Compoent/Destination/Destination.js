import React, { useState } from 'react';
import './Destination.css'
import { useForm } from "react-hook-form";
import { useParams } from 'react-router';
import Data from '../../Data/Data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import Map from '../Map/Map';



const Destination = () => {

    const { typeOfRides } = useParams();

    const typeOFRide = Data.filter(ride => ride.typeOfRides === typeOfRides)    

    const [isSearch, setIsSearch] = useState(false)

    const { register, handleSubmit, errors } = useForm();
    const [searchResult, setSearchResult] = useState({})
    const onSubmit = data => {
        const newSearchResult = {
            pickFrom: data.pickFrom,
            pickTo: data.pickTo
        }
        setSearchResult(newSearchResult)
        setIsSearch(true)
    }

    const searchResultCard = []
    for (let i = 0; i < 3; i++) {
        searchResultCard.push(<div className="searchResultCard d-flex justify-content-around rounded py-3 px-2 mb-2" key={i}>
            {typeOfRides && <img className="w-25" src={typeOFRide[0].rideImage} alt={typeOFRide[0].typeOfRides} />}
            <h4><FontAwesomeIcon icon={faUserFriends} /> 4</h4>
            <h4>$69</h4>
        </div>)
    }

    return (
        <section className="container pt-4 mt-3 border-top">
            <div className="row">
                {typeOfRides ?
                //if your select a ride and come to destination component then show it
                 <div className="col-md-3">
                    {/* location search filed and search result box showing conditionaly start here                */}
                    {
                        //location search filed
                        !isSearch ?
                         <div className="search-box">
                            <form onSubmit={handleSubmit(onSubmit)} className="pickup-form rounded p-3">
                                <label htmlFor="pickFrom" className="mb-0">Pick From</label>
                                <input name="pickFrom" id="pickFrom" ref={register({ required: true })} className="d-block m-0 w-100 rounded border-0 py-1 px-2" />
                                {errors.pickFrom && <p className="error mt-1 mb-2">Input Your Place Name</p>}

                                <label htmlFor="pickTo" className="mb-0">Pick From</label>
                                <input name="pickTo" id="pickTo" ref={register({ required: true })} className="d-block m-0 w-100 rounded border-0 py-1 px-2" />
                                {errors.pickTo && <p className="error mt-1 mb-2">Input where are you want to go</p>}

                                <label htmlFor="date" className="mb-0">Date</label>
                                <input type="date" id="date" name="date" ref={register({ required: true })} className="d-block m-0 w-100 rounded border-0 py-1 px-2" />
                                {errors.date && <p className="error mt-1 mb-2">Select A Date</p>}

                                <input type="submit" value="Search" className="d-block w-100 btn btn-danger mt-3" />
                            </form>
                        </div>
                            :
                            //Search result Box
                            <div className="searchResult">
                                <h5 className="bg-danger text-white p-3 rounded">From : {searchResult.pickFrom} <br /> To : {searchResult.pickTo}</h5>
                                {searchResultCard}
                                <button className="btn btn-danger" onClick={() => setIsSearch(false)}>Clear Result</button>
                            </div>
                    }
                    {/* location search filed and search result box showing conditionaly end here                */}
                </div>
                //If Your go to destinantion component directly with out select any ride in home page then show in
                    :
                     <div className="col-md-3">
                        <h5 className="bg-danger p-3 text-white rounded">You did not select any ride, so you can not search for a location or rent a ride. For location search or ride booking you have to come to this page after selecting any ride on the home page.</h5>
                        <Link to="/" className="btn btn-danger mt-2">Go To Home</Link>
                    </div>
                }
                {/* Map Here */}
                <div className="col-md-8">
                   <Map />
                </div>
            </div>
        </section>
    );
};

export default Destination;