import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Subject } from 'rxjs';

@Component({
    selector: 'chat-profile',
    templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit, OnDestroy {
    private onDestroy = new Subject<void>();
    @Input() drawer: MatDrawer;

    public profile = {
        id: "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
        name: "Brian Hughes",
        email: "hughes.brian@company.com",
        avatar: "assets/images/avatars/brian-hughes.jpg",
        about: "Hi there! I'm using FuseChat."
    }

    constructor() { }

    ngOnInit(): void {
        console.log('INFORMACIÓN DE PERFIL: ', this.profile);
    }

    ngOnDestroy(): void {
        this.onDestroy.next();
        this.onDestroy.unsubscribe();
      }
}
