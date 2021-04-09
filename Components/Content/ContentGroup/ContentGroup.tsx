import React from 'react';
import styled from 'styled-components';
import Title from '../../UI/Title/Title';

const ContentGroupWrapper = styled.div<{ minHeight?: number }>`
  border-bottom: 2px solid #ccc;
  min-height: ${props => props.minHeight ? props.minHeight + 'px' : 'unset'};
`;

const ContentGroupInner = styled.div`
    padding: 15px;
    margin: 0;
`;

const PaddedTitle = styled(Title)`
  padding-left: 5px;
  
`;

interface ContentGroupProps {
    title: string;
    minHeight?: number;
}

const contentGroup: React.FC<ContentGroupProps> = (props) => {
    const {title, minHeight} = props;

    return (
        <ContentGroupWrapper minHeight={minHeight}>
            {title && <PaddedTitle>{title}</PaddedTitle>}
            <ContentGroupInner>
                {props.children}
            </ContentGroupInner>
        </ContentGroupWrapper>
    );
}

export default contentGroup;
