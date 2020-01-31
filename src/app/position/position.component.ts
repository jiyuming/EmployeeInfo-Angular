import { Component, OnInit } from '@angular/core';
import { Position} from '../data/position';
import { PositionService} from '../data/position.service';
import { ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';

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

  constructor(private p: PositionService, private r: ActivatedRoute) { }

  ngOnInit() {
    this.paramSubScription = this.r.params.subscribe(param => {
      this.positionSubscription = this.p.getPosition(param['_id']).subscribe( data => {
        this.position = data[0];
      });
    });
  }

  onSubmit(f: NgForm){
    this.savePositionsSubcription = this.p.savePosition(this.position)
    .subscribe(() => {
      this.successMessage = true;
      setTimeout(() => {
        this.successMessage = false;
      },2500);
    },
    () => {
      this.failMessage = true;
      setTimeout(() => {
        this.failMessage = false;
      },2500);
    });
  }

  ngOnDestroy(){
    if(this.paramSubScription){
      this.paramSubScription.unsubscribe();
    }

    if(this.positionSubscription) {
      this.positionSubscription.unsubscribe();
    }

    if(this.savePositionsSubcription){
      this.savePositionsSubcription.unsubscribe();
    }
  }
}
