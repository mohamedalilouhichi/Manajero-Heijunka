import { Component } from '@angular/core';

@Component({
  selector: 'ngx-heijunka',
  templateUrl: './heijunka.component.html',
  styleUrls: ['./heijunka.component.scss'],
})
export class HeijunkaComponent {
  titles: string[] = ['Heijunka', '平準化'];
  currentTitleIndex: number = 0;

  fadeIn: boolean = false;
  constructor() {
    this.switchTitles();
  }
  switchTitles() {
    setTimeout(() => {
      this.fadeIn = true;
      setTimeout(() => {
        this.fadeIn = false;

        setTimeout(() => {
          this.currentTitleIndex = (this.currentTitleIndex + 1) % this.titles.length; // Switch to next title
          this.switchTitles();
        }, 500);
      }, 3500);
    }, 200);
  }

  get currentTitle(): string {
    return this.titles[this.currentTitleIndex];
  }
  handleButtonClick(): void {
    // Implement the functionality you want when the button is clicked
    // Add your logic here
  }
}
