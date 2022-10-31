import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { PlayerService } from './player.service';

@Directive({
  selector: '[appDropable]',
})
export class Dropable {
  // @Input() appDropable = 0;
  @Output() dropped: EventEmitter<any> = new EventEmitter<any>();
  protected _elementClass: string[] = [];
  constructor(public el: ElementRef, private playerService: PlayerService) {}

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
    console.log('thing', this._elementClass);
    this.set('');
  }

  @HostListener('drop', ['$event'])
  drop_handler(event: any) {
    event.preventDefault();
    //const html = event.dataTransfer.getData('text/html');
    //const data = parseInt(event.dataTransfer.getData('text/number'), 10);
    this.set('');
    this.dropped.emit(event);
    //this.playerService.moveAfter(data, this.appDropable);
  }

  @HostListener('dragenter', ['$event'])
  dragenter_hander(event: any) {
    event.dataTransfer.dropEffect = 'move';
    const data = event.dataTransfer.getData('text/other');
    console.log('data', data);
    event.preventDefault();
  }
}
