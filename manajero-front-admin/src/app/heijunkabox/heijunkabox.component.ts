import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeijunkaboxService } from '../LatestHeijunkaBox/heijunkabox.service';
import { HeijunkaBox } from '../LatestHeijunkaBox/HeijunkaBox';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-heijunka-box',
  templateUrl: './heijunkabox.component.html',

  styleUrls: ['./heijunkabox.component.scss'],
})
export class HeijunkaboxComponent implements OnInit {
  scheduleHeight = '500px';
  startHour = '08:00';
  endHour = '21:00';
  eventSettings: any = { dataSource: [] };
  startOfWeek: Date; // Make this public so it can be used in the template
  heijunkaBox: HeijunkaBox;
  heijunkaBoxForm: FormGroup;
  isEditing = false;

  constructor(
    private heijunkaboxService: HeijunkaboxService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    const idBox = this.route.snapshot.paramMap.get('idBox');
    this.heijunkaboxService.getHeijunkaBox(idBox).subscribe((heijunkaBox: HeijunkaBox) => {
      if (!heijunkaBox || !heijunkaBox.schedule) return;
      this.heijunkaBox = heijunkaBox;
      this.initializeForm(heijunkaBox);

      // Set the start of the week based on the HeijunkaBox timestamp
      const heijunkaBoxDate = new Date(heijunkaBox.timestamp);
      this.startOfWeek = this.getMonday(heijunkaBoxDate);

      // Generate events for the Heijunka box
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

      this.eventSettings = { dataSource: events };
    });
  }

  private initializeForm(heijunkaBox: HeijunkaBox): void {
    this.heijunkaBoxForm = this.fb.group({
      title: [heijunkaBox.title],
      timestamp: [new Date(heijunkaBox.timestamp).toISOString().split('T')[0]], // Convert to YYYY-MM-DD format
      notes: [heijunkaBox.notes]});
  }

  edit(): void {
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.initializeForm(this.heijunkaBox); // Reinitialize the form with the original values
  }

  onSave(): void {
    if (this.heijunkaBoxForm.valid) {
      const updatedBox = { ...this.heijunkaBox, ...this.heijunkaBoxForm.value };
      this.heijunkaboxService.updateHeijunkaBox(updatedBox).subscribe(response => {
        console.log('HeijunkaBox updated successfully', response);
        this.heijunkaBox = updatedBox; // Update the displayed HeijunkaBox
        this.isEditing = false;
      });
    }
  }

  private getDateFromDayTimeSlot(day: string, time: string): Date {
    const dayNumber = parseInt(day.split(' ')[1], 10);
    const [hour, minute] = time.split(':').map(t => parseInt(t, 10));
    const date = new Date(this.startOfWeek.getFullYear(), this.startOfWeek.getMonth(),
      this.startOfWeek.getDate() + dayNumber - 1, hour, minute);
    return date;
  }

  private getMonday(d: Date): Date {
    d = new Date(d);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }

  goBack(): void {
    this.location.back(); // Navigate back to the previous route
  }
}
