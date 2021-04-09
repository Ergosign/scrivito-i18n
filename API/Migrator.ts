import * as Scrivito from 'scrivito';

export function migrateObjects(sources: string[], target: string, __dry: boolean = false) {
    const promises: Promise<any>[] = [];

    for (const source of sources) {
        promises.push(migrateObject(source, target, __dry));
    }

    return Promise.all(promises);
}

async function migrateObject(source: string, target: string, __dry: boolean = false) {
    const searchResult: Scrivito.Obj[] = await Scrivito.load(() => Scrivito.Obj.where('_path', 'equals', source).take());
    let obj: Scrivito.Obj;
}
