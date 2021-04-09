import React, { useState } from 'react';
import styled from 'styled-components';
import * as Scrivito from 'scrivito';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    color: #444;
    font-size: 13px;
    font-weight: bold;
    padding: 7px 3px 6px 3px;
`;

const Input = styled(Scrivito.ContentTag)`
    font-font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    font-size: 14px;
    background-color: rgb(243, 243, 243);
    padding: 6px 8px;
    width: 100%;
    line-height: 18px;
    border-radius: 0 3px 3px 0;

`;

interface SettingsInputProps {
  title: string,
  content: Scrivito.Obj,
  attribute: string,
  tag: string,
  disabled?: boolean
}

function SettingsInput (props: SettingsInputProps) {
  const { title, content, attribute, tag, disabled } = props;

  return (
    <Wrapper>
      <Title>
        {title}
      </Title>
      {
        disabled
          ? (
            <Scrivito.InPlaceEditingOff>
              <Input content={content} attribute={attribute} tag={tag} />
            </Scrivito.InPlaceEditingOff>
          )
          : (
            <Scrivito.RestoreInPlaceEditing>
              <Input content={content} attribute={attribute} tag={tag} />
            </Scrivito.RestoreInPlaceEditing>
          )

      }
    </Wrapper>
  );
}

export default SettingsInput;
