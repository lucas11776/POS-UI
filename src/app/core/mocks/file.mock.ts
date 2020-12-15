export const _File = (name: string = 'file.txt', type: string = 'text/plain', size: number = 1024 * 1024): File => {
    return new File([new ArrayBuffer(size)], name, {type: type});
}

export const FileList = (files: File[]): FileList => {
    let dataTransfer = new DataTransfer();
    files.map(file => dataTransfer.items.add(file));
    return dataTransfer.files;
}