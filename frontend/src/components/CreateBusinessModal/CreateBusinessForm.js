import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as businessActions from '../../store/business';

import './CreateBusinessForm.css';

function CreateBusinessForm({ hideForm }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  // const [phoneNumber, setPhoneNumber] = useState('');
  const [createBusinessButtonDisabled, setCreateBusinessButtonDisabled] = useState(false);

  const user = useSelector(state => state.session.user);

  function handleCreateBusinessSubmit(e) {
    e.preventDefault();
    const business = {
      ownerId: user.id,
      title,
      description,
      address,
      city,
      state,
      zipCode
    }
    dispatch(businessActions.createBusiness(business));
    hideForm();
  }

  return (
    <>
      <p id='intro-text'>Create a business</p>
      <form id='create-business-form' onSubmit={handleCreateBusinessSubmit}>
        {/* <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul> */}
        <div id='entire-create-business-form'>
          <div id='business-name-and-description'>
            <p>What is the name of your business?</p>
            <label>
              {/* <i className="fas fa-user icon"></i> */}
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Name of business'
              />
            </label>
            <p>Tell us about your business</p>
            <label>
              {/* <i className="fas fa-user icon"></i> */}
              <textarea
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Description'
              // required
              />
            </label>
          </div>
          <hr id='vertical-divider'/>
          <div id='business-address-information'>
            <p>Where is your business?</p>
            <label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder='Address'
              // required
              />
            </label>
            <label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder='City'
              // required
              />
            </label>
            <div id='state-and-zip-code'>
              <label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder='State'
                // required
                />
              </label>
              <label>
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder='Zip Code'
                  id='zip-code'
                // required
                />
              </label>
            </div>
          </div>
        </div>

        <div id='button'>
          <button type="submit"
            disabled={createBusinessButtonDisabled}
            id='login-button'
          >
          Create
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateBusinessForm;
