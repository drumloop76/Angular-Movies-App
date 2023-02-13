import { Pipe, PipeTransform } from '@angular/core';
import { Genres } from '../models/genres.model';

@Pipe({
  name: 'genreName'
})

export class GenreNamePipe implements PipeTransform {
  transform(value: any[], arr1: any[], arr2: any[], spc = ', '): any {
    let newValue: any;
    const fullArr = [ ...arr1, ...arr2];

    value.map((x: any) => {
      (fullArr || []).filter((y: any) => {
        if(x === y.id) {
          x = y.name
          newValue.push(x)
        }
      })
    })

    // const index = newValue.indexOf('Science Fiction');
    // if (index !== -1) {
    //   newValue[index] = 'SciFi';
    // }

    if(newValue) return newValue.join(spc)
    
    return null
  }

}
