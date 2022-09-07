import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { UiModule } from '@pablodev2/ui';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { navigationRoutes } from '@pablodev2/navigation';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', children: navigationRoutes}, 
      // { initialNavigation: 'enabled' },
      // { path: '', children: uiRoutes },
     
      {
        path: 'workout',
        loadChildren: () =>
          import('@pablodev2/workout').then(
            (mod) => mod.WorkoutModule // added
          ),
      },
    ]),
    UiModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
