import {Directive, ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDone]',
  standalone: true
})
export class DoneDirective {

  constructor(el:ElementRef) {
    // italic font
    el.nativeElement.style.fontStyle = 'italic';
    el.nativeElement.style.backgroundColor = 'green';
    // font color
    el.nativeElement.style.color = '#000000';

  }
}
