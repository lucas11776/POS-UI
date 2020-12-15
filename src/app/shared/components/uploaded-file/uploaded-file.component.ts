import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'ks-uploaded-file',
  templateUrl: './uploaded-file.component.html',
  styleUrls: ['./uploaded-file.component.css']
})
export class UploadedFileComponent implements OnInit {
  @ViewChild('image', { read: ElementRef }) image: ElementRef;
  @Output('delete') deleteEvent = new EventEmitter<void>();
  @Input('file') file: File;
  reader = new FileReader();

  constructor() { }

  ngOnInit(): void {
    this.fileIsImage();
  }

  isImage(): boolean {
    return /\.(jpe?g|png)/i.test(this.file.name);
  }
  
  isVideo(): boolean {
    return /\.(3gp|mpeg|mp4)/i.test(this.file.name);
  }

  isDoc(): boolean {
    return /\.(doc|docx)/i.test(this.file.name);
  }

  isFile(): boolean {
    return /\.(txt)/i.test(this.file.name);
  }

  isAudio(): boolean {
    return /\.(mp3|m4a|wma)/i.test(this.file.name);
  }

  delete(): void {
    this.deleteEvent.emit();
  }

  protected fileIsImage(): void {
    /* istanbul ignore else */
    if(this.isImage()) this.renderImage();
  }

  private renderImage(): void {
      this.reader.addEventListener('load', _ => this.image.nativeElement.src = this.reader.result);
      this.reader.readAsDataURL(this.file);
  }
}
