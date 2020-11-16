import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  constructor() { }

  convert(form: Object): FormData {
    const formData = new FormData();
    for(const [name, value] of Object.entries(form))
      if(value instanceof FileList) this.fileList(formData, name, value);
      else if(value) formData.append(name, value);
    return formData;
  }

  fileList(formData: FormData, name: string, fileList: FileList): FormData {
    for(let i = 0; i < fileList.length; i++) 
      formData.append(`${name}[]`, fileList[i]);
    return formData;
  }
}