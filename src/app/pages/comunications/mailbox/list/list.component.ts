import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Mail, MailCategory } from '../mailbox.types';
import { MailboxComponent } from '../mailbox.component';
import { MailboxService } from '../mailbox.service';

@Component({
    selector     : 'mailbox-list',
    templateUrl  : './list.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    imports      : [NgIf, MatButtonModule, MatIconModule, RouterLink, MatProgressBarModule, NgFor, NgClass, RouterOutlet, DatePipe],
})
export class MailboxListComponent implements OnInit, OnDestroy {
    @ViewChild('mailList') mailList: ElementRef;

    category: MailCategory;
    categoryDummy: MailCategory = {
        "type": "folder",
        "name": "inbox"
    };    
    
    mailsDummy: Mail[] = [
        /*{
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
            "date": "2024-04-04T20:13:43.676-06:00",
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
            "unread": true,
            "folder": "7c004a19-4506-48ef-93ab-f16381302e3b",
            "labels": [
                "b167d3c4-f6ed-4ea6-9579-a12f95a9d76e",
                "745cf30e-ca84-47a1-a553-b70eb630d8e7",
                "8b035cb5-65c0-4ab1-bb4c-43b0e442d1f3"
            ],
            "ccCount": 1,
            "bccCount": 1
        },
        {
            "id": "c531bc01-8a9e-481b-adf8-95303a6938c5",
            "type": "mail",
            "from": {
                "avatar": "assets/images/avatars/male-01.jpg",
                "contact": "Shaw Murray <shaw.murray@company.com>"
            },
            "to": "me <hughes.brian@company.com>",
            "date": "2024-04-04T18:56:43.676-06:00",
            "subject": "Delivery address confirmation",
            "content": "Dear Brian,\n\nDolore consectetur est cupidatat ipsum reprehenderit anim quis veniam anim ipsum incididunt exercitation. Velit exercitation culpa eiusmod dolore labore irure. Duis esse quis elit pariatur labore occaecat esse voluptate dolore deserunt cillum irure. Aute qui nulla est exercitation qui sunt anim aliquip. Ex ad est velit laboris exercitation ea ut pariatur. Amet reprehenderit ut est id sunt commodo anim et est voluptate et.\n\nMagna aliqua incididunt non ut voluptate nulla aliqua exercitation elit consectetur cupidatat. Proident in reprehenderit occaecat laborum non eu amet id aliqua nulla dolore. Eiusmod quis adipisicing quis cupidatat labore.\n\nReprehenderit nulla ullamco est dolore ex irure sunt nostrud reprehenderit quis dolor. Tempor nostrud elit elit aute ut ut eiusmod laboris excepteur consequat ex. Velit id ex ullamco in. Ea elit Lorem Lorem aliquip amet consequat irure nisi qui cillum incididunt. Commodo aute Lorem eiusmod veniam consectetur aute eu dolore. Ea magna incididunt laboris quis quis et tempor dolore dolore ut nisi.\n\nBest Regards,\nShaw Murray",
            "attachments": [],
            "starred": false,
            "important": false,
            "unread": true,
            "folder": "7c004a19-4506-48ef-93ab-f16381302e3b",
            "labels": [
                "b167d3c4-f6ed-4ea6-9579-a12f95a9d76e"
            ],
            "ccCount": 0,
            "bccCount": 0
        },
        {
            "id": "ebc80fc3-6c56-4cae-a45a-771b15ced076",
            "type": "mail",
            "from": {
                "avatar": "assets/images/avatars/male-02.jpg",
                "contact": "Sanders Beck <sanders.beck@company.com>"
            },
            "to": "me <hughes.brian@company.com>",
            "cc": [
                "Graham Belltower <graham.belltower@company.com>"
            ],
            "date": "2024-04-04T14:35:43.676-06:00",
            "subject": "Insurance documents",
            "content": "Hi Brian,\n\nAliquip ipsum sunt sit sunt velit velit pariatur. Nisi incididunt eiusmod consequat ut cillum eu exercitation. Enim proident nostrud aute in. Non irure nisi duis aliquip commodo proident veniam adipisicing id velit. Enim magna Lorem fugiat tempor.\n\nCommodo non nulla incididunt irure voluptate. Fugiat culpa cillum aute quis. Voluptate veniam adipisicing dolor sint. Proident eiusmod quis duis ipsum sit eu.\n\nDeserunt reprehenderit adipisicing reprehenderit ipsum. Laborum in veniam amet occaecat tempor esse enim dolore elit sit quis adipisicing. Aute occaecat eiusmod enim cupidatat sunt.\n\nBest Regards,\nSanders Beck",
            "attachments": [],
            "starred": false,
            "important": false,
            "unread": false,
            "folder": "7c004a19-4506-48ef-93ab-f16381302e3b",
            "labels": [],
            "ccCount": 1,
            "bccCount": 0
        },
        {
            "id": "981c5ffb-7c88-47a8-b60f-f16150eeae9d",
            "type": "mail",
            "from": {
                "avatar": "assets/images/avatars/male-03.jpg",
                "contact": "Zimmerman Gould <zimmerman.gould@company.com>"
            },
            "to": "me <hughes.brian@company.com>",
            "date": "2024-04-03T22:26:43.676-06:00",
            "subject": "Previous clients and their invoices",
            "content": "Dear Brian,\n\nDo aute eu dolore officia laborum id anim fugiat incididunt nulla esse proident. Veniam veniam nostrud ut nisi magna ipsum ea eiusmod esse velit id aliqua nisi irure. Amet laborum fugiat deserunt est. Quis amet veniam anim nostrud irure cillum voluptate consequat qui cupidatat minim occaecat elit enim. Ut ut incididunt cillum sit sit irure culpa. Culpa exercitation minim velit eu. Ipsum exercitation excepteur et ad do sit.\n\nVeniam cupidatat officia aliqua ad excepteur cillum laboris deserunt esse laboris adipisicing reprehenderit. Reprehenderit anim consectetur pariatur labore do in irure. Ad consequat commodo non pariatur occaecat. Eiusmod cillum non anim consequat culpa nisi. Est nulla ut sint qui deserunt anim. Excepteur qui occaecat dolore nulla occaecat cupidatat aute sit laborum magna.\n\nConsequat aliqua commodo officia excepteur. Ex consectetur elit dolor exercitation ullamco amet laboris. Deserunt nulla non proident est pariatur reprehenderit reprehenderit. Ea nisi id aliqua cillum velit tempor ipsum dolor proident cillum eiusmod et ipsum anim. Elit non quis mollit enim Lorem cupidatat et labore. Laboris cillum reprehenderit aute veniam aliqua esse officia proident deserunt. Eiusmod laboris ullamco amet consectetur amet.\n\nKind Regards,\nZimmerman Gould",
            "attachments": [],
            "starred": false,
            "important": false,
            "unread": true,
            "folder": "7c004a19-4506-48ef-93ab-f16381302e3b",
            "labels": [],
            "ccCount": 0,
            "bccCount": 0
        },
        {
            "id": "a8d0645d-ac30-4f1a-a163-06e949120289",
            "type": "mail",
            "from": {
                "avatar": "assets/images/avatars/female-02.jpg",
                "contact": "Karina Alford <karina.alford@company.com>"
            },
            "to": "me <hughes.brian@company.com>",
            "cc": [
                "Graham Belltower <graham.belltower@company.com>"
            ],
            "date": "2024-04-03T20:05:43.676-06:00",
            "subject": "Quote for a new web design project",
            "content": "Hey Brian,\n\nNisi officia aliqua ex non cupidatat sint ullamco. Irure pariatur ullamco consequat ut eu anim. Ut ad elit pariatur est non sunt. Tempor dolore quis commodo dolore duis officia laboris nostrud sint. Exercitation ullamco laboris eiusmod culpa ut.\n\nAute Lorem aute occaecat dolore tempor ipsum proident fugiat deserunt non incididunt velit nulla. Dolor pariatur tempor amet qui eu exercitation. Tempor minim culpa proident nisi esse ea. Enim est fugiat aliqua aliqua aute velit laborum cupidatat irure nisi dolor deserunt aliqua.\n\nFugiat ut dolor tempor sunt aliquip dolor nostrud. Consequat incididunt ullamco cillum dolore excepteur deserunt est dolor aliquip irure do mollit officia. Consectetur cillum et non minim nisi. Esse quis sunt deserunt elit sint velit tempor et ullamco laboris officia excepteur. Veniam ad ut aliqua sunt consequat reprehenderit nostrud non in duis aute quis pariatur. Occaecat mollit anim non pariatur. Ad do ad id fugiat et culpa laborum esse cupidatat voluptate elit ut magna voluptate.\n\nBest Regards,\nKarina Alford",
            "attachments": [],
            "starred": false,
            "important": true,
            "unread": true,
            "folder": "7c004a19-4506-48ef-93ab-f16381302e3b",
            "labels": [],
            "ccCount": 1,
            "bccCount": 0
        },
        {
            "id": "fd117ed9-1285-4aca-8c1c-5c96e732c558",
            "type": "mail",
            "from": {
                "avatar": "assets/images/avatars/female-03.jpg",
                "contact": "Carla Gray <carla.gray@company.com>"
            },
            "to": "me <hughes.brian@company.com>",
            "cc": [
                "Graham Belltower <graham.belltower@company.com>"
            ],
            "date": "2024-04-03T16:43:43.676-06:00",
            "subject": "Nulla culpa consectetur aute ex eu irure incididunt aliqua cupidatat sit cillum fugiat anim ea",
            "content": "Hey Brian,\n\nDo pariatur occaecat tempor duis. Aute occaecat non consequat ut occaecat sint. Cillum reprehenderit elit nisi incididunt in labore pariatur. Labore mollit pariatur nulla officia esse anim exercitation nisi commodo culpa laborum amet nisi.\n\nSunt culpa mollit nostrud excepteur adipisicing sit do. Cillum voluptate amet do sit quis aliquip ea est qui elit. Veniam exercitation sit reprehenderit labore officia in labore excepteur eiusmod exercitation.\n\nEnim nostrud est non esse reprehenderit in ea eiusmod. Duis incididunt amet aliquip dolor esse. Nostrud qui commodo in non nostrud proident enim cupidatat. Aute sunt aliqua excepteur qui occaecat nulla incididunt commodo adipisicing ipsum.\n\nKind Regards,\nCarla Gray",
            "attachments": [],
            "starred": false,
            "important": false,
            "unread": false,
            "folder": "7c004a19-4506-48ef-93ab-f16381302e3b",
            "labels": [],
            "ccCount": 1,
            "bccCount": 0
        },
        {
            "id": "a307d83b-d256-4af5-948a-148878a7eaad",
            "type": "mail",
            "from": {
                "avatar": "assets/images/avatars/male-04.jpg",
                "contact": "Rice Cash <rice.cash@company.com>"
            },
            "to": "me <hughes.brian@company.com>",
            "cc": [
                "Graham Belltower <graham.belltower@company.com>",
                "Julie T. <julie.t@company.com>"
            ],
            "date": "2024-04-02T11:28:43.676-06:00",
            "subject": "Ipsum laborum minim aute labore in",
            "content": "Dear Brian,\n\nLaboris non ad et aute sint aliquip mollit voluptate velit dolore magna fugiat ex. Voluptate amet aute deserunt tempor non laboris cillum. Voluptate veniam magna sint magna proident exercitation adipisicing aute id ad tempor reprehenderit magna ullamco. Laborum Lorem anim elit aliquip ut aute minim fugiat aliquip. Eiusmod est et occaecat dolore anim laborum ullamco ipsum commodo.\n\nCommodo amet veniam nostrud mollit quis sint qui nulla elit esse excepteur ullamco esse magna. Nisi duis aute est in mollit irure enim tempor in. Mollit ipsum laboris et velit ex excepteur pariatur. Cillum veniam id ipsum magna. Laborum duis aliquip ut ipsum ad aliqua id sit pariatur consequat sit. Sit nulla nulla ullamco nulla eiusmod et in dolore sint reprehenderit cupidatat.\n\nIpsum mollit cupidatat magna occaecat labore est fugiat est fugiat fugiat nulla labore laboris. Eiusmod aute adipisicing pariatur aliquip sint enim anim in dolore enim aute culpa nulla. Minim magna enim officia ipsum elit quis do velit deserunt Lorem veniam excepteur.\n\nKind Regards,\nRice Cash",
            "attachments": [
                {
                    "type": "image/png",
                    "name": "lake-of-carezza.png",
                    "size": 13071,
                    "preview": "lake-of-carrezza_preview.png",
                    "downloadUrl": ""
                },
                {
                    "type": "image/jpeg",
                    "name": "birds-eye-sydney.jpg",
                    "size": 14294,
                    "preview": "birds-eye-sydney_preview.jpg",
                    "downloadUrl": ""
                },
                {
                    "type": "image/png",
                    "name": "yosemite-national-park.png",
                    "size": 14242,
                    "preview": "yosemite-national-park_preview.png",
                    "downloadUrl": ""
                }
            ],
            "starred": true,
            "important": true,
            "unread": true,
            "folder": "7c004a19-4506-48ef-93ab-f16381302e3b",
            "labels": [],
            "ccCount": 2,
            "bccCount": 0
        },
        {
            "id": "67664fa3-3a87-4ab8-8c2c-dfd2b1de4c14",
            "type": "mail",
            "from": {
                "avatar": "assets/images/avatars/female-04.jpg",
                "contact": "Elaine Ortiz <elaine.ortiz@company.com>"
            },
            "to": "me <hughes.brian@company.com>",
            "cc": [
                "Graham Belltower <graham.belltower@company.com>"
            ],
            "date": "2024-04-02T07:12:43.676-06:00",
            "subject": "Ipsum fugiat ad deserunt cillum sunt fugiat",
            "content": "Hello Brian,\n\nId Lorem laborum eiusmod eiusmod mollit magna dolore. Et commodo officia fugiat dolor aliqua proident mollit ut commodo ullamco. Sunt nulla eu dolor velit velit reprehenderit. Culpa esse veniam fugiat eiusmod id veniam sunt reprehenderit minim mollit. Esse qui ea irure pariatur eu ullamco pariatur ipsum reprehenderit proident mollit proident. Nisi fugiat ut est aliquip nulla in non dolore.\n\nCulpa irure cillum ex fugiat cupidatat eiusmod non. Qui irure velit consectetur minim eu excepteur eiusmod veniam irure ad culpa nisi. Nisi sit nostrud quis ullamco aliquip non consequat sunt reprehenderit velit dolor dolor laboris. Dolore in Lorem consectetur nostrud. Laborum cupidatat exercitation voluptate duis amet. Sunt sint minim do in commodo ipsum commodo ea qui velit deserunt qui anim fugiat.\n\nExercitation et qui consequat incididunt nisi incididunt cupidatat officia in. Sit eiusmod anim aliqua elit. Nisi mollit ut non pariatur enim fugiat sint labore velit nostrud eu. Eiusmod id laboris laboris duis enim aute ipsum in magna. Sit eiusmod amet duis commodo sint et anim ex sunt deserunt dolor incididunt. Eiusmod duis dolore dolor elit occaecat do adipisicing ullamco ex laboris aliqua adipisicing. Labore pariatur aute proident mollit elit commodo labore minim dolore non in cillum.\n\nCheers!\nElaine Ortiz",
            "attachments": [],
            "starred": true,
            "important": true,
            "unread": true,
            "folder": "7c004a19-4506-48ef-93ab-f16381302e3b",
            "labels": [
                "b167d3c4-f6ed-4ea6-9579-a12f95a9d76e",
                "745cf30e-ca84-47a1-a553-b70eb630d8e7",
                "8b035cb5-65c0-4ab1-bb4c-43b0e442d1f3",
                "b2d1e4e7-7cfd-4b51-ae59-217a093df754"
            ],
            "ccCount": 1,
            "bccCount": 0
        },
        {
            "id": "d5913a7e-25f8-4163-bbf0-81d034163ce7",
            "type": "mail",
            "from": {
                "avatar": "assets/images/avatars/male-05.jpg",
                "contact": "Fleming Stone <fleming.stone@company.com>"
            },
            "to": "me <hughes.brian@company.com>",
            "cc": [
                "Graham Belltower <graham.belltower@company.com>"
            ],
            "date": "2024-04-02T06:01:43.676-06:00",
            "subject": "Deserunt exercitation ut nulla elit Lorem",
            "content": "Hi Brian,\n\nEst labore sunt sunt Lorem dolore. In excepteur esse proident ut consectetur dolor voluptate laborum veniam pariatur. Excepteur ut veniam sit culpa exercitation qui nulla nulla magna ea in dolore et consequat. Irure minim ad cupidatat amet reprehenderit excepteur incididunt nulla eu et excepteur anim et aliqua.\n\nSint sint Lorem magna est irure sint ea cupidatat fugiat. Occaecat non adipisicing magna magna culpa sit commodo aute ex consequat amet minim esse ut. In nulla eiusmod veniam deserunt in.\n\nIn aute excepteur qui pariatur fugiat. Occaecat velit voluptate proident occaecat ut laboris occaecat pariatur aute dolore do. Ut commodo ipsum est non commodo ut ea qui labore veniam. Occaecat nostrud eu dolor tempor velit excepteur sint occaecat excepteur aliqua aliquip. Magna mollit ea aliquip exercitation do elit ex reprehenderit esse aliqua elit.\n\nKind Regards,\nFleming Stone",
            "attachments": [],
            "starred": false,
            "important": true,
            "unread": true,
            "folder": "7c004a19-4506-48ef-93ab-f16381302e3b",
            "labels": [
                "b167d3c4-f6ed-4ea6-9579-a12f95a9d76e",
                "745cf30e-ca84-47a1-a553-b70eb630d8e7",
                "8b035cb5-65c0-4ab1-bb4c-43b0e442d1f3"
            ],
            "ccCount": 1,
            "bccCount": 0
        },
        {
            "id": "b099a8e2-ffcc-4ae1-866d-8f8f6bd95ab3",
            "type": "mail",
            "from": {
                "avatar": "assets/images/avatars/male-06.jpg",
                "contact": "England Wiley <england.wiley@company.com>"
            },
            "to": "me <hughes.brian@company.com>",
            "date": "2024-03-30T15:36:43.676-06:00",
            "subject": "Minim do reprehenderit dolor ipsum officia magna laborum est anim in fugiat",
            "content": "Dear Brian,\n\nAd do minim id ad ex sit reprehenderit labore do occaecat fugiat ut enim. Et sunt dolore sint non consequat ut. Esse deserunt nostrud pariatur nulla ullamco nulla sit aliquip culpa sunt ipsum. Ut ad minim qui anim amet aute cupidatat. Est ullamco duis laboris nulla labore incididunt consectetur. Cillum sunt mollit nulla laborum non tempor veniam consequat.\n\nAmet fugiat velit id deserunt pariatur velit laboris consectetur quis officia. Culpa nostrud deserunt nostrud esse labore esse consequat labore fugiat. Nostrud duis ex nulla et do.\n\nPariatur mollit ex adipisicing nostrud nostrud occaecat. Id tempor irure cupidatat duis cillum cupidatat nostrud enim anim. Esse nisi pariatur nisi elit elit sit quis ullamco dolor dolore pariatur est sint. Sint ex aliqua id sunt sunt magna amet ex sit anim. Irure aliquip fugiat ipsum tempor irure nisi Lorem anim sit ullamco. Exercitation nostrud mollit est non enim.\n\nBest Regards,\nEngland Wiley",
            "attachments": [],
            "starred": true,
            "important": false,
            "unread": true,
            "folder": "7c004a19-4506-48ef-93ab-f16381302e3b",
            "labels": [
                "b167d3c4-f6ed-4ea6-9579-a12f95a9d76e",
                "745cf30e-ca84-47a1-a553-b70eb630d8e7",
                "8b035cb5-65c0-4ab1-bb4c-43b0e442d1f3"
            ],
            "ccCount": 0,
            "bccCount": 0
        }*/
    ];
    mails: Mail[]
    mailsLoading: boolean = false;
    pagination: any;
    paginationdummy: any ={
        "totalResults": 45,
        "resultsPerPage": 10,
        "currentPage": 1,
        "lastPage": 5,
        "startIndex": 0,
        "endIndex": 9
    }
    selectedMail: Mail;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        public mailboxComponent: MailboxComponent,
        private _mailboxService: MailboxService,
    ) { }

    ngOnInit(): void {
        this._mailboxService.category$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((category: MailCategory) =>
            {
                this.category = this.categoryDummy;
            });

        this._mailboxService.mails$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((mails: Mail[]) =>
            {
                //this.mails = this.mailsDummy;
                this.mails = mails;
                console.log(mails);
                
            });

        this._mailboxService.getEmailList()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((mails: Mail[]) => {
                this.mails = mails;
                console.log(this.mails);
        });

        this._mailboxService.mailsLoading$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((mailsLoading: boolean) => {
                this.mailsLoading = mailsLoading;
                if ( this.mailList && !mailsLoading ) this.mailList.nativeElement.scrollTo(0, 0);
            });

        this._mailboxService.pagination$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((pagination) =>
            {
                this.pagination = this.paginationdummy;
            });

        this._mailboxService.mail$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((mail: Mail) =>
            {
                this.selectedMail = mail;
            });
    }

    onMailSelected(mail: Mail) {
        console.log('select', mail)
        if ( mail.unread ) {
            mail.unread = false;
            //this._mailboxService.updateMail(mail.id, {unread: false}).subscribe();
        }

        this._mailboxService.selectedMailChanged.next(mail);
    }

    trackByFn(index: number, item: any) {
        return item.id || index;
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
