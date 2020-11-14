import { file } from '@rxweb/reactive-form-validators';

export const File = (name: string, type: string, size: number = 1024): File => {
    return <File>{
        name: name,
        size: size,
        type: type,
    }
}

export const FileList = (files: File[]): FileList => {
    let obj = {};
    files.map((file, index) => obj[index] = file);
    return <FileList>obj;
}