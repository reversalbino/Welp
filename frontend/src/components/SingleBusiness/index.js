import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import EditBusinessModal from '../EditBusinessModal';
import Reviews from '../Reviews';
import * as businessActions from '../../store/business';
import './singleBusiness.css';

function SingleBusiness({ businesses }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(state => state.session.user);

  const { id } = useParams();
  const businessSelected = businesses.find(business => business.id === +id);

  const curr = {
    businessSelected
  }

  function deleteBusiness() {
    dispatch(businessActions.deleteBusiness(+id));
    history.push('/business/all');
  }

  return (
    id === 'all' ?
    <p id='click-to-see-business'>{`<-- Click on a business to see it`}</p>
    :
    <div id='single-business-page'>
      <p id='single-business-title'>{businessSelected.title}</p>
      <img id='main-business-image' src={businessSelected.Pictures[0].url} alt={businessSelected.title} />
      {(user && businessSelected.ownerId === user.id) &&
        <div id='edit-and-delete-buttons'>
          <button onClick={deleteBusiness} id='log-in-button'>Delete Business</button>
          <EditBusinessModal id={id} currentValues={curr}/>
        </div>
      }
      {/* <p id='single-business-address'>{businessSelected.address}, {businessSelected.city}, {businessSelected.state}, {businessSelected.zipCode}</p> */}
      {/* https://www.google.com/maps/place/3530+Feulner+Dr,+Salt+Lake+City,+UT+84128/ */}
      <a
      href={`https://www.google.com/maps/search/${businessSelected.address.split(' ').join('+')},+${businessSelected.city.split(' ').join('+')},+${businessSelected.state.split(' ').join('+')},+${businessSelected.zipCode}`}
      target='_blank'
      rel="noreferrer"
      className='address-link'
      >
        {businessSelected.address}, {businessSelected.city}, {businessSelected.state}, {businessSelected.zipCode}
      </a>
      <p id='single-business-description'>{businessSelected.description}</p>

      <hr />

      <Reviews id={id} />
    </div>
  );
}

export default SingleBusiness;
