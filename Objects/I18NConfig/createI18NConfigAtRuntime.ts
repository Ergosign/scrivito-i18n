import * as Scrivito from 'scrivito';
import {I18nConfigId} from "./i18nConfigId";
import type {ObjClass} from "scrivito";

/**
 * Create a singleton instance of the i18n config interface
 *
 */
function createI18NConfigAtRuntime () {
  Scrivito.load(() => {
    return {
      config: Scrivito.Obj.getByPermalink(I18nConfigId),
      isEditorLoggedIn: Scrivito.isEditorLoggedIn(),
      isInPlaceEditingActive: Scrivito.isInPlaceEditingActive()
    };
  }).then(result => {
    if (result && result.isEditorLoggedIn && result.isInPlaceEditingActive && !result.config) {
      console.log('Initialising...');
      const objClass = Scrivito.getClass('I18NConfig') as ObjClass;
      objClass?.create({
        _permalink: I18nConfigId
      });
    }
  });
}

export default createI18NConfigAtRuntime;
