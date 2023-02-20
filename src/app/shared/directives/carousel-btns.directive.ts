import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';
import Swiper from 'swiper';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appCarouselBtns]'
})

export class CarouselBtnsDirective implements AfterViewInit {
  swiper?: Swiper;
  private subscription = new Subscription();

  private unlisteneNext!: () => void;
  private unlistenePrev!: () => void;

  newStyles: any = {
    'width': '23px',
    'background-color': 'rgba(0,0,0, 0.2)',
    'color': 'rgba(255,255,255, 0.7)',
    'padding': '8px',
    'border': '1px solid rgba(255,255,255, 0.2)',
    'border-radius': '5px',
  };

  hoverStyles: any = {
    'background-color': 'rgba(0,0,0, 0.4)',
    'color': 'rgb(255,255,255)',
    'border': '1px solid rgba(255,255,255, 0.5)',
  }

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngAfterViewInit() {
    const swiper = this.element.nativeElement.swiper;
    const nodeNextBtn = swiper.navigation.nextEl;
    const nodePrevBtn = swiper.navigation.prevEl;

    this.subscription = this.breakpointObserver.observe(["(max-width: 576px)"])
      .subscribe((result: BreakpointState) => {
        if (result.matches) {
          this.renderHideStyles(nodePrevBtn, 'none')
          this.renderHideStyles(nodeNextBtn, 'none')
        } else {
          this.renderHideStyles(nodePrevBtn, 'block')
          this.renderHideStyles(nodeNextBtn, 'block')
          this.renderStyles(nodeNextBtn, this.newStyles);
          this.renderStyles(nodePrevBtn, this.newStyles);
          this.onHoverBtns(nodeNextBtn, nodePrevBtn);
        }
      });
  }

  renderStyles(x:any, style:any) {
    Object.keys(style).forEach(ns => {
      this.renderer.setStyle(
        x, `${ns}`, style[ns]
      );
    });
  }

  renderHideStyles(x:any, style:any) {
    this.renderer.setStyle(x, 'display', style);
  }

  onHoverBtns(a:any, b:any) {
    this.unlisteneNext = this.renderer.listen(a, "mouseenter", () => {
      this.renderStyles(a, this.hoverStyles);
    });
    this.unlisteneNext = this.renderer.listen(a, "mouseleave", () => {
      this.renderStyles(a, this.newStyles);
    });
    this.unlistenePrev = this.renderer.listen(b, "mouseenter", () => {
      this.renderStyles(b, this.hoverStyles);
    });
    this.unlistenePrev = this.renderer.listen(b, "mouseleave", () => {
      this.renderStyles(b, this.newStyles);
    });
  }

  ngOnDestroy() {
    this.unlisteneNext();
    this.unlistenePrev();
    this.subscription.unsubscribe();
  }

}
