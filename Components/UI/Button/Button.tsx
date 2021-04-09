import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  padding: 5px 10px;
`;

const ButtonContent = styled.span`

`;

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
    onClick(event: React.MouseEvent): void;

    title: string
}

const button: React.FC<ButtonProps> = (props: ButtonProps) => {
    const {title} = props;

    return (
        <Button>
            <ButtonContent>
                {title}
            </ButtonContent>
        </Button>
    );
}

export default button;
