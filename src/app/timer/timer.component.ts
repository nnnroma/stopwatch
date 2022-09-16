import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, timer, filter, withLatestFrom, debounceTime, map, switchMap, buffer, takeUntil, skip } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  onStart$ = new BehaviorSubject<boolean>(false);
  seconds$ = new BehaviorSubject<number>(0);
  clickWait$ = new Subject<void>()

  constructor() { }

  ngOnInit(): void {
    this.onStart$.pipe(
      filter(() => this.onStart$.getValue()),
      withLatestFrom(this.seconds$),
      switchMap( ([_, currentSeconds]) => {
        return timer(0, 1000).pipe(
          map(val => val + currentSeconds),
          takeUntil(this.onStart$.pipe(skip(1))),
          )
      })
    ).subscribe((v) => {
      this.seconds$.next(v);
    }) 

    const doubleClick = this.clickWait$.asObservable();

    doubleClick.pipe(
      buffer(doubleClick.pipe(debounceTime(250))),
      map(clicks => clicks.length),
      filter((clicksLengs) => clicksLengs === 2),
    ).subscribe(() => {
      this.pauseTimer();
      this.onStart$.next(false);
    })
  }

  startTimer():void {
    this.onStart$.next(true);
  }

  pauseTimer():void {
    this.clickWait$.next();
  }

  stopTimer():void {
    this.onStart$.next(false);
    this.seconds$.next(0);
  }

  resetTimer():void {
    this.stopTimer();
    this.startTimer();
  }
}
