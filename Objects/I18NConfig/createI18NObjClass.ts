import * as Scrivito from 'scrivito';
import {ObjClassId} from "./i18nConfigId";

/**
 * Create the i18n Plugin Config interface
 */
function createI18NConfig() {
    Scrivito.provideObjClass(ObjClassId, {
        attributes: {
            default: 'string'
        }
    });
}

export default createI18NConfig;
