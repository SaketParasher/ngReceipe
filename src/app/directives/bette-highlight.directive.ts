import {
  Directive,
  OnInit,
  Renderer2,
  ElementRef,
  HostListener,
  HostBinding,
  Input
} from "@angular/core";

@Directive({
  selector: "[appBetteHighlight]"
})
export class BetteHighlightDirective implements OnInit {
  @HostBinding("style.backgroundColor") backgroundcolor: string = "transparent";
  @Input() defaultColor: string;
  @Input() highlightedColor: string;
  constructor(private eleRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.defaultColor = "pink";
    // this.renderer.setStyle(
    //   this.eleRef.nativeElement,
    //   "backgroundColor",
    //   "blue"
    // );
  }

  @HostListener("mouseenter") mouseover(event: Event) {
    // this.renderer.setStyle(
    //   this.eleRef.nativeElement,
    //   "backgroundColor",
    //   "blue"
    // );
    this.backgroundcolor = this.highlightedColor;
  }

  @HostListener("mouseleave") mouseleave(event: Event) {
    // this.renderer.setStyle(
    //   this.eleRef.nativeElement,
    //   "backgroundColor",
    //   "transparent"
    // );
    this.backgroundcolor = this.defaultColor;
  }
}
