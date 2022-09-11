import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exerciseSum'
})
export class ExerciseSumPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    // let _sum = value.reduce
    console.log('value', value.slice())
    let suffix = '';
    const sum = value.reduce((next: any, number: any) => {
      if(typeof(next) === 'string') {
        let amSec = next.split('s')
        // let [amount, sec] = next;
        console.log('amSec', next, amSec)
      }
      return next + number;
    }, 0);
    // console.log('exerciseSum', value, sum)
    return sum;
  }

}
