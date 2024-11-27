import {Directive, ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDone]',
  standalone: true
})
export class DoneDirective {

  constructor(el:ElementRef) {
    // italic font
    el.nativeElement.style.fontStyle = 'italic';
    el.nativeElement.style.backgroundColor = 'grey';
    //border color
    el.nativeElement.style.borderColor = 'lightgreen';
    // border size
    el.nativeElement.style.borderWidth = '3px';
    // font family to terminal
    el.nativeElement.style.fontFamily = 'Terminal, sans-serif';
    // font color
    el.nativeElement.style.color = '#FFFFFF';

  }
}
