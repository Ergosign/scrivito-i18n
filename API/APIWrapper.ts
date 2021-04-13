import * as Scrivito from 'scrivito';
import { migrateRecursively } from './Migrator';
import {I18nConfigId} from "../Objects/I18NConfig/i18nConfigId";

/**
 * This is a *runtime safe* abstraction over the i18n config singleton object.
 * Do not interact with Scrivito directly. Use this.
 */
class APIWrapper {
  /**
   * Call the function before you want to access the rootpageconfig singleton
   */
  static async before (): Promise<Scrivito.Obj> {
    const singleton = await Scrivito.load(() => Scrivito.Obj.getByPermalink(I18nConfigId));
    if (!singleton) {
      throw new Error('i18n plugin not initalized!');
    }

    return singleton as Scrivito.Obj;
  }

  /**
   * Copy an object and all its children
   * @param selectedLocale Where to copy to
   * @param __dry do a dry run with logging
   */
  static async migrateObjHierarchy (rootId: string, selectedLocale: string) {
    const searchResult = await Scrivito.load(() => Scrivito.Obj.where('_id', 'equals', rootId).first());
    if(searchResult) {
      await migrateRecursively(searchResult, selectedLocale);
    }
  }
}

export default APIWrapper;
