import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-restore-button',
  template: `
    <button class="card__restore" (click)="restoreProduct(rowData.idProduct)">
      <i class="fa fa-undo"></i>
    </button>
  `,
  styles: [`
    .card__restore {
      position: absolute;
      background: none;
      border: none;
      color: #38363d;
      cursor: pointer;
      font-size: 1.2em;
      margin-left:20px;
      margin-top: -10px;
    }
  `]})
export class RestoreButtonComponent {
  @Input() rowData: any;
  @Input() restoreProduct: (idProduct: string) => void;
}
