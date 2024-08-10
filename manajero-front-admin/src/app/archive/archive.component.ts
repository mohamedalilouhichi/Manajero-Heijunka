import {Component, OnInit} from '@angular/core';
import {HeijunkaBox} from '../LatestHeijunkaBox/HeijunkaBox';
import {HeijunkaboxService} from '../LatestHeijunkaBox/heijunkabox.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'ngx-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
})
export class ArchiveComponent implements OnInit {
  archivedHeijunkaBoxes: HeijunkaBox[];

  constructor(private heijunkaboxService: HeijunkaboxService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.heijunkaboxService.getArchivedHeijunkaBoxes().subscribe((boxes) => {
      this.archivedHeijunkaBoxes = boxes;
    });
  }
  restoreHeijunkaBox(idBox: string, event: Event) {
    event.stopPropagation(); // Prevent triggering the card's click event
    this.heijunkaboxService.restoreHeijunkaBox(idBox).subscribe(() => {
      // Refresh the list after restoring
      this.archivedHeijunkaBoxes = this.archivedHeijunkaBoxes.filter(box => box.idBox !== idBox);
    });
  }
  getFormattedTimestamp(box: HeijunkaBox): string {
    return this.datePipe.transform(box.timestamp, 'on EEE, yyyy MMM d \'at\' h:mm a') || '';
  }
}
