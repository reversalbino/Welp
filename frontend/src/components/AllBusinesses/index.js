import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Route } from 'react-router-dom';
import { useSelector } from "react-redux";

import * as businessActions from "../../store/business";
import SingleBusiness from "../SingleBusiness";
import './AllBusinesses.css';

function AllBusinesses({ user }) {
    const dispatch = useDispatch();
    // const [allBusinesses, setAllBusinesses] = useState([]);

    let allBusinesses = useSelector(state => {
    console.log('AllBusinesses ~ state', state);
        let temp = Object.values(state.businesses);
        temp.forEach(test => {
            console.log(test);
        })
        return state.businesses.payload;
    });

    // useEffect(() => {
    //     dispatch(businessActions.getAllBusinesses())
    //     .then(businesses => {
    //         // console.log(businesses.businesses[0].User.name)
    //         setAllBusinesses(businesses.businesses);
    //     });
    // }, [])

    useEffect(() => {
        dispatch(businessActions.getAllBusinesses());
    }, [dispatch]);

    useEffect(() => {
        // console.log('new', allBusinesses)
    }, [allBusinesses])

    return (

        allBusinesses?.length > 0 ?
            <div id='all-businesses-page'>
                <nav id='all-businesses'>
                    {/* <h1 id='all-business-header'>All Businesses</h1> */}
                    {allBusinesses.map(business => {
                            return (
                                <NavLink to={`/business/${business.id}`} key={business.id}>
                                    <div className='single-business-div'>
                                        <div className='single-business-div-image'>
                                            <img src={business.Pictures[0]?.url} alt={business.name} className='business-image'/>
                                        </div>
                                        <div className='single-business-text'>
                                            <p className='title'>{business.title}</p>
                                            <p className='description'>{business.description}</p>
                                        </div>
                                    </div>
                                </NavLink>
                            )
                    })}
                </nav>
                {/* <div id='single-business'> */}

                <Route path='/business/:id'>
                    <SingleBusiness businesses={allBusinesses} />
                </Route>
                {/* </div> */}
            </div>
        :
        <p>No businesses found</p>

    )
}

export default AllBusinesses;
