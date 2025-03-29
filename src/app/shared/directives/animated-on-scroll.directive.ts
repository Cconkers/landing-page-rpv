import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  AfterViewInit,
  OnDestroy
} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appAnimateOnScroll]'
})
export class AnimateOnScrollDirective implements AfterViewInit, OnDestroy {
  @Input('appAnimateOnScroll') animationClass = 'animate-fade-up';
  private observer!: IntersectionObserver;
  @Input() delay: number = 0; // en milisegundos
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio >= 0.5) {
        setTimeout(() => {
          this.renderer.addClass(this.el.nativeElement, this.animationClass);
          this.renderer.removeClass(this.el.nativeElement, 'opacity-0');
          this.observer.disconnect();
        }, this.delay);
      }
    }, {
      threshold: 0.5
    });


    this.renderer.addClass(this.el.nativeElement, 'opacity-0');
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.observer) this.observer.disconnect();
  }
}
