// Modal.js
import React from "react";
import Button from "../Button/Button";
import CloseIcon from "../../assets/images/icon/icon-X.svg";
import "./Modal.css";

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
					<button className="modal-close" onClick={onClose}>
						<img src={CloseIcon} alt="닫기" />
					</button>
				</div>
				<div className="modal-body">{children}</div>
				<div className="modal-foot">
					<Button onClick={buttonAction} icon={icon} size={"wide"}>
						{buttonName}
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Modal;
