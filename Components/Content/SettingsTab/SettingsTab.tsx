import React from 'react';
import * as Scrivito from 'scrivito';
import {I18nConfigId} from '../../../Objects/I18NConfig/i18nConfigId';
import TabPane from '../TabPane/TabPane';
import ContentGroup from '../ContentGroup/ContentGroup';
import EnumCheckbox from '../../UI/EnumCheckbox';

function SettingsTab() {
    const rootPageConfig = Scrivito.Obj.getByPermalink(I18nConfigId);

    if (!rootPageConfig) {
        throw new Error('No root page config obj!');
    }

    return (
        <TabPane>
            <ContentGroup title='Plugin Settings'>
                <EnumCheckbox
                    content={rootPageConfig}
                    attribute='manageRootPage'
                    values={[{enumKey: 'yes', title: 'Yes'}, {enumKey: 'no', title: 'No'}]}
                    title='Enable Plugin to manage the Root Page'
                />
            </ContentGroup>
        </TabPane>

    );
}

export default (SettingsTab);
