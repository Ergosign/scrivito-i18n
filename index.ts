import i18nEditorDialog from './Components/i18nEditorDialog';
import * as Scrivito from 'scrivito';
import initI18NConfigObject from './Objects/I18NConfig';

/**
 * Extend the Scrivito Sidebar Menu with a Plugin Entry
 */
function extend() {
  Scrivito.extendMenu(function(menu) {
    menu.insert({
      id: 'i18n',
      onClick: () => Scrivito.openDialog('InternationalisationPlugin'),
      title: 'i18n Plugin',
      group: 'i18n'
    });
  });

  Scrivito.registerComponent('InternationalisationPlugin', i18nEditorDialog);
  initI18NConfigObject();
}

export default extend();
