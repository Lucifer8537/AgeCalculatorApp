import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'age-calculator-app';
  day!: number;
  month!: number;
  year!: number;
  currentYear!: number;
  currentMonth!: number;
  currentDay!: number;
  currentTime!: number;
  submit = false;
  ageDays!: number;
  ageMonth!: number;
  ageYear!: number;
  monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  showDay = '--';
  showMonth = '--';
  showYear = '--';
  errorDay = false;
  errorMonth = false;
  errorYear = false;
  emptyDay = false;
  emptyMonth = false;
  emptyYear = false;
  isDesktopView!: boolean;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isDesktopView = !result.matches;
      });
    const date = new Date();
    console.log(date);
    this.currentYear = date.getFullYear();
    this.currentMonth = date.getMonth() + 1;
    this.currentDay = date.getDate();
    this.currentTime = date.getTime();
  }

  ageCal(form: NgForm) {
    this.submit = true;
    console.log(this.day + '-' + this.month + '-' + this.year);
    this.emptyDay = false;
    this.emptyMonth = false;
    this.emptyYear = false;
    this.errorDay = false;
    this.errorMonth = false;
    this.errorYear = false;
    this.checkDay(this.day, this.month, this.year);
    this.checkDayYearMonth(this.day, this.month, this.year);
    if (this.day && this.month && this.year) {
      if (!this.errorDay && !this.errorMonth && !this.errorYear) {
        this.ageYear = this.currentYear - this.year;
        this.ageMonth = this.currentMonth - this.month;
        this.ageDays = this.currentDay - this.day;

        if (this.ageMonth < 0 || (this.ageMonth === 0 && this.ageDays < 0)) {
          this.ageYear--;
          this.ageMonth += 12;
        }

        if (this.ageDays < 0) {
          this.ageMonth--;
          let previousMonth = this.ageMonth - 2;
          if (previousMonth < 0) {
            previousMonth = 11;
          }
          this.ageDays += this.monthDays[previousMonth];
        }
        console.log(this.ageDays + '-' + this.ageMonth + '-' + this.ageYear);
        this.showDay = this.ageDays.toString();
        this.showMonth = this.ageMonth.toString();
        this.showYear = this.ageYear.toString();
      } else {
        this.reset();
      }
    } else {
      if (!this.day) {
        this.emptyDay = true;
        this.errorDay = false;
      }
      if (!this.month) {
        this.emptyMonth = true;
        this.errorMonth = false;
      }
      if (!this.year) {
        this.emptyYear = true;
        this.errorYear = false;
      }
      this.reset();
    }
    console.log(this.errorDay);
    console.log(this.errorMonth);
    console.log(this.errorYear);
    console.log(this.showDay + '-' + this.showMonth + '-' + this.showYear);
  }

  private checkDay = (day: number, month: number, year: number) => {
    if (year % 4 === 0) {
      this.monthDays[1] = 29;
    }
    if (day > this.monthDays[month - 1] || day > 31) {
      console.log('day : ', day);
      console.log('this.monthDays[month-1] : ', this.monthDays[month - 1]);
      this.errorDay = true;
    }
  };

  private checkDayYearMonth = (day: number, month: number, year: number) => {
    if (month > 12) {
      this.errorMonth = true;
    }
    if (year > this.currentYear) {
      this.errorYear = true;
    } else if (year === this.currentYear) {
      if (month > this.currentMonth) {
        this.errorMonth = true;
      } else if (month === this.currentMonth) {
        if (day < this.currentDay) {
          this.errorDay = true;
        }
      }
    }
  };
  private reset = () => {
    this.showDay = '--';
    this.showMonth = '--';
    this.showYear = '--';
  };
}
