import { Pipe, PipeTransform } from '@angular/core';
import { Genres } from '../models/genres.model';

@Pipe({
  name: 'genreName'
})
export class GenreNamePipe implements PipeTransform {

  transform(value: Genres[], array1: Genres[], array2: Genres[], sep = ', '): any {
    let newValue: Genres[] = [];
    const fullArr = [ ...array1, ...array2];
    // const fullArr = [ array1, array2];

    value.map((x: any) => {
      (fullArr || []).filter((y: any) => {
        if(x === y.id) {
          x = y.name
          newValue.push(x)
        }
      })
    })

    if(newValue) return newValue.join(sep)
    
    return null
  }

}
