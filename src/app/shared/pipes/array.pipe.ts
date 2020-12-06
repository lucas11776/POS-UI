import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'array'
})
export class ArrayPipe implements PipeTransform {
  transform(value: number, ...args: number[]): Array<number> {
    return new Array<number>(value);
  }
}
