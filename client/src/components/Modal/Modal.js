import React from 'react';
import './Modal.css';

const Modal = (props) => {
    return(
            <div className="modal-wrapper"
                style={{
                    transform: props.show ? 'translateY(0vh)' : 'translateY(-0vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                <div className="modal-header">
                    <h1>Sign In</h1>
                    <span className="close-modal-btn" onClick={props.close}>×</span>
                </div>
                <div className="modal-body">
                    <form name="signin" id="modalForm" action="signin">
                        <div className="inputField">
                            <label id="label-username" for="email" className="inputText">Username:</label>
                            <input type="text" name="username" className="inputField form-control" id="username-input"
                                placeholder="Enter username" />
                        </div>
                        <div className="inputField">
                            <label id="label-password" for="password" className="inputText">Password:</label>
                            <input type="password" name="password" className="inputField form-control" id="password-input"
                                placeholder="Enter password" />
                        </div>
                    </form>
                </div>
                <div>
                    <button className='submit-button btn-block' onClick={props.close}>Submit</button>
                </div>
                <div>
                    <img className='login-image' src="btn_google_signin_dark_normal_web.png" alt='Login with Google' />
                </div>
                <div className="modal-footer">
                    <p className='footerText'>Create Account</p>
                </div>
        </div>
    )
}

export default Modal;