import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDraggable]',
})
export class Draggable {
  @Input() appDraggable: any = undefined;

  constructor(private el: ElementRef) {
    this.el.nativeElement.draggable = true;
  }

  @HostListener('dragstart', ['$event'])
  dragStartHanler(ev: any) {
    ev.dataTransfer.setData('text/json', JSON.stringify(this.appDraggable));
    const html = this.el.nativeElement.innerHTML;
    ev.dataTransfer.setData('text/html', html);
    ev.dataTransfer.dropEffect = 'move';
    this.addClass(this.el.nativeElement, 'dragging');
  }

  @HostListener('dragend', ['$event'])
  dragEndHandler(ev: any) {
    this.removeClass(this.el.nativeElement, 'wdragging');
    ev.dataTransfer.reset();
  }

  private hasClass(ele, cls) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
  }

  private addClass(ele, cls) {
    if (!this.hasClass(ele, cls)) ele.className += ' ' + cls;
  }

  private removeClass(ele, cls) {
    if (this.hasClass(ele, cls)) {
      var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
      ele.className = ele.className.replace(reg, ' ');
    }
  }
}
