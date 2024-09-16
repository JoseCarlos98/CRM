import { ChangeDetectorRef, Component, ElementRef, HostListener, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Subject, takeUntil } from 'rxjs';
import { ChatService } from '../../chat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/pages/admin/admin.service';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { ComunicationsService } from '../../comunications.service';

@Component({
    selector       : 'chat-conversation',
    templateUrl    : './conversation.component.html',
})
export class ConversationComponent implements OnInit, OnDestroy {
    private onDestroy = new Subject<void>();


    @ViewChild('messageInput') messageInput: ElementRef;
    chat: any;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = false;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    conversation = {
        "id": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
        "contactId": "9d3f0e7f-dcbd-4e56-a5e8-87b8154e9edf",
        "unreadCount": 2,
        "muted": false,
        "lastMessage": "See you tomorrow!",
        "lastMessageAt": "26/04/2021",
        "contact": {
            "id": "9d3f0e7f-dcbd-4e56-a5e8-87b8154e9edf",
            "avatar": "assets/images/avatars/male-02.jpg",
            "name": "Bernard Langley",
            "about": "Hi there! I'm using FuseChat.",
            "details": {
                "emails": [
                    {
                        "email": "bernardlangley@mail.com",
                        "label": "Personal"
                    },
                    {
                        "email": "langley.bernard@boilcat.name",
                        "label": "Work"
                    }
                ],
                "phoneNumbers": [
                    {
                        "country": "md",
                        "phoneNumber": "893 548 2862",
                        "label": "Mobile"
                    }
                ],
                "title": "Electromedical Equipment Technician",
                "company": "Boilcat",
                "birthday": "1988-05-26T12:00:00.000Z",
                "address": "943 Adler Place, Hamilton, South Dakota, PO5592"
            },
            "attachments": {
                "media": [
                    "assets/images/avatars/brian-hughes.jpg",
                    "assets/images/avatars/brian-hughes.jpg",
                    "assets/images/avatars/brian-hughes.jpg",
                    "assets/images/avatars/brian-hughes.jpg",

                ],
                "docs": [],
                "links": []
            }
        },
        "messages": [
            {
                "id": "e6b2b82f-b199-4a60-9696-5f3e40d2715d",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Hi!",
                "createdAt": "2024-03-21T18:56:39.200-06:00",
                "isMine": true
            },
            {
                "id": "eb82cf4b-fa93-4bf4-a88a-99e987ddb7ea",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "9d3f0e7f-dcbd-4e56-a5e8-87b8154e9edf",
                "value": "Hey, dude!",
                "createdAt": "2024-03-21T19:04:39.200-06:00",
                "isMine": false
            },
            {
                "id": "3cf9b2a6-ae54-47db-97b2-ee139a8f84e5",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "9d3f0e7f-dcbd-4e56-a5e8-87b8154e9edf",
                "value": "Long time no see.",
                "createdAt": "2024-03-21T19:04:39.200-06:00",
                "isMine": false
            },
            {
                "id": "2ab91b0f-fafb-45f3-88df-7efaff29134b",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Yeah, man... Things were quite busy for me and my family.",
                "createdAt": "2024-03-21T19:06:39.200-06:00",
                "isMine": true
            },
            {
                "id": "10e81481-378f-49ac-b06b-7c59dcc639ae",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "9d3f0e7f-dcbd-4e56-a5e8-87b8154e9edf",
                "value": "What's up? Anything I can help with?",
                "createdAt": "2024-03-21T19:06:39.200-06:00",
                "isMine": false
            },
            {
                "id": "3b334e72-6605-4ebd-a4f6-3850067048de",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "We've been on the move, changed 3 places over 4 months",
                "createdAt": "2024-03-21T19:07:39.200-06:00",
                "isMine": true
            },
            {
                "id": "25998113-3a96-4dd0-a7b9-4d2bb58db3f3",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "9d3f0e7f-dcbd-4e56-a5e8-87b8154e9edf",
                "value": "Wow! That's crazy! 🤯 What happened?",
                "createdAt": "2024-03-21T19:07:39.200-06:00",
                "isMine": false
            },
            {
                "id": "30adb3da-0e4f-487e-aec2-6d9f31e097f6",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "You know I got a job in that big software company. First move was because of that.",
                "createdAt": "2024-03-21T19:08:39.200-06:00",
                "isMine": true
            },
            {
                "id": "c0d6fd6e-d294-4845-8751-e84b8f2c4d3b",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Then they decided to re-locate me after a month",
                "createdAt": "2024-03-21T19:08:39.200-06:00",
                "isMine": true
            },
            {
                "id": "8d3c442b-62fa-496f-bffa-210ff5c1866b",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Which was an absolute pain because we just set up everything, house, kids school and all that.",
                "createdAt": "2024-03-21T19:08:39.200-06:00",
                "isMine": true
            },
            {
                "id": "3cf26ef0-e81f-4698-ac39-487454413332",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "So we moved the second time.",
                "createdAt": "2024-03-21T19:09:39.200-06:00",
                "isMine": true
            },
            {
                "id": "415151b9-9ee9-40a4-a4ad-2d88146bc71b",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "9d3f0e7f-dcbd-4e56-a5e8-87b8154e9edf",
                "value": "It's crazy!",
                "createdAt": "2024-03-21T19:09:39.200-06:00",
                "isMine": false
            },
            {
                "id": "3a2d3a0e-839b-46e7-86ae-ca0826ecda7c",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Then this virus thing happened and just after a week we moved in, they decided the whole department will be working remotely.",
                "createdAt": "2024-03-21T19:10:39.200-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "And then we decided to move back our first location because, you know, everything was already setup so that's the third time.",
                "createdAt": "2024-03-21T19:10:39.200-06:00",
                "isMine": true
            },
            {
                "id": "415151b9-9ee9-40a4-a4ad-2d88146bc71b",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "9d3f0e7f-dcbd-4e56-a5e8-87b8154e9edf",
                "value": "Ohh dude, I'm really sorry you had to go through all that in such a short period of time",
                "createdAt": "2024-03-21T19:11:39.200-06:00",
                "isMine": false
            },
            {
                "id": "ea7662d5-7b72-4c19-ad6c-f80320541001",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "9d3f0e7f-dcbd-4e56-a5e8-87b8154e9edf",
                "value": "😕",
                "createdAt": "2024-03-21T19:11:39.200-06:00",
                "isMine": false
            },
            {
                "id": "3a2d3a0e-839b-46e7-86ae-ca0826ecda7c",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Thanks, man! It was good catching up with you.",
                "createdAt": "2024-03-21T19:11:39.200-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "9d3f0e7f-dcbd-4e56-a5e8-87b8154e9edf",
                "value": "Yeah dude. Hit me again next week so we can grab a coffee, remotely!",
                "createdAt": "2024-03-21T19:12:39.200-06:00",
                "isMine": false
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": ":) Sure, man! See you next week!",
                "createdAt": "2024-03-21T19:12:39.200-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "9d3f0e7f-dcbd-4e56-a5e8-87b8154e9edf",
                "value": "See you later!",
                "createdAt": "2024-03-21T19:12:39.200-06:00",
                "isMine": false
            },
            {
                "id": "bab8ca0e-b8e5-4375-807b-1c91fca25a5d",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Hey! Are you available right now? How about if we grab that coffee today? Remotely, of course :)",
                "createdAt": "2024-03-28T12:45:39.200-06:00",
                "isMine": true
            },
            {
                "id": "8445a84d-599d-4e2d-a31c-5f4f29ad2b4c",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "9d3f0e7f-dcbd-4e56-a5e8-87b8154e9edf",
                "value": "Hi!",
                "createdAt": "2024-03-28T12:56:39.200-06:00",
                "isMine": false
            },
            {
                "id": "9f506742-50da-4350-af9d-61e53392fa08",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "9d3f0e7f-dcbd-4e56-a5e8-87b8154e9edf",
                "value": "Sure thing! I'm gonna call you in 5, is it okay?",
                "createdAt": "2024-03-28T12:56:39.200-06:00",
                "isMine": false
            },
            {
                "id": "ca8523d8-faed-45f7-af09-f6bd5c3f3875",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Awesome! Call me in 5 minutes..",
                "createdAt": "2024-03-28T12:58:39.200-06:00",
                "isMine": true
            },
            {
                "id": "39944b00-1ffe-4ffb-8ca6-13c292812e06",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "9d3f0e7f-dcbd-4e56-a5e8-87b8154e9edf",
                "value": "👍🏻",
                "createdAt": "2024-03-28T13:00:39.200-06:00",
                "isMine": false
            }
        ]
    }

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _chatService: ChatService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _ngZone: NgZone,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private notificationService: OpenModalsService,
        private moduleServices: ComunicationsService

    ) { }

    @HostListener('input')
    @HostListener('ngModelChange')
    private _resizeMessageInput(): void {
        this._ngZone.runOutsideAngular(() => {
            setTimeout(() => {
                this.messageInput.nativeElement.style.height = 'auto';
                this._changeDetectorRef.detectChanges();
                this.messageInput.nativeElement.style.height = `${this.messageInput.nativeElement.scrollHeight}px`;
                this._changeDetectorRef.detectChanges();
            });
        });
    }

    ngOnInit(): void {
        this.getId();
        //console.log('CONVERSACIÓN: ', this.conversation);
        //this.chat = this.conversation;
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {
                if ( matchingAliases.includes('lg') ) this.drawerMode = 'side';
                else this.drawerMode = 'over';
                this._changeDetectorRef.markForCheck();
            });
    }

    getId() {
        this.activatedRoute.params.pipe(takeUntil(this.onDestroy)).subscribe((params: any) => {
          if (params.id) this.getdataChat(params.id);
        });
      }
    
      getdataChat(id: string) {
        this.moduleServices.getDataTawkTo(id).subscribe({
          next: (chat) => {
            //console.log('SERVICIO', chat);
            this.chat = chat
          },
          error: (error) => {
            this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
            console.error(error)
          }
        })
      }

    openContactInfo(): void {
        this.drawerOpened = true;
        this._changeDetectorRef.markForCheck();
    }

    resetChat(): void {
        this._chatService.resetChat();
        this.drawerOpened = false;
        this._changeDetectorRef.markForCheck();
    }

    toggleMuteNotifications(): void {
        this.chat.muted = !this.chat.muted;
        this._chatService.updateChat(this.chat.id, this.chat).subscribe();
    }

    trackByFn(index: number, item: any) {
        return item.id || index;
    }

    goBack() {
        this.router.navigateByUrl(`/home/comunicaciones/tawk`)
    }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
