import React, {useState} from 'react';
import DialogNav from './Nav';
import styled from 'styled-components';
import OverviewTab from './Content/OverviewTab/OverviewTab';
import SettingsTab from './Content/SettingsTab/SettingsTab';

const I18nEditorDialogContent = styled.div`


`;

function I18nEditorDialog() {
    const [activeTab, setActiveTab] = useState('overview');

    const onActiveItemChange = (id: string) => setActiveTab(id);

    const ActiveTab = () => {
        switch (activeTab) {
            default:
                return <OverviewTab/>;
        }
    };

    return (
        <I18nEditorDialogContent>
            <DialogNav onActiveItemChange={onActiveItemChange}/>
            <ActiveTab/>
        </I18nEditorDialogContent>
    );
}

function I18nEditorDialogWrapper() {
    return (
        <div className='I18nEditorDialogWrapper'>
            <I18nEditorDialog/>
        </div>
    );
}

export default I18nEditorDialogWrapper;
