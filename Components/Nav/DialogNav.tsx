import React, {useState} from 'react';
import styled from 'styled-components';
import NavElement from './NavElement';

const Nav = styled.ul`
    display: flex;
    padding: 15px 15px 0 15px;
    margin: 0;

    justify-content: flex-start;
    align-content: center;

    list-style-type: disc;

    font-family: "Helvetica Neue";

`;

interface DialogNavProps {
    onActiveItemChange: (id: string) => void,
}

function DialogNav(props: DialogNavProps) {
    const [activeID, setActiveID] = useState('overview');

    const {onActiveItemChange} = props;

    const isNavItemActive = (id: string) => id === activeID;

    const onNavItemClick = (id: string) => {
        setActiveID(id);
        onActiveItemChange(id);
    };

    return (
        <Nav>
            <NavElement title='Overview' id='overview' onClick={onNavItemClick} isActive={isNavItemActive('overview')}/>
            <NavElement title='Settings' id='settings' onClick={onNavItemClick} isActive={isNavItemActive('settings')}/>
        </Nav>
    );
}

export default DialogNav;
