import React, { useState } from 'react';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import styled from 'styled-components';
import APIWrapper from '../../../API/APIWrapper';
import Button, { ButtonGroup } from '../../UI/Button';
import Title from '../../UI/Title/Title';
import ContentGroup from '../ContentGroup/ContentGroup';
import ObjectBrowser from '../ObjectBrowser/ObjectBrowser';
import TabPane from '../TabPane/TabPane';
import LocaleSelect from '../../UI/LocaleSelect';

const Note = styled(Title)`
  margin-bottom: 0.5rem;
  font-size: 12px;
  color: red;
`;

/**
 * This component delivers the plugins overview on rendering
 */
function OverviewTab () {
  /**
   * Selected paths in the checkbox tree
   */
  const [selectedIds, setSelectedPaths] = useState<string[]>([]);

  const [selectedLocale, setSelectedLocale] = useState<string | undefined>();

  const [logMessages, setLogMessages] = useState<string[]>([])

  console.log(selectedIds);

  const handleClick = () => {
    if (selectedLocale) {
      APIWrapper.migrateObjs(selectedIds, selectedLocale as string).then(() => {
        const logmsgs: string[] = selectedIds.map(id => `Successfully copied ${id} to ${selectedLocale}`)
        console.log(logmsgs);
        setLogMessages([...logMessages, ...logmsgs]);
      });
    }
  };

  return (
    <TabPane>
      <ContentGroup title='Hierarchy Overview'>
        <Title>Select Objects to copy to a new adress...</Title>
        <Note>(Note: Object's without a path can not be copied to a new adress)</Note>
        <ObjectBrowser onIdChecked={setSelectedPaths} />
      </ContentGroup>
      <ContentGroup title='Copy Window' minHeight={100}>
        <LocaleSelect onChange={setSelectedLocale} />
      </ContentGroup>
      <ContentGroup title='Function Overview'>
        <ButtonGroup>
          <Button title={`Copy to /${selectedLocale || '...'}/*`} onClick={handleClick} disabled={selectedLocale === undefined} />
        </ButtonGroup>
      </ContentGroup>
      <ContentGroup title='Logs'>
        <div style={{
          height: '180px',
          padding: '0.5rem'
        }}
        >
          <div style={{
            backgroundColor: 'white',
            height: '100%'
          }}
          >
            {
              logMessages.map((msg, idx) => <p key={idx}>{msg}</p>)
            }
          </div>

        </div>
      </ContentGroup>
    </TabPane>
  );
}

export default OverviewTab;
