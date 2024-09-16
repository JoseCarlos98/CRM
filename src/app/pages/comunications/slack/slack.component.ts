import { ChangeDetectorRef, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscriber, takeUntil } from 'rxjs';
import { Chat } from 'app/shared/layout/common/quick-chat/quick-chat.types';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { ChatService } from '../chat.service';

@Component({
    selector: 'app-slack',
    templateUrl: './slack.component.html',
    styleUrl: './slack.component.scss'
})
export class SlackComponent implements OnInit, OnDestroy {
    private onDestroy = new Subject<void>();
    @ViewChild('messageInput') messageInput: ElementRef;
    chat: Chat;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = false;

    chatsasd = {
        id: "f73a5a34-a723-4b35-8439-5289e0164c83",
        contactId: "bf172879-423a-4fd6-8df3-6d1938bbfe1f",
        unreadCount: 1,
        muted: false,
        lastMessage: "See you tomorrow!",
        lastMessageAt: "26/04/2021",
        contact: {
            id: "bf172879-423a-4fd6-8df3-6d1938bbfe1f",
            avatar: "assets/images/avatars/male-06.jpg",
            name: "Edwards Mckenzie",
            about: "Hi there! I'm using FuseChat.",
            details: {
                emails: [
                    {
                        email: "edwardsmckenzie@mail.org",
                        label: "Personal"
                    },
                    {
                        email: "mckenzie.edwards@bugsall.io",
                        label: "Work"
                    }
                ],
                phoneNumbers: [
                    {
                        country: "pe",
                        phoneNumber: "934 519 2903",
                        label: "Mobile"
                    },
                    {
                        country: "pe",
                        phoneNumber: "989 489 3662",
                        label: "Work"
                    },
                    {
                        country: "pe",
                        phoneNumber: "813 461 2790",
                        label: "Home"
                    }
                ],
                title: "Legal Assistant",
                company: "Bugsall",
                birthday: "1988-07-27T12:00:00.000Z",
                address: "384 Polhemus Place, Dalton, Palau, PO6038"
            },
            attachments: {
                media: [
                    "assets/images/cards/01-320x200.jpg",
                    "assets/images/cards/02-320x200.jpg",
                    "assets/images/cards/03-320x200.jpg",
                    "assets/images/cards/04-320x200.jpg",
                    "assets/images/cards/05-320x200.jpg",
                    "assets/images/cards/06-320x200.jpg",
                    "assets/images/cards/07-320x200.jpg",
                    "assets/images/cards/08-320x200.jpg"
                ],
                docs: [],
                links: []
            }
        },
        messages: [
            {
                id: "e6b2b82f-b199-4a60-9696-5f3e40d2715d",
                chatId: "f73a5a34-a723-4b35-8439-5289e0164c83",
                contactId: "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                value: "Hi!",
                createdAt: "2024-03-15T18:56:27.052-06:00",
                isMine: true
            },
            {
                id: "eb82cf4b-fa93-4bf4-a88a-99e987ddb7ea",
                chatId: "f73a5a34-a723-4b35-8439-5289e0164c83",
                contactId: "bf172879-423a-4fd6-8df3-6d1938bbfe1f",
                value: "Hey, dude!",
                createdAt: "2024-03-15T19:04:27.052-06:00",
                isMine: false
            },
            {
                id: "3cf9b2a6-ae54-47db-97b2-ee139a8f84e5",
                chatId: "f73a5a34-a723-4b35-8439-5289e0164c83",
                contactId: "bf172879-423a-4fd6-8df3-6d1938bbfe1f",
                value: "Long time no see.",
                createdAt: "2024-03-15T19:04:27.052-06:00",
                isMine: false
            },
            {
                id: "2ab91b0f-fafb-45f3-88df-7efaff29134b",
                chatId: "f73a5a34-a723-4b35-8439-5289e0164c83",
                contactId: "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                value: "Yeah, man... Things were quite busy for me and my family.",
                createdAt: "2024-03-15T19:06:27.052-06:00",
                isMine: true
            },
            {
                id: "10e81481-378f-49ac-b06b-7c59dcc639ae",
                chatId: "f73a5a34-a723-4b35-8439-5289e0164c83",
                contactId: "bf172879-423a-4fd6-8df3-6d1938bbfe1f",
                value: "What's up? Anything I can help with?",
                createdAt: "2024-03-15T19:06:27.052-06:00",
                isMine: false
            },
            {
                id: "3b334e72-6605-4ebd-a4f6-3850067048de",
                chatId: "f73a5a34-a723-4b35-8439-5289e0164c83",
                contactId: "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                value: "We've been on the move, changed 3 places over 4 months",
                createdAt: "2024-03-15T19:07:27.052-06:00",
                isMine: true
            },
            {
                id: "25998113-3a96-4dd0-a7b9-4d2bb58db3f3",
                chatId: "f73a5a34-a723-4b35-8439-5289e0164c83",
                contactId: "bf172879-423a-4fd6-8df3-6d1938bbfe1f",
                value: "Wow! That's crazy! 🤯 What happened?",
                createdAt: "2024-03-15T19:07:27.052-06:00",
                isMine: false
            },
            {
                id: "30adb3da-0e4f-487e-aec2-6d9f31e097f6",
                chatId: "f73a5a34-a723-4b35-8439-5289e0164c83",
                contactId: "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                value: "You know I got a job in that big software company. First move was because of that.",
                createdAt: "2024-03-15T19:08:27.052-06:00",
                isMine: true
            },
            {
                id: "c0d6fd6e-d294-4845-8751-e84b8f2c4d3b",
                chatId: "f73a5a34-a723-4b35-8439-5289e0164c83",
                contactId: "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                value: "Then they decided to re-locate me after a month",
                createdAt: "2024-03-15T19:08:27.052-06:00",
                isMine: true
            },
            {
                id: "8d3c442b-62fa-496f-bffa-210ff5c1866b",
                chatId: "f73a5a34-a723-4b35-8439-5289e0164c83",
                contactId: "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                value: "Which was an absolute pain because we just set up everything, house, kids school and all that.",
                createdAt: "2024-03-15T19:08:27.052-06:00",
                isMine: true
            },
            {
                id: "3cf26ef0-e81f-4698-ac39-487454413332",
                chatId: "f73a5a34-a723-4b35-8439-5289e0164c83",
                contactId: "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                value: "So we moved the second time.",
                createdAt: "2024-03-15T19:09:27.052-06:00",
                isMine: true
            },
            {
                id: "415151b9-9ee9-40a4-a4ad-2d88146bc71b",
                chatId: "f73a5a34-a723-4b35-8439-5289e0164c83",
                contactId: "bf172879-423a-4fd6-8df3-6d1938bbfe1f",
                value: "It's crazy!",
                createdAt: "2024-03-15T19:09:27.052-06:00",
                isMine: false
            },
            {
                id: "3a2d3a0e-839b-46e7-86ae-ca0826ecda7c",
                chatId: "f73a5a34-a723-4b35-8439-5289e0164c83",
                contactId: "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                value: "Then this virus thing happened and just after a week we moved in, they decided the whole department will be working remotely.",
                createdAt: "2024-03-15T19:10:27.052-06:00",
                isMine: true
            },
            {
                id: "5329c20d-6754-47ec-af8c-660c72be3528",
                chatId: "f73a5a34-a723-4b35-8439-5289e0164c83",
                contactId: "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                value: "And then we decided to move back our first location because, you know, everything was already setup so that's the third time.",
                createdAt: "2024-03-15T19:10:27.052-06:00",
                isMine: true
            },
            {
                id: "415151b9-9ee9-40a4-a4ad-2d88146bc71b",
                chatId: "f73a5a34-a723-4b35-8439-5289e0164c83",
                contactId: "bf172879-423a-4fd6-8df3-6d1938bbfe1f",
                value: "Ohh dude, I'm really sorry you had to go through all that in such a short period of time",
                createdAt: "2024-03-15T19:11:27.052-06:00",
                isMine: false
            },
            {
                id: "ea7662d5-7b72-4c19-ad6c-f80320541001",
                chatId: "f73a5a34-a723-4b35-8439-5289e0164c83",
                contactId: "bf172879-423a-4fd6-8df3-6d1938bbfe1f",
                value: "😕",
                createdAt: "2024-03-15T19:11:27.052-06:00",
                isMine: false
            },
            {
                id: "3a2d3a0e-839b-46e7-86ae-ca0826ecda7c",
                chatId: "f73a5a34-a723-4b35-8439-5289e0164c83",
                contactId: "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                value: "Thanks, man! It was good catching up with you.",
                createdAt: "2024-03-15T19:11:27.052-06:00",
                isMine: true
            },
            {
                id: "5329c20d-6754-47ec-af8c-660c72be3528",
                chatId: "f73a5a34-a723-4b35-8439-5289e0164c83",
                contactId: "bf172879-423a-4fd6-8df3-6d1938bbfe1f",
                value: "Yeah dude. Hit me again next week so we can grab a coffee, remotely!",
                createdAt: "2024-03-15T19:12:27.052-06:00",
                isMine: false
            },
            {
                id: "5329c20d-6754-47ec-af8c-660c72be3528",
                chatId: "f73a5a34-a723-4b35-8439-5289e0164c83",
                contactId: "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                value: ":) Sure, man! See you next week!",
                createdAt: "2024-03-15T19:12:27.052-06:00",
                isMine: true
            },
            {
                id: "5329c20d-6754-47ec-af8c-660c72be3528",
                chatId: "f73a5a34-a723-4b35-8439-5289e0164c83",
                contactId: "bf172879-423a-4fd6-8df3-6d1938bbfe1f",
                value: "See you later!",
                createdAt: "2024-03-15T19:12:27.052-06:00",
                isMine: false
            },
            {
                id: "bab8ca0e-b8e5-4375-807b-1c91fca25a5d",
                chatId: "f73a5a34-a723-4b35-8439-5289e0164c83",
                contactId: "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                value: "Hey! Are you available right now? How about if we grab that coffee today? Remotely, of course :)",
                createdAt: "2024-03-22T12:45:27.052-06:00",
                isMine: true
            },
            {
                id: "8445a84d-599d-4e2d-a31c-5f4f29ad2b4c",
                chatId: "f73a5a34-a723-4b35-8439-5289e0164c83",
                contactId: "bf172879-423a-4fd6-8df3-6d1938bbfe1f",
                value: "Hi!",
                createdAt: "2024-03-22T12:56:27.052-06:00",
                isMine: false
            },
            {
                id: "9f506742-50da-4350-af9d-61e53392fa08",
                chatId: "f73a5a34-a723-4b35-8439-5289e0164c83",
                contactId: "bf172879-423a-4fd6-8df3-6d1938bbfe1f",
                value: "Sure thing! I'm gonna call you in 5, is it okay?",
                createdAt: "2024-03-22T12:56:27.052-06:00",
                isMine: false
            },
            {
                id: "ca8523d8-faed-45f7-af09-f6bd5c3f3875",
                chatId: "f73a5a34-a723-4b35-8439-5289e0164c83",
                contactId: "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                value: "Awesome! Call me in 5 minutes..",
                createdAt: "2024-03-22T12:58:27.052-06:00",
                isMine: true
            },
            {
                id: "39944b00-1ffe-4ffb-8ca6-13c292812e06",
                chatId: "f73a5a34-a723-4b35-8439-5289e0164c83",
                contactId: "bf172879-423a-4fd6-8df3-6d1938bbfe1f",
                value: "👍🏻",
                createdAt: "2024-03-22T13:00:27.052-06:00",
                isMine: false
            }
        ]
    }

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _chatService: ChatService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
    ) { }

    message: string = '';

    ngOnInit(): void {
        //this.chat = this.chatsasd;
        this.getSlackChats()
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this.onDestroy))
            .subscribe(({ matchingAliases }) => {
                if (matchingAliases.includes('lg')) this.drawerMode = 'side';
                else this.drawerMode = 'over';
                this._changeDetectorRef.markForCheck();
            });
    }

    getSlackChats(){
        this._chatService.getSlackChatList().subscribe({
            next: (data) => {
                console.log(data)
                this.chat = data
            },
            error: (error) => console.error(error)
        });
    }

    setSlackMessage(){
        const postData = { message: this.message }

        if(this.message == ''){
            console.log('debe retorar');
            return false;
        }

        this._chatService.postDataSlack(postData).subscribe({
            next: (data)=>{
                this.getSlackChats();
                this.message = '';
            },
            error: (error) => console.log(error)
        })
    }

    resetChat(): void {
        this._chatService.resetChat();
        this.drawerOpened = false;
        this._changeDetectorRef.markForCheck();
    }

    toggleMuteNotifications() {
        this.chat.muted = !this.chat.muted;
        this._chatService.updateChat(this.chat.id, this.chat).subscribe();
    }

    trackByFn(index: number, item: any) {
        return item.id || index;
    }

    ngOnDestroy(): void {
        this.onDestroy.next();
        this.onDestroy.unsubscribe();
    }
}
