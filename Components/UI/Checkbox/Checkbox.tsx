import React from 'react';
import styled from 'styled-components';

const CheckboxWrapper = styled.div<{ isActive: boolean }>`
    display: flex;
    align-items: center;
    flex-direction: row;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    border-radius: 3px; 
    box-shadow: ${props => props.isActive ? '0 0 0 2px #658b51 inset' : '0 0 4px 1px rgba(0,0,0,0.1)'};
    margin: 3px 4px 3px 0;
    line-height: 15px;
    float: left;
    color: #555;
    background: #fafafa;
    font-size: 13px;
    user-select: none;

    &:hover {
        background: #eee;
        cursor: pointer;
    }

    &::before {
        font-family: 'scrivito_iconsregular';
        font-weight: normal;
        display: block;
        color: #999;
        font-size: 14px;
        position: absolute;
    }



`;

const CheckboxLabel = styled.span`
  margin: 8px 8px 8px 8px;
  flex: 1;
`;

const RadioButton = styled.input`

  padding: 0;
  margin: 0;

  &:hover {
    cursor: pointer;
  }
`;

const RadioButtonWrapper = styled.div`

  flex: 0 0 auto;

  background: #f0f0f0;
  margin: 0;

  align-self: stretch;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
  border-radius: 3px;

  &::checked {
    box-shadow: 0 0 0 2px #658b51 inset;
    background: #658b51;

}
`;

interface CheckboxProps {
    title: string,
    isActive: boolean,
    onToggle: (arg: string) => void
}

const Checkbox: React.FC<CheckboxProps> = ({title, isActive, onToggle}) => {
    const handleClick = (event: React.MouseEvent) => {
        onToggle(title);
    };

    return (
        <CheckboxWrapper isActive={isActive} onClick={handleClick}>
            <RadioButtonWrapper>
                <RadioButton type='radio' name={`toggle-${title}`} value={title} checked={isActive} onChange={() => {
                }}/>
            </RadioButtonWrapper>
            <CheckboxLabel>
                {title}
            </CheckboxLabel>
        </CheckboxWrapper>
    );
};

export default Checkbox;
