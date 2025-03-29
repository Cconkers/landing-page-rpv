import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  standalone: true
})
export class ClickOutsideDirective {
  @Output() appClickOutside = new EventEmitter<void>();

  constructor(private el: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: HTMLElement): void {
    console.log(targetElement);

    const clickedInside = this.el.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.appClickOutside.emit();
    }
  }
}
