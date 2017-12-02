import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : []    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppBrowserModule { }
