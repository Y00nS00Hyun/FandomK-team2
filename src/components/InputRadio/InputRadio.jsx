import React from 'react';
import styled from 'styled-components';
import CheckedIcon from '../../assets/images/icon/icon-radio-checked.svg';
import UncheckedIcon from '../../assets/images/icon/icon-radio-unchecked.svg';

const Label = styled.label`
	display: inline-flex;
	flex-flow: row wrap;
	justify-content: center;
	align-items: center;
	padding: 1px;
	cursor: pointer;
`;

const Icon = styled.i`
	display: block;
	width: 20px;
	height: 20px;
	background-image: url(${UncheckedIcon});
	background-repeat: no-repeat;
	background-position: center;
`;

const Input = styled.input`
	&:checked + ${Icon} {
		background-image: url(${CheckedIcon});
	}
`;

function InputRadio({ id, name, onChange }) {
	return (
		<Label htmlFor={id}>
			<Input type='radio' name={name} id={id} onChange={onChange} hidden />
			<Icon />
		</Label>
	);
}

export default InputRadio;
