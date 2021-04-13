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
import type {Node} from 'react-checkbox-tree';

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
  const [selectedRootId, setSelectedRootId] = useState<string | undefined>();

  const [selectedLocale, setSelectedLocale] = useState<string | undefined>();

  const [logMessages, setLogMessages] = useState<string[]>([])

  const handleClick = () => {
    if (selectedLocale && selectedRootId) {
      console.error("onclick called");
      APIWrapper.migrateObjHierarchy(selectedRootId, selectedLocale as string, logFunc).then(() => {
        setLogMessages([...logMessages, "Finished copying process"]);
      });
    }
  };

  const logFunc = (log: string) => {
    console.log("logfunc called");
    setLogMessages((oldState) => [...oldState, log]);
  }

  return (
    <TabPane>
      <ContentGroup title='Hierarchy Overview'>
        <Title>Select Pages, Subpages and Objects to copy to a new language ID...</Title>
        <ObjectBrowser onIdChecked={setSelectedRootId} />
      </ContentGroup>
      <ContentGroup title='Copy Window' minHeight={100}>
        <LocaleSelect onChange={setSelectedLocale} />
      </ContentGroup>
      <ContentGroup title='Function Overview'>
        <ButtonGroup>
          <Button title={`Copy to [${selectedLocale || '...'}]`} onClick={handleClick} disabled={selectedLocale === undefined || selectedRootId === undefined} />
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
