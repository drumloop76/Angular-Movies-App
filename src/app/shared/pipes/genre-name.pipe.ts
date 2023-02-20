import { Pipe, PipeTransform } from '@angular/core';
import { Genres } from '../models/genres.model';

@Pipe({
  name: 'genreName'
})

export class GenreNamePipe implements PipeTransform {
  transform(value: any, arr1: Genres[], arr2: Genres[]): any {
    let newValue: any;
    const fullArr = [ ...arr1, ...arr2];

    (fullArr || []).filter((x: any) => {
      if(value === x.id) {
        newValue = x.name
      }
    })

    if(newValue === 'Science Fiction') {
      newValue = 'SciFi';
    }
    if(newValue === 'Sci-Fi & Fantasy') {
      newValue = 'SciFi & Fantasy';
    }

    if(newValue) return newValue
    
    return null
  }

}