// Modal.js
import React from "react";
import Button from "../Button/Button";
import Xbutton from "../Button/Xbutton";
import "./Modal.css";

//사용 방법 : 모달 컴포넌트를 사용할 컴포넌트에서 아래 코드를 작성
/* App 컴포넌트에서 모달을 사용하는 경우 :
import Modal from './Modal';
import './App.css';
import React, { useState } from 'react';

const App = () => {
	const [show, setShow] = useState(false);
  
	const handleOpen = () => setShow(true);
	const handleClose = () => setShow(false);
  
	return (
	  <div className="App">
		<button onClick={handleOpen}>Open Modal</button>
		<Modal show={show} handleClose={handleClose}>
		  <p>This is a simple modal!</p>
		</Modal>
	  </div>
	);
  };
  
  export default App;*/

function Modal({ show, icon, buttonAction, buttonName, onClose, children, title }) {
	if (!show) {
		document.body.style.removeProperty("overflow");
		return null;
	} else {
		document.body.style.setProperty("overflow", "hidden");
	}

	return (
		<div className="modal-backdrop" onClick={onClose}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<div className="modal-head">
					<p className="modal-title">{title}</p>
					<Xbutton className="modal-close" onClick={onClose}></Xbutton>
				</div>
				<div className="modal-body">{children}</div>
				<div className="modal-foot">
					<Button icon={icon} size={"wide"} onClick={buttonAction} disabled={buttonDisabled}>
						{buttonName}
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Modal;
