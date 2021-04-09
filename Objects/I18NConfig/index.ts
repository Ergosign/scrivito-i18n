import createObjClass from './createI18NObjClass';
import createEditingConfig from './createI18NConfigEditingConfig';
import createI18NConfigAtRuntime from './createI18NConfigAtRuntime';

function initI18nConfigObject () {
  createObjClass();
  createEditingConfig();
  createI18NConfigAtRuntime();
}

export default initI18nConfigObject;
