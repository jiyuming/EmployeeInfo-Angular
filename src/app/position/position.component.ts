import { Component, OnInit } from '@angular/core';
import { Position } from '../data/position';
import { PositionService } from '../data/position.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {

  id: string;
  paramSubScription: any;
  positionSubscription: any;
  savePositionsSubcription: any;
  position: Position;
  successMessage = false;
  failMessage = false;

  constructor(private positionService: PositionService, private router: ActivatedRoute) { }

  ngOnInit() {

    this.paramSubScription = this.router.params.subscribe(param => {
      // get _id variable
      this.positionSubscription = this.positionService.getPosition(param['_id']).subscribe(data => this.position = data[0])
    })
  }

  onSubmit() {
    this.savePositionsSubcription = this.positionService.savePosition(this.position)
      .subscribe(() => {
        this.successMessage = true;
        setTimeout(() => {
          this.successMessage = false;
        }, 2500);
      },
        () => {
          this.failMessage = true;
          setTimeout(() => {
            this.failMessage = false;
          }, 2500)
        }
      );
  }

  ngOnDestroy() {
    if (this.paramSubScription) {
      this.paramSubScription.unsubscribe();
    }

    if (this.positionSubscription) {
      this.positionSubscription.unsubscribe();
    }

    if (this.savePositionsSubcription) {
      this.savePositionsSubcription.unsubscribe();
    }
  }
}
