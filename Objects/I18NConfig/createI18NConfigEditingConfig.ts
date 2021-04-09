import * as Scrivito from 'scrivito';
import {ObjClassId} from "./i18nConfigId";

/**
 * Create the i18n Config Editing Interface
 */
function createI18NConfigObjClass() {
    Scrivito.provideEditingConfig(ObjClassId, {
        hideInSelectionDialogs: true,
        initialContent: {
            default: 'de',
        },
        title: 'I18N Config Object',
        attributes: {
            default: {
                title: 'Default Language'
            }
        }
    });
}

export default createI18NConfigObjClass;
