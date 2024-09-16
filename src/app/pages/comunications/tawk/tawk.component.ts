import { ChangeDetectorRef, Component } from '@angular/core';
import { Chat } from 'app/shared/layout/common/quick-chat/quick-chat.types';
import { Subject, takeUntil } from 'rxjs';
import { ChatService } from '../chat.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-tawk',
    templateUrl: './tawk.component.html',
    styleUrl: './tawk.component.scss'
})
export class TawkComponent {
    drawerComponent: 'profile' | 'new-chat';
    drawerOpened: boolean = false;
    filteredChats: Chat[];
    selectedChat: Chat;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    chats2 : any[] = [
    {
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
                    "assets/images/cards/01-320x200.jpg",
                    "assets/images/cards/02-320x200.jpg",
                    "assets/images/cards/03-320x200.jpg",
                    "assets/images/cards/04-320x200.jpg",
                    "assets/images/cards/05-320x200.jpg",
                    "assets/images/cards/06-320x200.jpg",
                    "assets/images/cards/07-320x200.jpg",
                    "assets/images/cards/08-320x200.jpg"
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
                "createdAt": "2024-03-21T18:56:55.386-06:00",
                "isMine": true
            },
            {
                "id": "eb82cf4b-fa93-4bf4-a88a-99e987ddb7ea",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "9d3f0e7f-dcbd-4e56-a5e8-87b8154e9edf",
                "value": "Hey, dude!",
                "createdAt": "2024-03-21T19:04:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3cf9b2a6-ae54-47db-97b2-ee139a8f84e5",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "9d3f0e7f-dcbd-4e56-a5e8-87b8154e9edf",
                "value": "Long time no see.",
                "createdAt": "2024-03-21T19:04:55.386-06:00",
                "isMine": false
            },
            {
                "id": "2ab91b0f-fafb-45f3-88df-7efaff29134b",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Yeah, man... Things were quite busy for me and my family.",
                "createdAt": "2024-03-21T19:06:55.386-06:00",
                "isMine": true
            },
            {
                "id": "10e81481-378f-49ac-b06b-7c59dcc639ae",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "9d3f0e7f-dcbd-4e56-a5e8-87b8154e9edf",
                "value": "What's up? Anything I can help with?",
                "createdAt": "2024-03-21T19:06:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3b334e72-6605-4ebd-a4f6-3850067048de",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "We've been on the move, changed 3 places over 4 months",
                "createdAt": "2024-03-21T19:07:55.386-06:00",
                "isMine": true
            },
            {
                "id": "25998113-3a96-4dd0-a7b9-4d2bb58db3f3",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "9d3f0e7f-dcbd-4e56-a5e8-87b8154e9edf",
                "value": "Wow! That's crazy! 🤯 What happened?",
                "createdAt": "2024-03-21T19:07:55.386-06:00",
                "isMine": false
            },
            {
                "id": "30adb3da-0e4f-487e-aec2-6d9f31e097f6",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "You know I got a job in that big software company. First move was because of that.",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "c0d6fd6e-d294-4845-8751-e84b8f2c4d3b",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Then they decided to re-locate me after a month",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "8d3c442b-62fa-496f-bffa-210ff5c1866b",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Which was an absolute pain because we just set up everything, house, kids school and all that.",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "3cf26ef0-e81f-4698-ac39-487454413332",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "So we moved the second time.",
                "createdAt": "2024-03-21T19:09:55.386-06:00",
                "isMine": true
            },
            {
                "id": "415151b9-9ee9-40a4-a4ad-2d88146bc71b",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "9d3f0e7f-dcbd-4e56-a5e8-87b8154e9edf",
                "value": "It's crazy!",
                "createdAt": "2024-03-21T19:09:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3a2d3a0e-839b-46e7-86ae-ca0826ecda7c",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Then this virus thing happened and just after a week we moved in, they decided the whole department will be working remotely.",
                "createdAt": "2024-03-21T19:10:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "And then we decided to move back our first location because, you know, everything was already setup so that's the third time.",
                "createdAt": "2024-03-21T19:10:55.386-06:00",
                "isMine": true
            },
            {
                "id": "415151b9-9ee9-40a4-a4ad-2d88146bc71b",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "9d3f0e7f-dcbd-4e56-a5e8-87b8154e9edf",
                "value": "Ohh dude, I'm really sorry you had to go through all that in such a short period of time",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": false
            },
            {
                "id": "ea7662d5-7b72-4c19-ad6c-f80320541001",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "9d3f0e7f-dcbd-4e56-a5e8-87b8154e9edf",
                "value": "😕",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3a2d3a0e-839b-46e7-86ae-ca0826ecda7c",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Thanks, man! It was good catching up with you.",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "9d3f0e7f-dcbd-4e56-a5e8-87b8154e9edf",
                "value": "Yeah dude. Hit me again next week so we can grab a coffee, remotely!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": false
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": ":) Sure, man! See you next week!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "9d3f0e7f-dcbd-4e56-a5e8-87b8154e9edf",
                "value": "See you later!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": false
            },
            {
                "id": "bab8ca0e-b8e5-4375-807b-1c91fca25a5d",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Hey! Are you available right now? How about if we grab that coffee today? Remotely, of course :)",
                "createdAt": "2024-03-28T12:45:55.386-06:00",
                "isMine": true
            },
            {
                "id": "8445a84d-599d-4e2d-a31c-5f4f29ad2b4c",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "9d3f0e7f-dcbd-4e56-a5e8-87b8154e9edf",
                "value": "Hi!",
                "createdAt": "2024-03-28T12:56:55.386-06:00",
                "isMine": false
            },
            {
                "id": "9f506742-50da-4350-af9d-61e53392fa08",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "9d3f0e7f-dcbd-4e56-a5e8-87b8154e9edf",
                "value": "Sure thing! I'm gonna call you in 5, is it okay?",
                "createdAt": "2024-03-28T12:56:55.386-06:00",
                "isMine": false
            },
            {
                "id": "ca8523d8-faed-45f7-af09-f6bd5c3f3875",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Awesome! Call me in 5 minutes..",
                "createdAt": "2024-03-28T12:58:55.386-06:00",
                "isMine": true
            },
            {
                "id": "39944b00-1ffe-4ffb-8ca6-13c292812e06",
                "chatId": "ff6bc7f1-449a-4419-af62-b89ce6cae0aa",
                "contactId": "9d3f0e7f-dcbd-4e56-a5e8-87b8154e9edf",
                "value": "👍🏻",
                "createdAt": "2024-03-28T13:00:55.386-06:00",
                "isMine": false
            }
        ]
    },
    {
        "id": "4459a3f0-b65e-4df2-8c37-6ec72fcc4b31",
        "contactId": "16b9e696-ea95-4dd8-86c4-3caf705a1dc6",
        "unreadCount": 0,
        "muted": false,
        "lastMessage": "See you tomorrow!",
        "lastMessageAt": "26/04/2021",
        "contact": {
            "id": "16b9e696-ea95-4dd8-86c4-3caf705a1dc6",
            "avatar": "assets/images/avatars/male-12.jpg",
            "name": "Nunez Faulkner",
            "about": "Hi there! I'm using FuseChat.",
            "details": {
                "emails": [
                    {
                        "email": "nunezfaulkner@mail.tv",
                        "label": "Personal"
                    }
                ],
                "phoneNumbers": [
                    {
                        "country": "xk",
                        "phoneNumber": "909 552 3327",
                        "label": "Mobile"
                    }
                ],
                "title": "Hotel Manager",
                "company": "Buzzopia",
                "birthday": "1982-01-23T12:00:00.000Z",
                "address": "614 Herkimer Court, Darrtown, Nebraska, PO9308"
            },
            "attachments": {
                "media": [
                    "assets/images/cards/01-320x200.jpg",
                    "assets/images/cards/02-320x200.jpg",
                    "assets/images/cards/03-320x200.jpg",
                    "assets/images/cards/04-320x200.jpg",
                    "assets/images/cards/05-320x200.jpg",
                    "assets/images/cards/06-320x200.jpg",
                    "assets/images/cards/07-320x200.jpg",
                    "assets/images/cards/08-320x200.jpg"
                ],
                "docs": [],
                "links": []
            }
        },
        "messages": [
            {
                "id": "e6b2b82f-b199-4a60-9696-5f3e40d2715d",
                "chatId": "4459a3f0-b65e-4df2-8c37-6ec72fcc4b31",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Hi!",
                "createdAt": "2024-03-21T18:56:55.386-06:00",
                "isMine": true
            },
            {
                "id": "eb82cf4b-fa93-4bf4-a88a-99e987ddb7ea",
                "chatId": "4459a3f0-b65e-4df2-8c37-6ec72fcc4b31",
                "contactId": "16b9e696-ea95-4dd8-86c4-3caf705a1dc6",
                "value": "Hey, dude!",
                "createdAt": "2024-03-21T19:04:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3cf9b2a6-ae54-47db-97b2-ee139a8f84e5",
                "chatId": "4459a3f0-b65e-4df2-8c37-6ec72fcc4b31",
                "contactId": "16b9e696-ea95-4dd8-86c4-3caf705a1dc6",
                "value": "Long time no see.",
                "createdAt": "2024-03-21T19:04:55.386-06:00",
                "isMine": false
            },
            {
                "id": "2ab91b0f-fafb-45f3-88df-7efaff29134b",
                "chatId": "4459a3f0-b65e-4df2-8c37-6ec72fcc4b31",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Yeah, man... Things were quite busy for me and my family.",
                "createdAt": "2024-03-21T19:06:55.386-06:00",
                "isMine": true
            },
            {
                "id": "10e81481-378f-49ac-b06b-7c59dcc639ae",
                "chatId": "4459a3f0-b65e-4df2-8c37-6ec72fcc4b31",
                "contactId": "16b9e696-ea95-4dd8-86c4-3caf705a1dc6",
                "value": "What's up? Anything I can help with?",
                "createdAt": "2024-03-21T19:06:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3b334e72-6605-4ebd-a4f6-3850067048de",
                "chatId": "4459a3f0-b65e-4df2-8c37-6ec72fcc4b31",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "We've been on the move, changed 3 places over 4 months",
                "createdAt": "2024-03-21T19:07:55.386-06:00",
                "isMine": true
            },
            {
                "id": "25998113-3a96-4dd0-a7b9-4d2bb58db3f3",
                "chatId": "4459a3f0-b65e-4df2-8c37-6ec72fcc4b31",
                "contactId": "16b9e696-ea95-4dd8-86c4-3caf705a1dc6",
                "value": "Wow! That's crazy! 🤯 What happened?",
                "createdAt": "2024-03-21T19:07:55.386-06:00",
                "isMine": false
            },
            {
                "id": "30adb3da-0e4f-487e-aec2-6d9f31e097f6",
                "chatId": "4459a3f0-b65e-4df2-8c37-6ec72fcc4b31",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "You know I got a job in that big software company. First move was because of that.",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "c0d6fd6e-d294-4845-8751-e84b8f2c4d3b",
                "chatId": "4459a3f0-b65e-4df2-8c37-6ec72fcc4b31",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Then they decided to re-locate me after a month",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "8d3c442b-62fa-496f-bffa-210ff5c1866b",
                "chatId": "4459a3f0-b65e-4df2-8c37-6ec72fcc4b31",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Which was an absolute pain because we just set up everything, house, kids school and all that.",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "3cf26ef0-e81f-4698-ac39-487454413332",
                "chatId": "4459a3f0-b65e-4df2-8c37-6ec72fcc4b31",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "So we moved the second time.",
                "createdAt": "2024-03-21T19:09:55.386-06:00",
                "isMine": true
            },
            {
                "id": "415151b9-9ee9-40a4-a4ad-2d88146bc71b",
                "chatId": "4459a3f0-b65e-4df2-8c37-6ec72fcc4b31",
                "contactId": "16b9e696-ea95-4dd8-86c4-3caf705a1dc6",
                "value": "It's crazy!",
                "createdAt": "2024-03-21T19:09:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3a2d3a0e-839b-46e7-86ae-ca0826ecda7c",
                "chatId": "4459a3f0-b65e-4df2-8c37-6ec72fcc4b31",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Then this virus thing happened and just after a week we moved in, they decided the whole department will be working remotely.",
                "createdAt": "2024-03-21T19:10:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "4459a3f0-b65e-4df2-8c37-6ec72fcc4b31",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "And then we decided to move back our first location because, you know, everything was already setup so that's the third time.",
                "createdAt": "2024-03-21T19:10:55.386-06:00",
                "isMine": true
            },
            {
                "id": "415151b9-9ee9-40a4-a4ad-2d88146bc71b",
                "chatId": "4459a3f0-b65e-4df2-8c37-6ec72fcc4b31",
                "contactId": "16b9e696-ea95-4dd8-86c4-3caf705a1dc6",
                "value": "Ohh dude, I'm really sorry you had to go through all that in such a short period of time",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": false
            },
            {
                "id": "ea7662d5-7b72-4c19-ad6c-f80320541001",
                "chatId": "4459a3f0-b65e-4df2-8c37-6ec72fcc4b31",
                "contactId": "16b9e696-ea95-4dd8-86c4-3caf705a1dc6",
                "value": "😕",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3a2d3a0e-839b-46e7-86ae-ca0826ecda7c",
                "chatId": "4459a3f0-b65e-4df2-8c37-6ec72fcc4b31",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Thanks, man! It was good catching up with you.",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "4459a3f0-b65e-4df2-8c37-6ec72fcc4b31",
                "contactId": "16b9e696-ea95-4dd8-86c4-3caf705a1dc6",
                "value": "Yeah dude. Hit me again next week so we can grab a coffee, remotely!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": false
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "4459a3f0-b65e-4df2-8c37-6ec72fcc4b31",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": ":) Sure, man! See you next week!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "4459a3f0-b65e-4df2-8c37-6ec72fcc4b31",
                "contactId": "16b9e696-ea95-4dd8-86c4-3caf705a1dc6",
                "value": "See you later!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": false
            },
            {
                "id": "bab8ca0e-b8e5-4375-807b-1c91fca25a5d",
                "chatId": "4459a3f0-b65e-4df2-8c37-6ec72fcc4b31",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Hey! Are you available right now? How about if we grab that coffee today? Remotely, of course :)",
                "createdAt": "2024-03-28T12:45:55.386-06:00",
                "isMine": true
            },
            {
                "id": "8445a84d-599d-4e2d-a31c-5f4f29ad2b4c",
                "chatId": "4459a3f0-b65e-4df2-8c37-6ec72fcc4b31",
                "contactId": "16b9e696-ea95-4dd8-86c4-3caf705a1dc6",
                "value": "Hi!",
                "createdAt": "2024-03-28T12:56:55.386-06:00",
                "isMine": false
            },
            {
                "id": "9f506742-50da-4350-af9d-61e53392fa08",
                "chatId": "4459a3f0-b65e-4df2-8c37-6ec72fcc4b31",
                "contactId": "16b9e696-ea95-4dd8-86c4-3caf705a1dc6",
                "value": "Sure thing! I'm gonna call you in 5, is it okay?",
                "createdAt": "2024-03-28T12:56:55.386-06:00",
                "isMine": false
            },
            {
                "id": "ca8523d8-faed-45f7-af09-f6bd5c3f3875",
                "chatId": "4459a3f0-b65e-4df2-8c37-6ec72fcc4b31",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Awesome! Call me in 5 minutes..",
                "createdAt": "2024-03-28T12:58:55.386-06:00",
                "isMine": true
            },
            {
                "id": "39944b00-1ffe-4ffb-8ca6-13c292812e06",
                "chatId": "4459a3f0-b65e-4df2-8c37-6ec72fcc4b31",
                "contactId": "16b9e696-ea95-4dd8-86c4-3caf705a1dc6",
                "value": "👍🏻",
                "createdAt": "2024-03-28T13:00:55.386-06:00",
                "isMine": false
            }
        ]
    },
    {
        "id": "f73a5a34-a723-4b35-8439-5289e0164c83",
        "contactId": "bf172879-423a-4fd6-8df3-6d1938bbfe1f",
        "unreadCount": 1,
        "muted": false,
        "lastMessage": "See you tomorrow!",
        "lastMessageAt": "26/04/2021",
        "contact": {
            "id": "bf172879-423a-4fd6-8df3-6d1938bbfe1f",
            "avatar": "assets/images/avatars/male-06.jpg",
            "name": "Edwards Mckenzie",
            "about": "Hi there! I'm using FuseChat.",
            "details": {
                "emails": [
                    {
                        "email": "edwardsmckenzie@mail.org",
                        "label": "Personal"
                    },
                    {
                        "email": "mckenzie.edwards@bugsall.io",
                        "label": "Work"
                    }
                ],
                "phoneNumbers": [
                    {
                        "country": "pe",
                        "phoneNumber": "934 519 2903",
                        "label": "Mobile"
                    },
                    {
                        "country": "pe",
                        "phoneNumber": "989 489 3662",
                        "label": "Work"
                    },
                    {
                        "country": "pe",
                        "phoneNumber": "813 461 2790",
                        "label": "Home"
                    }
                ],
                "title": "Legal Assistant",
                "company": "Bugsall",
                "birthday": "1988-07-27T12:00:00.000Z",
                "address": "384 Polhemus Place, Dalton, Palau, PO6038"
            },
            "attachments": {
                "media": [
                    "assets/images/cards/01-320x200.jpg",
                    "assets/images/cards/02-320x200.jpg",
                    "assets/images/cards/03-320x200.jpg",
                    "assets/images/cards/04-320x200.jpg",
                    "assets/images/cards/05-320x200.jpg",
                    "assets/images/cards/06-320x200.jpg",
                    "assets/images/cards/07-320x200.jpg",
                    "assets/images/cards/08-320x200.jpg"
                ],
                "docs": [],
                "links": []
            }
        },
        "messages": [
            {
                "id": "e6b2b82f-b199-4a60-9696-5f3e40d2715d",
                "chatId": "f73a5a34-a723-4b35-8439-5289e0164c83",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Hi!",
                "createdAt": "2024-03-21T18:56:55.386-06:00",
                "isMine": true
            },
            {
                "id": "eb82cf4b-fa93-4bf4-a88a-99e987ddb7ea",
                "chatId": "f73a5a34-a723-4b35-8439-5289e0164c83",
                "contactId": "bf172879-423a-4fd6-8df3-6d1938bbfe1f",
                "value": "Hey, dude!",
                "createdAt": "2024-03-21T19:04:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3cf9b2a6-ae54-47db-97b2-ee139a8f84e5",
                "chatId": "f73a5a34-a723-4b35-8439-5289e0164c83",
                "contactId": "bf172879-423a-4fd6-8df3-6d1938bbfe1f",
                "value": "Long time no see.",
                "createdAt": "2024-03-21T19:04:55.386-06:00",
                "isMine": false
            },
            {
                "id": "2ab91b0f-fafb-45f3-88df-7efaff29134b",
                "chatId": "f73a5a34-a723-4b35-8439-5289e0164c83",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Yeah, man... Things were quite busy for me and my family.",
                "createdAt": "2024-03-21T19:06:55.386-06:00",
                "isMine": true
            },
            {
                "id": "10e81481-378f-49ac-b06b-7c59dcc639ae",
                "chatId": "f73a5a34-a723-4b35-8439-5289e0164c83",
                "contactId": "bf172879-423a-4fd6-8df3-6d1938bbfe1f",
                "value": "What's up? Anything I can help with?",
                "createdAt": "2024-03-21T19:06:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3b334e72-6605-4ebd-a4f6-3850067048de",
                "chatId": "f73a5a34-a723-4b35-8439-5289e0164c83",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "We've been on the move, changed 3 places over 4 months",
                "createdAt": "2024-03-21T19:07:55.386-06:00",
                "isMine": true
            },
            {
                "id": "25998113-3a96-4dd0-a7b9-4d2bb58db3f3",
                "chatId": "f73a5a34-a723-4b35-8439-5289e0164c83",
                "contactId": "bf172879-423a-4fd6-8df3-6d1938bbfe1f",
                "value": "Wow! That's crazy! 🤯 What happened?",
                "createdAt": "2024-03-21T19:07:55.386-06:00",
                "isMine": false
            },
            {
                "id": "30adb3da-0e4f-487e-aec2-6d9f31e097f6",
                "chatId": "f73a5a34-a723-4b35-8439-5289e0164c83",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "You know I got a job in that big software company. First move was because of that.",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "c0d6fd6e-d294-4845-8751-e84b8f2c4d3b",
                "chatId": "f73a5a34-a723-4b35-8439-5289e0164c83",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Then they decided to re-locate me after a month",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "8d3c442b-62fa-496f-bffa-210ff5c1866b",
                "chatId": "f73a5a34-a723-4b35-8439-5289e0164c83",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Which was an absolute pain because we just set up everything, house, kids school and all that.",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "3cf26ef0-e81f-4698-ac39-487454413332",
                "chatId": "f73a5a34-a723-4b35-8439-5289e0164c83",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "So we moved the second time.",
                "createdAt": "2024-03-21T19:09:55.386-06:00",
                "isMine": true
            },
            {
                "id": "415151b9-9ee9-40a4-a4ad-2d88146bc71b",
                "chatId": "f73a5a34-a723-4b35-8439-5289e0164c83",
                "contactId": "bf172879-423a-4fd6-8df3-6d1938bbfe1f",
                "value": "It's crazy!",
                "createdAt": "2024-03-21T19:09:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3a2d3a0e-839b-46e7-86ae-ca0826ecda7c",
                "chatId": "f73a5a34-a723-4b35-8439-5289e0164c83",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Then this virus thing happened and just after a week we moved in, they decided the whole department will be working remotely.",
                "createdAt": "2024-03-21T19:10:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "f73a5a34-a723-4b35-8439-5289e0164c83",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "And then we decided to move back our first location because, you know, everything was already setup so that's the third time.",
                "createdAt": "2024-03-21T19:10:55.386-06:00",
                "isMine": true
            },
            {
                "id": "415151b9-9ee9-40a4-a4ad-2d88146bc71b",
                "chatId": "f73a5a34-a723-4b35-8439-5289e0164c83",
                "contactId": "bf172879-423a-4fd6-8df3-6d1938bbfe1f",
                "value": "Ohh dude, I'm really sorry you had to go through all that in such a short period of time",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": false
            },
            {
                "id": "ea7662d5-7b72-4c19-ad6c-f80320541001",
                "chatId": "f73a5a34-a723-4b35-8439-5289e0164c83",
                "contactId": "bf172879-423a-4fd6-8df3-6d1938bbfe1f",
                "value": "😕",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3a2d3a0e-839b-46e7-86ae-ca0826ecda7c",
                "chatId": "f73a5a34-a723-4b35-8439-5289e0164c83",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Thanks, man! It was good catching up with you.",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "f73a5a34-a723-4b35-8439-5289e0164c83",
                "contactId": "bf172879-423a-4fd6-8df3-6d1938bbfe1f",
                "value": "Yeah dude. Hit me again next week so we can grab a coffee, remotely!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": false
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "f73a5a34-a723-4b35-8439-5289e0164c83",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": ":) Sure, man! See you next week!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "f73a5a34-a723-4b35-8439-5289e0164c83",
                "contactId": "bf172879-423a-4fd6-8df3-6d1938bbfe1f",
                "value": "See you later!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": false
            },
            {
                "id": "bab8ca0e-b8e5-4375-807b-1c91fca25a5d",
                "chatId": "f73a5a34-a723-4b35-8439-5289e0164c83",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Hey! Are you available right now? How about if we grab that coffee today? Remotely, of course :)",
                "createdAt": "2024-03-28T12:45:55.386-06:00",
                "isMine": true
            },
            {
                "id": "8445a84d-599d-4e2d-a31c-5f4f29ad2b4c",
                "chatId": "f73a5a34-a723-4b35-8439-5289e0164c83",
                "contactId": "bf172879-423a-4fd6-8df3-6d1938bbfe1f",
                "value": "Hi!",
                "createdAt": "2024-03-28T12:56:55.386-06:00",
                "isMine": false
            },
            {
                "id": "9f506742-50da-4350-af9d-61e53392fa08",
                "chatId": "f73a5a34-a723-4b35-8439-5289e0164c83",
                "contactId": "bf172879-423a-4fd6-8df3-6d1938bbfe1f",
                "value": "Sure thing! I'm gonna call you in 5, is it okay?",
                "createdAt": "2024-03-28T12:56:55.386-06:00",
                "isMine": false
            },
            {
                "id": "ca8523d8-faed-45f7-af09-f6bd5c3f3875",
                "chatId": "f73a5a34-a723-4b35-8439-5289e0164c83",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Awesome! Call me in 5 minutes..",
                "createdAt": "2024-03-28T12:58:55.386-06:00",
                "isMine": true
            },
            {
                "id": "39944b00-1ffe-4ffb-8ca6-13c292812e06",
                "chatId": "f73a5a34-a723-4b35-8439-5289e0164c83",
                "contactId": "bf172879-423a-4fd6-8df3-6d1938bbfe1f",
                "value": "👍🏻",
                "createdAt": "2024-03-28T13:00:55.386-06:00",
                "isMine": false
            }
        ]
    },
    {
        "id": "747f101c-0371-4ca3-9f20-cb913a80fe89",
        "contactId": "abd9e78b-9e96-428f-b3ff-4d934c401bee",
        "unreadCount": 0,
        "muted": true,
        "lastMessage": "See you tomorrow!",
        "lastMessageAt": "26/04/2021",
        "contact": {
            "id": "abd9e78b-9e96-428f-b3ff-4d934c401bee",
            "avatar": "assets/images/avatars/female-04.jpg",
            "name": "Elsie Melendez",
            "about": "Hi there! I'm using FuseChat.",
            "details": {
                "emails": [
                    {
                        "email": "elsiemelendez@mail.com",
                        "label": "Personal"
                    },
                    {
                        "email": "melendez.elsie@chillium.name",
                        "label": "Work"
                    }
                ],
                "phoneNumbers": [
                    {
                        "country": "tg",
                        "phoneNumber": "907 515 3007",
                        "label": "Mobile"
                    },
                    {
                        "country": "tg",
                        "phoneNumber": "967 534 2803",
                        "label": "Work"
                    }
                ],
                "title": "Fundraising Director",
                "company": "Chillium",
                "birthday": "1980-06-28T12:00:00.000Z",
                "address": "428 Varanda Place, Veyo, Oklahoma, PO6188"
            },
            "attachments": {
                "media": [
                    "assets/images/cards/01-320x200.jpg",
                    "assets/images/cards/02-320x200.jpg",
                    "assets/images/cards/03-320x200.jpg",
                    "assets/images/cards/04-320x200.jpg",
                    "assets/images/cards/05-320x200.jpg",
                    "assets/images/cards/06-320x200.jpg",
                    "assets/images/cards/07-320x200.jpg",
                    "assets/images/cards/08-320x200.jpg"
                ],
                "docs": [],
                "links": []
            }
        },
        "messages": [
            {
                "id": "e6b2b82f-b199-4a60-9696-5f3e40d2715d",
                "chatId": "747f101c-0371-4ca3-9f20-cb913a80fe89",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Hi!",
                "createdAt": "2024-03-21T18:56:55.386-06:00",
                "isMine": true
            },
            {
                "id": "eb82cf4b-fa93-4bf4-a88a-99e987ddb7ea",
                "chatId": "747f101c-0371-4ca3-9f20-cb913a80fe89",
                "contactId": "abd9e78b-9e96-428f-b3ff-4d934c401bee",
                "value": "Hey, dude!",
                "createdAt": "2024-03-21T19:04:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3cf9b2a6-ae54-47db-97b2-ee139a8f84e5",
                "chatId": "747f101c-0371-4ca3-9f20-cb913a80fe89",
                "contactId": "abd9e78b-9e96-428f-b3ff-4d934c401bee",
                "value": "Long time no see.",
                "createdAt": "2024-03-21T19:04:55.386-06:00",
                "isMine": false
            },
            {
                "id": "2ab91b0f-fafb-45f3-88df-7efaff29134b",
                "chatId": "747f101c-0371-4ca3-9f20-cb913a80fe89",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Yeah, man... Things were quite busy for me and my family.",
                "createdAt": "2024-03-21T19:06:55.386-06:00",
                "isMine": true
            },
            {
                "id": "10e81481-378f-49ac-b06b-7c59dcc639ae",
                "chatId": "747f101c-0371-4ca3-9f20-cb913a80fe89",
                "contactId": "abd9e78b-9e96-428f-b3ff-4d934c401bee",
                "value": "What's up? Anything I can help with?",
                "createdAt": "2024-03-21T19:06:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3b334e72-6605-4ebd-a4f6-3850067048de",
                "chatId": "747f101c-0371-4ca3-9f20-cb913a80fe89",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "We've been on the move, changed 3 places over 4 months",
                "createdAt": "2024-03-21T19:07:55.386-06:00",
                "isMine": true
            },
            {
                "id": "25998113-3a96-4dd0-a7b9-4d2bb58db3f3",
                "chatId": "747f101c-0371-4ca3-9f20-cb913a80fe89",
                "contactId": "abd9e78b-9e96-428f-b3ff-4d934c401bee",
                "value": "Wow! That's crazy! 🤯 What happened?",
                "createdAt": "2024-03-21T19:07:55.386-06:00",
                "isMine": false
            },
            {
                "id": "30adb3da-0e4f-487e-aec2-6d9f31e097f6",
                "chatId": "747f101c-0371-4ca3-9f20-cb913a80fe89",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "You know I got a job in that big software company. First move was because of that.",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "c0d6fd6e-d294-4845-8751-e84b8f2c4d3b",
                "chatId": "747f101c-0371-4ca3-9f20-cb913a80fe89",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Then they decided to re-locate me after a month",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "8d3c442b-62fa-496f-bffa-210ff5c1866b",
                "chatId": "747f101c-0371-4ca3-9f20-cb913a80fe89",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Which was an absolute pain because we just set up everything, house, kids school and all that.",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "3cf26ef0-e81f-4698-ac39-487454413332",
                "chatId": "747f101c-0371-4ca3-9f20-cb913a80fe89",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "So we moved the second time.",
                "createdAt": "2024-03-21T19:09:55.386-06:00",
                "isMine": true
            },
            {
                "id": "415151b9-9ee9-40a4-a4ad-2d88146bc71b",
                "chatId": "747f101c-0371-4ca3-9f20-cb913a80fe89",
                "contactId": "abd9e78b-9e96-428f-b3ff-4d934c401bee",
                "value": "It's crazy!",
                "createdAt": "2024-03-21T19:09:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3a2d3a0e-839b-46e7-86ae-ca0826ecda7c",
                "chatId": "747f101c-0371-4ca3-9f20-cb913a80fe89",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Then this virus thing happened and just after a week we moved in, they decided the whole department will be working remotely.",
                "createdAt": "2024-03-21T19:10:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "747f101c-0371-4ca3-9f20-cb913a80fe89",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "And then we decided to move back our first location because, you know, everything was already setup so that's the third time.",
                "createdAt": "2024-03-21T19:10:55.386-06:00",
                "isMine": true
            },
            {
                "id": "415151b9-9ee9-40a4-a4ad-2d88146bc71b",
                "chatId": "747f101c-0371-4ca3-9f20-cb913a80fe89",
                "contactId": "abd9e78b-9e96-428f-b3ff-4d934c401bee",
                "value": "Ohh dude, I'm really sorry you had to go through all that in such a short period of time",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": false
            },
            {
                "id": "ea7662d5-7b72-4c19-ad6c-f80320541001",
                "chatId": "747f101c-0371-4ca3-9f20-cb913a80fe89",
                "contactId": "abd9e78b-9e96-428f-b3ff-4d934c401bee",
                "value": "😕",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3a2d3a0e-839b-46e7-86ae-ca0826ecda7c",
                "chatId": "747f101c-0371-4ca3-9f20-cb913a80fe89",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Thanks, man! It was good catching up with you.",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "747f101c-0371-4ca3-9f20-cb913a80fe89",
                "contactId": "abd9e78b-9e96-428f-b3ff-4d934c401bee",
                "value": "Yeah dude. Hit me again next week so we can grab a coffee, remotely!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": false
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "747f101c-0371-4ca3-9f20-cb913a80fe89",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": ":) Sure, man! See you next week!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "747f101c-0371-4ca3-9f20-cb913a80fe89",
                "contactId": "abd9e78b-9e96-428f-b3ff-4d934c401bee",
                "value": "See you later!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": false
            },
            {
                "id": "bab8ca0e-b8e5-4375-807b-1c91fca25a5d",
                "chatId": "747f101c-0371-4ca3-9f20-cb913a80fe89",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Hey! Are you available right now? How about if we grab that coffee today? Remotely, of course :)",
                "createdAt": "2024-03-28T12:45:55.386-06:00",
                "isMine": true
            },
            {
                "id": "8445a84d-599d-4e2d-a31c-5f4f29ad2b4c",
                "chatId": "747f101c-0371-4ca3-9f20-cb913a80fe89",
                "contactId": "abd9e78b-9e96-428f-b3ff-4d934c401bee",
                "value": "Hi!",
                "createdAt": "2024-03-28T12:56:55.386-06:00",
                "isMine": false
            },
            {
                "id": "9f506742-50da-4350-af9d-61e53392fa08",
                "chatId": "747f101c-0371-4ca3-9f20-cb913a80fe89",
                "contactId": "abd9e78b-9e96-428f-b3ff-4d934c401bee",
                "value": "Sure thing! I'm gonna call you in 5, is it okay?",
                "createdAt": "2024-03-28T12:56:55.386-06:00",
                "isMine": false
            },
            {
                "id": "ca8523d8-faed-45f7-af09-f6bd5c3f3875",
                "chatId": "747f101c-0371-4ca3-9f20-cb913a80fe89",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Awesome! Call me in 5 minutes..",
                "createdAt": "2024-03-28T12:58:55.386-06:00",
                "isMine": true
            },
            {
                "id": "39944b00-1ffe-4ffb-8ca6-13c292812e06",
                "chatId": "747f101c-0371-4ca3-9f20-cb913a80fe89",
                "contactId": "abd9e78b-9e96-428f-b3ff-4d934c401bee",
                "value": "👍🏻",
                "createdAt": "2024-03-28T13:00:55.386-06:00",
                "isMine": false
            }
        ]
    },
    {
        "id": "b3facfc4-dfc2-4ac2-b55d-cb70b3e68419",
        "contactId": "6519600a-5eaa-45f8-8bed-c46fddb3b26a",
        "unreadCount": 0,
        "muted": false,
        "lastMessage": "See you tomorrow!",
        "lastMessageAt": "26/04/2021",
        "contact": {
            "id": "6519600a-5eaa-45f8-8bed-c46fddb3b26a",
            "background": "assets/images/cards/24-640x480.jpg",
            "name": "Mcleod Wagner",
            "about": "Hi there! I'm using FuseChat.",
            "details": {
                "emails": [
                    {
                        "email": "mcleodwagner@mail.biz",
                        "label": "Personal"
                    }
                ],
                "phoneNumbers": [
                    {
                        "country": "at",
                        "phoneNumber": "977 590 2773",
                        "label": "Mobile"
                    },
                    {
                        "country": "at",
                        "phoneNumber": "828 496 3813",
                        "label": "Work"
                    },
                    {
                        "country": "at",
                        "phoneNumber": "831 432 2512",
                        "label": "Home"
                    }
                ],
                "company": "Inrt",
                "birthday": "1980-12-03T12:00:00.000Z",
                "address": "736 Glen Street, Kaka, West Virginia, PO9350"
            },
            "attachments": {
                "media": [
                    "assets/images/cards/01-320x200.jpg",
                    "assets/images/cards/02-320x200.jpg",
                    "assets/images/cards/03-320x200.jpg",
                    "assets/images/cards/04-320x200.jpg",
                    "assets/images/cards/05-320x200.jpg",
                    "assets/images/cards/06-320x200.jpg",
                    "assets/images/cards/07-320x200.jpg",
                    "assets/images/cards/08-320x200.jpg"
                ],
                "docs": [],
                "links": []
            }
        },
        "messages": [
            {
                "id": "e6b2b82f-b199-4a60-9696-5f3e40d2715d",
                "chatId": "b3facfc4-dfc2-4ac2-b55d-cb70b3e68419",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Hi!",
                "createdAt": "2024-03-21T18:56:55.386-06:00",
                "isMine": true
            },
            {
                "id": "eb82cf4b-fa93-4bf4-a88a-99e987ddb7ea",
                "chatId": "b3facfc4-dfc2-4ac2-b55d-cb70b3e68419",
                "contactId": "6519600a-5eaa-45f8-8bed-c46fddb3b26a",
                "value": "Hey, dude!",
                "createdAt": "2024-03-21T19:04:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3cf9b2a6-ae54-47db-97b2-ee139a8f84e5",
                "chatId": "b3facfc4-dfc2-4ac2-b55d-cb70b3e68419",
                "contactId": "6519600a-5eaa-45f8-8bed-c46fddb3b26a",
                "value": "Long time no see.",
                "createdAt": "2024-03-21T19:04:55.386-06:00",
                "isMine": false
            },
            {
                "id": "2ab91b0f-fafb-45f3-88df-7efaff29134b",
                "chatId": "b3facfc4-dfc2-4ac2-b55d-cb70b3e68419",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Yeah, man... Things were quite busy for me and my family.",
                "createdAt": "2024-03-21T19:06:55.386-06:00",
                "isMine": true
            },
            {
                "id": "10e81481-378f-49ac-b06b-7c59dcc639ae",
                "chatId": "b3facfc4-dfc2-4ac2-b55d-cb70b3e68419",
                "contactId": "6519600a-5eaa-45f8-8bed-c46fddb3b26a",
                "value": "What's up? Anything I can help with?",
                "createdAt": "2024-03-21T19:06:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3b334e72-6605-4ebd-a4f6-3850067048de",
                "chatId": "b3facfc4-dfc2-4ac2-b55d-cb70b3e68419",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "We've been on the move, changed 3 places over 4 months",
                "createdAt": "2024-03-21T19:07:55.386-06:00",
                "isMine": true
            },
            {
                "id": "25998113-3a96-4dd0-a7b9-4d2bb58db3f3",
                "chatId": "b3facfc4-dfc2-4ac2-b55d-cb70b3e68419",
                "contactId": "6519600a-5eaa-45f8-8bed-c46fddb3b26a",
                "value": "Wow! That's crazy! 🤯 What happened?",
                "createdAt": "2024-03-21T19:07:55.386-06:00",
                "isMine": false
            },
            {
                "id": "30adb3da-0e4f-487e-aec2-6d9f31e097f6",
                "chatId": "b3facfc4-dfc2-4ac2-b55d-cb70b3e68419",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "You know I got a job in that big software company. First move was because of that.",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "c0d6fd6e-d294-4845-8751-e84b8f2c4d3b",
                "chatId": "b3facfc4-dfc2-4ac2-b55d-cb70b3e68419",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Then they decided to re-locate me after a month",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "8d3c442b-62fa-496f-bffa-210ff5c1866b",
                "chatId": "b3facfc4-dfc2-4ac2-b55d-cb70b3e68419",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Which was an absolute pain because we just set up everything, house, kids school and all that.",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "3cf26ef0-e81f-4698-ac39-487454413332",
                "chatId": "b3facfc4-dfc2-4ac2-b55d-cb70b3e68419",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "So we moved the second time.",
                "createdAt": "2024-03-21T19:09:55.386-06:00",
                "isMine": true
            },
            {
                "id": "415151b9-9ee9-40a4-a4ad-2d88146bc71b",
                "chatId": "b3facfc4-dfc2-4ac2-b55d-cb70b3e68419",
                "contactId": "6519600a-5eaa-45f8-8bed-c46fddb3b26a",
                "value": "It's crazy!",
                "createdAt": "2024-03-21T19:09:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3a2d3a0e-839b-46e7-86ae-ca0826ecda7c",
                "chatId": "b3facfc4-dfc2-4ac2-b55d-cb70b3e68419",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Then this virus thing happened and just after a week we moved in, they decided the whole department will be working remotely.",
                "createdAt": "2024-03-21T19:10:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "b3facfc4-dfc2-4ac2-b55d-cb70b3e68419",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "And then we decided to move back our first location because, you know, everything was already setup so that's the third time.",
                "createdAt": "2024-03-21T19:10:55.386-06:00",
                "isMine": true
            },
            {
                "id": "415151b9-9ee9-40a4-a4ad-2d88146bc71b",
                "chatId": "b3facfc4-dfc2-4ac2-b55d-cb70b3e68419",
                "contactId": "6519600a-5eaa-45f8-8bed-c46fddb3b26a",
                "value": "Ohh dude, I'm really sorry you had to go through all that in such a short period of time",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": false
            },
            {
                "id": "ea7662d5-7b72-4c19-ad6c-f80320541001",
                "chatId": "b3facfc4-dfc2-4ac2-b55d-cb70b3e68419",
                "contactId": "6519600a-5eaa-45f8-8bed-c46fddb3b26a",
                "value": "😕",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3a2d3a0e-839b-46e7-86ae-ca0826ecda7c",
                "chatId": "b3facfc4-dfc2-4ac2-b55d-cb70b3e68419",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Thanks, man! It was good catching up with you.",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "b3facfc4-dfc2-4ac2-b55d-cb70b3e68419",
                "contactId": "6519600a-5eaa-45f8-8bed-c46fddb3b26a",
                "value": "Yeah dude. Hit me again next week so we can grab a coffee, remotely!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": false
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "b3facfc4-dfc2-4ac2-b55d-cb70b3e68419",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": ":) Sure, man! See you next week!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "b3facfc4-dfc2-4ac2-b55d-cb70b3e68419",
                "contactId": "6519600a-5eaa-45f8-8bed-c46fddb3b26a",
                "value": "See you later!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": false
            },
            {
                "id": "bab8ca0e-b8e5-4375-807b-1c91fca25a5d",
                "chatId": "b3facfc4-dfc2-4ac2-b55d-cb70b3e68419",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Hey! Are you available right now? How about if we grab that coffee today? Remotely, of course :)",
                "createdAt": "2024-03-28T12:45:55.386-06:00",
                "isMine": true
            },
            {
                "id": "8445a84d-599d-4e2d-a31c-5f4f29ad2b4c",
                "chatId": "b3facfc4-dfc2-4ac2-b55d-cb70b3e68419",
                "contactId": "6519600a-5eaa-45f8-8bed-c46fddb3b26a",
                "value": "Hi!",
                "createdAt": "2024-03-28T12:56:55.386-06:00",
                "isMine": false
            },
            {
                "id": "9f506742-50da-4350-af9d-61e53392fa08",
                "chatId": "b3facfc4-dfc2-4ac2-b55d-cb70b3e68419",
                "contactId": "6519600a-5eaa-45f8-8bed-c46fddb3b26a",
                "value": "Sure thing! I'm gonna call you in 5, is it okay?",
                "createdAt": "2024-03-28T12:56:55.386-06:00",
                "isMine": false
            },
            {
                "id": "ca8523d8-faed-45f7-af09-f6bd5c3f3875",
                "chatId": "b3facfc4-dfc2-4ac2-b55d-cb70b3e68419",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Awesome! Call me in 5 minutes..",
                "createdAt": "2024-03-28T12:58:55.386-06:00",
                "isMine": true
            },
            {
                "id": "39944b00-1ffe-4ffb-8ca6-13c292812e06",
                "chatId": "b3facfc4-dfc2-4ac2-b55d-cb70b3e68419",
                "contactId": "6519600a-5eaa-45f8-8bed-c46fddb3b26a",
                "value": "👍🏻",
                "createdAt": "2024-03-28T13:00:55.386-06:00",
                "isMine": false
            }
        ]
    },
    {
        "id": "e3127982-9e53-4611-ac27-eb70c84be4aa",
        "contactId": "b62359fd-f2a8-46e6-904e-31052d1cd675",
        "unreadCount": 0,
        "muted": false,
        "lastMessage": "See you tomorrow!",
        "lastMessageAt": "26/04/2021",
        "contact": {
            "id": "b62359fd-f2a8-46e6-904e-31052d1cd675",
            "avatar": "assets/images/avatars/male-11.jpg",
            "name": "Joseph Strickland",
            "about": "Hi there! I'm using FuseChat.",
            "details": {
                "emails": [
                    {
                        "email": "josephstrickland@mail.io",
                        "label": "Personal"
                    },
                    {
                        "email": "strickland.joseph@bytrex.us",
                        "label": "Work"
                    }
                ],
                "phoneNumbers": [
                    {
                        "country": "jo",
                        "phoneNumber": "990 450 2729",
                        "label": "Mobile"
                    }
                ],
                "title": "Hotel Manager",
                "company": "Bytrex",
                "birthday": "1991-09-08T12:00:00.000Z",
                "address": "844 Ellery Street, Hondah, Texas, PO1272"
            },
            "attachments": {
                "media": [
                    "assets/images/cards/01-320x200.jpg",
                    "assets/images/cards/02-320x200.jpg",
                    "assets/images/cards/03-320x200.jpg",
                    "assets/images/cards/04-320x200.jpg",
                    "assets/images/cards/05-320x200.jpg",
                    "assets/images/cards/06-320x200.jpg",
                    "assets/images/cards/07-320x200.jpg",
                    "assets/images/cards/08-320x200.jpg"
                ],
                "docs": [],
                "links": []
            }
        },
        "messages": [
            {
                "id": "e6b2b82f-b199-4a60-9696-5f3e40d2715d",
                "chatId": "e3127982-9e53-4611-ac27-eb70c84be4aa",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Hi!",
                "createdAt": "2024-03-21T18:56:55.386-06:00",
                "isMine": true
            },
            {
                "id": "eb82cf4b-fa93-4bf4-a88a-99e987ddb7ea",
                "chatId": "e3127982-9e53-4611-ac27-eb70c84be4aa",
                "contactId": "b62359fd-f2a8-46e6-904e-31052d1cd675",
                "value": "Hey, dude!",
                "createdAt": "2024-03-21T19:04:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3cf9b2a6-ae54-47db-97b2-ee139a8f84e5",
                "chatId": "e3127982-9e53-4611-ac27-eb70c84be4aa",
                "contactId": "b62359fd-f2a8-46e6-904e-31052d1cd675",
                "value": "Long time no see.",
                "createdAt": "2024-03-21T19:04:55.386-06:00",
                "isMine": false
            },
            {
                "id": "2ab91b0f-fafb-45f3-88df-7efaff29134b",
                "chatId": "e3127982-9e53-4611-ac27-eb70c84be4aa",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Yeah, man... Things were quite busy for me and my family.",
                "createdAt": "2024-03-21T19:06:55.386-06:00",
                "isMine": true
            },
            {
                "id": "10e81481-378f-49ac-b06b-7c59dcc639ae",
                "chatId": "e3127982-9e53-4611-ac27-eb70c84be4aa",
                "contactId": "b62359fd-f2a8-46e6-904e-31052d1cd675",
                "value": "What's up? Anything I can help with?",
                "createdAt": "2024-03-21T19:06:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3b334e72-6605-4ebd-a4f6-3850067048de",
                "chatId": "e3127982-9e53-4611-ac27-eb70c84be4aa",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "We've been on the move, changed 3 places over 4 months",
                "createdAt": "2024-03-21T19:07:55.386-06:00",
                "isMine": true
            },
            {
                "id": "25998113-3a96-4dd0-a7b9-4d2bb58db3f3",
                "chatId": "e3127982-9e53-4611-ac27-eb70c84be4aa",
                "contactId": "b62359fd-f2a8-46e6-904e-31052d1cd675",
                "value": "Wow! That's crazy! 🤯 What happened?",
                "createdAt": "2024-03-21T19:07:55.386-06:00",
                "isMine": false
            },
            {
                "id": "30adb3da-0e4f-487e-aec2-6d9f31e097f6",
                "chatId": "e3127982-9e53-4611-ac27-eb70c84be4aa",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "You know I got a job in that big software company. First move was because of that.",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "c0d6fd6e-d294-4845-8751-e84b8f2c4d3b",
                "chatId": "e3127982-9e53-4611-ac27-eb70c84be4aa",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Then they decided to re-locate me after a month",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "8d3c442b-62fa-496f-bffa-210ff5c1866b",
                "chatId": "e3127982-9e53-4611-ac27-eb70c84be4aa",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Which was an absolute pain because we just set up everything, house, kids school and all that.",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "3cf26ef0-e81f-4698-ac39-487454413332",
                "chatId": "e3127982-9e53-4611-ac27-eb70c84be4aa",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "So we moved the second time.",
                "createdAt": "2024-03-21T19:09:55.386-06:00",
                "isMine": true
            },
            {
                "id": "415151b9-9ee9-40a4-a4ad-2d88146bc71b",
                "chatId": "e3127982-9e53-4611-ac27-eb70c84be4aa",
                "contactId": "b62359fd-f2a8-46e6-904e-31052d1cd675",
                "value": "It's crazy!",
                "createdAt": "2024-03-21T19:09:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3a2d3a0e-839b-46e7-86ae-ca0826ecda7c",
                "chatId": "e3127982-9e53-4611-ac27-eb70c84be4aa",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Then this virus thing happened and just after a week we moved in, they decided the whole department will be working remotely.",
                "createdAt": "2024-03-21T19:10:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "e3127982-9e53-4611-ac27-eb70c84be4aa",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "And then we decided to move back our first location because, you know, everything was already setup so that's the third time.",
                "createdAt": "2024-03-21T19:10:55.386-06:00",
                "isMine": true
            },
            {
                "id": "415151b9-9ee9-40a4-a4ad-2d88146bc71b",
                "chatId": "e3127982-9e53-4611-ac27-eb70c84be4aa",
                "contactId": "b62359fd-f2a8-46e6-904e-31052d1cd675",
                "value": "Ohh dude, I'm really sorry you had to go through all that in such a short period of time",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": false
            },
            {
                "id": "ea7662d5-7b72-4c19-ad6c-f80320541001",
                "chatId": "e3127982-9e53-4611-ac27-eb70c84be4aa",
                "contactId": "b62359fd-f2a8-46e6-904e-31052d1cd675",
                "value": "😕",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3a2d3a0e-839b-46e7-86ae-ca0826ecda7c",
                "chatId": "e3127982-9e53-4611-ac27-eb70c84be4aa",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Thanks, man! It was good catching up with you.",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "e3127982-9e53-4611-ac27-eb70c84be4aa",
                "contactId": "b62359fd-f2a8-46e6-904e-31052d1cd675",
                "value": "Yeah dude. Hit me again next week so we can grab a coffee, remotely!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": false
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "e3127982-9e53-4611-ac27-eb70c84be4aa",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": ":) Sure, man! See you next week!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "e3127982-9e53-4611-ac27-eb70c84be4aa",
                "contactId": "b62359fd-f2a8-46e6-904e-31052d1cd675",
                "value": "See you later!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": false
            },
            {
                "id": "bab8ca0e-b8e5-4375-807b-1c91fca25a5d",
                "chatId": "e3127982-9e53-4611-ac27-eb70c84be4aa",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Hey! Are you available right now? How about if we grab that coffee today? Remotely, of course :)",
                "createdAt": "2024-03-28T12:45:55.386-06:00",
                "isMine": true
            },
            {
                "id": "8445a84d-599d-4e2d-a31c-5f4f29ad2b4c",
                "chatId": "e3127982-9e53-4611-ac27-eb70c84be4aa",
                "contactId": "b62359fd-f2a8-46e6-904e-31052d1cd675",
                "value": "Hi!",
                "createdAt": "2024-03-28T12:56:55.386-06:00",
                "isMine": false
            },
            {
                "id": "9f506742-50da-4350-af9d-61e53392fa08",
                "chatId": "e3127982-9e53-4611-ac27-eb70c84be4aa",
                "contactId": "b62359fd-f2a8-46e6-904e-31052d1cd675",
                "value": "Sure thing! I'm gonna call you in 5, is it okay?",
                "createdAt": "2024-03-28T12:56:55.386-06:00",
                "isMine": false
            },
            {
                "id": "ca8523d8-faed-45f7-af09-f6bd5c3f3875",
                "chatId": "e3127982-9e53-4611-ac27-eb70c84be4aa",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Awesome! Call me in 5 minutes..",
                "createdAt": "2024-03-28T12:58:55.386-06:00",
                "isMine": true
            },
            {
                "id": "39944b00-1ffe-4ffb-8ca6-13c292812e06",
                "chatId": "e3127982-9e53-4611-ac27-eb70c84be4aa",
                "contactId": "b62359fd-f2a8-46e6-904e-31052d1cd675",
                "value": "👍🏻",
                "createdAt": "2024-03-28T13:00:55.386-06:00",
                "isMine": false
            }
        ]
    },
    {
        "id": "a30351f3-bfa6-4ce3-b13a-82748fe0edee",
        "contactId": "2c37ed00-427a-46d7-8f8f-d711c768d1ee",
        "unreadCount": 0,
        "muted": false,
        "lastMessage": "See you tomorrow!",
        "lastMessageAt": "26/04/2021",
        "contact": {
            "id": "2c37ed00-427a-46d7-8f8f-d711c768d1ee",
            "avatar": "assets/images/avatars/male-17.jpg",
            "name": "Silva Foster",
            "about": "Hi there! I'm using FuseChat.",
            "details": {
                "emails": [
                    {
                        "email": "silvafoster@mail.net",
                        "label": "Personal"
                    }
                ],
                "phoneNumbers": [
                    {
                        "country": "bn",
                        "phoneNumber": "916 511 3837",
                        "label": "Mobile"
                    },
                    {
                        "country": "bn",
                        "phoneNumber": "949 564 3247",
                        "label": "Work"
                    }
                ],
                "title": "Insurance Analyst",
                "company": "Extrawear",
                "birthday": "1980-04-29T12:00:00.000Z",
                "address": "137 Bridge Street, Sisquoc, District Of Columbia, PO4105"
            },
            "attachments": {
                "media": [
                    "assets/images/cards/01-320x200.jpg",
                    "assets/images/cards/02-320x200.jpg",
                    "assets/images/cards/03-320x200.jpg",
                    "assets/images/cards/04-320x200.jpg",
                    "assets/images/cards/05-320x200.jpg",
                    "assets/images/cards/06-320x200.jpg",
                    "assets/images/cards/07-320x200.jpg",
                    "assets/images/cards/08-320x200.jpg"
                ],
                "docs": [],
                "links": []
            }
        },
        "messages": [
            {
                "id": "e6b2b82f-b199-4a60-9696-5f3e40d2715d",
                "chatId": "a30351f3-bfa6-4ce3-b13a-82748fe0edee",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Hi!",
                "createdAt": "2024-03-21T18:56:55.386-06:00",
                "isMine": true
            },
            {
                "id": "eb82cf4b-fa93-4bf4-a88a-99e987ddb7ea",
                "chatId": "a30351f3-bfa6-4ce3-b13a-82748fe0edee",
                "contactId": "2c37ed00-427a-46d7-8f8f-d711c768d1ee",
                "value": "Hey, dude!",
                "createdAt": "2024-03-21T19:04:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3cf9b2a6-ae54-47db-97b2-ee139a8f84e5",
                "chatId": "a30351f3-bfa6-4ce3-b13a-82748fe0edee",
                "contactId": "2c37ed00-427a-46d7-8f8f-d711c768d1ee",
                "value": "Long time no see.",
                "createdAt": "2024-03-21T19:04:55.386-06:00",
                "isMine": false
            },
            {
                "id": "2ab91b0f-fafb-45f3-88df-7efaff29134b",
                "chatId": "a30351f3-bfa6-4ce3-b13a-82748fe0edee",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Yeah, man... Things were quite busy for me and my family.",
                "createdAt": "2024-03-21T19:06:55.386-06:00",
                "isMine": true
            },
            {
                "id": "10e81481-378f-49ac-b06b-7c59dcc639ae",
                "chatId": "a30351f3-bfa6-4ce3-b13a-82748fe0edee",
                "contactId": "2c37ed00-427a-46d7-8f8f-d711c768d1ee",
                "value": "What's up? Anything I can help with?",
                "createdAt": "2024-03-21T19:06:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3b334e72-6605-4ebd-a4f6-3850067048de",
                "chatId": "a30351f3-bfa6-4ce3-b13a-82748fe0edee",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "We've been on the move, changed 3 places over 4 months",
                "createdAt": "2024-03-21T19:07:55.386-06:00",
                "isMine": true
            },
            {
                "id": "25998113-3a96-4dd0-a7b9-4d2bb58db3f3",
                "chatId": "a30351f3-bfa6-4ce3-b13a-82748fe0edee",
                "contactId": "2c37ed00-427a-46d7-8f8f-d711c768d1ee",
                "value": "Wow! That's crazy! 🤯 What happened?",
                "createdAt": "2024-03-21T19:07:55.386-06:00",
                "isMine": false
            },
            {
                "id": "30adb3da-0e4f-487e-aec2-6d9f31e097f6",
                "chatId": "a30351f3-bfa6-4ce3-b13a-82748fe0edee",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "You know I got a job in that big software company. First move was because of that.",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "c0d6fd6e-d294-4845-8751-e84b8f2c4d3b",
                "chatId": "a30351f3-bfa6-4ce3-b13a-82748fe0edee",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Then they decided to re-locate me after a month",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "8d3c442b-62fa-496f-bffa-210ff5c1866b",
                "chatId": "a30351f3-bfa6-4ce3-b13a-82748fe0edee",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Which was an absolute pain because we just set up everything, house, kids school and all that.",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "3cf26ef0-e81f-4698-ac39-487454413332",
                "chatId": "a30351f3-bfa6-4ce3-b13a-82748fe0edee",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "So we moved the second time.",
                "createdAt": "2024-03-21T19:09:55.386-06:00",
                "isMine": true
            },
            {
                "id": "415151b9-9ee9-40a4-a4ad-2d88146bc71b",
                "chatId": "a30351f3-bfa6-4ce3-b13a-82748fe0edee",
                "contactId": "2c37ed00-427a-46d7-8f8f-d711c768d1ee",
                "value": "It's crazy!",
                "createdAt": "2024-03-21T19:09:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3a2d3a0e-839b-46e7-86ae-ca0826ecda7c",
                "chatId": "a30351f3-bfa6-4ce3-b13a-82748fe0edee",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Then this virus thing happened and just after a week we moved in, they decided the whole department will be working remotely.",
                "createdAt": "2024-03-21T19:10:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "a30351f3-bfa6-4ce3-b13a-82748fe0edee",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "And then we decided to move back our first location because, you know, everything was already setup so that's the third time.",
                "createdAt": "2024-03-21T19:10:55.386-06:00",
                "isMine": true
            },
            {
                "id": "415151b9-9ee9-40a4-a4ad-2d88146bc71b",
                "chatId": "a30351f3-bfa6-4ce3-b13a-82748fe0edee",
                "contactId": "2c37ed00-427a-46d7-8f8f-d711c768d1ee",
                "value": "Ohh dude, I'm really sorry you had to go through all that in such a short period of time",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": false
            },
            {
                "id": "ea7662d5-7b72-4c19-ad6c-f80320541001",
                "chatId": "a30351f3-bfa6-4ce3-b13a-82748fe0edee",
                "contactId": "2c37ed00-427a-46d7-8f8f-d711c768d1ee",
                "value": "😕",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3a2d3a0e-839b-46e7-86ae-ca0826ecda7c",
                "chatId": "a30351f3-bfa6-4ce3-b13a-82748fe0edee",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Thanks, man! It was good catching up with you.",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "a30351f3-bfa6-4ce3-b13a-82748fe0edee",
                "contactId": "2c37ed00-427a-46d7-8f8f-d711c768d1ee",
                "value": "Yeah dude. Hit me again next week so we can grab a coffee, remotely!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": false
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "a30351f3-bfa6-4ce3-b13a-82748fe0edee",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": ":) Sure, man! See you next week!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "a30351f3-bfa6-4ce3-b13a-82748fe0edee",
                "contactId": "2c37ed00-427a-46d7-8f8f-d711c768d1ee",
                "value": "See you later!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": false
            },
            {
                "id": "bab8ca0e-b8e5-4375-807b-1c91fca25a5d",
                "chatId": "a30351f3-bfa6-4ce3-b13a-82748fe0edee",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Hey! Are you available right now? How about if we grab that coffee today? Remotely, of course :)",
                "createdAt": "2024-03-28T12:45:55.386-06:00",
                "isMine": true
            },
            {
                "id": "8445a84d-599d-4e2d-a31c-5f4f29ad2b4c",
                "chatId": "a30351f3-bfa6-4ce3-b13a-82748fe0edee",
                "contactId": "2c37ed00-427a-46d7-8f8f-d711c768d1ee",
                "value": "Hi!",
                "createdAt": "2024-03-28T12:56:55.386-06:00",
                "isMine": false
            },
            {
                "id": "9f506742-50da-4350-af9d-61e53392fa08",
                "chatId": "a30351f3-bfa6-4ce3-b13a-82748fe0edee",
                "contactId": "2c37ed00-427a-46d7-8f8f-d711c768d1ee",
                "value": "Sure thing! I'm gonna call you in 5, is it okay?",
                "createdAt": "2024-03-28T12:56:55.386-06:00",
                "isMine": false
            },
            {
                "id": "ca8523d8-faed-45f7-af09-f6bd5c3f3875",
                "chatId": "a30351f3-bfa6-4ce3-b13a-82748fe0edee",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Awesome! Call me in 5 minutes..",
                "createdAt": "2024-03-28T12:58:55.386-06:00",
                "isMine": true
            },
            {
                "id": "39944b00-1ffe-4ffb-8ca6-13c292812e06",
                "chatId": "a30351f3-bfa6-4ce3-b13a-82748fe0edee",
                "contactId": "2c37ed00-427a-46d7-8f8f-d711c768d1ee",
                "value": "👍🏻",
                "createdAt": "2024-03-28T13:00:55.386-06:00",
                "isMine": false
            }
        ]
    },
    {
        "id": "5636c0ba-fa47-42ca-9160-27340583041e",
        "contactId": "b8258ccf-48b5-46a2-9c95-e0bd7580c645",
        "unreadCount": 0,
        "muted": false,
        "lastMessage": "See you tomorrow!",
        "lastMessageAt": "26/04/2021",
        "contact": {
            "id": "b8258ccf-48b5-46a2-9c95-e0bd7580c645",
            "avatar": "assets/images/avatars/female-02.jpg",
            "name": "Tina Harris",
            "about": "Hi there! I'm using FuseChat.",
            "details": {
                "emails": [
                    {
                        "email": "tinaharris@mail.ca",
                        "label": "Personal"
                    }
                ],
                "phoneNumbers": [
                    {
                        "country": "gp",
                        "phoneNumber": "933 464 2431",
                        "label": "Mobile"
                    },
                    {
                        "country": "gp",
                        "phoneNumber": "894 535 3609",
                        "label": "Work"
                    }
                ],
                "title": "Short Story Writer",
                "company": "Gallaxia",
                "birthday": "1976-09-10T12:00:00.000Z",
                "address": "821 Beverly Road, Tyro, Colorado, PO4248"
            },
            "attachments": {
                "media": [
                    "assets/images/cards/01-320x200.jpg",
                    "assets/images/cards/02-320x200.jpg",
                    "assets/images/cards/03-320x200.jpg",
                    "assets/images/cards/04-320x200.jpg",
                    "assets/images/cards/05-320x200.jpg",
                    "assets/images/cards/06-320x200.jpg",
                    "assets/images/cards/07-320x200.jpg",
                    "assets/images/cards/08-320x200.jpg"
                ],
                "docs": [],
                "links": []
            }
        },
        "messages": [
            {
                "id": "e6b2b82f-b199-4a60-9696-5f3e40d2715d",
                "chatId": "5636c0ba-fa47-42ca-9160-27340583041e",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Hi!",
                "createdAt": "2024-03-21T18:56:55.386-06:00",
                "isMine": true
            },
            {
                "id": "eb82cf4b-fa93-4bf4-a88a-99e987ddb7ea",
                "chatId": "5636c0ba-fa47-42ca-9160-27340583041e",
                "contactId": "b8258ccf-48b5-46a2-9c95-e0bd7580c645",
                "value": "Hey, dude!",
                "createdAt": "2024-03-21T19:04:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3cf9b2a6-ae54-47db-97b2-ee139a8f84e5",
                "chatId": "5636c0ba-fa47-42ca-9160-27340583041e",
                "contactId": "b8258ccf-48b5-46a2-9c95-e0bd7580c645",
                "value": "Long time no see.",
                "createdAt": "2024-03-21T19:04:55.386-06:00",
                "isMine": false
            },
            {
                "id": "2ab91b0f-fafb-45f3-88df-7efaff29134b",
                "chatId": "5636c0ba-fa47-42ca-9160-27340583041e",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Yeah, man... Things were quite busy for me and my family.",
                "createdAt": "2024-03-21T19:06:55.386-06:00",
                "isMine": true
            },
            {
                "id": "10e81481-378f-49ac-b06b-7c59dcc639ae",
                "chatId": "5636c0ba-fa47-42ca-9160-27340583041e",
                "contactId": "b8258ccf-48b5-46a2-9c95-e0bd7580c645",
                "value": "What's up? Anything I can help with?",
                "createdAt": "2024-03-21T19:06:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3b334e72-6605-4ebd-a4f6-3850067048de",
                "chatId": "5636c0ba-fa47-42ca-9160-27340583041e",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "We've been on the move, changed 3 places over 4 months",
                "createdAt": "2024-03-21T19:07:55.386-06:00",
                "isMine": true
            },
            {
                "id": "25998113-3a96-4dd0-a7b9-4d2bb58db3f3",
                "chatId": "5636c0ba-fa47-42ca-9160-27340583041e",
                "contactId": "b8258ccf-48b5-46a2-9c95-e0bd7580c645",
                "value": "Wow! That's crazy! 🤯 What happened?",
                "createdAt": "2024-03-21T19:07:55.386-06:00",
                "isMine": false
            },
            {
                "id": "30adb3da-0e4f-487e-aec2-6d9f31e097f6",
                "chatId": "5636c0ba-fa47-42ca-9160-27340583041e",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "You know I got a job in that big software company. First move was because of that.",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "c0d6fd6e-d294-4845-8751-e84b8f2c4d3b",
                "chatId": "5636c0ba-fa47-42ca-9160-27340583041e",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Then they decided to re-locate me after a month",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "8d3c442b-62fa-496f-bffa-210ff5c1866b",
                "chatId": "5636c0ba-fa47-42ca-9160-27340583041e",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Which was an absolute pain because we just set up everything, house, kids school and all that.",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "3cf26ef0-e81f-4698-ac39-487454413332",
                "chatId": "5636c0ba-fa47-42ca-9160-27340583041e",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "So we moved the second time.",
                "createdAt": "2024-03-21T19:09:55.386-06:00",
                "isMine": true
            },
            {
                "id": "415151b9-9ee9-40a4-a4ad-2d88146bc71b",
                "chatId": "5636c0ba-fa47-42ca-9160-27340583041e",
                "contactId": "b8258ccf-48b5-46a2-9c95-e0bd7580c645",
                "value": "It's crazy!",
                "createdAt": "2024-03-21T19:09:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3a2d3a0e-839b-46e7-86ae-ca0826ecda7c",
                "chatId": "5636c0ba-fa47-42ca-9160-27340583041e",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Then this virus thing happened and just after a week we moved in, they decided the whole department will be working remotely.",
                "createdAt": "2024-03-21T19:10:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "5636c0ba-fa47-42ca-9160-27340583041e",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "And then we decided to move back our first location because, you know, everything was already setup so that's the third time.",
                "createdAt": "2024-03-21T19:10:55.386-06:00",
                "isMine": true
            },
            {
                "id": "415151b9-9ee9-40a4-a4ad-2d88146bc71b",
                "chatId": "5636c0ba-fa47-42ca-9160-27340583041e",
                "contactId": "b8258ccf-48b5-46a2-9c95-e0bd7580c645",
                "value": "Ohh dude, I'm really sorry you had to go through all that in such a short period of time",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": false
            },
            {
                "id": "ea7662d5-7b72-4c19-ad6c-f80320541001",
                "chatId": "5636c0ba-fa47-42ca-9160-27340583041e",
                "contactId": "b8258ccf-48b5-46a2-9c95-e0bd7580c645",
                "value": "😕",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3a2d3a0e-839b-46e7-86ae-ca0826ecda7c",
                "chatId": "5636c0ba-fa47-42ca-9160-27340583041e",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Thanks, man! It was good catching up with you.",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "5636c0ba-fa47-42ca-9160-27340583041e",
                "contactId": "b8258ccf-48b5-46a2-9c95-e0bd7580c645",
                "value": "Yeah dude. Hit me again next week so we can grab a coffee, remotely!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": false
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "5636c0ba-fa47-42ca-9160-27340583041e",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": ":) Sure, man! See you next week!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "5636c0ba-fa47-42ca-9160-27340583041e",
                "contactId": "b8258ccf-48b5-46a2-9c95-e0bd7580c645",
                "value": "See you later!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": false
            },
            {
                "id": "bab8ca0e-b8e5-4375-807b-1c91fca25a5d",
                "chatId": "5636c0ba-fa47-42ca-9160-27340583041e",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Hey! Are you available right now? How about if we grab that coffee today? Remotely, of course :)",
                "createdAt": "2024-03-28T12:45:55.386-06:00",
                "isMine": true
            },
            {
                "id": "8445a84d-599d-4e2d-a31c-5f4f29ad2b4c",
                "chatId": "5636c0ba-fa47-42ca-9160-27340583041e",
                "contactId": "b8258ccf-48b5-46a2-9c95-e0bd7580c645",
                "value": "Hi!",
                "createdAt": "2024-03-28T12:56:55.386-06:00",
                "isMine": false
            },
            {
                "id": "9f506742-50da-4350-af9d-61e53392fa08",
                "chatId": "5636c0ba-fa47-42ca-9160-27340583041e",
                "contactId": "b8258ccf-48b5-46a2-9c95-e0bd7580c645",
                "value": "Sure thing! I'm gonna call you in 5, is it okay?",
                "createdAt": "2024-03-28T12:56:55.386-06:00",
                "isMine": false
            },
            {
                "id": "ca8523d8-faed-45f7-af09-f6bd5c3f3875",
                "chatId": "5636c0ba-fa47-42ca-9160-27340583041e",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Awesome! Call me in 5 minutes..",
                "createdAt": "2024-03-28T12:58:55.386-06:00",
                "isMine": true
            },
            {
                "id": "39944b00-1ffe-4ffb-8ca6-13c292812e06",
                "chatId": "5636c0ba-fa47-42ca-9160-27340583041e",
                "contactId": "b8258ccf-48b5-46a2-9c95-e0bd7580c645",
                "value": "👍🏻",
                "createdAt": "2024-03-28T13:00:55.386-06:00",
                "isMine": false
            }
        ]
    },
    {
        "id": "feddd91a-51af-48d8-99b0-cd99ee060a36",
        "contactId": "e2946946-b4b5-4fd7-bab4-62c38cdff2f1",
        "unreadCount": 0,
        "muted": false,
        "lastMessage": "See you tomorrow!",
        "lastMessageAt": "26/04/2021",
        "contact": {
            "id": "e2946946-b4b5-4fd7-bab4-62c38cdff2f1",
            "avatar": "assets/images/avatars/female-05.jpg",
            "name": "Samantha Jacobson",
            "about": "Hi there! I'm using FuseChat.",
            "details": {
                "emails": [
                    {
                        "email": "samanthajacobson@mail.com",
                        "label": "Personal"
                    }
                ],
                "phoneNumbers": [
                    {
                        "country": "es",
                        "phoneNumber": "879 591 3327",
                        "label": "Mobile"
                    }
                ],
                "title": "Dental Laboratory Worker",
                "company": "Emoltra",
                "birthday": "1972-02-04T12:00:00.000Z",
                "address": "384 Love Lane, Dyckesville, New York, PO4115"
            },
            "attachments": {
                "media": [
                    "assets/images/cards/01-320x200.jpg",
                    "assets/images/cards/02-320x200.jpg",
                    "assets/images/cards/03-320x200.jpg",
                    "assets/images/cards/04-320x200.jpg",
                    "assets/images/cards/05-320x200.jpg",
                    "assets/images/cards/06-320x200.jpg",
                    "assets/images/cards/07-320x200.jpg",
                    "assets/images/cards/08-320x200.jpg"
                ],
                "docs": [],
                "links": []
            }
        },
        "messages": [
            {
                "id": "e6b2b82f-b199-4a60-9696-5f3e40d2715d",
                "chatId": "feddd91a-51af-48d8-99b0-cd99ee060a36",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Hi!",
                "createdAt": "2024-03-21T18:56:55.386-06:00",
                "isMine": true
            },
            {
                "id": "eb82cf4b-fa93-4bf4-a88a-99e987ddb7ea",
                "chatId": "feddd91a-51af-48d8-99b0-cd99ee060a36",
                "contactId": "e2946946-b4b5-4fd7-bab4-62c38cdff2f1",
                "value": "Hey, dude!",
                "createdAt": "2024-03-21T19:04:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3cf9b2a6-ae54-47db-97b2-ee139a8f84e5",
                "chatId": "feddd91a-51af-48d8-99b0-cd99ee060a36",
                "contactId": "e2946946-b4b5-4fd7-bab4-62c38cdff2f1",
                "value": "Long time no see.",
                "createdAt": "2024-03-21T19:04:55.386-06:00",
                "isMine": false
            },
            {
                "id": "2ab91b0f-fafb-45f3-88df-7efaff29134b",
                "chatId": "feddd91a-51af-48d8-99b0-cd99ee060a36",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Yeah, man... Things were quite busy for me and my family.",
                "createdAt": "2024-03-21T19:06:55.386-06:00",
                "isMine": true
            },
            {
                "id": "10e81481-378f-49ac-b06b-7c59dcc639ae",
                "chatId": "feddd91a-51af-48d8-99b0-cd99ee060a36",
                "contactId": "e2946946-b4b5-4fd7-bab4-62c38cdff2f1",
                "value": "What's up? Anything I can help with?",
                "createdAt": "2024-03-21T19:06:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3b334e72-6605-4ebd-a4f6-3850067048de",
                "chatId": "feddd91a-51af-48d8-99b0-cd99ee060a36",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "We've been on the move, changed 3 places over 4 months",
                "createdAt": "2024-03-21T19:07:55.386-06:00",
                "isMine": true
            },
            {
                "id": "25998113-3a96-4dd0-a7b9-4d2bb58db3f3",
                "chatId": "feddd91a-51af-48d8-99b0-cd99ee060a36",
                "contactId": "e2946946-b4b5-4fd7-bab4-62c38cdff2f1",
                "value": "Wow! That's crazy! 🤯 What happened?",
                "createdAt": "2024-03-21T19:07:55.386-06:00",
                "isMine": false
            },
            {
                "id": "30adb3da-0e4f-487e-aec2-6d9f31e097f6",
                "chatId": "feddd91a-51af-48d8-99b0-cd99ee060a36",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "You know I got a job in that big software company. First move was because of that.",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "c0d6fd6e-d294-4845-8751-e84b8f2c4d3b",
                "chatId": "feddd91a-51af-48d8-99b0-cd99ee060a36",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Then they decided to re-locate me after a month",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "8d3c442b-62fa-496f-bffa-210ff5c1866b",
                "chatId": "feddd91a-51af-48d8-99b0-cd99ee060a36",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Which was an absolute pain because we just set up everything, house, kids school and all that.",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "3cf26ef0-e81f-4698-ac39-487454413332",
                "chatId": "feddd91a-51af-48d8-99b0-cd99ee060a36",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "So we moved the second time.",
                "createdAt": "2024-03-21T19:09:55.386-06:00",
                "isMine": true
            },
            {
                "id": "415151b9-9ee9-40a4-a4ad-2d88146bc71b",
                "chatId": "feddd91a-51af-48d8-99b0-cd99ee060a36",
                "contactId": "e2946946-b4b5-4fd7-bab4-62c38cdff2f1",
                "value": "It's crazy!",
                "createdAt": "2024-03-21T19:09:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3a2d3a0e-839b-46e7-86ae-ca0826ecda7c",
                "chatId": "feddd91a-51af-48d8-99b0-cd99ee060a36",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Then this virus thing happened and just after a week we moved in, they decided the whole department will be working remotely.",
                "createdAt": "2024-03-21T19:10:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "feddd91a-51af-48d8-99b0-cd99ee060a36",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "And then we decided to move back our first location because, you know, everything was already setup so that's the third time.",
                "createdAt": "2024-03-21T19:10:55.386-06:00",
                "isMine": true
            },
            {
                "id": "415151b9-9ee9-40a4-a4ad-2d88146bc71b",
                "chatId": "feddd91a-51af-48d8-99b0-cd99ee060a36",
                "contactId": "e2946946-b4b5-4fd7-bab4-62c38cdff2f1",
                "value": "Ohh dude, I'm really sorry you had to go through all that in such a short period of time",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": false
            },
            {
                "id": "ea7662d5-7b72-4c19-ad6c-f80320541001",
                "chatId": "feddd91a-51af-48d8-99b0-cd99ee060a36",
                "contactId": "e2946946-b4b5-4fd7-bab4-62c38cdff2f1",
                "value": "😕",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3a2d3a0e-839b-46e7-86ae-ca0826ecda7c",
                "chatId": "feddd91a-51af-48d8-99b0-cd99ee060a36",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Thanks, man! It was good catching up with you.",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "feddd91a-51af-48d8-99b0-cd99ee060a36",
                "contactId": "e2946946-b4b5-4fd7-bab4-62c38cdff2f1",
                "value": "Yeah dude. Hit me again next week so we can grab a coffee, remotely!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": false
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "feddd91a-51af-48d8-99b0-cd99ee060a36",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": ":) Sure, man! See you next week!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "feddd91a-51af-48d8-99b0-cd99ee060a36",
                "contactId": "e2946946-b4b5-4fd7-bab4-62c38cdff2f1",
                "value": "See you later!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": false
            },
            {
                "id": "bab8ca0e-b8e5-4375-807b-1c91fca25a5d",
                "chatId": "feddd91a-51af-48d8-99b0-cd99ee060a36",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Hey! Are you available right now? How about if we grab that coffee today? Remotely, of course :)",
                "createdAt": "2024-03-28T12:45:55.386-06:00",
                "isMine": true
            },
            {
                "id": "8445a84d-599d-4e2d-a31c-5f4f29ad2b4c",
                "chatId": "feddd91a-51af-48d8-99b0-cd99ee060a36",
                "contactId": "e2946946-b4b5-4fd7-bab4-62c38cdff2f1",
                "value": "Hi!",
                "createdAt": "2024-03-28T12:56:55.386-06:00",
                "isMine": false
            },
            {
                "id": "9f506742-50da-4350-af9d-61e53392fa08",
                "chatId": "feddd91a-51af-48d8-99b0-cd99ee060a36",
                "contactId": "e2946946-b4b5-4fd7-bab4-62c38cdff2f1",
                "value": "Sure thing! I'm gonna call you in 5, is it okay?",
                "createdAt": "2024-03-28T12:56:55.386-06:00",
                "isMine": false
            },
            {
                "id": "ca8523d8-faed-45f7-af09-f6bd5c3f3875",
                "chatId": "feddd91a-51af-48d8-99b0-cd99ee060a36",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Awesome! Call me in 5 minutes..",
                "createdAt": "2024-03-28T12:58:55.386-06:00",
                "isMine": true
            },
            {
                "id": "39944b00-1ffe-4ffb-8ca6-13c292812e06",
                "chatId": "feddd91a-51af-48d8-99b0-cd99ee060a36",
                "contactId": "e2946946-b4b5-4fd7-bab4-62c38cdff2f1",
                "value": "👍🏻",
                "createdAt": "2024-03-28T13:00:55.386-06:00",
                "isMine": false
            }
        ]
    },
    {
        "id": "89421c2f-1751-4040-b09b-4a4268db47b9",
        "contactId": "12148fa2-e0a4-49fb-b3c5-daeecdb5180a",
        "unreadCount": 0,
        "muted": true,
        "lastMessage": "See you tomorrow!",
        "lastMessageAt": "26/04/2021",
        "contact": {
            "id": "12148fa2-e0a4-49fb-b3c5-daeecdb5180a",
            "avatar": "assets/images/avatars/female-07.jpg",
            "name": "Olga Rhodes",
            "about": "Hi there! I'm using FuseChat.",
            "details": {
                "emails": [
                    {
                        "email": "olgarhodes@mail.me",
                        "label": "Personal"
                    },
                    {
                        "email": "rhodes.olga@moreganic.info",
                        "label": "Work"
                    }
                ],
                "phoneNumbers": [
                    {
                        "country": "tl",
                        "phoneNumber": "971 514 3366",
                        "label": "Mobile"
                    },
                    {
                        "country": "tl",
                        "phoneNumber": "807 480 2033",
                        "label": "Work"
                    },
                    {
                        "country": "tl",
                        "phoneNumber": "810 528 3783",
                        "label": "Home"
                    }
                ],
                "title": "Pastry Baker",
                "company": "Moreganic",
                "birthday": "1971-08-13T12:00:00.000Z",
                "address": "253 Beard Street, Staples, Massachusetts, PO8089"
            },
            "attachments": {
                "media": [
                    "assets/images/cards/01-320x200.jpg",
                    "assets/images/cards/02-320x200.jpg",
                    "assets/images/cards/03-320x200.jpg",
                    "assets/images/cards/04-320x200.jpg",
                    "assets/images/cards/05-320x200.jpg",
                    "assets/images/cards/06-320x200.jpg",
                    "assets/images/cards/07-320x200.jpg",
                    "assets/images/cards/08-320x200.jpg"
                ],
                "docs": [],
                "links": []
            }
        },
        "messages": [
            {
                "id": "e6b2b82f-b199-4a60-9696-5f3e40d2715d",
                "chatId": "89421c2f-1751-4040-b09b-4a4268db47b9",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Hi!",
                "createdAt": "2024-03-21T18:56:55.386-06:00",
                "isMine": true
            },
            {
                "id": "eb82cf4b-fa93-4bf4-a88a-99e987ddb7ea",
                "chatId": "89421c2f-1751-4040-b09b-4a4268db47b9",
                "contactId": "12148fa2-e0a4-49fb-b3c5-daeecdb5180a",
                "value": "Hey, dude!",
                "createdAt": "2024-03-21T19:04:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3cf9b2a6-ae54-47db-97b2-ee139a8f84e5",
                "chatId": "89421c2f-1751-4040-b09b-4a4268db47b9",
                "contactId": "12148fa2-e0a4-49fb-b3c5-daeecdb5180a",
                "value": "Long time no see.",
                "createdAt": "2024-03-21T19:04:55.386-06:00",
                "isMine": false
            },
            {
                "id": "2ab91b0f-fafb-45f3-88df-7efaff29134b",
                "chatId": "89421c2f-1751-4040-b09b-4a4268db47b9",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Yeah, man... Things were quite busy for me and my family.",
                "createdAt": "2024-03-21T19:06:55.386-06:00",
                "isMine": true
            },
            {
                "id": "10e81481-378f-49ac-b06b-7c59dcc639ae",
                "chatId": "89421c2f-1751-4040-b09b-4a4268db47b9",
                "contactId": "12148fa2-e0a4-49fb-b3c5-daeecdb5180a",
                "value": "What's up? Anything I can help with?",
                "createdAt": "2024-03-21T19:06:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3b334e72-6605-4ebd-a4f6-3850067048de",
                "chatId": "89421c2f-1751-4040-b09b-4a4268db47b9",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "We've been on the move, changed 3 places over 4 months",
                "createdAt": "2024-03-21T19:07:55.386-06:00",
                "isMine": true
            },
            {
                "id": "25998113-3a96-4dd0-a7b9-4d2bb58db3f3",
                "chatId": "89421c2f-1751-4040-b09b-4a4268db47b9",
                "contactId": "12148fa2-e0a4-49fb-b3c5-daeecdb5180a",
                "value": "Wow! That's crazy! 🤯 What happened?",
                "createdAt": "2024-03-21T19:07:55.386-06:00",
                "isMine": false
            },
            {
                "id": "30adb3da-0e4f-487e-aec2-6d9f31e097f6",
                "chatId": "89421c2f-1751-4040-b09b-4a4268db47b9",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "You know I got a job in that big software company. First move was because of that.",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "c0d6fd6e-d294-4845-8751-e84b8f2c4d3b",
                "chatId": "89421c2f-1751-4040-b09b-4a4268db47b9",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Then they decided to re-locate me after a month",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "8d3c442b-62fa-496f-bffa-210ff5c1866b",
                "chatId": "89421c2f-1751-4040-b09b-4a4268db47b9",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Which was an absolute pain because we just set up everything, house, kids school and all that.",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "3cf26ef0-e81f-4698-ac39-487454413332",
                "chatId": "89421c2f-1751-4040-b09b-4a4268db47b9",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "So we moved the second time.",
                "createdAt": "2024-03-21T19:09:55.386-06:00",
                "isMine": true
            },
            {
                "id": "415151b9-9ee9-40a4-a4ad-2d88146bc71b",
                "chatId": "89421c2f-1751-4040-b09b-4a4268db47b9",
                "contactId": "12148fa2-e0a4-49fb-b3c5-daeecdb5180a",
                "value": "It's crazy!",
                "createdAt": "2024-03-21T19:09:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3a2d3a0e-839b-46e7-86ae-ca0826ecda7c",
                "chatId": "89421c2f-1751-4040-b09b-4a4268db47b9",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Then this virus thing happened and just after a week we moved in, they decided the whole department will be working remotely.",
                "createdAt": "2024-03-21T19:10:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "89421c2f-1751-4040-b09b-4a4268db47b9",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "And then we decided to move back our first location because, you know, everything was already setup so that's the third time.",
                "createdAt": "2024-03-21T19:10:55.386-06:00",
                "isMine": true
            },
            {
                "id": "415151b9-9ee9-40a4-a4ad-2d88146bc71b",
                "chatId": "89421c2f-1751-4040-b09b-4a4268db47b9",
                "contactId": "12148fa2-e0a4-49fb-b3c5-daeecdb5180a",
                "value": "Ohh dude, I'm really sorry you had to go through all that in such a short period of time",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": false
            },
            {
                "id": "ea7662d5-7b72-4c19-ad6c-f80320541001",
                "chatId": "89421c2f-1751-4040-b09b-4a4268db47b9",
                "contactId": "12148fa2-e0a4-49fb-b3c5-daeecdb5180a",
                "value": "😕",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3a2d3a0e-839b-46e7-86ae-ca0826ecda7c",
                "chatId": "89421c2f-1751-4040-b09b-4a4268db47b9",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Thanks, man! It was good catching up with you.",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "89421c2f-1751-4040-b09b-4a4268db47b9",
                "contactId": "12148fa2-e0a4-49fb-b3c5-daeecdb5180a",
                "value": "Yeah dude. Hit me again next week so we can grab a coffee, remotely!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": false
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "89421c2f-1751-4040-b09b-4a4268db47b9",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": ":) Sure, man! See you next week!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "89421c2f-1751-4040-b09b-4a4268db47b9",
                "contactId": "12148fa2-e0a4-49fb-b3c5-daeecdb5180a",
                "value": "See you later!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": false
            },
            {
                "id": "bab8ca0e-b8e5-4375-807b-1c91fca25a5d",
                "chatId": "89421c2f-1751-4040-b09b-4a4268db47b9",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Hey! Are you available right now? How about if we grab that coffee today? Remotely, of course :)",
                "createdAt": "2024-03-28T12:45:55.386-06:00",
                "isMine": true
            },
            {
                "id": "8445a84d-599d-4e2d-a31c-5f4f29ad2b4c",
                "chatId": "89421c2f-1751-4040-b09b-4a4268db47b9",
                "contactId": "12148fa2-e0a4-49fb-b3c5-daeecdb5180a",
                "value": "Hi!",
                "createdAt": "2024-03-28T12:56:55.386-06:00",
                "isMine": false
            },
            {
                "id": "9f506742-50da-4350-af9d-61e53392fa08",
                "chatId": "89421c2f-1751-4040-b09b-4a4268db47b9",
                "contactId": "12148fa2-e0a4-49fb-b3c5-daeecdb5180a",
                "value": "Sure thing! I'm gonna call you in 5, is it okay?",
                "createdAt": "2024-03-28T12:56:55.386-06:00",
                "isMine": false
            },
            {
                "id": "ca8523d8-faed-45f7-af09-f6bd5c3f3875",
                "chatId": "89421c2f-1751-4040-b09b-4a4268db47b9",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Awesome! Call me in 5 minutes..",
                "createdAt": "2024-03-28T12:58:55.386-06:00",
                "isMine": true
            },
            {
                "id": "39944b00-1ffe-4ffb-8ca6-13c292812e06",
                "chatId": "89421c2f-1751-4040-b09b-4a4268db47b9",
                "contactId": "12148fa2-e0a4-49fb-b3c5-daeecdb5180a",
                "value": "👍🏻",
                "createdAt": "2024-03-28T13:00:55.386-06:00",
                "isMine": false
            }
        ]
    },
    {
        "id": "ffbbfdb4-0485-44aa-8521-5ce1eda3fd2f",
        "contactId": "81fdc48c-5572-4123-8a73-71b7892120de",
        "muted": false,
        "lastMessage": "See you tomorrow!",
        "lastMessageAt": "26/04/2021",
        "contact": {
            "id": "81fdc48c-5572-4123-8a73-71b7892120de",
            "avatar": "assets/images/avatars/female-09.jpg",
            "name": "Earlene Rosales",
            "about": "Hi there! I'm using FuseChat.",
            "details": {
                "emails": [
                    {
                        "email": "earlenerosales@mail.co.uk",
                        "label": "Personal"
                    },
                    {
                        "email": "rosales.earlene@softmicro.net",
                        "label": "Work"
                    }
                ],
                "phoneNumbers": [
                    {
                        "country": "ki",
                        "phoneNumber": "927 589 3619",
                        "label": "Mobile"
                    }
                ],
                "title": "Historiographer",
                "company": "Softmicro",
                "birthday": "1960-11-13T12:00:00.000Z",
                "address": "981 Kingston Avenue, Topaz, Connecticut, PO6866"
            },
            "attachments": {
                "media": [
                    "assets/images/cards/01-320x200.jpg",
                    "assets/images/cards/02-320x200.jpg",
                    "assets/images/cards/03-320x200.jpg",
                    "assets/images/cards/04-320x200.jpg",
                    "assets/images/cards/05-320x200.jpg",
                    "assets/images/cards/06-320x200.jpg",
                    "assets/images/cards/07-320x200.jpg",
                    "assets/images/cards/08-320x200.jpg"
                ],
                "docs": [],
                "links": []
            }
        },
        "messages": [
            {
                "id": "e6b2b82f-b199-4a60-9696-5f3e40d2715d",
                "chatId": "ffbbfdb4-0485-44aa-8521-5ce1eda3fd2f",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Hi!",
                "createdAt": "2024-03-21T18:56:55.386-06:00",
                "isMine": true
            },
            {
                "id": "eb82cf4b-fa93-4bf4-a88a-99e987ddb7ea",
                "chatId": "ffbbfdb4-0485-44aa-8521-5ce1eda3fd2f",
                "contactId": "81fdc48c-5572-4123-8a73-71b7892120de",
                "value": "Hey, dude!",
                "createdAt": "2024-03-21T19:04:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3cf9b2a6-ae54-47db-97b2-ee139a8f84e5",
                "chatId": "ffbbfdb4-0485-44aa-8521-5ce1eda3fd2f",
                "contactId": "81fdc48c-5572-4123-8a73-71b7892120de",
                "value": "Long time no see.",
                "createdAt": "2024-03-21T19:04:55.386-06:00",
                "isMine": false
            },
            {
                "id": "2ab91b0f-fafb-45f3-88df-7efaff29134b",
                "chatId": "ffbbfdb4-0485-44aa-8521-5ce1eda3fd2f",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Yeah, man... Things were quite busy for me and my family.",
                "createdAt": "2024-03-21T19:06:55.386-06:00",
                "isMine": true
            },
            {
                "id": "10e81481-378f-49ac-b06b-7c59dcc639ae",
                "chatId": "ffbbfdb4-0485-44aa-8521-5ce1eda3fd2f",
                "contactId": "81fdc48c-5572-4123-8a73-71b7892120de",
                "value": "What's up? Anything I can help with?",
                "createdAt": "2024-03-21T19:06:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3b334e72-6605-4ebd-a4f6-3850067048de",
                "chatId": "ffbbfdb4-0485-44aa-8521-5ce1eda3fd2f",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "We've been on the move, changed 3 places over 4 months",
                "createdAt": "2024-03-21T19:07:55.386-06:00",
                "isMine": true
            },
            {
                "id": "25998113-3a96-4dd0-a7b9-4d2bb58db3f3",
                "chatId": "ffbbfdb4-0485-44aa-8521-5ce1eda3fd2f",
                "contactId": "81fdc48c-5572-4123-8a73-71b7892120de",
                "value": "Wow! That's crazy! 🤯 What happened?",
                "createdAt": "2024-03-21T19:07:55.386-06:00",
                "isMine": false
            },
            {
                "id": "30adb3da-0e4f-487e-aec2-6d9f31e097f6",
                "chatId": "ffbbfdb4-0485-44aa-8521-5ce1eda3fd2f",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "You know I got a job in that big software company. First move was because of that.",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "c0d6fd6e-d294-4845-8751-e84b8f2c4d3b",
                "chatId": "ffbbfdb4-0485-44aa-8521-5ce1eda3fd2f",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Then they decided to re-locate me after a month",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "8d3c442b-62fa-496f-bffa-210ff5c1866b",
                "chatId": "ffbbfdb4-0485-44aa-8521-5ce1eda3fd2f",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Which was an absolute pain because we just set up everything, house, kids school and all that.",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "3cf26ef0-e81f-4698-ac39-487454413332",
                "chatId": "ffbbfdb4-0485-44aa-8521-5ce1eda3fd2f",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "So we moved the second time.",
                "createdAt": "2024-03-21T19:09:55.386-06:00",
                "isMine": true
            },
            {
                "id": "415151b9-9ee9-40a4-a4ad-2d88146bc71b",
                "chatId": "ffbbfdb4-0485-44aa-8521-5ce1eda3fd2f",
                "contactId": "81fdc48c-5572-4123-8a73-71b7892120de",
                "value": "It's crazy!",
                "createdAt": "2024-03-21T19:09:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3a2d3a0e-839b-46e7-86ae-ca0826ecda7c",
                "chatId": "ffbbfdb4-0485-44aa-8521-5ce1eda3fd2f",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Then this virus thing happened and just after a week we moved in, they decided the whole department will be working remotely.",
                "createdAt": "2024-03-21T19:10:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "ffbbfdb4-0485-44aa-8521-5ce1eda3fd2f",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "And then we decided to move back our first location because, you know, everything was already setup so that's the third time.",
                "createdAt": "2024-03-21T19:10:55.386-06:00",
                "isMine": true
            },
            {
                "id": "415151b9-9ee9-40a4-a4ad-2d88146bc71b",
                "chatId": "ffbbfdb4-0485-44aa-8521-5ce1eda3fd2f",
                "contactId": "81fdc48c-5572-4123-8a73-71b7892120de",
                "value": "Ohh dude, I'm really sorry you had to go through all that in such a short period of time",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": false
            },
            {
                "id": "ea7662d5-7b72-4c19-ad6c-f80320541001",
                "chatId": "ffbbfdb4-0485-44aa-8521-5ce1eda3fd2f",
                "contactId": "81fdc48c-5572-4123-8a73-71b7892120de",
                "value": "😕",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3a2d3a0e-839b-46e7-86ae-ca0826ecda7c",
                "chatId": "ffbbfdb4-0485-44aa-8521-5ce1eda3fd2f",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Thanks, man! It was good catching up with you.",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "ffbbfdb4-0485-44aa-8521-5ce1eda3fd2f",
                "contactId": "81fdc48c-5572-4123-8a73-71b7892120de",
                "value": "Yeah dude. Hit me again next week so we can grab a coffee, remotely!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": false
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "ffbbfdb4-0485-44aa-8521-5ce1eda3fd2f",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": ":) Sure, man! See you next week!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "ffbbfdb4-0485-44aa-8521-5ce1eda3fd2f",
                "contactId": "81fdc48c-5572-4123-8a73-71b7892120de",
                "value": "See you later!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": false
            },
            {
                "id": "bab8ca0e-b8e5-4375-807b-1c91fca25a5d",
                "chatId": "ffbbfdb4-0485-44aa-8521-5ce1eda3fd2f",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Hey! Are you available right now? How about if we grab that coffee today? Remotely, of course :)",
                "createdAt": "2024-03-28T12:45:55.386-06:00",
                "isMine": true
            },
            {
                "id": "8445a84d-599d-4e2d-a31c-5f4f29ad2b4c",
                "chatId": "ffbbfdb4-0485-44aa-8521-5ce1eda3fd2f",
                "contactId": "81fdc48c-5572-4123-8a73-71b7892120de",
                "value": "Hi!",
                "createdAt": "2024-03-28T12:56:55.386-06:00",
                "isMine": false
            },
            {
                "id": "9f506742-50da-4350-af9d-61e53392fa08",
                "chatId": "ffbbfdb4-0485-44aa-8521-5ce1eda3fd2f",
                "contactId": "81fdc48c-5572-4123-8a73-71b7892120de",
                "value": "Sure thing! I'm gonna call you in 5, is it okay?",
                "createdAt": "2024-03-28T12:56:55.386-06:00",
                "isMine": false
            },
            {
                "id": "ca8523d8-faed-45f7-af09-f6bd5c3f3875",
                "chatId": "ffbbfdb4-0485-44aa-8521-5ce1eda3fd2f",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Awesome! Call me in 5 minutes..",
                "createdAt": "2024-03-28T12:58:55.386-06:00",
                "isMine": true
            },
            {
                "id": "39944b00-1ffe-4ffb-8ca6-13c292812e06",
                "chatId": "ffbbfdb4-0485-44aa-8521-5ce1eda3fd2f",
                "contactId": "81fdc48c-5572-4123-8a73-71b7892120de",
                "value": "👍🏻",
                "createdAt": "2024-03-28T13:00:55.386-06:00",
                "isMine": false
            }
        ]
    },
    {
        "id": "a477baea-df90-4e2f-b108-7791bcd50bc8",
        "contactId": "a9a9f382-e4c3-42fb-9fe9-65aa534732b5",
        "unreadCount": 0,
        "muted": false,
        "lastMessage": "See you tomorrow!",
        "lastMessageAt": "26/04/2021",
        "contact": {
            "id": "a9a9f382-e4c3-42fb-9fe9-65aa534732b5",
            "avatar": "assets/images/avatars/female-13.jpg",
            "name": "Francisca Perkins",
            "about": "Hi there! I'm using FuseChat.",
            "details": {
                "emails": [
                    {
                        "email": "franciscaperkins@mail.tv",
                        "label": "Personal"
                    },
                    {
                        "email": "perkins.francisca@overplex.com",
                        "label": "Work"
                    }
                ],
                "phoneNumbers": [
                    {
                        "country": "au",
                        "phoneNumber": "830 430 3437",
                        "label": "Mobile"
                    },
                    {
                        "country": "au",
                        "phoneNumber": "868 538 2886",
                        "label": "Work"
                    }
                ],
                "title": "Dental Laboratory Worker",
                "company": "Overplex",
                "birthday": "1966-08-14T12:00:00.000Z",
                "address": "733 Delmonico Place, Belvoir, Virginia, PO7102"
            },
            "attachments": {
                "media": [
                    "assets/images/cards/01-320x200.jpg",
                    "assets/images/cards/02-320x200.jpg",
                    "assets/images/cards/03-320x200.jpg",
                    "assets/images/cards/04-320x200.jpg",
                    "assets/images/cards/05-320x200.jpg",
                    "assets/images/cards/06-320x200.jpg",
                    "assets/images/cards/07-320x200.jpg",
                    "assets/images/cards/08-320x200.jpg"
                ],
                "docs": [],
                "links": []
            }
        },
        "messages": [
            {
                "id": "e6b2b82f-b199-4a60-9696-5f3e40d2715d",
                "chatId": "a477baea-df90-4e2f-b108-7791bcd50bc8",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Hi!",
                "createdAt": "2024-03-21T18:56:55.386-06:00",
                "isMine": true
            },
            {
                "id": "eb82cf4b-fa93-4bf4-a88a-99e987ddb7ea",
                "chatId": "a477baea-df90-4e2f-b108-7791bcd50bc8",
                "contactId": "a9a9f382-e4c3-42fb-9fe9-65aa534732b5",
                "value": "Hey, dude!",
                "createdAt": "2024-03-21T19:04:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3cf9b2a6-ae54-47db-97b2-ee139a8f84e5",
                "chatId": "a477baea-df90-4e2f-b108-7791bcd50bc8",
                "contactId": "a9a9f382-e4c3-42fb-9fe9-65aa534732b5",
                "value": "Long time no see.",
                "createdAt": "2024-03-21T19:04:55.386-06:00",
                "isMine": false
            },
            {
                "id": "2ab91b0f-fafb-45f3-88df-7efaff29134b",
                "chatId": "a477baea-df90-4e2f-b108-7791bcd50bc8",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Yeah, man... Things were quite busy for me and my family.",
                "createdAt": "2024-03-21T19:06:55.386-06:00",
                "isMine": true
            },
            {
                "id": "10e81481-378f-49ac-b06b-7c59dcc639ae",
                "chatId": "a477baea-df90-4e2f-b108-7791bcd50bc8",
                "contactId": "a9a9f382-e4c3-42fb-9fe9-65aa534732b5",
                "value": "What's up? Anything I can help with?",
                "createdAt": "2024-03-21T19:06:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3b334e72-6605-4ebd-a4f6-3850067048de",
                "chatId": "a477baea-df90-4e2f-b108-7791bcd50bc8",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "We've been on the move, changed 3 places over 4 months",
                "createdAt": "2024-03-21T19:07:55.386-06:00",
                "isMine": true
            },
            {
                "id": "25998113-3a96-4dd0-a7b9-4d2bb58db3f3",
                "chatId": "a477baea-df90-4e2f-b108-7791bcd50bc8",
                "contactId": "a9a9f382-e4c3-42fb-9fe9-65aa534732b5",
                "value": "Wow! That's crazy! 🤯 What happened?",
                "createdAt": "2024-03-21T19:07:55.386-06:00",
                "isMine": false
            },
            {
                "id": "30adb3da-0e4f-487e-aec2-6d9f31e097f6",
                "chatId": "a477baea-df90-4e2f-b108-7791bcd50bc8",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "You know I got a job in that big software company. First move was because of that.",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "c0d6fd6e-d294-4845-8751-e84b8f2c4d3b",
                "chatId": "a477baea-df90-4e2f-b108-7791bcd50bc8",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Then they decided to re-locate me after a month",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "8d3c442b-62fa-496f-bffa-210ff5c1866b",
                "chatId": "a477baea-df90-4e2f-b108-7791bcd50bc8",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Which was an absolute pain because we just set up everything, house, kids school and all that.",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "3cf26ef0-e81f-4698-ac39-487454413332",
                "chatId": "a477baea-df90-4e2f-b108-7791bcd50bc8",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "So we moved the second time.",
                "createdAt": "2024-03-21T19:09:55.386-06:00",
                "isMine": true
            },
            {
                "id": "415151b9-9ee9-40a4-a4ad-2d88146bc71b",
                "chatId": "a477baea-df90-4e2f-b108-7791bcd50bc8",
                "contactId": "a9a9f382-e4c3-42fb-9fe9-65aa534732b5",
                "value": "It's crazy!",
                "createdAt": "2024-03-21T19:09:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3a2d3a0e-839b-46e7-86ae-ca0826ecda7c",
                "chatId": "a477baea-df90-4e2f-b108-7791bcd50bc8",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Then this virus thing happened and just after a week we moved in, they decided the whole department will be working remotely.",
                "createdAt": "2024-03-21T19:10:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "a477baea-df90-4e2f-b108-7791bcd50bc8",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "And then we decided to move back our first location because, you know, everything was already setup so that's the third time.",
                "createdAt": "2024-03-21T19:10:55.386-06:00",
                "isMine": true
            },
            {
                "id": "415151b9-9ee9-40a4-a4ad-2d88146bc71b",
                "chatId": "a477baea-df90-4e2f-b108-7791bcd50bc8",
                "contactId": "a9a9f382-e4c3-42fb-9fe9-65aa534732b5",
                "value": "Ohh dude, I'm really sorry you had to go through all that in such a short period of time",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": false
            },
            {
                "id": "ea7662d5-7b72-4c19-ad6c-f80320541001",
                "chatId": "a477baea-df90-4e2f-b108-7791bcd50bc8",
                "contactId": "a9a9f382-e4c3-42fb-9fe9-65aa534732b5",
                "value": "😕",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3a2d3a0e-839b-46e7-86ae-ca0826ecda7c",
                "chatId": "a477baea-df90-4e2f-b108-7791bcd50bc8",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Thanks, man! It was good catching up with you.",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "a477baea-df90-4e2f-b108-7791bcd50bc8",
                "contactId": "a9a9f382-e4c3-42fb-9fe9-65aa534732b5",
                "value": "Yeah dude. Hit me again next week so we can grab a coffee, remotely!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": false
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "a477baea-df90-4e2f-b108-7791bcd50bc8",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": ":) Sure, man! See you next week!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "a477baea-df90-4e2f-b108-7791bcd50bc8",
                "contactId": "a9a9f382-e4c3-42fb-9fe9-65aa534732b5",
                "value": "See you later!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": false
            },
            {
                "id": "bab8ca0e-b8e5-4375-807b-1c91fca25a5d",
                "chatId": "a477baea-df90-4e2f-b108-7791bcd50bc8",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Hey! Are you available right now? How about if we grab that coffee today? Remotely, of course :)",
                "createdAt": "2024-03-28T12:45:55.386-06:00",
                "isMine": true
            },
            {
                "id": "8445a84d-599d-4e2d-a31c-5f4f29ad2b4c",
                "chatId": "a477baea-df90-4e2f-b108-7791bcd50bc8",
                "contactId": "a9a9f382-e4c3-42fb-9fe9-65aa534732b5",
                "value": "Hi!",
                "createdAt": "2024-03-28T12:56:55.386-06:00",
                "isMine": false
            },
            {
                "id": "9f506742-50da-4350-af9d-61e53392fa08",
                "chatId": "a477baea-df90-4e2f-b108-7791bcd50bc8",
                "contactId": "a9a9f382-e4c3-42fb-9fe9-65aa534732b5",
                "value": "Sure thing! I'm gonna call you in 5, is it okay?",
                "createdAt": "2024-03-28T12:56:55.386-06:00",
                "isMine": false
            },
            {
                "id": "ca8523d8-faed-45f7-af09-f6bd5c3f3875",
                "chatId": "a477baea-df90-4e2f-b108-7791bcd50bc8",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Awesome! Call me in 5 minutes..",
                "createdAt": "2024-03-28T12:58:55.386-06:00",
                "isMine": true
            },
            {
                "id": "39944b00-1ffe-4ffb-8ca6-13c292812e06",
                "chatId": "a477baea-df90-4e2f-b108-7791bcd50bc8",
                "contactId": "a9a9f382-e4c3-42fb-9fe9-65aa534732b5",
                "value": "👍🏻",
                "createdAt": "2024-03-28T13:00:55.386-06:00",
                "isMine": false
            }
        ]
    },
    {
        "id": "450840c8-aa0b-47a4-b6ca-b864ad9a3a88",
        "contactId": "7e8e1f1e-d19f-45c7-86bd-6fef599dae71",
        "unreadCount": 0,
        "muted": false,
        "lastMessage": "See you tomorrow!",
        "lastMessageAt": "26/04/2021",
        "contact": {
            "id": "7e8e1f1e-d19f-45c7-86bd-6fef599dae71",
            "avatar": "assets/images/avatars/female-16.jpg",
            "name": "Margo Witt",
            "about": "Hi there! I'm using FuseChat.",
            "details": {
                "emails": [
                    {
                        "email": "margowitt@mail.ca",
                        "label": "Personal"
                    },
                    {
                        "email": "witt.margo@norsul.org",
                        "label": "Work"
                    }
                ],
                "phoneNumbers": [
                    {
                        "country": "ao",
                        "phoneNumber": "992 596 3391",
                        "label": "Mobile"
                    },
                    {
                        "country": "ao",
                        "phoneNumber": "950 489 2505",
                        "label": "Work"
                    },
                    {
                        "country": "ao",
                        "phoneNumber": "891 540 2231",
                        "label": "Home"
                    }
                ],
                "title": "Television News Producer",
                "company": "Norsul",
                "birthday": "1975-08-31T12:00:00.000Z",
                "address": "539 Rockaway Avenue, Whitmer, Guam, PO4871"
            },
            "attachments": {
                "media": [
                    "assets/images/cards/01-320x200.jpg",
                    "assets/images/cards/02-320x200.jpg",
                    "assets/images/cards/03-320x200.jpg",
                    "assets/images/cards/04-320x200.jpg",
                    "assets/images/cards/05-320x200.jpg",
                    "assets/images/cards/06-320x200.jpg",
                    "assets/images/cards/07-320x200.jpg",
                    "assets/images/cards/08-320x200.jpg"
                ],
                "docs": [],
                "links": []
            }
        },
        "messages": [
            {
                "id": "e6b2b82f-b199-4a60-9696-5f3e40d2715d",
                "chatId": "450840c8-aa0b-47a4-b6ca-b864ad9a3a88",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Hi!",
                "createdAt": "2024-03-21T18:56:55.386-06:00",
                "isMine": true
            },
            {
                "id": "eb82cf4b-fa93-4bf4-a88a-99e987ddb7ea",
                "chatId": "450840c8-aa0b-47a4-b6ca-b864ad9a3a88",
                "contactId": "7e8e1f1e-d19f-45c7-86bd-6fef599dae71",
                "value": "Hey, dude!",
                "createdAt": "2024-03-21T19:04:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3cf9b2a6-ae54-47db-97b2-ee139a8f84e5",
                "chatId": "450840c8-aa0b-47a4-b6ca-b864ad9a3a88",
                "contactId": "7e8e1f1e-d19f-45c7-86bd-6fef599dae71",
                "value": "Long time no see.",
                "createdAt": "2024-03-21T19:04:55.386-06:00",
                "isMine": false
            },
            {
                "id": "2ab91b0f-fafb-45f3-88df-7efaff29134b",
                "chatId": "450840c8-aa0b-47a4-b6ca-b864ad9a3a88",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Yeah, man... Things were quite busy for me and my family.",
                "createdAt": "2024-03-21T19:06:55.386-06:00",
                "isMine": true
            },
            {
                "id": "10e81481-378f-49ac-b06b-7c59dcc639ae",
                "chatId": "450840c8-aa0b-47a4-b6ca-b864ad9a3a88",
                "contactId": "7e8e1f1e-d19f-45c7-86bd-6fef599dae71",
                "value": "What's up? Anything I can help with?",
                "createdAt": "2024-03-21T19:06:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3b334e72-6605-4ebd-a4f6-3850067048de",
                "chatId": "450840c8-aa0b-47a4-b6ca-b864ad9a3a88",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "We've been on the move, changed 3 places over 4 months",
                "createdAt": "2024-03-21T19:07:55.386-06:00",
                "isMine": true
            },
            {
                "id": "25998113-3a96-4dd0-a7b9-4d2bb58db3f3",
                "chatId": "450840c8-aa0b-47a4-b6ca-b864ad9a3a88",
                "contactId": "7e8e1f1e-d19f-45c7-86bd-6fef599dae71",
                "value": "Wow! That's crazy! 🤯 What happened?",
                "createdAt": "2024-03-21T19:07:55.386-06:00",
                "isMine": false
            },
            {
                "id": "30adb3da-0e4f-487e-aec2-6d9f31e097f6",
                "chatId": "450840c8-aa0b-47a4-b6ca-b864ad9a3a88",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "You know I got a job in that big software company. First move was because of that.",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "c0d6fd6e-d294-4845-8751-e84b8f2c4d3b",
                "chatId": "450840c8-aa0b-47a4-b6ca-b864ad9a3a88",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Then they decided to re-locate me after a month",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "8d3c442b-62fa-496f-bffa-210ff5c1866b",
                "chatId": "450840c8-aa0b-47a4-b6ca-b864ad9a3a88",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Which was an absolute pain because we just set up everything, house, kids school and all that.",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "3cf26ef0-e81f-4698-ac39-487454413332",
                "chatId": "450840c8-aa0b-47a4-b6ca-b864ad9a3a88",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "So we moved the second time.",
                "createdAt": "2024-03-21T19:09:55.386-06:00",
                "isMine": true
            },
            {
                "id": "415151b9-9ee9-40a4-a4ad-2d88146bc71b",
                "chatId": "450840c8-aa0b-47a4-b6ca-b864ad9a3a88",
                "contactId": "7e8e1f1e-d19f-45c7-86bd-6fef599dae71",
                "value": "It's crazy!",
                "createdAt": "2024-03-21T19:09:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3a2d3a0e-839b-46e7-86ae-ca0826ecda7c",
                "chatId": "450840c8-aa0b-47a4-b6ca-b864ad9a3a88",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Then this virus thing happened and just after a week we moved in, they decided the whole department will be working remotely.",
                "createdAt": "2024-03-21T19:10:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "450840c8-aa0b-47a4-b6ca-b864ad9a3a88",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "And then we decided to move back our first location because, you know, everything was already setup so that's the third time.",
                "createdAt": "2024-03-21T19:10:55.386-06:00",
                "isMine": true
            },
            {
                "id": "415151b9-9ee9-40a4-a4ad-2d88146bc71b",
                "chatId": "450840c8-aa0b-47a4-b6ca-b864ad9a3a88",
                "contactId": "7e8e1f1e-d19f-45c7-86bd-6fef599dae71",
                "value": "Ohh dude, I'm really sorry you had to go through all that in such a short period of time",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": false
            },
            {
                "id": "ea7662d5-7b72-4c19-ad6c-f80320541001",
                "chatId": "450840c8-aa0b-47a4-b6ca-b864ad9a3a88",
                "contactId": "7e8e1f1e-d19f-45c7-86bd-6fef599dae71",
                "value": "😕",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3a2d3a0e-839b-46e7-86ae-ca0826ecda7c",
                "chatId": "450840c8-aa0b-47a4-b6ca-b864ad9a3a88",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Thanks, man! It was good catching up with you.",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "450840c8-aa0b-47a4-b6ca-b864ad9a3a88",
                "contactId": "7e8e1f1e-d19f-45c7-86bd-6fef599dae71",
                "value": "Yeah dude. Hit me again next week so we can grab a coffee, remotely!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": false
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "450840c8-aa0b-47a4-b6ca-b864ad9a3a88",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": ":) Sure, man! See you next week!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "450840c8-aa0b-47a4-b6ca-b864ad9a3a88",
                "contactId": "7e8e1f1e-d19f-45c7-86bd-6fef599dae71",
                "value": "See you later!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": false
            },
            {
                "id": "bab8ca0e-b8e5-4375-807b-1c91fca25a5d",
                "chatId": "450840c8-aa0b-47a4-b6ca-b864ad9a3a88",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Hey! Are you available right now? How about if we grab that coffee today? Remotely, of course :)",
                "createdAt": "2024-03-28T12:45:55.386-06:00",
                "isMine": true
            },
            {
                "id": "8445a84d-599d-4e2d-a31c-5f4f29ad2b4c",
                "chatId": "450840c8-aa0b-47a4-b6ca-b864ad9a3a88",
                "contactId": "7e8e1f1e-d19f-45c7-86bd-6fef599dae71",
                "value": "Hi!",
                "createdAt": "2024-03-28T12:56:55.386-06:00",
                "isMine": false
            },
            {
                "id": "9f506742-50da-4350-af9d-61e53392fa08",
                "chatId": "450840c8-aa0b-47a4-b6ca-b864ad9a3a88",
                "contactId": "7e8e1f1e-d19f-45c7-86bd-6fef599dae71",
                "value": "Sure thing! I'm gonna call you in 5, is it okay?",
                "createdAt": "2024-03-28T12:56:55.386-06:00",
                "isMine": false
            },
            {
                "id": "ca8523d8-faed-45f7-af09-f6bd5c3f3875",
                "chatId": "450840c8-aa0b-47a4-b6ca-b864ad9a3a88",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Awesome! Call me in 5 minutes..",
                "createdAt": "2024-03-28T12:58:55.386-06:00",
                "isMine": true
            },
            {
                "id": "39944b00-1ffe-4ffb-8ca6-13c292812e06",
                "chatId": "450840c8-aa0b-47a4-b6ca-b864ad9a3a88",
                "contactId": "7e8e1f1e-d19f-45c7-86bd-6fef599dae71",
                "value": "👍🏻",
                "createdAt": "2024-03-28T13:00:55.386-06:00",
                "isMine": false
            }
        ]
    },
    {
        "id": "427270f0-841c-47f9-912c-3fd8139db5e6",
        "contactId": "8141dd08-3a6e-4770-912c-59d0ed06dde6",
        "unreadCount": 0,
        "muted": false,
        "lastMessage": "See you tomorrow!",
        "lastMessageAt": "26/04/2021",
        "contact": {
            "id": "8141dd08-3a6e-4770-912c-59d0ed06dde6",
            "avatar": null,
            "name": "Madeleine Fletcher",
            "about": "Hi there! I'm using FuseChat.",
            "details": {
                "emails": [
                    {
                        "email": "madeleinefletcher@mail.info",
                        "label": "Personal"
                    },
                    {
                        "email": "fletcher.madeleine@genmom.biz",
                        "label": "Work"
                    }
                ],
                "phoneNumbers": [
                    {
                        "country": "uy",
                        "phoneNumber": "898 554 3354",
                        "label": "Mobile"
                    }
                ],
                "title": "Fundraising Director",
                "company": "Genmom",
                "birthday": "1970-07-15T12:00:00.000Z",
                "address": "825 Cherry Street, Foscoe, Minnesota, PO7290"
            },
            "attachments": {
                "media": [
                    "assets/images/cards/01-320x200.jpg",
                    "assets/images/cards/02-320x200.jpg",
                    "assets/images/cards/03-320x200.jpg",
                    "assets/images/cards/04-320x200.jpg",
                    "assets/images/cards/05-320x200.jpg",
                    "assets/images/cards/06-320x200.jpg",
                    "assets/images/cards/07-320x200.jpg",
                    "assets/images/cards/08-320x200.jpg"
                ],
                "docs": [],
                "links": []
            }
        },
        "messages": [
            {
                "id": "e6b2b82f-b199-4a60-9696-5f3e40d2715d",
                "chatId": "427270f0-841c-47f9-912c-3fd8139db5e6",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Hi!",
                "createdAt": "2024-03-21T18:56:55.386-06:00",
                "isMine": true
            },
            {
                "id": "eb82cf4b-fa93-4bf4-a88a-99e987ddb7ea",
                "chatId": "427270f0-841c-47f9-912c-3fd8139db5e6",
                "contactId": "8141dd08-3a6e-4770-912c-59d0ed06dde6",
                "value": "Hey, dude!",
                "createdAt": "2024-03-21T19:04:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3cf9b2a6-ae54-47db-97b2-ee139a8f84e5",
                "chatId": "427270f0-841c-47f9-912c-3fd8139db5e6",
                "contactId": "8141dd08-3a6e-4770-912c-59d0ed06dde6",
                "value": "Long time no see.",
                "createdAt": "2024-03-21T19:04:55.386-06:00",
                "isMine": false
            },
            {
                "id": "2ab91b0f-fafb-45f3-88df-7efaff29134b",
                "chatId": "427270f0-841c-47f9-912c-3fd8139db5e6",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Yeah, man... Things were quite busy for me and my family.",
                "createdAt": "2024-03-21T19:06:55.386-06:00",
                "isMine": true
            },
            {
                "id": "10e81481-378f-49ac-b06b-7c59dcc639ae",
                "chatId": "427270f0-841c-47f9-912c-3fd8139db5e6",
                "contactId": "8141dd08-3a6e-4770-912c-59d0ed06dde6",
                "value": "What's up? Anything I can help with?",
                "createdAt": "2024-03-21T19:06:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3b334e72-6605-4ebd-a4f6-3850067048de",
                "chatId": "427270f0-841c-47f9-912c-3fd8139db5e6",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "We've been on the move, changed 3 places over 4 months",
                "createdAt": "2024-03-21T19:07:55.386-06:00",
                "isMine": true
            },
            {
                "id": "25998113-3a96-4dd0-a7b9-4d2bb58db3f3",
                "chatId": "427270f0-841c-47f9-912c-3fd8139db5e6",
                "contactId": "8141dd08-3a6e-4770-912c-59d0ed06dde6",
                "value": "Wow! That's crazy! 🤯 What happened?",
                "createdAt": "2024-03-21T19:07:55.386-06:00",
                "isMine": false
            },
            {
                "id": "30adb3da-0e4f-487e-aec2-6d9f31e097f6",
                "chatId": "427270f0-841c-47f9-912c-3fd8139db5e6",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "You know I got a job in that big software company. First move was because of that.",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "c0d6fd6e-d294-4845-8751-e84b8f2c4d3b",
                "chatId": "427270f0-841c-47f9-912c-3fd8139db5e6",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Then they decided to re-locate me after a month",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "8d3c442b-62fa-496f-bffa-210ff5c1866b",
                "chatId": "427270f0-841c-47f9-912c-3fd8139db5e6",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Which was an absolute pain because we just set up everything, house, kids school and all that.",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "3cf26ef0-e81f-4698-ac39-487454413332",
                "chatId": "427270f0-841c-47f9-912c-3fd8139db5e6",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "So we moved the second time.",
                "createdAt": "2024-03-21T19:09:55.386-06:00",
                "isMine": true
            },
            {
                "id": "415151b9-9ee9-40a4-a4ad-2d88146bc71b",
                "chatId": "427270f0-841c-47f9-912c-3fd8139db5e6",
                "contactId": "8141dd08-3a6e-4770-912c-59d0ed06dde6",
                "value": "It's crazy!",
                "createdAt": "2024-03-21T19:09:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3a2d3a0e-839b-46e7-86ae-ca0826ecda7c",
                "chatId": "427270f0-841c-47f9-912c-3fd8139db5e6",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Then this virus thing happened and just after a week we moved in, they decided the whole department will be working remotely.",
                "createdAt": "2024-03-21T19:10:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "427270f0-841c-47f9-912c-3fd8139db5e6",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "And then we decided to move back our first location because, you know, everything was already setup so that's the third time.",
                "createdAt": "2024-03-21T19:10:55.386-06:00",
                "isMine": true
            },
            {
                "id": "415151b9-9ee9-40a4-a4ad-2d88146bc71b",
                "chatId": "427270f0-841c-47f9-912c-3fd8139db5e6",
                "contactId": "8141dd08-3a6e-4770-912c-59d0ed06dde6",
                "value": "Ohh dude, I'm really sorry you had to go through all that in such a short period of time",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": false
            },
            {
                "id": "ea7662d5-7b72-4c19-ad6c-f80320541001",
                "chatId": "427270f0-841c-47f9-912c-3fd8139db5e6",
                "contactId": "8141dd08-3a6e-4770-912c-59d0ed06dde6",
                "value": "😕",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3a2d3a0e-839b-46e7-86ae-ca0826ecda7c",
                "chatId": "427270f0-841c-47f9-912c-3fd8139db5e6",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Thanks, man! It was good catching up with you.",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "427270f0-841c-47f9-912c-3fd8139db5e6",
                "contactId": "8141dd08-3a6e-4770-912c-59d0ed06dde6",
                "value": "Yeah dude. Hit me again next week so we can grab a coffee, remotely!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": false
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "427270f0-841c-47f9-912c-3fd8139db5e6",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": ":) Sure, man! See you next week!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "427270f0-841c-47f9-912c-3fd8139db5e6",
                "contactId": "8141dd08-3a6e-4770-912c-59d0ed06dde6",
                "value": "See you later!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": false
            },
            {
                "id": "bab8ca0e-b8e5-4375-807b-1c91fca25a5d",
                "chatId": "427270f0-841c-47f9-912c-3fd8139db5e6",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Hey! Are you available right now? How about if we grab that coffee today? Remotely, of course :)",
                "createdAt": "2024-03-28T12:45:55.386-06:00",
                "isMine": true
            },
            {
                "id": "8445a84d-599d-4e2d-a31c-5f4f29ad2b4c",
                "chatId": "427270f0-841c-47f9-912c-3fd8139db5e6",
                "contactId": "8141dd08-3a6e-4770-912c-59d0ed06dde6",
                "value": "Hi!",
                "createdAt": "2024-03-28T12:56:55.386-06:00",
                "isMine": false
            },
            {
                "id": "9f506742-50da-4350-af9d-61e53392fa08",
                "chatId": "427270f0-841c-47f9-912c-3fd8139db5e6",
                "contactId": "8141dd08-3a6e-4770-912c-59d0ed06dde6",
                "value": "Sure thing! I'm gonna call you in 5, is it okay?",
                "createdAt": "2024-03-28T12:56:55.386-06:00",
                "isMine": false
            },
            {
                "id": "ca8523d8-faed-45f7-af09-f6bd5c3f3875",
                "chatId": "427270f0-841c-47f9-912c-3fd8139db5e6",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Awesome! Call me in 5 minutes..",
                "createdAt": "2024-03-28T12:58:55.386-06:00",
                "isMine": true
            },
            {
                "id": "39944b00-1ffe-4ffb-8ca6-13c292812e06",
                "chatId": "427270f0-841c-47f9-912c-3fd8139db5e6",
                "contactId": "8141dd08-3a6e-4770-912c-59d0ed06dde6",
                "value": "👍🏻",
                "createdAt": "2024-03-28T13:00:55.386-06:00",
                "isMine": false
            }
        ]
    },
    {
        "id": "491b2918-e71e-4017-919e-0ba009afd003",
        "contactId": "114642a2-ccb7-4cb1-ad2b-5e9b6a0c1d2e",
        "unreadCount": 0,
        "muted": false,
        "lastMessage": "See you tomorrow!",
        "lastMessageAt": "26/04/2021",
        "contact": {
            "id": "114642a2-ccb7-4cb1-ad2b-5e9b6a0c1d2e",
            "avatar": "assets/images/avatars/male-09.jpg",
            "name": "Barber Johnson",
            "about": "Hi there! I'm using FuseChat.",
            "details": {
                "emails": [
                    {
                        "email": "barberjohnson@mail.org",
                        "label": "Personal"
                    }
                ],
                "phoneNumbers": [
                    {
                        "country": "az",
                        "phoneNumber": "928 567 2521",
                        "label": "Mobile"
                    },
                    {
                        "country": "az",
                        "phoneNumber": "898 515 2048",
                        "label": "Work"
                    },
                    {
                        "country": "az",
                        "phoneNumber": "935 495 3348",
                        "label": "Home"
                    }
                ],
                "title": "Talent Manager",
                "company": "Zounds",
                "birthday": "1967-03-02T12:00:00.000Z",
                "address": "386 Vernon Avenue, Dragoon, North Carolina, PO4559"
            },
            "attachments": {
                "media": [
                    "assets/images/cards/01-320x200.jpg",
                    "assets/images/cards/02-320x200.jpg",
                    "assets/images/cards/03-320x200.jpg",
                    "assets/images/cards/04-320x200.jpg",
                    "assets/images/cards/05-320x200.jpg",
                    "assets/images/cards/06-320x200.jpg",
                    "assets/images/cards/07-320x200.jpg",
                    "assets/images/cards/08-320x200.jpg"
                ],
                "docs": [],
                "links": []
            }
        },
        "messages": [
            {
                "id": "e6b2b82f-b199-4a60-9696-5f3e40d2715d",
                "chatId": "491b2918-e71e-4017-919e-0ba009afd003",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Hi!",
                "createdAt": "2024-03-21T18:56:55.386-06:00",
                "isMine": true
            },
            {
                "id": "eb82cf4b-fa93-4bf4-a88a-99e987ddb7ea",
                "chatId": "491b2918-e71e-4017-919e-0ba009afd003",
                "contactId": "114642a2-ccb7-4cb1-ad2b-5e9b6a0c1d2e",
                "value": "Hey, dude!",
                "createdAt": "2024-03-21T19:04:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3cf9b2a6-ae54-47db-97b2-ee139a8f84e5",
                "chatId": "491b2918-e71e-4017-919e-0ba009afd003",
                "contactId": "114642a2-ccb7-4cb1-ad2b-5e9b6a0c1d2e",
                "value": "Long time no see.",
                "createdAt": "2024-03-21T19:04:55.386-06:00",
                "isMine": false
            },
            {
                "id": "2ab91b0f-fafb-45f3-88df-7efaff29134b",
                "chatId": "491b2918-e71e-4017-919e-0ba009afd003",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Yeah, man... Things were quite busy for me and my family.",
                "createdAt": "2024-03-21T19:06:55.386-06:00",
                "isMine": true
            },
            {
                "id": "10e81481-378f-49ac-b06b-7c59dcc639ae",
                "chatId": "491b2918-e71e-4017-919e-0ba009afd003",
                "contactId": "114642a2-ccb7-4cb1-ad2b-5e9b6a0c1d2e",
                "value": "What's up? Anything I can help with?",
                "createdAt": "2024-03-21T19:06:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3b334e72-6605-4ebd-a4f6-3850067048de",
                "chatId": "491b2918-e71e-4017-919e-0ba009afd003",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "We've been on the move, changed 3 places over 4 months",
                "createdAt": "2024-03-21T19:07:55.386-06:00",
                "isMine": true
            },
            {
                "id": "25998113-3a96-4dd0-a7b9-4d2bb58db3f3",
                "chatId": "491b2918-e71e-4017-919e-0ba009afd003",
                "contactId": "114642a2-ccb7-4cb1-ad2b-5e9b6a0c1d2e",
                "value": "Wow! That's crazy! 🤯 What happened?",
                "createdAt": "2024-03-21T19:07:55.386-06:00",
                "isMine": false
            },
            {
                "id": "30adb3da-0e4f-487e-aec2-6d9f31e097f6",
                "chatId": "491b2918-e71e-4017-919e-0ba009afd003",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "You know I got a job in that big software company. First move was because of that.",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "c0d6fd6e-d294-4845-8751-e84b8f2c4d3b",
                "chatId": "491b2918-e71e-4017-919e-0ba009afd003",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Then they decided to re-locate me after a month",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "8d3c442b-62fa-496f-bffa-210ff5c1866b",
                "chatId": "491b2918-e71e-4017-919e-0ba009afd003",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Which was an absolute pain because we just set up everything, house, kids school and all that.",
                "createdAt": "2024-03-21T19:08:55.386-06:00",
                "isMine": true
            },
            {
                "id": "3cf26ef0-e81f-4698-ac39-487454413332",
                "chatId": "491b2918-e71e-4017-919e-0ba009afd003",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "So we moved the second time.",
                "createdAt": "2024-03-21T19:09:55.386-06:00",
                "isMine": true
            },
            {
                "id": "415151b9-9ee9-40a4-a4ad-2d88146bc71b",
                "chatId": "491b2918-e71e-4017-919e-0ba009afd003",
                "contactId": "114642a2-ccb7-4cb1-ad2b-5e9b6a0c1d2e",
                "value": "It's crazy!",
                "createdAt": "2024-03-21T19:09:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3a2d3a0e-839b-46e7-86ae-ca0826ecda7c",
                "chatId": "491b2918-e71e-4017-919e-0ba009afd003",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Then this virus thing happened and just after a week we moved in, they decided the whole department will be working remotely.",
                "createdAt": "2024-03-21T19:10:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "491b2918-e71e-4017-919e-0ba009afd003",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "And then we decided to move back our first location because, you know, everything was already setup so that's the third time.",
                "createdAt": "2024-03-21T19:10:55.386-06:00",
                "isMine": true
            },
            {
                "id": "415151b9-9ee9-40a4-a4ad-2d88146bc71b",
                "chatId": "491b2918-e71e-4017-919e-0ba009afd003",
                "contactId": "114642a2-ccb7-4cb1-ad2b-5e9b6a0c1d2e",
                "value": "Ohh dude, I'm really sorry you had to go through all that in such a short period of time",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": false
            },
            {
                "id": "ea7662d5-7b72-4c19-ad6c-f80320541001",
                "chatId": "491b2918-e71e-4017-919e-0ba009afd003",
                "contactId": "114642a2-ccb7-4cb1-ad2b-5e9b6a0c1d2e",
                "value": "😕",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": false
            },
            {
                "id": "3a2d3a0e-839b-46e7-86ae-ca0826ecda7c",
                "chatId": "491b2918-e71e-4017-919e-0ba009afd003",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Thanks, man! It was good catching up with you.",
                "createdAt": "2024-03-21T19:11:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "491b2918-e71e-4017-919e-0ba009afd003",
                "contactId": "114642a2-ccb7-4cb1-ad2b-5e9b6a0c1d2e",
                "value": "Yeah dude. Hit me again next week so we can grab a coffee, remotely!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": false
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "491b2918-e71e-4017-919e-0ba009afd003",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": ":) Sure, man! See you next week!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": true
            },
            {
                "id": "5329c20d-6754-47ec-af8c-660c72be3528",
                "chatId": "491b2918-e71e-4017-919e-0ba009afd003",
                "contactId": "114642a2-ccb7-4cb1-ad2b-5e9b6a0c1d2e",
                "value": "See you later!",
                "createdAt": "2024-03-21T19:12:55.386-06:00",
                "isMine": false
            },
            {
                "id": "bab8ca0e-b8e5-4375-807b-1c91fca25a5d",
                "chatId": "491b2918-e71e-4017-919e-0ba009afd003",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Hey! Are you available right now? How about if we grab that coffee today? Remotely, of course :)",
                "createdAt": "2024-03-28T12:45:55.386-06:00",
                "isMine": true
            },
            {
                "id": "8445a84d-599d-4e2d-a31c-5f4f29ad2b4c",
                "chatId": "491b2918-e71e-4017-919e-0ba009afd003",
                "contactId": "114642a2-ccb7-4cb1-ad2b-5e9b6a0c1d2e",
                "value": "Hi!",
                "createdAt": "2024-03-28T12:56:55.386-06:00",
                "isMine": false
            },
            {
                "id": "9f506742-50da-4350-af9d-61e53392fa08",
                "chatId": "491b2918-e71e-4017-919e-0ba009afd003",
                "contactId": "114642a2-ccb7-4cb1-ad2b-5e9b6a0c1d2e",
                "value": "Sure thing! I'm gonna call you in 5, is it okay?",
                "createdAt": "2024-03-28T12:56:55.386-06:00",
                "isMine": false
            },
            {
                "id": "ca8523d8-faed-45f7-af09-f6bd5c3f3875",
                "chatId": "491b2918-e71e-4017-919e-0ba009afd003",
                "contactId": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
                "value": "Awesome! Call me in 5 minutes..",
                "createdAt": "2024-03-28T12:58:55.386-06:00",
                "isMine": true
            },
            {
                "id": "39944b00-1ffe-4ffb-8ca6-13c292812e06",
                "chatId": "491b2918-e71e-4017-919e-0ba009afd003",
                "contactId": "114642a2-ccb7-4cb1-ad2b-5e9b6a0c1d2e",
                "value": "👍🏻",
                "createdAt": "2024-03-28T13:00:55.386-06:00",
                "isMine": false
            }
        ]
    }
    ]

    chats:any[] = []

    profile = {
    "id": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
    "name": "Brian Hughes",
    "email": "hughes.brian@company.com",
    "avatar": "assets/images/avatars/brian-hughes.jpg",
    "about": "Hi there! I'm using FuseChat."
    }

    constructor(
        private _chatService: ChatService,
        private _changeDetectorRef: ChangeDetectorRef,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this._chatService.chats$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((chats: Chat[]) => {
                //console.log('INFORMACIÓN DE CHATS: ', this.chats);
                this.getTawkChats();
                this._changeDetectorRef.markForCheck();
            });

        this._chatService.chat$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((chat: Chat) => {
                this.selectedChat = chat;
                this._changeDetectorRef.markForCheck();
            });
    }

    getTawkChats() {
        this._chatService.getTawktoChatList().subscribe({
            next: (data) => {
            console.log(data);
            if (data && Array.isArray(data) && data.length > 0) {
                this.chats = data;
                this.filteredChats = this.chats;
            } else {
                console.error('Data is empty or not in expected format.');
            }
            },
            error: (error) => console.error(error)
        });
    }

    filterChats(query: string): void {
        if ( !query ) {
            this.filteredChats = this.chats;
            return;
        }

        this.filteredChats = this.chats.filter(chat => chat.contact.name.toLowerCase().includes(query.toLowerCase()));
    }

    goConversations(id:string) {
        this.router.navigateByUrl(`/home/comunicaciones/tawk/${id}`)
    }

    openNewChat(): void {
        this.drawerComponent = 'new-chat';
        this.drawerOpened = true;
        this._changeDetectorRef.markForCheck();
    }

    openProfile(): void {
        this.drawerComponent = 'profile';
        this.drawerOpened = true;
        this._changeDetectorRef.markForCheck();
    }

    trackByFn(index: number, item: any) {
        return item.id || index;
    }

    ngOnDestroy(): void { 
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
        this._chatService.resetChat();
    }
}
