import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  AfterViewInit,
  OnDestroy
} from '@angular/core';

@Directive({
  selector: '[appAnimateOnScrollAuto]',
  standalone: true
})
export class AnimateOnScrollAutoDirective implements AfterViewInit, OnDestroy {
  @Input('appAnimateOnScrollAuto') animationClass = 'animate-fade-up';
  @Input() baseDelay = 100; // tiempo entre elementos (ms)
  @Input() initialDelay = 0; // retardo antes del primero

  private observer!: IntersectionObserver;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const index = this.getElementIndex();
    const totalDelay = this.initialDelay + (index * this.baseDelay);

    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio >= 0.5) {
        setTimeout(() => {
          this.renderer.addClass(this.el.nativeElement, this.animationClass);
          this.renderer.removeClass(this.el.nativeElement, 'opacity-0');
          this.observer.disconnect();
        }, totalDelay);
      }
    }, { threshold: 0.5 });

    this.renderer.addClass(this.el.nativeElement, 'opacity-0');
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.observer) this.observer.disconnect();
  }

  private getElementIndex(): number {
    const parent = this.el.nativeElement.parentNode;
    if (!parent) return 0;
    const children = Array.from(parent.children);
    return children.indexOf(this.el.nativeElement);
  }
}
