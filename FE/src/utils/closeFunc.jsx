import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function CloseFunc() {
  function handleClose() {
    console.log('closed');
  }

  return (
    <FontAwesomeIcon
      icon={faXmark}
      className='closeButton'
      onClick={handleClose}
    />
  );
}

export default CloseFunc;
