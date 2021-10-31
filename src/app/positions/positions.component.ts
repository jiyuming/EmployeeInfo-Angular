import { Component, OnInit, OnDestroy } from '@angular/core';
import { Position } from '../data/position';
import { PositionService } from '../data/position.service';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {

  private positions: Position[];
  private sub: any;
  private loadingError: boolean = false;

  constructor(private postionService: PositionService) { }

  ngOnInit() {
    this.sub = this.getPositionsSub();
  }

  getPositionsSub(): any {
    try {
      return this.postionService.getPositions().subscribe(p => {
        this.positions = p;
      })
    } catch (error) {
      console.log(error);
      this.loadingError = true;
    }
  }

  ngOnDestroy() {
    if (this.sub != undefined) this.sub.unsubscribe();
  }

}
