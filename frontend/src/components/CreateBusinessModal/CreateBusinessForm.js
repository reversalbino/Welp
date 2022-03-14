import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as businessActions from '../../store/business';

import './CreateBusinessForm.css';

function CreateBusinessForm({ hideForm }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [createBusinessButtonDisabled, setCreateBusinessButtonDisabled] = useState(true);

  useEffect(() => {
    console.log('change')
    let zipCodeOnlyContainsNumbers = /^\d+$/.test(zipCode);
    setCreateBusinessButtonDisabled(!(title.length > 0 && description.length > 0 && address.length > 0 && city.length > 0 && state.length > 0
      && zipCode.length >= 5 && zipCodeOnlyContainsNumbers));
  }, [title, description, address, city, state, zipCode])

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
    history.push('/business/all');
  }

  return (
    <>
      <p id='intro-text'>Create a business</p>
      <form id='create-business-form' onSubmit={handleCreateBusinessSubmit}>
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
            id='create-button'
          >
          Create
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateBusinessForm;
