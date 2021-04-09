import React from 'react';
import styled from 'styled-components';

const NavElementTitle = styled.span`
    color: #444;
    font-size: 12px;
    font-weight: bold;
`;

const NavLi = styled.li<{ isActive: boolean }>`

    background-color: ${props => props.isActive ? 'rgba(255,255,255,0.4)' : 'none'};
    box-shadow: ${props => props.isActive ? '0 -3px 5px -3px rgba(0,0,0,0.2)' : 'none'};
    cursor: pointer;
    display: block;
    padding: 0 10px 10px 10px;
    `;

interface NavElementProps {
    id: string,
    title: string,
    isActive: boolean,
    onClick: (value: string) => void;
}

const NavElement = (props: NavElementProps) => {
    const {id, title, isActive, onClick} = props;
    return (
        <NavLi isActive={isActive} onClick={() => onClick(id)}>
            <NavElementTitle>
                {title}
            </NavElementTitle>
        </NavLi>
    );
};
export default NavElement;
