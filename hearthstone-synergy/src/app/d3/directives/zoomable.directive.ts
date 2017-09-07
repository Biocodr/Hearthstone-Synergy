import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { D3Service } from '../services';

@Directive({
    selector: '[zoomableOf]'
})
export class ZoomableDirective implements OnInit {
    @Input('zoomableOf') containerElement: ElementRef;

    constructor(
        private d3Service: D3Service,
        private element: ElementRef
    ) { }

    ngOnInit(): void {
        this.d3Service.applyZoomableBehaviour(this.containerElement, this.element.nativeElement);
    }
}