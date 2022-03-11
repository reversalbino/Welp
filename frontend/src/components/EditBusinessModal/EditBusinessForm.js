import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import './EditBusinessForm.css';
import * as businessActions from '../../store/business';

function EditBusinessForm({ id, hideForm, currentValues }) {
  currentValues = currentValues.businessSelected;

  const dispatch = useDispatch();
  const [newTitle, setNewTitle] = useState(currentValues.title);
  const [newDescription, setNewDescription] = useState(currentValues.description);
  const [newAddress, setNewAddress] = useState(currentValues.address);
  const [newCity, setNewCity] = useState(currentValues.city);
  const [newState, setNewState] = useState(currentValues.state);
  const [newZipCode, setNewZipCode] = useState(currentValues.zipCode);
  const [createBusinessButtonDisabled, setCreateBusinessButtonDisabled] = useState(false);

  function handleEditBusinessSubmit(e) {
    e.preventDefault();
    const business = {
      newTitle,
      newDescription,
      newAddress,
      newCity,
      newState,
      newZipCode
    }
    dispatch(businessActions.editBusiness(business, +id));
    hideForm();
  }

  return (
    <>
      <p id='intro-text'>Update your business</p>
      <form id='create-business-form' onSubmit={handleEditBusinessSubmit}>
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
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder='Name of business'
              />
            </label>
              {currentValues.title}
            <p>Tell us about your business</p>
            <label>
              {/* <i className="fas fa-user icon"></i> */}
              <textarea
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
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
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                placeholder='Address'
              // required
              />
            </label>
            <label>
              <input
                type="text"
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                placeholder='City'
              // required
              />
            </label>
            <div id='state-and-zip-code'>
              <label>
                <input
                  type="text"
                  value={newState}
                  onChange={(e) => setNewState(e.target.value)}
                  placeholder='State'
                // required
                />
              </label>
              <label>
                <input
                  type="text"
                  value={newZipCode}
                  onChange={(e) => setNewZipCode(e.target.value)}
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
          Update
          </button>
        </div>
      </form>
    </>
  );
}
export default EditBusinessForm;
