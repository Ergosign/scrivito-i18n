import React, { useState } from 'react';
import styled from 'styled-components';
import * as Scrivito from 'scrivito';

const TabContent = styled.div`
    padding: 0 15px 15px 15px;
    margin: 0;

`;

const TabContentInner = styled.ul`
    background: rgba(255,255,255,0.4);
    box-shadow: 0 3px 6px -3px rgba(0,0,0,0.2);
    display: block;
    padding: 0;
    margin: 0;
`;

const TabPane: React.FC = (props) => {
  return (
    <TabContent>
      <TabContentInner>
        {props.children}
      </TabContentInner>
    </TabContent>
  );
}

export default TabPane;
