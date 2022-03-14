import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = 'review/loadReviews';
const ADD_REVIEW = 'review/addReview';
const REFRESH_REVIEWS = 'review/delete';
const EDIT_BUSINESS = 'review/edit';

// function setBusinesses() {
//   return {};
// }

function loadReviews(reviews) {
  return {
    type: LOAD_REVIEWS,
    payload: reviews
  };
}

function addReview(business) {
  return {
    type: ADD_REVIEW,
    payload: business
  };
}

function refreshReviews(deletedBusinessId) {
  return {
    type: REFRESH_REVIEWS,
    payload: deletedBusinessId
  };
}

function updateReview(data) {
  return {
    type: EDIT_BUSINESS,
    payload: data
  };
}

export const getAllReviews = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/review/${+id}`);
  const data = await response.json();
  console.log('getAllReviews ~ data', Array.isArray(data.reviewsForBusiness));

  dispatch(loadReviews(data.reviewsForBusiness));
}

export const createReview = (review) => async (dispatch) => {
  const response = await csrfFetch('/api/review', {
    method: 'POST',
    body: JSON.stringify(review)
  });

  let data = await response.json();
  dispatch(addReview(data.newReview));
}

export const deleteReview = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/review/${id}`, {
    method: 'DELETE'
  });

  let data = await response.json();
  dispatch(refreshReviews(data.deletedReviewId));
}

export const editBusiness = (newBusinessValues, id) => async (dispatch) => {
  const response = await csrfFetch(`/api/business/${id}`, {
    method: 'PUT',
    body: JSON.stringify(newBusinessValues)
  });

  let data = await response.json();
  dispatch(updateReview(data));
}

const initialState = { reviews: [] };

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS: {
      return {
        ...state,
        reviews: action.payload
      };
    }
    case ADD_REVIEW: {
      return {
        ...state,
        reviews: [ ...state.reviews, action.payload]
      };
    }
    case REFRESH_REVIEWS: {
      const currentReviews = state.reviews;
      const reviewToRemove = currentReviews.find(review => review.id === +action.payload);
      currentReviews.splice(currentReviews.indexOf(reviewToRemove), 1);

      return {
        ...state,
        reviews: [ ...currentReviews ]
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

export default reviewsReducer;
