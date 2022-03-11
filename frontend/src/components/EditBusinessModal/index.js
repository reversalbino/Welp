import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditBusinessForm from './EditBusinessForm';

function EditBusinessModal({ id, currentValues }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} className='navbar-button' id='sign-up-button'>Edit Business</button>
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          >
          <EditBusinessForm id={id} currentValues={currentValues} hideForm={() => setShowModal(false)}/>
        </Modal>
      )}
    </>
  );
}

export default EditBusinessModal;
