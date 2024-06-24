import React from "react";
import styled from "styled-components";
import CheckedIcon from "../../assets/images/icon/icon-radio-checked.svg";
import UncheckedIcon from "../../assets/images/icon/icon-radio-unchecked.svg";

const Label = styled.label`
  cursor: pointer;
`;

const Section = styled.article`
  display: inline-flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  padding: 1px;
  cursor: pointer;
`;

const Icon = styled.i`
  display: block;
  width: 16px;
  height: 16px;
  background-image: url(${UncheckedIcon});
  background-repeat: no-repeat;
  background-position: center;
`;

const Input = styled.input`
  &:checked + ${Icon} {
    background-image: url(${CheckedIcon});
  }
`;

function InputRadio({ className, id, name, value, onChange, children, onClick }) {
  return (
    <Label htmlFor={id} className={className} onClick={onClick}>
      {children}
      <Section>
        <Input type="radio" id={id} name={name} value={value} onChange={onChange} hidden />
        <Icon />
      </Section>
    </Label>
  );
}

export default InputRadio;
