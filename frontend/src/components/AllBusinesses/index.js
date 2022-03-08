import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

import * as businessActions from "../../store/business";
import './AllBusinesses.css';

function AllBusinesses() {
    const dispatch = useDispatch();
    const [allBusinesses, setAllBusinesses] = useState([]);

    useEffect(() => {
        dispatch(businessActions.getAllBusinesses())
        .then(businesses => {
            setAllBusinesses(businesses.businesses);
        });
    }, [])

    return (

        allBusinesses.length > 0 ?
            <>
                <div id='all-businesses'>
                <h1 id='all-business-header'>All Businesses</h1>
                    {allBusinesses.map(business => {
                        return <Link to={`/business/${business.id}`} className='single-business' key={business.id}>
                            <div className='single-business-div' >
                            <p>Title: {business.title}</p>
                            <p>Owner: {business.ownerId}</p>
                            </div>
                        </Link>
                    })}
                </div>
            </>
        :
        <p>No businesses found</p>

    )
}

export default AllBusinesses;
