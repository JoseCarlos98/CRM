import { TextFieldModule } from '@angular/cdk/text-field';
import { DatePipe, NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FuseScrollbarDirective } from '@fuse/directives/scrollbar';
import { Subject } from 'rxjs';
import { Chat } from './quick-chat.types';
import { MaterialModule } from 'app/shared/material/material.module';
import { CatalogsService } from 'app/shared/services/catalogs.service';

@Component({
    selector     : 'quick-chat',
    templateUrl  : './quick-chat.component.html',
    styleUrls    : ['./quick-chat.component.scss'],
    encapsulation: ViewEncapsulation.None,
    exportAs     : 'quickChat',
    standalone   : true,
    imports      : [MaterialModule, NgClass, NgIf, MatIconModule, MatButtonModule, FuseScrollbarDirective, NgFor, NgTemplateOutlet, MatFormFieldModule, MatInputModule, TextFieldModule, DatePipe],
})
export class QuickChatComponent implements OnInit, OnDestroy {
    private onDestroy = new Subject<void>();

    @ViewChild('messageInput') messageInput: ElementRef;
    @ViewChild('elementoObservado') elementoObservado: ElementRef;
    private mutationObserver: MutationObserver;

    chat: Chat;
    opened: boolean = false;
    selectedChat: Chat;

    chats:any = []

    constructor(
        private catalogsServices: CatalogsService
    ) { }

    ngOnInit(): void {
        this.catalogsServices.getCatUsers().subscribe(data => {
            this.chats = data.map(data => {
                return {
                    id: data.id,
                    photo: data?.profile_picture?.includes('default') ? `../../../assets/images/user-lateral.png` : data.profile_picture,
                    name: `${data?.first_name && data?.last_name ? data.first_name.toUpperCase() + ' ' + data.last_name.toUpperCase() : data.username.toUpperCase() || '-'}`,
                    on: data.is_connected
                }
            })
        })
        
        const config: MutationObserverInit = {};
        if (this.elementoObservado) this.mutationObserver.observe(this.elementoObservado.nativeElement, config);
    }
  
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
    
    ngOnDestroy(): void {
        this.onDestroy.next();
        this.onDestroy.unsubscribe();

        if (this.mutationObserver) this.mutationObserver.disconnect();
    }
}
