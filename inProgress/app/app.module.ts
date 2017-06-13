import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { ROUTING } from './app.routing';

// import { HomeComponent } from './route/home/home.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ROUTING
    ],
    declarations: [
        AppComponent
        // HomeComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}
