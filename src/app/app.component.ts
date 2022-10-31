import { Component, VERSION } from '@angular/core';
import { Player } from './Player';
import { PlayerService } from './player.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  constructor(private playerService: PlayerService) {}
  get players() {
    return this.playerService.players;
  }

  trackByOrder(index, player) {
    return player ? player.order : undefined;
  }

  dropped(source: Player, target: Player) {
    //const html = event.dataTransfer.getData('text/html');
    //const data = parseInt(event.dataTransfer.getData('text/number'), 10);
    //this.playerService.moveAfter(data, this.appDropable);
    console.log('dropped', source, target);
    this.playerService.moveAfter(source.id, target.order);
  }
}
