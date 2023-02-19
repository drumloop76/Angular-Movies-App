import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';
import Swiper from 'swiper';

@Directive({
  selector: '[appCarouselBtns]'
})

export class CarouselBtnsDirective implements AfterViewInit {
  swiper?: Swiper;

  private unlisteneNext!: () => void;
  private unlistenePrev!: () => void;

  newStyles: any = {
    'background-color': 'rgba(0,0,0, 0.2)',
    'color': 'rgba(255,255,255, 0.7)',
    'padding': '8px',
    'border': '1px solid rgba(255,255,255, 0.2)',
    'border-radius': '5px',
  };

  hoverStyles: any = {
    'background-color': 'rgba(0,0,0, 0.4)',
    'color': 'rgba(255,255,255)',
    'padding': '8px',
    'border': '1px solid rgba(255,255,255, 0.5)',
    'border-radius': '5px',
  }

  constructor(
    private element: ElementRef,
    private renderer: Renderer2 
  ) { }

  ngAfterViewInit() {
    const swiper = this.element.nativeElement.swiper;
    const nodeNextBtn = swiper.navigation.nextEl;
    const nodePrevBtn = swiper.navigation.prevEl;
    
    this.renderStyles(nodeNextBtn, this.newStyles);
    this.renderStyles(nodePrevBtn, this.newStyles);

    this.onHoverBtns(nodeNextBtn, nodePrevBtn);
  }

  renderStyles(x:any, style:any) {
    Object.keys(style).forEach(ns => {
      this.renderer.setStyle(
        x, `${ns}`, style[ns]
      );
    });
  }

  onHoverBtns(a:any, b:any) {
    this.unlisteneNext = this.renderer.listen(a, "mouseover", event => {
      this.renderStyles(a, this.hoverStyles);
    });
    this.unlisteneNext = this.renderer.listen(a, "mouseleave", event => {
      this.renderStyles(a, this.newStyles);
    });
    this.unlistenePrev = this.renderer.listen(b, "mouseover", event => {
      this.renderStyles(b, this.hoverStyles);
    });
    this.unlistenePrev = this.renderer.listen(b, "mouseleave", event => {
      this.renderStyles(b, this.newStyles);
    });
  }

  ngOnDestroy() {
    this.unlisteneNext();
    this.unlistenePrev();
  }

}
