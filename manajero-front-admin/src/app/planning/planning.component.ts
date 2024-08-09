import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-planning',
  template: `
    <ejs-schedule
      [height]="scheduleHeight"
      [startHour]="startHour"
      [endHour]="endHour"
      [eventSettings]="eventSettings">
    </ejs-schedule>
  `,
  styleUrls: ['./planning.component.scss'],
})
export class PlanningComponent implements OnInit {
  scheduleHeight = '500px';
  startHour = '08:00';
  endHour = '18:00';

  eventSettings: any;

  constructor() { }

  ngOnInit(): void { // Define the ngOnInit method
    this.loadEvents();
  }

  loadEvents() {
    this.eventSettings = {
      dataSource: [
        {
          Id: 1,
          Subject: 'Product 1',
          StartTime: new Date(2024, 6, 29, 9, 0), // July 15th, 2024, 09:00 AM
          EndTime: new Date(2024, 6, 29, 10, 0),   // July 15th, 2024, 10:00 AM
        },
        {
          Id: 2,
          Subject: 'Product 2',
          StartTime: new Date(2024, 6, 30, 10, 0), // July 16th, 2024, 10:00 AM
          EndTime: new Date(2024, 6, 30, 11, 0),   // July 16th, 2024, 11:00 AM
        },
        {
          Id: 3,
          Subject: 'Product 3',
          StartTime: new Date(2024, 6, 31, 11, 0), // July 17th, 2024, 11:00 AM
          EndTime: new Date(2024, 6, 31, 12, 0),   // July 17th, 2024, 12:00 PM
        },
        {
          Id: 4,
          Subject: 'Product 4',
          StartTime: new Date(2024, 7, 1, 13, 0), // July 18th, 2024, 01:00 PM
          EndTime: new Date(2024, 7, 1, 14, 0),   // July 18th, 2024, 02:00 PM
        },
        {
          Id: 5,
          Subject: 'Product 5',
          StartTime: new Date(2024, 7, 2, 14, 0), // July 19th, 2024, 02:00 PM
          EndTime: new Date(2024, 7, 2, 15, 0),   // July 19th, 2024, 03:00 PM
        },
        // Add more events as needed
      ],

    };
  }
}
