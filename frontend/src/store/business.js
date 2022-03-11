import { csrfFetch } from "./csrf";

const LOAD_BUSINESSES = 'business/loadBusinesses';
const ADD_BUSINESS = 'business/addBusiness';
const REFRESH_BUSINESSES = 'business/delete';
const EDIT_BUSINESS = 'business/edit';

// function setBusinesses() {
//   return {};
// }

function loadBusinesses(businesses) {
  return {
    type: LOAD_BUSINESSES,
    payload: businesses
  };
}

function addBusiness(business) {
  return {
    type: ADD_BUSINESS,
    payload: business
  };
}

function refreshBusinesses(deletedBusinessId) {
  return {
    type: REFRESH_BUSINESSES,
    payload: deletedBusinessId
  };
}

function updateBusiness(data) {
  return {
    type: EDIT_BUSINESS,
    payload: data
  };
}

export const getAllBusinesses = () => async (dispatch) => {
  const response = await csrfFetch('/api/business');
  const data = await response.json();
  dispatch(loadBusinesses(data.businesses));
}

export const createBusiness = (business) => async (dispatch) => {
  const response = await csrfFetch('/api/business', {
    method: 'POST',
    body: JSON.stringify(business)
  });

  let data = await response.json();
  dispatch(addBusiness(data.returnedBusiness))
}

export const deleteBusiness = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/business/${id}`, {
    method: 'DELETE'
  });

  let data = await response.json();
  dispatch(refreshBusinesses(data.deletedBusinessId));
}

export const editBusiness = (newBusinessValues, id) => async (dispatch) => {
  const response = await csrfFetch(`/api/business/${id}`, {
    method: 'PUT',
    body: JSON.stringify(newBusinessValues)
  });

  let data = await response.json();
  console.log(data);
  dispatch(updateBusiness(data));
}

const initialState = { businesses: [] };

const businessReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_BUSINESSES: {
      return {
        ...state,
        payload: action.payload
      };
    }
    case ADD_BUSINESS: {
      return {
        ...state,
        payload: [ ...state.payload, action.payload]
      };
    }
    case REFRESH_BUSINESSES: {
      const currentBusinesses = state.payload;
      const businessToRemove = currentBusinesses.find(business => business.id === +action.payload);
      currentBusinesses.splice(currentBusinesses.indexOf(businessToRemove), 1);

      return {
        ...state,
        payload: [ ...currentBusinesses ]
      };
    }
    case EDIT_BUSINESS: {
      const { id, updatedBusiness } = action.payload;
      console.log('businessReducer ~ id, updatedBusiness', id, updatedBusiness);
      const currentBusinesses = state.payload;
      const businessToEdit = currentBusinesses.find(business => business.id === +id);

      currentBusinesses[currentBusinesses.indexOf(businessToEdit)] = updatedBusiness;

      return {
        ...state,
        payload: [ ...currentBusinesses ]
      };
    }
    default:
      return state;
  }
};

export default businessReducer;
