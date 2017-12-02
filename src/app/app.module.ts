import { BrowserModule } from '@angular/platform-browser';
import { NgModule, PLATFORM_ID } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { DrawComponent } from './draw/draw.component';
import { WatchComponent } from './watch/watch.component';
import { ChatService } from './chat/chat.service';

const routes: Routes = [
  { path: 'chat', component: ChatComponent },
  { path: 'draw', component: DrawComponent },
  { path: 'watch', component: WatchComponent },
  { path: '**', redirectTo: 'chat', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    DrawComponent,
    WatchComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'angular-fun' }),
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
