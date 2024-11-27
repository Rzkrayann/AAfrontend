import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNotDone]',
  standalone: true
})
export class NotDoneDirective {

  constructor(el:ElementRef) {
    // italic font
    el.nativeElement.style.fontStyle = 'italic';
    el.nativeElement.style.backgroundColor = 'black';
    //border color
    el.nativeElement.style.borderColor = 'red';
    // border size
    el.nativeElement.style.borderWidth = '3px';
    // font polices to terminal
    el.nativeElement.style.fontFamily = 'Impact';
  }
}
