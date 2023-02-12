import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genreName'
})
export class GenreNamePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
