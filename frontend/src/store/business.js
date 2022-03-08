import { csrfFetch } from "./csrf";

const ADD_BUSINESS = 'business/addBusiness';

// function setBusinesses() {
//   return {};
// }

export const getAllBusinesses = () => async (dispatch) => {
  const response = await csrfFetch('/api/business');
  const data = await response.json();
  console.log('DATA', data.businesses);
  return data;
}

const initialState = { business: null };

const businessReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ADD_BUSINESS:
      newState = Object.assign({}, state);
      newState.business = action.payload;
      return newState;
    default:
      return state;
  }
};

export default businessReducer;
