import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'av-app',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
    title = 'Tour of Heroes';

    public constructor() {
        console.log('done');
    }

    public ngOnInit(): void {
        console.log('done');
    }
}
