export const _File = (name: string, type: string, size: number = 1024): File => {
    return new File([new ArrayBuffer(1024 * size)], name, {type: type});
}

export const FileList = (files: File[]): FileList => {
    let dataTransfer = new DataTransfer();
    files.map(file => dataTransfer.items.add(file));
    return dataTransfer.files;
}