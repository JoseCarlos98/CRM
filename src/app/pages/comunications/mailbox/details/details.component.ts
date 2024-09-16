import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { DatePipe, DecimalPipe, NgClass, NgFor, NgIf, NgPlural, NgPluralCase } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FuseScrollResetDirective } from '@fuse/directives/scroll-reset';
import { FuseFindByKeyPipe } from '@fuse/pipes/find-by-key/find-by-key.pipe';
import { Subject, takeUntil } from 'rxjs';
import { Mail, MailFolder, MailLabel } from '../mailbox.types';
import { MailboxService } from '../mailbox.service';
import { labelColorDefs } from '../mailbox.constants';

@Component({
    selector     : 'mailbox-details',
    templateUrl  : './details.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    imports      : [NgIf, MatButtonModule, RouterLink, MatIconModule, MatMenuModule, NgFor, MatRippleModule, MatCheckboxModule, NgClass, FuseScrollResetDirective, NgPlural, NgPluralCase, MatFormFieldModule, MatInputModule, FuseFindByKeyPipe, DecimalPipe, DatePipe],
})
export class MailboxDetailsComponent implements OnInit, OnDestroy
{
    @ViewChild('infoDetailsPanelOrigin') private _infoDetailsPanelOrigin: MatButton;
    @ViewChild('infoDetailsPanel') private _infoDetailsPanel: TemplateRef<any>;

