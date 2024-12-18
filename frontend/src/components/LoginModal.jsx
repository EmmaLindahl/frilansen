import React from 'react';
import Modal from 'react-modal';
import './LoginModal.css';
import LoginForm from './LoginForm'

const LoginModal = ({ isOpen, onRequestClose }) => {
    return (
    <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel='Login Modal'
        className="modal-content"
        overlayClassName="modal-overlay"
    >
        <button className='close-button' onClick={onRequestClose}>
            &times;
        </button>
        <LoginForm onClose={onRequestClose} />
    </Modal>
    )
}
export default LoginModal;