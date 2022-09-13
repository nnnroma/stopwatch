import { Component, OnInit } from '@angular/core';
import { interval, subscribeOn, Subscription, timer, fromEvent, from } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})
export class TimerComponent {

  constructor() {

  }

  hours = 0;
  minuts = 0;
  seconds = 0;

  text:string = "pause"

  date = new Date(this.hours, this.minuts, this.seconds);  

  myTimer = timer(0, 1000) ;

  time!: Subscription;

  isWork = false;

  condition = 'Start';

  btnCondition = 'warn';

  conditionPause = false;

  startTimer() {
    if(this.isWork === false) {
      this.startWatch()
      this.condition = 'Stop'
      this.isWork = true;
    } else {
      this.time.unsubscribe()
      this.hours = 0;
      this.minuts = 0;
      this.seconds = 0;      
      this.date.setHours(this.hours, this.minuts, this.seconds);
      this.condition = 'Start'
      this.isWork = false;
    }
  }

  startWatch() {
    this.time = this.myTimer.subscribe(() => {
      this.seconds++
      this.date.setHours(this.hours, this.minuts, this.seconds);
      this.conditionPause = false;
    })
  }

  oneClick = false;
  dblClick = false

  weigthTimer() {
    if(this.oneClick === true) {
      this.dblClick = true;
    } 

    if(this.dblClick === true && this.oneClick === true) {
      this.time.unsubscribe()
      this.isWork = false;
      this.condition = 'Start'
      this.date.setHours(this.hours, this.minuts, this.seconds);
      this.conditionPause = true;
      return
    }

    this.oneClick = true;

    timer(300).subscribe(()=> {
      this.oneClick = false;
    })   
  }

  restartTime() {
    this.time.unsubscribe()
    this.hours = 0;
    this.minuts = 0;
    this.seconds = 0;
    this.date.setHours(this.hours, this.minuts, this.seconds);
    this.startWatch()
    this.isWork = true;
    this.condition = 'Stop'
  }

}