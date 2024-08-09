import {Component, OnInit} from '@angular/core';
import {HeijunkaBox} from '../LatestHeijunkaBox/HeijunkaBox';
import {HeijunkaboxService} from '../LatestHeijunkaBox/heijunkabox.service';
import {DatePipe} from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'ngx-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  providers: [DatePipe]
})
export class CardsComponent implements OnInit {
  heijunkaBoxes: HeijunkaBox[];

  constructor(private heijunkaboxService: HeijunkaboxService, private datePipe: DatePipe, private router: Router,
              private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.heijunkaboxService.getHeijunkaBoxes().subscribe((boxes) => {
      this.heijunkaBoxes = boxes;
    });
  }

  getFormattedTimestamp(box: HeijunkaBox): string {
    return this.datePipe.transform(box.timestamp, 'on EEE, yyyy MMM d \'at\' h:mm a') || '';
  }

  openHeijunkaBox(box: HeijunkaBox) {
    this.router.navigate([`/pages/lean/heijunka/heijunka-box`, box.idBox]);
  }
  deleteHeijunkaBox(idBox: string, event: Event) {
    event.stopPropagation(); // Prevent triggering the card's click event
    if (confirm('Are you sure you want to delete this Heijunka Box?')) {
      this.heijunkaboxService.deleteHeijunkaBox(idBox).subscribe(() => {
        // Refresh the list after deletion
        this.heijunkaBoxes = this.heijunkaBoxes.filter(box => box.idBox !== idBox);
      });
    }
  }
}
