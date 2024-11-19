import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNotDone]',
  standalone: true
})
export class NotDoneDirective {

  constructor(el:ElementRef) {
    // italic font
    el.nativeElement.style.fontStyle = 'italic';
    el.nativeElement.style.backgroundColor = '#d970ff';
  }
}
