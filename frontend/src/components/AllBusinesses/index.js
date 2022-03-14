import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Route } from 'react-router-dom';
import { useSelector } from "react-redux";

import * as businessActions from "../../store/business";
import SingleBusiness from "../SingleBusiness";
import './AllBusinesses.css';

function AllBusinesses() {
    const dispatch = useDispatch();

    let allBusinesses = useSelector(state => {
        return state.businesses.payload;
    });

    useEffect(() => {
        dispatch(businessActions.getAllBusinesses());
    }, [dispatch]);

    useEffect(() => {}, [allBusinesses])

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

                <Route path='/business/:id'>
                    <SingleBusiness businesses={allBusinesses} />
                </Route>
            </div>
        :
        <p>No businesses found</p>

    )
}

export default AllBusinesses;
