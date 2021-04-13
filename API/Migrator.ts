import * as Scrivito from 'scrivito';
import {v4} from "uuid";

export async function migrateRecursively(scrivitoObj: Scrivito.Obj, target: string, currentpath: string | undefined = undefined, logFunc: (log: string) => void) {
    let copy: Scrivito.Obj | undefined = undefined;
    try {
        copy = await scrivitoObj.copy();
    } catch (err) {
        logFunc(`Error copying ${scrivitoObj.path()}`);
    }

    if(copy === undefined) {
        return;
    }

    copy.update({'_siteId': target});

    let nextpath: string;

     // If our object is at root
    if(!currentpath) {
        copy.update({'_path': '/'})
        nextpath = "/";
    } else {
        const id = v4();
        nextpath = `${currentpath}/${id}/`
        copy.update({'_path': nextpath})
    }

    logFunc(`Successfully copied ${scrivitoObj.id()} to @${target} and path ${nextpath}`);

    const children = scrivitoObj.children();
    if(children) {
        children.forEach(child => {
            migrateRecursively(child, target, nextpath, logFunc)
        });
    }
    
}
