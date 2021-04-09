import * as Scrivito from 'scrivito';

function destroyMigration(prefix: string) {
    const confirmation = window.confirm('Are you sure?');

    const deletedObjects: string[] = [];

    if (confirmation) {
        Scrivito.load(() => Scrivito.Obj.where('_path', 'startsWith', prefix).toArray()).then(a => {
            for (var obj of a) {
                if (obj != null && obj.path != null && obj!.path()!.startsWith(prefix)) {
                    obj.destroy();

                    deletedObjects.push(obj!.path()!);
                }
            }

            console.log('Deleted Objects:');
            console.log(deletedObjects);
        });
    }
}

/**
 *
 * @param fromPrefix From where to migrate
 * @param toPrefix to where to migrate
 * @param __replaceStr Replace a string in the migration process
 * @param __dry do a dry run
 */
function migrate(fromPrefix: string, toPrefix: string, __replaceStr: string = '', __dry: boolean = false) {
    /**
     * Array of migrated object paths
     */
    const migratedObjects: string[] = [];

    /**
     * Search for all objects with a path that begins with the fromPrefix, cast them to array
     */
    Scrivito.load(() => Scrivito.Obj.where('_path', 'startsWith', fromPrefix).toArray()).then(a => {
        // iterate through
        for (var obj of a) {
            // Get an objects path
            let path = obj.path();

            if (!path) {
                throw new Error('Object has no path but is inside the migration process. This should not have happened');
            }

            /**
             * Scrivito ignores the index path and so do we
             */
            if (path === '/') {
                path = '';
            }

            /**
             * Get an objects permalink
             */

            let permalink = obj.permalink();

            /**
             * Scrivito ignores the index path and so do we
             */
            if (permalink === '/') {
                permalink = '';
            }

            /**
             * If this holds true, an object must already be at this path. Maybe throw an error in the future
             */
            if (path.startsWith(toPrefix)) {
                continue;
            }

            if (!__dry) {
                /**
                 * Copy the object and upate it's path and permalink.
                 */
                obj.copy().then(copy => {
                    copy.update(
                        {
                            _path: path !== null ? `${(toPrefix)}/${path}` : undefined,
                            _permalink: permalink !== null ? `${toPrefix}/${permalink}` : undefined
                        });
                });
            } else {
                console.log(`Copy obj ${obj.objClass()} with path ${obj.path()} and permalink ${obj.permalink()} to path ${toPrefix}/${path} and permalink ${toPrefix}/${permalink}`);
            }

            migratedObjects.push(path);
        }

        console.log('Migrated Objects:');
        console.log(migratedObjects);
    });

    // Next, create a new Object with path '/'
    // This object should have a redirect to the path: /lang/en or whatever the default is

    return migratedObjects;
}

/**
 * This function returns a migrate and undo migrate function
 * @param fromPrefix From which prefix of a path all objects should be migrated to
 * @param toPrefix The target path
 */
export function generateMigration(fromPrefix: string, toPrefix: string) {
    function Do() {
        migrate(fromPrefix, toPrefix, '', true);
    }

    function Undo() {
        destroyMigration(toPrefix);
    }

    return [Do, Undo];
}

export default migrate;
