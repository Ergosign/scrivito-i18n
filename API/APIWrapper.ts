import * as Scrivito from 'scrivito';
import { migrateObjects } from './Migrator';

/**
 * This is a *runtime safe* abstraction over the i18n config singleton object.
 * Do not interact with Scrivito directly. Use this.
 */
class APIWrapper {
  /**
   * Call the function before you want to access the rootpageconfig singleton
   */
  static async before (): Promise<Scrivito.Obj> {
    const singleton = await Scrivito.load(() => Scrivito.Obj.getByPermalink('rootpageconfig'));
    if (!singleton) {
      throw new Error('i18n plugin not initalized!');
    }

    return singleton as Scrivito.Obj;
  }

  /**
   * Copy objects are selected path to somewhere else
   * @param selectedLocale Where to copy to
   * @param __dry do a dry run with logging
   */
  static async migrateObjs (selectedIds: string[], selectedLocale: string, __dry = false) {
    if (!__dry) {
    } else {
      console.log(`Dry run: Registering language: ${selectedLocale}`);
    }

    await migrateObjects(selectedIds, selectedLocale, __dry);
  }
}

export default APIWrapper;