    folders: MailFolder[];
    foldersDummy: MailFolder[] = [
        {
            "id": "7c004a19-4506-48ef-93ab-f16381302e3b",
            "title": "Inbox",
            "slug": "inbox",
            "icon": "heroicons_outline:inbox",
            "count": 26
        },
        {
            "id": "1ee2ea29-9a1f-4c27-b4d2-5e465703b6a0",
            "title": "Sent",
            "slug": "sent",
            "icon": "heroicons_outline:paper-airplane",
            "count": 0
        },
        {
            "id": "fbdc8e79-a0c4-4a27-bc98-9c81ee7a86e5",
            "title": "Drafts",
            "slug": "drafts",
            "icon": "heroicons_outline:document",
            "count": 7
        },
        {
            "id": "0197c436-2ef3-424d-b546-8b7f49186e15",
            "title": "Spam",
            "slug": "spam",
            "icon": "heroicons_outline:exclamation-triangle",
            "count": 13
        },
        {
            "id": "2fa74637-d362-4fd2-9a88-f7195a88bdde",
            "title": "Trash",
            "slug": "trash",
            "icon": "heroicons_outline:trash",
            "count": 0
        }
    ]
    labelColors: any;
    labels: MailLabel[];
    labelsDummy: MailLabel[] = [
        {
            "id": "b167d3c4-f6ed-4ea6-9579-a12f95a9d76e",
            "title": "Personal",
            "slug": "personal",
            "color": "blue"
        },
        {
            "id": "745cf30e-ca84-47a1-a553-b70eb630d8e7",
            "title": "Work",
            "slug": "work",
            "color": "indigo"
        },
        {
            "id": "8b035cb5-65c0-4ab1-bb4c-43b0e442d1f3",
            "title": "Payments",
            "slug": "payments",
            "color": "red"
        },
        {
            "id": "b2d1e4e7-7cfd-4b51-ae59-217a093df754",
            "title": "Invoices",
            "slug": "invoices",
            "color": "teal"
        },
        {
            "id": "184cd689-4ee4-47cf-9f8a-12233d614326",
            "title": "Accounts",
            "slug": "accounts",
            "color": "purple"
        },
        {
            "id": "b67fc437-6118-4ec8-a3c7-9320b828e3fc",
            "title": "Forums",
            "slug": "forums",
            "color": "green"
        }
    ];
    mail: Mail;
    mailDummy: Mail = {
        "id": "f9c4c091-3ac4-4df9-ac5d-aec7b07c8e3f",
        "type": "mail",
        "from": {
            "avatar": "assets/images/avatars/female-01.jpg",
            "contact": "Myra Dudley <myra.dudley@company.com>"
        },
        "to": "me <hughes.brian@company.com>",
        "cc": [
            "Graham Belltower <graham.belltower@company.com>"
        ],
        "bcc": [
            "Julie T. <julie.t@company.com>"
        ],
        "date": "2024-04-04T20:13:32.538-06:00",
        "subject": "Please review and sign the attached agreement",
        "content": "Hi Brian,\n\nUllamco deserunt commodo esse deserunt deserunt quis eiusmod. Laborum sint excepteur non sit eiusmod sunt voluptate ipsum nisi ullamco magna. Lorem consectetur est dolor minim exercitation deserunt quis duis fugiat ipsum incididunt non. Anim aute ipsum cupidatat nisi occaecat quis sit nisi labore labore dolore do. Pariatur veniam culpa quis veniam nisi exercitation veniam ut. Quis do sint proident fugiat ad.\n\nNon id nisi commodo veniam. Veniam veniam minim ea laborum voluptate id duis deserunt. Anim ut ut amet et ullamco nulla fugiat id incididunt adipisicing excepteur amet. Ex amet eu cillum non fugiat velit dolore. Incididunt duis est eu et ex sunt consectetur cillum nisi aute proident.\n\nIncididunt excepteur laborum quis sit. Ex quis officia incididunt proident aliqua adipisicing. Irure ad in Lorem laborum deserunt nulla consequat. Pariatur excepteur exercitation cupidatat aute.\n\nCheers!\nMyra Dudley",
        "attachments": [
            {
                "type": "image/jpeg",
                "name": "mystery-forest.jpg",
                "size": 15539,
                "preview": "mystery-forest_preview.jpg",
                "downloadUrl": ""
            },
            {
                "type": "application/pdf",
                "name": "montly-invoice.pdf",
                "size": 243449,
                "preview": "pdf",
                "downloadUrl": ""
            },
            {
                "type": "image/jpeg",
                "name": "birds-eye-sydney.jpg",
                "size": 14294,
                "preview": "birds-eye-sydney_preview.jpg",
                "downloadUrl": ""
            }
        ],
        "starred": true,
        "important": true,
        "unread": false,
        "folder": "7c004a19-4506-48ef-93ab-f16381302e3b",
        "labels": [
            "b167d3c4-f6ed-4ea6-9579-a12f95a9d76e",
            "745cf30e-ca84-47a1-a553-b70eb630d8e7",
            "8b035cb5-65c0-4ab1-bb4c-43b0e442d1f3"
        ],
        "ccCount": 1,
        "bccCount": 1
    }
    replyFormActive: boolean = false;
    private _overlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _elementRef: ElementRef,
        private _mailboxService: MailboxService,
        private _overlay: Overlay,
        private _router: Router,
        private _viewContainerRef: ViewContainerRef,
    ) { }

 
    ngOnInit(): void {

        //console.log('AQUI TOY');
        
        this.labelColors = labelColorDefs;

        this._mailboxService.folders$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((folders: MailFolder[]) =>
            {
                this.folders = this.foldersDummy;
            });

        this._mailboxService.labels$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((labels: MailLabel[]) =>
            {
                this.labels = this.labelsDummy;
            });

        this._mailboxService.selectedMail$.subscribe((mail: any) => {
            //console.log('Mail recibido en details.component.ts:', mail);
            this.mail = mail;
        });

        this._mailboxService.mail$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((mail: Mail) => {
                //console.log('details', mail)
                //this.mail = this.mailDummy;
        });

        this._mailboxService.selectedMailChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() =>{
                this.replyFormActive = false;
            });
    }

    getCurrentFolder(): any {
        return this._activatedRoute.snapshot.paramMap.get('folder');
    }

    moveToFolder(folderSlug: string): void {
        const folder = this.folders.find(item => item.slug === folderSlug);

        if ( this.mail.folder === folder.id ) {
            return;
        }

        this.mail.folder = folder.id;
        this._mailboxService.updateMail(this.mail.id, {folder: this.mail.folder}).subscribe();
        this._router.navigate(['./'], {relativeTo: this._activatedRoute.parent});
    }

    toggleLabel(label: MailLabel): void {
        let deleted = false;

        if ( this.mail.labels.includes(label.id) ){
            deleted = true;
            this.mail.labels.splice(this.mail.labels.indexOf(label.id), 1);
        } else {
            this.mail.labels.push(label.id);
        }

        this._mailboxService.updateMail(this.mail.id, {labels: this.mail.labels}).subscribe();

        if ( deleted ) {
            if ( this._activatedRoute.snapshot.paramMap.get('label') && this._activatedRoute.snapshot.paramMap.get('label') === label.slug ) {
                this._router.navigate(['./'], {relativeTo: this._activatedRoute.parent});
            }
        }
    }

    toggleImportant(): void {
        this.mail.important = !this.mail.important;

        this._mailboxService.updateMail(this.mail.id, {important: this.mail.important}).subscribe();
        if ( !this.mail.important ) {
            if ( this._activatedRoute.snapshot.paramMap.get('filter') && this._activatedRoute.snapshot.paramMap.get('filter') === 'important' ) {
                this._router.navigate(['./'], {relativeTo: this._activatedRoute.parent});
            }
        }
    }

    toggleStar(): void {
        this.mail.starred = !this.mail.starred;

        this._mailboxService.updateMail(this.mail.id, {starred: this.mail.starred}).subscribe();

        if ( !this.mail.starred ){
            if ( this._activatedRoute.snapshot.paramMap.get('filter') && this._activatedRoute.snapshot.paramMap.get('filter') === 'starred' ) {
                this._router.navigate(['./'], {relativeTo: this._activatedRoute.parent});
            }
        }
    }

    toggleUnread(unread: boolean): void {
        this.mail.unread = unread;

        this._mailboxService.updateMail(this.mail.id, {unread: this.mail.unread}).subscribe();
    }

    reply(): void {
        this.replyFormActive = true;

        setTimeout(() => {
            this._elementRef.nativeElement.scrollTop = this._elementRef.nativeElement.scrollHeight;
        });
    }

    replyAll(): void {
        this.replyFormActive = true;

        setTimeout(() =>{
            this._elementRef.nativeElement.scrollTop = this._elementRef.nativeElement.scrollHeight;
        });
    }

    forward(): void{
        this.replyFormActive = true;

        setTimeout(() => {
            this._elementRef.nativeElement.scrollTop = this._elementRef.nativeElement.scrollHeight;
        });
    }

    discard(): void {
        this.replyFormActive = false;
    }

    send(): void {
        this.replyFormActive = false;
    }

    openInfoDetailsPanel(): void {
        this._overlayRef = this._overlay.create({
            backdropClass   : '',
            hasBackdrop     : true,
            scrollStrategy  : this._overlay.scrollStrategies.block(),
            positionStrategy: this._overlay.position()
                .flexibleConnectedTo(this._infoDetailsPanelOrigin._elementRef.nativeElement)
                .withFlexibleDimensions(true)
                .withViewportMargin(16)
                .withLockedPosition(true)
                .withPositions([
                    {
                        originX : 'start',
                        originY : 'bottom',
                        overlayX: 'start',
                        overlayY: 'top',
                    },
                    {
                        originX : 'start',
                        originY : 'top',
                        overlayX: 'start',
                        overlayY: 'bottom',
                    },
                    {
                        originX : 'end',
                        originY : 'bottom',
                        overlayX: 'end',
                        overlayY: 'top',
                    },
                    {
                        originX : 'end',
                        originY : 'top',
                        overlayX: 'end',
                        overlayY: 'bottom',
                    },
                ]),
        });

        const templatePortal = new TemplatePortal(this._infoDetailsPanel, this._viewContainerRef);
        this._overlayRef.attach(templatePortal);

        this._overlayRef.backdropClick().subscribe(() => {
            if ( this._overlayRef && this._overlayRef.hasAttached() ) {
                this._overlayRef.detach();
            }

            if ( templatePortal && templatePortal.isAttached ) {
                templatePortal.detach();
            }
        });
    }

    trackByFn(index: number, item: any) {
        return item.id || index;
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
