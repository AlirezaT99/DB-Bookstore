import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {SearchComponent} from './search/search.component';
import {NavMenuComponent} from './nav-menu/nav-menu.component';
import {AboutUsComponent} from './about-us/about-us.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DataService} from './services/data.service';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { PublisherPanelComponent } from './publisher-panel/publisher-panel.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { QueryPanelComponent } from './query-panel/query-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    NavMenuComponent,
    AboutUsComponent,
    AdminPanelComponent,
    PublisherPanelComponent,
    UserPanelComponent,
    QueryPanelComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: QueryPanelComponent, pathMatch: 'full'},
      {path: 'about-us', component: AboutUsComponent},
      {path: 'admin', component: AdminPanelComponent},
      {path: 'publisher', component: PublisherPanelComponent},
      {path: 'user', component: UserPanelComponent},
    ], { useHash: true}),
    BrowserAnimationsModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
