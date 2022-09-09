import { Component, OnInit } from '@angular/core';
import { interval, subscribeOn, Subscription, timer, fromEvent, from } from 'rxjs';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})
export class TimerComponent implements OnInit {

  //Ненужная переменная, просто для гита
  bgit = 'Lorem'
  
  
  constructor() {

  }

  hours = 0;
  minuts = 0;
  seconds = 0;

  text:string = "pause"

  date = new Date(this.hours, this.minuts, this.seconds);  

  myTimer = timer(0, 1000);

  time!: Subscription;

  isWork = false;

  condition = 'Start';

  startTimer() {
    if(this.isWork === false) {
      this.time = this.myTimer.subscribe(() => {
      this.seconds++
      this.date.setHours(this.hours, this.minuts, this.seconds);
      this.isWork = true
      this.condition = 'Res'
    });
    } else {
      this.seconds = this.seconds;
      this.date.setHours(this.hours = 0, this.minuts = 0, this.seconds = 0);
      this.condition = 'Start';
      this.isWork = false;
      this.time.unsubscribe()
    }
  }

  isClick = false;
  dblClick = false;


  pauseText = 'Pause';

  pauseTime() {
    if(this.isClick === true) {
      this.date.setHours(this.hours, this.minuts, this.seconds);
      this.time.unsubscribe();
      this.pauseText = 'Play';
      
      
      if(this.dblClick === true) {
        this.time = this.myTimer.subscribe(() => {
          this.seconds++
          this.date.setHours(this.hours, this.minuts, this.seconds);
          this.dblClick = false;
          this.pauseText = 'Pause';
        })
      }
      this.dblClick = true;
    }

    this.isClick = true;
    timer(300).subscribe(()=> {
      this.isClick = false;
    })
  }


  ngOnInit(): void {
    console.log('void')
  }

}