import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toFixed'
})
export class ToFixedPipe implements PipeTransform {

  transform(value: number, ...args: [number]): string {
    return value.toFixed(args[0]);
  }

}
