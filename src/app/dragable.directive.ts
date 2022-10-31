import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDraggable]',
})
export class Draggable {
  @Input() appDraggable: any = undefined;
  protected _elementClass: string[] = [];

  constructor(private el: ElementRef) {
    this.el.nativeElement.draggable = true;
  }

  @HostBinding('class')
  get elementClass(): string {
    return this._elementClass.join(' ');
  }
  set(val: string) {
    this._elementClass = val.split(' ');
  }

  @HostListener('dragstart', ['$event'])
  dragStartHanler(ev: any) {
    ev.dataTransfer.setData('text/json', JSON.stringify(this.appDraggable));
    const html = this.el.nativeElement.innerHTML;
    ev.dataTransfer.setData('text/html', html);
    ev.dataTransfer.dropEffect = 'move';
    this.set('dragging');
  }

  @HostListener('dragend', ['$event'])
  dragEndHandler(ev: any) {
    this.set('');
    ev.dataTransfer.clearData();
  }

  
}
