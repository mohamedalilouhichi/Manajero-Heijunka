import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeijunkaboxService } from './heijunkabox.service';
import { HeijunkaBox } from './HeijunkaBox';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'ngx-latestheijunkabox',
  templateUrl: './latestheijunkabox.component.html',

  styleUrls: ['./latestheijunkabox.component.scss'],
})
export class LatestheijunkaboxComponent implements OnInit, OnDestroy {
  readonly scheduleHeight = '500px';
  readonly startHour = '08:00';
  readonly endHour = '21:00';

  eventSettings: any = { dataSource: [] };
  private startOfWeek: Date;
  private subscription: Subscription;

  constructor(private heijunkaboxService: HeijunkaboxService) {}

  ngOnInit(): void {
    this.startOfWeek = this.getMonday(new Date());
    this.loadEvents();
    this.subscription = interval(10000).subscribe(() => {
      this.checkForNewBox();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public loadEvents() {
    this.heijunkaboxService.getLatestHeijunkaBox().subscribe({
      next: (heijunkaBox: HeijunkaBox) => {
        if (!heijunkaBox || !heijunkaBox.schedule) return;

        // Generate events for the latest LatestHeijunkaBox
        const events = heijunkaBox.schedule.map(entry => {
          const startTime = this.getDateFromDayTimeSlot(entry.Day, entry.TimeSlot.split('-')[0]);
          const endTime = this.getDateFromDayTimeSlot(entry.Day, entry.TimeSlot.split('-')[1]);
          return {
            Id: `${heijunkaBox.idBox}-${entry.Product}-${entry.Day}-${entry.TimeSlot}`,
            Subject: `${entry.Product} - Quantity: ${entry.ProductionQuantity}`,
            StartTime: startTime,
            EndTime: endTime,
          };
        });

        // console.log('Generated events:', events);
        this.eventSettings = { dataSource: events };
      },
      error: (err) => {
        console.error('Error loading LatestHeijunkaBox data:', err);
      }});
  }

  private checkForNewBox() {
    this.heijunkaboxService.getLatestHeijunkaBox().subscribe({
      next: (latestHeijunkaBox: HeijunkaBox) => {
        if (latestHeijunkaBox && latestHeijunkaBox.idBox !== this.eventSettings.dataSource[0].Id.split('-')[0]) {
          this.loadEvents();
        }
      },
      error: (err) => {
        console.error('Error checking for new LatestHeijunkaBox:', err);
      }});
  }

  private getDateFromDayTimeSlot(day: string, time: string): Date {
    const dayNumber = parseInt(day.split(' ')[1], 10);
    const [hour, minute] = time.split(':').map(t => parseInt(t, 10));
    const date = new Date(this.startOfWeek.getFullYear(), this.startOfWeek.getMonth(),
      this.startOfWeek.getDate() + dayNumber - 1, hour, minute);
    // console.log(`Parsed date for day ${day}, time ${time}:`, date);
    return date;
  }

  private getMonday(d: Date): Date {
    d = new Date(d);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }
}

