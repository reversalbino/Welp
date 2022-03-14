import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";

import * as reviewActions from '../../store/reviews';
import './reviews.css';

function Reviews({ id }) {
    const dispatch = useDispatch();
    const [reviewText, setReviewText] = useState('');

    let allBusinessReviews = useSelector(state => state.reviews.reviews);
    const user = useSelector(state => state.session).user;

    useEffect(() => {
        dispatch(reviewActions.getAllReviews(+id));
        setReviewText('');
    }, [id]);

    function deleteReview(reviewId) {
        dispatch(reviewActions.deleteReview(+reviewId));
    }

    function submitReview() {
        const newReview = {
            userId: user.id,
            businessId: id,
            answer: reviewText
        };
        dispatch(reviewActions.createReview(newReview));
        setReviewText('');
    }

    return (
        <div id='reviews'>
            {allBusinessReviews?.length > 0 ?
                allBusinessReviews.map(review => {
                    return (
                        <div className='single-review-div' key={review.id}>
                            <p className='single-review-text'>{review.answer}</p>
                            {review.userId === user?.id &&
                                <button onClick={() => deleteReview(review.id)} className='delete-review-button' id='sign-up-button'>Delete</button>
                            }
                        </div>
                    )
                })
                :
                <p>Leave the first review!</p>
            }
            {user ?
                <div id='new-review'>
                    <input
                        type='text'
                        value={reviewText}
                        onChange={e => setReviewText(e.target.value)}
                        placeholder='Enter review'
                    />
                    <button onClick={submitReview}>Submit</button>
                </div>
                :
                <p>Please log in to leave a review</p>
            }
        </div>
    )
}

export default Reviews;
