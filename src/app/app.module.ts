import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
// Components
import {MatCardModule, MatProgressSpinnerModule, MatIconRegistry, MatRadioModule, MatListModule, MatProgressBar, MatProgressBarModule } from '@angular/material';
import {MatToolbarModule} from '@angular/material';
import {MatIconModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {RouterModule, Routes} from '@angular/router';
import {MatDatepickerModule} from '@angular/material';
import {MatNativeDateModule} from '@angular/material';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material';
import {MatChipsModule} from '@angular/material/chips';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSliderModule} from '@angular/material/slider';
import {MatExpansionModule} from '@angular/material/expansion';
import { NouisliderModule } from 'ng2-nouislider';
import {MatDividerModule} from '@angular/material/divider';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AvatarModule } from 'ngx-avatar';
import { MomentModule } from 'angular2-moment';
import { NumeralModule } from 'ngx-numeral';
import { IntercomModule } from 'ng-intercom';
import { FileSelectDirective } from 'ng2-file-upload';
// import { TakeActionComponent } from './components/take-action/take-action.component';
// import { MetricsChangeComponent } from './components/metrics-change/metrics-change.component';
// import { LineComponent } from './components/line/line.component';
// import { DonutLegendComponent } from './components/donut-legend/donut-legend.component';
// import { HistogramComponent } from './components/histogram/histogram.component';
// import { SegmentEditorComponent } from './views/segment-editor/segment-editor.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
// import { ValidationComponent } from './views/validation/validation.component';
// import { UniqueNumberComponent } from './components/unique-number/unique-number.component';
// import { EnginePerformanceComponent } from './components/engine-performance/engine-performance.component';
// import { GroupedHistogramComponent } from './components/grouped-histogram/grouped-histogram.component';
import { LoginComponent } from './views/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { AuthenticationService } from './services/authentication.service';
// import { RouteserviceService } from './services/routeservice.service';
import { HttpService } from './services/http.service';
// import { DatastoryComponent } from './views/datastory/datastory.component';
// import { FeedCardComponent } from './components/feed-card/feed-card.component';
// import { FeedComponent } from './views/feed/feed.component';
// import { ReadMoreComponent } from './components/read-more/read-more.component';
// import { PredictionPerformanceComponent } from './components/prediction-performance/prediction-performance.component';
// import { RoiCardComponent } from './components/roi-card/roi-card.component';
// import { PotentialSavingsCardComponent } from './components/potential-savings-card/potential-savings-card.component';
// import { FilterComponent } from './components/filter/filter.component';
// import { SegmentsComponent } from './views/segments/segments.component';
// import { SegmentCardComponent } from './components/segment-card/segment-card.component';
// import { IntegrationsComponent } from './views/integrations/integrations.component';
// import { IntegrationCardComponent } from './components/integration-card/integration-card.component';
// import { ModalComponent } from './components/modal/modal.component';
// import { TakeActionDialogComponent } from './components/take-action-dialog/take-action-dialog.component';
// import { SaveSegmentsModalComponent } from './components/save-segments-modal/save-segments-modal.component';
// import { SegmentTakeActionModalComponent } from './components/segment-take-action-modal/segment-take-action-modal.component';
import { CollapseSidenavComponent } from './components/collapse-sidenav/collapse-sidenav.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
// import { CampaignsComponent } from './views/campaigns/campaigns.component';
// import { CampaignCardComponent } from './components/campaign-card/campaign-card.component';
// import { ViewUsersTableModalComponent } from './components/view-users-table-modal/view-users-table-modal.component';
import { MatTableModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material';
import { MatSortModule } from '@angular/material';
import { ClickOutsideModule } from 'ng-click-outside';
import { JwtModule } from '@auth0/angular-jwt';
import { KycComponent } from './views/kyc/kyc.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  // {
  //   path: 'performance',
  //   component: ValidationComponent,
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'segments/editor',
  //   component: SegmentEditorComponent,
  //   canActivate: [AuthGuard]
  // },
  // {
  //     path: 'segments/editor',
  //     component: FilterViewComponent,
  //     canActivate: [AuthGuard]
  //   },
  // {
  //   path: 'segments',
  //   component: SegmentsComponent,
  //   canActivate: [AuthGuard]
  // },
  {
    path: 'admin',
    component: KycComponent,
    canActivate: [AdminGuard]
  },
  // {
  //   path: 'campaigns',
  //   component: CampaignsComponent,
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'campaign/performance',
  //   component: CampaignPerformanceComponent,
  //   canActivate: [AuthGuard]
  // },
  //  {
  //    path: 'datastory',
  //    component: DatastoryComponent,
  //    canActivate: [AuthGuard]
  //  },
  {
    path: 'kyc',
    component: KycComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/kyc',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'profile/edit',
  //   component: ProfileUpdateComponent,
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'filters',
  //   component: FilterViewComponent,
  //   canActivate: [AuthGuard]
  // },
  {
    path: '**',
    component: PageNotFoundComponent
  },

];

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    FileSelectDirective,
    // TakeActionComponent,
    // MetricsChangeComponent,
    // LineComponent,
    // DonutLegendComponent,
    // HistogramComponent,
    // SegmentEditorComponent,
    PageNotFoundComponent,
    // ValidationComponent,
    // UniqueNumberComponent,
    // EnginePerformanceComponent,
    // GroupedHistogramComponent,
    LoginComponent,
    // DatastoryComponent,
    // FeedCardComponent,
    // FeedComponent,
    // ReadMoreComponent,
    // PredictionPerformanceComponent,
    // RoiCardComponent,
    // PotentialSavingsCardComponent,
    // FilterComponent,
    // SegmentsComponent,
    // SegmentCardComponent,
    // IntegrationsComponent,
    // IntegrationCardComponent,
    // ModalComponent,
    // TakeActionDialogComponent,
    // SaveSegmentsModalComponent,
    // SegmentTakeActionModalComponent,
    CollapseSidenavComponent,
    // CampaignsComponent,
    // CampaignCardComponent,
    // ViewUsersTableModalComponent,
    // CampaignPerformanceComponent,
    // FunnelGraphComponent,
    // MultiLineGraphComponent,
    // CheckCampaignModalComponent,
    // ConfusionMatrixComponent,
    // CohortCardComponent,
    // AddUserIdsComponent,
    // CohortAnalysisCardComponent,
    // FilterViewComponent,
    // TableForFilterViewComponent,
    // NumberListComponent,
    // TimeListComponent,
    // NumberTimeListComponent,
    // FilterChipHolderComponent,
    // QualityIndicatorComponent,
    // ProfileUpdateComponent,
    KycComponent,
    
  ],
  exports: [
    MatExpansionModule,
  ],
  imports: [
    // IntercomModule.forRoot({
    //   appId: 'kw8055pi',
    //   updateOnRouterChange: true
    // }),
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false,
        useHash: true
      }
    ),
    // MarkdownModule.forRoot(),
    HttpModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        // ...
        tokenGetter: tokenGetter,
      }
    }),
    BrowserModule,
    BrowserAnimationsModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // REMOVE it when a real server is ready to receive requests.
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatCardModule,
    MatStepperModule,
    MatSnackBarModule,
    NgxChartsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatExpansionModule,
    MatTooltipModule,
    MatChipsModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSliderModule,
    PdfViewerModule,
    AvatarModule,
    MomentModule,
    NouisliderModule,
    MatDividerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NumeralModule.forRoot(),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatRadioModule,
    MatListModule,
    ClickOutsideModule,
    MatProgressBarModule,
    MatSlideToggleModule
  ],
  entryComponents: [
    // ModalComponent,
    // SaveSegmentsModalComponent,
    // SegmentTakeActionModalComponent,
    // ViewUsersTableModalComponent,
    // CheckCampaignModalComponent,
    // AddUserIdsComponent,
  ],
  providers: [
    AuthenticationService,
    AuthGuard,
    AdminGuard,
    // RouteserviceService,
    HttpService,
    // FilterServiceService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'));
  }
}
