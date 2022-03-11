import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateBusinessForm from './CreateBusinessForm';

function CreateBusinessModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} className='navbar-button'id='sign-up-button'>Create Business</button>
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          >
          <CreateBusinessForm
          hideForm={() => setShowModal(false)}/>
        </Modal>
      )}
    </>
  );
}

export default CreateBusinessModal;
