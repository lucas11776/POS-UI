import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'middleTruncate'
})
export class MiddleTruncatePipe implements PipeTransform {
  separator = '...';

  transform(value: string, ...args: [number,string?]): string {
    /* istanbul ignore else */
    if(value.length <= args[0]) return value;
    let separator = args[1] || this.separator;
    let separatorLen = separator.length;
    let numberCharsShow = args[0] - separatorLen;
    let numberOfFrontChars = Math.ceil(numberCharsShow/2);
    let numberOfBackChars = Math.ceil(numberCharsShow/2);
    return value.substr(0, numberOfFrontChars) + separator + value.substr(value.length - numberOfBackChars);
  }

}
