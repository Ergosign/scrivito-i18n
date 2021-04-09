import React, { useState } from 'react';
import styled from 'styled-components';
import * as Scrivito from 'scrivito';

const ButtonGroup = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
`;

const ButtonInset = styled.li`
    padding: 15px;
`;

const buttonGroup: React.FC = ({ children }) => {
  return (
    <ButtonGroup>
      {React.Children.map(children, (child, idx) => <ButtonInset key={idx}>{child}</ButtonInset>)}
    </ButtonGroup>
  );
};

export default buttonGroup;
