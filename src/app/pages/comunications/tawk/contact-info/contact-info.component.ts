import { Component, Input, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
    selector       : 'chat-contact-info',
    templateUrl    : './contact-info.component.html',
})
export class ContactInfoComponent implements OnInit {
    @Input() chat: any;
    @Input() drawer: MatDrawer;

    constructor(){ }
    
    ngOnInit(): void {
        // console.log('INFORMACIÓN DE CONTACTO', this.chat);
    }
}
