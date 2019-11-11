import { Directive, HostListener, ElementRef, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appToggleDropdown]"
})
export class ToggleDropdownDirective {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  @HostListener("click") onclick(event: Event) {
    if (this.elRef.nativeElement.className.indexOf("open") == -1) {
      this.renderer.addClass(this.elRef.nativeElement, "open");
    } else {
      this.renderer.removeClass(this.elRef.nativeElement, "open");
    }
  }
}
