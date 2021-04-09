import React, {useState} from 'react';
import styled from 'styled-components';
import * as Scrivito from 'scrivito';
import Checkbox from '../Checkbox/Checkbox';
import Title from '../Title/Title';

const CheckboxList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  
  padding: 3px 0px;
`;

const EnumCheckboxWrapper = styled.div``;

/**
 *
 * @param {Scrivito Obj or Widget} content
 * @param {Scrivito Attribute} attribute to be rendered
 * @param {values} [{enumKey: string, title: string}]
 */

export interface EnumOptions {
    enumKey: string,
    title: string
}

interface EnumCheckboxProps {
    content: Scrivito.Obj | Scrivito.Widget,
    attribute: string,
    values: EnumOptions[],
    title: string
}

const EnumCheckbox: React.FC<EnumCheckboxProps> = ({content, attribute, values, title}) => {
    const [activeEnumKey, setActiveEnumKey] = useState<string | undefined>(content.get(attribute));

    const handleToggle = (title: string) => {
        const activeElem = values.find(val => val.title === title);
        setActiveEnumKey(activeElem?.enumKey);
    };

    const isEnumActive = (value: EnumOptions) => {
        return value.enumKey === activeEnumKey;
    };

    return (
        <EnumCheckboxWrapper>
            <Title>
                {title}
            </Title>
            <CheckboxList>
                {
                    values.map(val => <Checkbox key={val.title} title={val.title} isActive={isEnumActive(val)}
                                                onToggle={handleToggle}/>)
                }
            </CheckboxList>
        </EnumCheckboxWrapper>
    );
};

export default EnumCheckbox;
