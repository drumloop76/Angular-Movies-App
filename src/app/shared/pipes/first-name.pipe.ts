import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstName'
})
export class FirstNamePipe implements PipeTransform {

  transform(value: any): any {
    if(value) { 
      value = value.trim();
      return value.split(' ')[0];
    }
         
    return value
  }

}
