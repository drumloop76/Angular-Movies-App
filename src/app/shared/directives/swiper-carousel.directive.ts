import { Directive, ElementRef, Input } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Directive({
  selector: '[appSwiperCarousel]'
})
export class SwiperCarouselDirective {
  swiperEl: HTMLElement;

  @Input('config') config?: SwiperOptions;
  @Input('params') params?: SwiperOptions;

  constructor(private el: ElementRef<HTMLElement>) {
    this.swiperEl = el.nativeElement;
    // console.log(this.swiperEl)
  }

  ngAfterViewInit() {
    // console.log(this.swiperEl)

    Object.assign(this.swiperEl, this.config);
    Object.assign(this.swiperEl, this.params);
    
    // @ts-ignore
    this.swiperEl.initialize();
  }

}
