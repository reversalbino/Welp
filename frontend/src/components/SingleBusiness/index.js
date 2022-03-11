import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import EditBusinessModal from '../EditBusinessModal';
import * as businessActions from '../../store/business';

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
    <p id='click-to-see-business'>Click on a business to see it</p>
    :
    <div id='single-business-page'>
      <p id='single-business-title'>{businessSelected.title}</p>
      {businessSelected.ownerId === user.id &&
        <div id='edit-and-delete-buttons'>
          <button onClick={deleteBusiness} id='log-in-button'>Delete This Business</button>
          <EditBusinessModal id={id} currentValues={curr}/>
        </div>
      }
      {/* <p id='single-business-address'>{businessSelected.address}, {businessSelected.city}, {businessSelected.state}, {businessSelected.zipCode}</p> */}
      {/* https://www.google.com/maps/place/3530+Feulner+Dr,+Salt+Lake+City,+UT+84128/ */}
      <a
      href={`https://www.google.com/maps/search/${businessSelected.address.split(' ').join('+')},+${businessSelected.city.split(' ').join('+')},+${businessSelected.state.split(' ').join('+')},+${businessSelected.zipCode}`}
      target='_blank'
      >
        {businessSelected.address}, {businessSelected.city}, {businessSelected.state}, {businessSelected.zipCode}
      </a>
      <p id='single-business-description'>{businessSelected.description}</p>
    </div>
  );
}

export default SingleBusiness;
