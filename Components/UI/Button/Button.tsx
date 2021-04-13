import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  padding: 5px 10px;
`;

const ButtonContent = styled.span`

`;

interface ButtonProps {
    onClick(event: React.MouseEvent): void;
    title: string,
    [buttonAttribute: string]: any;
}

const button: React.FC<ButtonProps> = (props: ButtonProps) => {
    const {title, onClick, children, ...rest} = props;
    return (
        <Button onClick={onClick} {...rest}>
            <ButtonContent>
                {title}
            </ButtonContent>
        </Button>
    );
}

export default button;
