import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appImgBroken]'
})
export class ImgBrokenDirective {
  @Input() customImg: string = '../../../assets/img-broken.png'
  @HostListener('error') handleError(): void {
    const elNative = this.elHost.nativeElement
    elNative.src = this.customImg
  }
  constructor(private elHost: ElementRef) { }

}
