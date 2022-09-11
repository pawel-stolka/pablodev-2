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
      if(typeof(number) === 'string') {
        // const params = number.reduce((next: any, nr: { split: (arg0: string) => [any, any]; }) => {
        //   const [ key, value ] = nr.split('s');
        //   const decodedValue = decodeURIComponent(value);
        //   return { ...next, [key]: decodedValue };
        // }, {});
        // let amSec = number.split('s')
        // let [amount, sec] = next;
        console.log('amSec', number)//, amSec)
        // console.log('params', params)
      }
      return next + number;
    }, 0);
    // console.log('exerciseSum', value, sum)
    return sum;
  }

}
