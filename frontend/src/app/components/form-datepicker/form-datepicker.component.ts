import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { AppSettings } from '../../_services/app.settings'

interface Today {
  year: number,
  month: number,
  day: number
}

@Component({
  selector: 'app-form-datepicker',
  templateUrl: './form-datepicker.component.html',
  styleUrls: ['./form-datepicker.component.css']
})

export class FormDatepickerComponent implements OnInit {
  @Input() placeholder!: string
  @Output() onSelectEvent = new EventEmitter<any>()

  settings = AppSettings

  dt = new Date()
  current !: Today
  date: any = {
    year: null,
    month: null,
    date: null
  }
  datesStack: any = []

  status = 0 // 0: dates, 1: months, 2: years
  years!: any
  startYear = 0

  value = ''

  constructor() {
  }

  ngOnInit(): void {
    this.showCalendar()
  }

  previousMonth(): void {

    this.dt = new Date(this.current.year, this.current.month - 1, 1)
    this.showCalendar()

  }

  nextMonth(): void {

    this.dt = new Date(this.current.year, this.current.month + 1, 1)
    this.showCalendar()

  }

  selectMonth(month: number): void {
    this.dt = new Date(this.current.year, month, 1)
    this.showCalendar()
    this.status = 0
  }

  selectYear(year: number): void {
    this.dt = new Date(year, this.current.month, 1)
    this.showCalendar()
    this.status = 1
  }

  showCalendar(): void {
    this.current = {
      year: this.dt.getFullYear(),
      month: this.dt.getMonth(),
      day: this.dt.getDay(),
    }

    // first day of current month
    let firstDay = new Date(this.current.year, this.current.month, 1).getDay()

    let dates = new Date(this.current.year, this.current.month + 1, 0).getDate()
    let previousDates = new Date(this.current.year, this.current.month, 0).getDate()

    let previous = new Date(this.current.year, this.current.month - 1, 1)
    let next = new Date(this.current.year, this.current.month + 1, 1)

    // 6 weeks dates
    this.datesStack = []
    for (let date = firstDay - 1; date >= 0; date--)
      this.datesStack.push({
        mark: 'previous',
        year: previous.getFullYear(),
        month: previous.getMonth(),
        date: previousDates - date
      })

    for (let date = 1; date <= dates; date++)
      this.datesStack.push({
        mark: 'current',
        year: this.current.year,
        month: this.current.month,
        date: date
      })

    const length = this.datesStack.length
    for (let date = 1; date <= (42 - length); date++)
      this.datesStack.push({
        mark: 'next',
        year: next.getFullYear(),
        month: next.getMonth(),
        date: date
      })
  }

  onSelect(day: any): void {

    let selectedDt = this.dt

    if (day.mark === 'previous') {
      selectedDt = new Date(this.current.year, this.current.month - 1, 1)
    } else if(day.mark === 'next') {
      selectedDt = new Date(this.current.year, this.current.month + 1, 1)
    }

    this.date = {
      year: selectedDt.getFullYear(),
      month: selectedDt.getMonth(),
      date: day.date
    }

    $('#calendar').addClass('hidden')
    this.value = (this.date.month + 1).toString().padStart(2, '0') + '/' + this.date.date.toString().padStart(2, '0') + '/' + this.date.year

    this.onSelectEvent.emit({
      value: this.value
    })
  }

  upper(): void {
    if (this.status === 0) this.status = 1 // go to month level
    else if (this.status === 1) { // go to year level
      this.status = 2

      this.startYear = Math.floor(this.current.year / 10) * 10

      this.years = []
      for (let year = this.startYear - 1; year <= this.startYear + 10; year++)
        this.years.push(year)
    }
    else this.status = 0 // go to date level
  }

  onShow(): void {
    $('#calendar').removeClass('hidden')
  }

}



