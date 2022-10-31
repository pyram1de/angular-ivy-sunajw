import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appDropable]',
})
export class Dropable {
  @Output() dropped: EventEmitter<any> = new EventEmitter<any>();
  protected _elementClass: string[] = [];
  constructor(public el: ElementRef) {}

  @HostBinding('class')
  get elementClass(): string {
    return this._elementClass.join(' ');
  }
  set(val: string) {
    this._elementClass = val.split(' ');
  }
  @HostListener('dragover', ['$event'])
  dragover_handler(event: any) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    this.set('show');
  }

  @HostListener('dragleave', ['$event'])
  dragleave_handler(event: any) {
    event.preventDefault();
    this.set('');
  }

  @HostListener('drop', ['$event'])
  drop_handler(event: any) {
    event.preventDefault();
    const source = JSON.parse(event.dataTransfer.getData('text/json'));
    this.dropped.emit(source);
    this.set('');
  }

  @HostListener('dragenter', ['$event'])
  dragenter_hander(event: any) {
    event.dataTransfer.dropEffect = 'move';
    const data = event.dataTransfer.getData('text/other');
    console.log('data', data);
    event.preventDefault();
  }
}
