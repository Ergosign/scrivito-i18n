import * as Scrivito from 'scrivito';
import {v4} from "uuid";

export async function migrateRecursively(scrivitoObj: Scrivito.Obj, target: string, currentpath: string | undefined = undefined) {
    const copy = await scrivitoObj.copy();
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

    const children = scrivitoObj.children();
    if(children) {
        children.forEach(child => {
            migrateRecursively(child, target, nextpath)
        });
    }
    
}
