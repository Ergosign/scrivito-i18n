import React from 'react';
import {countries} from 'countries-list';
import Select, {createFilter} from 'react-select';
import NoLagMenuList from './NoLagMenuList';
import styled from 'styled-components';
import Title from '../Title/Title';

/**
 * Select countries and build an alphabetic list of the name and it's sublanguages, e.g ger: ger-bav, ger-sls, ger-xxx
 */
const list = Object.entries(countries).map(country => {
    const name = country[0];
    const obj = country[1];

    return obj.languages.map(lang => ({value: `${lang}-${name}`, label: `${obj.name} [${lang}-${name}]`}));
}).flat().sort((a, b) => a.label.localeCompare(b.label));

const LocaleSelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: baseline;
  align-items: baseline;
`;

const SelectWrapper = styled(Select)`
  flex: 1 1 auto;
  padding-left: 20px;
`;

interface SelectProps {
    onChange: (value: string) => void;
}

export default (props: SelectProps) => {
    const {onChange} = props;

    // replace cn-gnz with cn/gnz
    const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target?.value.toLowerCase().split("-")[0]);
    };

    return (
        <LocaleSelectWrapper>
            <Title>Select locale to copy to...</Title>
            <SelectWrapper
                options={list}
                components={{NoLagMenuList}}
                filterOption={createFilter({ignoreAccents: false})}
                isClearable
                menuPlacement='top'
                onChange={onSelectChange}
            />
        </LocaleSelectWrapper>
    );
};
