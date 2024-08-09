import { NgModule } from '@angular/core';
import {
    NbAccordionModule,
    NbButtonModule,
    NbCardModule, NbInputModule,
    NbMenuModule, NbSelectModule,
    NbStepperModule,
    NbTabsetModule,
} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import {HeijunkaComponent} from '../heijunka/heijunka.component';
import {HttpClientModule} from '@angular/common/http';
import {AngularEditorModule} from '@kolkov/angular-editor';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PlanningComponent} from '../planning/planning.component';
import {ScheduleModule, DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService} from '@syncfusion/ej2-angular-schedule';
import {AlgorithmComponent} from '../algorithm/algorithm.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ProductsComponent} from '../products/products.component';
import {ProductListComponent} from '../product-list/product-list.component';
import {LatestheijunkaboxComponent} from '../LatestHeijunkaBox/latestheijunkabox.component';
import {CardsComponent} from '../cards/cards.component';
import {HeijunkaboxComponent} from '../heijunkabox/heijunkabox.component';

@NgModule({
    imports: [
        FormsModule,
        AngularEditorModule,
        PagesRoutingModule,
        ThemeModule,
        NbMenuModule,
        DashboardModule,
        ECommerceModule,
        MiscellaneousModule,
        NbCardModule,       // Add NbCardModule
        NbStepperModule,    // Add NbStepperModule
        NbButtonModule,
        NbTabsetModule,
        NbAccordionModule,
        HttpClientModule,
        ScheduleModule,
        ReactiveFormsModule,
        Ng2SmartTableModule,
        NbSelectModule,
        NbInputModule,
    ],

  providers: [DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService],
  declarations: [
    PagesComponent,
    HeijunkaComponent,
    PlanningComponent,
    AlgorithmComponent,
    ProductsComponent,
    ProductListComponent,
    LatestheijunkaboxComponent,
    CardsComponent,
    HeijunkaboxComponent,
  ],
})
export class PagesModule {
}
