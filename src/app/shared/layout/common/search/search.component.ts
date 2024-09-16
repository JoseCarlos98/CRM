import { Overlay } from '@angular/cdk/overlay';
import { NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, EventEmitter, HostBinding, inject, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY, MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations/public-api';
import { CompaniesService } from 'app/pages/companies/companies.service';
import { debounceTime, filter, map, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    encapsulation: ViewEncapsulation.None,
    exportAs: 'fuseSearch',
    animations: fuseAnimations,
    standalone: true,
    imports: [NgIf, MatButtonModule, MatIconModule, FormsModule, MatAutocompleteModule, ReactiveFormsModule, MatOptionModule, NgFor, RouterLink, NgTemplateOutlet, MatFormFieldModule, MatInputModule, NgClass],
    providers: [
        {
            provide: MAT_AUTOCOMPLETE_SCROLL_STRATEGY,
            useFactory: () => {
                const overlay = inject(Overlay);
                return () => overlay.scrollStrategies.block();
            },
        },
    ],
})
export class SearchComponent implements OnChanges, AfterViewInit, OnInit, OnDestroy {
    private onDestroy = new Subject<void>();
    private _matAutocomplete: MatAutocomplete;

    @Input() appearance: 'basic' | 'bar' = 'basic';
    @Input() debounce: number = 300;
    @Input() minLength: number = 2;
    @Output() search: EventEmitter<any> = new EventEmitter<any>();

    opened: boolean = false;
    resultSets: any[];
    searchControl = new FormControl('')

    dummy :any[]= [
        {
            "id": "contacts",
            "label": "Contacts",
            "results": [
                {
                    "id": "ab4f712d-d712-41a8-b567-be4c66c349a3",
                    "avatar": "assets/images/avatars/female-13.jpg",
                    "background": "assets/images/cards/33-640x480.jpg",
                    "name": "Alyce Cash",
                    "emails": [
                        {
                            "email": "alycecash@mail.co.uk",
                            "label": "Personal"
                        }
                    ],
                    "phoneNumbers": [
                        {
                            "country": "ht",
                            "phoneNumber": "969 499 3077",
                            "label": "Mobile"
                        },
                        {
                            "country": "ht",
                            "phoneNumber": "907 513 2784",
                            "label": "Work"
                        }
                    ],
                    "title": "Weather Analyst",
                    "company": "Qnekt",
                    "birthday": "1973-12-19T12:00:00.000Z",
                    "address": "964 Henry Street, Eureka, Indiana, PO1035",
                    "notes": "<p>Non proident pariatur nostrud dolor incididunt occaecat amet officia sunt magna anim dolor labore culpa ut laborum id incididunt officia amet mollit anim ea proident laboris non incididunt incididunt sint.</p><p>Nulla minim consectetur nostrud magna anim irure consectetur labore cupidatat laborum reprehenderit et et adipisicing in qui elit ipsum reprehenderit esse nisi non ipsum exercitation sunt eu elit velit fugiat.</p>",
                    "tags": [
                        "c31e9e5d-e0cb-4574-a13f-8a6ee5ff8309"
                    ],
                    "link": "/apps/contacts/ab4f712d-d712-41a8-b567-be4c66c349a3",
                    "value": "Alyce Cash"
                },
                {
                    "id": "a1723c04-69fe-4573-a135-6645658afe76",
                    "avatar": null,
                    "background": null,
                    "name": "Vargas Gardner",
                    "emails": [
                        {
                            "email": "vargasgardner@mail.info",
                            "label": "Personal"
                        },
                        {
                            "email": "gardner.vargas@cosmosis.biz",
                            "label": "Work"
                        }
                    ],
                    "phoneNumbers": [
                        {
                            "country": "bi",
                            "phoneNumber": "855 456 2754",
                            "label": "Mobile"
                        }
                    ],
                    "title": "Bindery Machine Operator",
                    "company": "Cosmosis",
                    "birthday": "1979-10-21T12:00:00.000Z",
                    "address": "869 Seton Place, Chemung, Maine, PO8109",
                    "notes": "<p>Amet non anim ex ullamco pariatur ullamco laboris eiusmod ut magna nisi amet incididunt sunt anim nisi qui ut ex sunt adipisicing consequat deserunt qui mollit duis anim quis veniam.</p><p>Magna ut id duis qui ea proident quis officia lorem commodo et et proident dolore qui quis incididunt nulla incididunt ut aliqua veniam est adipisicing adipisicing reprehenderit ad velit incididunt.</p>",
                    "tags": [
                        "cbde2486-5033-4e09-838e-e901b108cd41"
                    ],
                    "link": "/apps/contacts/a1723c04-69fe-4573-a135-6645658afe76",
                    "value": "Vargas Gardner"
                }
            ]
        },
        {
            "id": "pages",
            "label": "Pages",
            "results": [
                {
                    "id": "apps.tasks",
                    "title": "Tasks",
                    "type": "basic",
                    "icon": "heroicons_outline:check-circle",
                    "link": "/apps/tasks",
                    "value": "Tasks"
                },
                {
                    "id": "pages.authentication.sign-in.classic",
                    "title": "Classic",
                    "type": "basic",
                    "link": "/pages/authentication/sign-in/classic",
                    "value": "Classic"
                },
                {
                    "id": "pages.authentication.sign-up.classic",
                    "title": "Classic",
                    "type": "basic",
                    "link": "/pages/authentication/sign-up/classic",
                    "value": "Classic"
                },
                {
                    "id": "pages.authentication.sign-out.classic",
                    "title": "Classic",
                    "type": "basic",
                    "link": "/pages/authentication/sign-out/classic",
                    "value": "Classic"
                },
                {
                    "id": "pages.authentication.forgot-password.classic",
                    "title": "Classic",
                    "type": "basic",
                    "link": "/pages/authentication/forgot-password/classic",
                    "value": "Classic"
                },
                {
                    "id": "pages.authentication.reset-password.classic",
                    "title": "Classic",
                    "type": "basic",
                    "link": "/pages/authentication/reset-password/classic",
                    "value": "Classic"
                },
                {
                    "id": "pages.authentication.unlock-session.classic",
                    "title": "Classic",
                    "type": "basic",
                    "link": "/pages/authentication/unlock-session/classic",
                    "value": "Classic"
                },
                {
                    "id": "pages.authentication.confirmation-required.classic",
                    "title": "Classic",
                    "type": "basic",
                    "link": "/pages/authentication/confirmation-required/classic",
                    "value": "Classic"
                },
                {
                    "id": "pages.coming-soon.classic",
                    "title": "Classic",
                    "type": "basic",
                    "link": "/pages/coming-soon/classic",
                    "value": "Classic"
                },
                {
                    "id": "navigation-features.active",
                    "title": "Active item",
                    "subtitle": "Manually marked as active",
                    "icon": "heroicons_outline:check-circle",
                    "type": "basic",
                    "active": true,
                    "value": "Active item"
                },
                {
                    "id": "navigation-features.disabled-basic",
                    "title": "Disabled basic",
                    "subtitle": "Some subtitle",
                    "icon": "heroicons_outline:check-circle",
                    "type": "basic",
                    "disabled": true,
                    "value": "Disabled basic"
                }
            ]
        },
        {
            "id": "tasks",
            "label": "Tasks",
            "results": [
                {
                    "id": "2e6971cd-49d5-49f1-8cbd-fba5c71e6062",
                    "type": "task",
                    "title": "Move dependency system to Yarn for easier package management",
                    "notes": "Id fugiat et cupidatat magna nulla nulla eu cillum officia nostrud dolore in veniam ullamco nulla ex duis est enim nisi aute ipsum velit et laboris est pariatur est culpa.\n\nCulpa sunt ipsum esse quis excepteur enim culpa est voluptate reprehenderit consequat duis officia irure voluptate veniam dolore fugiat dolor est amet nostrud non velit irure do voluptate id sit.",
                    "completed": false,
                    "dueDate": "2019-05-24T03:55:38.969Z",
                    "priority": 0,
                    "tags": [
                        "c6058d0d-a4b0-4453-986a-9d249ec230b1",
                        "2b884143-419a-45ca-a7f6-48f99f4e7798",
                        "91658b8a-f382-4b0c-a53f-e9390351c2c5"
                    ],
                    "assignedTo": "88a2a76c-0e6f-49da-b617-46d7c3b6e64d",
                    "subTasks": [
                        {
                            "id": "b9566b52-82cd-4d2a-b9b6-240c6b44e52b",
                            "title": "Nulla officia elit adipisicing",
                            "completed": false
                        },
                        {
                            "id": "76f4dc8d-4803-4d98-b461-367a1d3746a8",
                            "title": "Magna nisi ut aliquip aliquip amet deserunt",
                            "completed": false
                        }
                    ],
                    "order": 2,
                    "link": "/apps/tasks/2e6971cd-49d5-49f1-8cbd-fba5c71e6062",
                    "value": "Move dependency system to Yarn for easier package management"
                },
                {
                    "id": "974f93b8-336f-4eec-b011-9ddb412ee828",
                    "type": "task",
                    "title": "Fix permission issues that the 0.0.7-alpha.2 has introduced",
                    "notes": "Excepteur deserunt tempor do lorem elit id magna pariatur irure ullamco elit dolor consectetur ad officia fugiat incididunt do elit aute esse eu voluptate adipisicing incididunt ea dolor aliqua dolor.\n\nConsequat est quis deserunt voluptate ipsum incididunt laboris occaecat irure laborum voluptate non sit labore voluptate sunt id sint ut laboris aute cupidatat occaecat eiusmod non magna aliquip deserunt nisi.",
                    "completed": true,
                    "dueDate": null,
                    "priority": 2,
                    "tags": [
                        "a0bf42ca-c3a5-47be-8341-b9c0bb8ef270"
                    ],
                    "assignedTo": null,
                    "subTasks": [
                        {
                            "id": "8e9644dc-0815-4258-8a08-4ce8d9912ec0",
                            "title": "Adipisicing aliquip voluptate veniam",
                            "completed": false
                        },
                        {
                            "id": "fc0f2283-3802-4ebe-b164-774bc2b84549",
                            "title": "Magna amet adipisicing velit nisi est",
                            "completed": false
                        },
                        {
                            "id": "8a74b56f-14c0-4700-b737-8ccfa912f4b6",
                            "title": "Eiusmod dolore voluptate excepteur ipsum nostrud",
                            "completed": false
                        },
                        {
                            "id": "439ed5b7-156d-414a-ba20-ce779e3ec037",
                            "title": "Laborum adipisicing quis culpa amet",
                            "completed": true
                        }
                    ],
                    "order": 3,
                    "link": "/apps/tasks/974f93b8-336f-4eec-b011-9ddb412ee828",
                    "value": "Fix permission issues that the 0.0.7-alpha.2 has introduced"
                },
                {
                    "id": "f55c023a-785e-4f0f-b5b7-47da75224deb",
                    "type": "task",
                    "title": "Examine the package loss rates that the 0.0.7-alpha.1 has introduced",
                    "notes": "In exercitation sunt ad anim commodo sunt do in sunt est officia amet ex ullamco do nisi consectetur lorem proident lorem adipisicing incididunt consequat fugiat voluptate sint est anim officia.\n\nVelit sint aliquip elit culpa amet eu mollit veniam esse deserunt ex occaecat quis lorem minim occaecat culpa esse veniam enim duis excepteur ipsum esse ut ut velit cillum adipisicing.",
                    "completed": false,
                    "dueDate": "2022-06-05T19:41:12.501Z",
                    "priority": 2,
                    "tags": [],
                    "assignedTo": "7f5db993-ec36-412f-9db3-16d076a98807",
                    "subTasks": [
                        {
                            "id": "cdb08aa2-980d-48c6-b15c-7970775b7b5a",
                            "title": "Veniam magna minim duis",
                            "completed": true
                        },
                        {
                            "id": "dc19e213-687e-4391-8b61-9aabed2fb288",
                            "title": "Eu dolore et adipisicing commodo adipisicing consequat",
                            "completed": false
                        },
                        {
                            "id": "7e365400-59b9-4ec9-b397-8bf40de56ec4",
                            "title": "Do culpa quis consequat cupidatat",
                            "completed": true
                        },
                        {
                            "id": "1a0f98b0-dfc4-4ac9-b8f5-ce322da2a849",
                            "title": "Est duis do sunt esse magna ex",
                            "completed": true
                        }
                    ],
                    "order": 7,
                    "link": "/apps/tasks/f55c023a-785e-4f0f-b5b7-47da75224deb",
                    "value": "Examine the package loss rates that the 0.0.7-alpha.1 has introduced"
                },
                {
                    "id": "3ef176fa-6cba-4536-9f43-540c686a4faa",
                    "type": "task",
                    "title": "Pre-flight checks causes random crashes on logging service",
                    "notes": "Culpa duis nostrud qui velit sint magna officia fugiat ipsum eiusmod enim laborum pariatur anim culpa elit ipsum lorem pariatur exercitation laborum do labore cillum exercitation nisi reprehenderit exercitation quis.\n\nMollit aute dolor non elit et incididunt eiusmod non in commodo occaecat id in excepteur aliqua ea anim pariatur sint elit voluptate dolor eu non laborum laboris voluptate qui duis.",
                    "completed": false,
                    "dueDate": "2024-08-23T14:33:06.227Z",
                    "priority": 2,
                    "tags": [
                        "91658b8a-f382-4b0c-a53f-e9390351c2c5"
                    ],
                    "assignedTo": "271e6a06-0d37-433d-bc8d-607b12bcbed9",
                    "subTasks": [
                        {
                            "id": "35b06803-2019-4025-b642-841e44de7571",
                            "title": "Reprehenderit et eiusmod do consectetur ipsum",
                            "completed": false
                        },
                        {
                            "id": "7ec47bbc-e644-45ae-84e3-de36ee35a22b",
                            "title": "Officia lorem tempor occaecat fugiat elit elit",
                            "completed": false
                        },
                        {
                            "id": "b4560302-7bed-412c-8e43-a5ce0bce5eed",
                            "title": "Incididunt commodo amet fugiat nulla et",
                            "completed": false
                        },
                        {
                            "id": "494bfcac-44ee-46db-add2-0e5dbc3952c4",
                            "title": "Enim ipsum fugiat ipsum aute quis",
                            "completed": true
                        },
                        {
                            "id": "ffa45bc0-4466-4584-891a-0f75e39766c1",
                            "title": "Esse excepteur commodo ullamco",
                            "completed": true
                        }
                    ],
                    "order": 11,
                    "link": "/apps/tasks/3ef176fa-6cba-4536-9f43-540c686a4faa",
                    "value": "Pre-flight checks causes random crashes on logging service"
                },
                {
                    "id": "7bc6b7b4-7ad8-4cbe-af36-7301642d35fb",
                    "type": "task",
                    "title": "Increase the timeout amount to allow more retries on client side",
                    "notes": "Ea proident dolor tempor dolore incididunt velit incididunt ullamco quis proident consectetur magna excepteur cillum officia ex do aliqua reprehenderit est esse officia labore dolore aute laboris eu commodo aute.\n\nOfficia quis id ipsum adipisicing ipsum eu exercitation cillum ex elit pariatur adipisicing ullamco ullamco nulla dolore magna aliqua reprehenderit eu laborum voluptate reprehenderit non eiusmod deserunt velit magna do.",
                    "completed": true,
                    "dueDate": "2017-08-16T12:56:48.039Z",
                    "priority": 1,
                    "tags": [
                        "51483dd3-cb98-4400-9128-4bd66b455807",
                        "d3ef4226-ef2c-43b0-a986-3e3e07f32799",
                        "a0bf42ca-c3a5-47be-8341-b9c0bb8ef270"
                    ],
                    "assignedTo": "4d24cf48-a322-4d53-89cb-9140dfd5c6ba",
                    "subTasks": [
                        {
                            "id": "a72f756b-e1db-4492-96b9-93785400e8bb",
                            "title": "Amet eiusmod consequat non culpa",
                            "completed": false
                        },
                        {
                            "id": "07fb282a-141a-4014-96d2-030894a6e211",
                            "title": "Nulla laboris veniam qui et nostrud enim",
                            "completed": false
                        },
                        {
                            "id": "40629855-8ba8-4590-9ebe-2e2ff3f20820",
                            "title": "Est est nulla cillum aliquip duis ipsum",
                            "completed": true
                        },
                        {
                            "id": "96e283b2-cd3e-4ab9-9770-07247691304b",
                            "title": "Non elit tempor commodo enim laboris",
                            "completed": true
                        },
                        {
                            "id": "95c6a48a-4e42-4909-8c25-0fafd62aeefa",
                            "title": "Proident est anim do laborum nostrud",
                            "completed": false
                        }
                    ],
                    "order": 12,
                    "link": "/apps/tasks/7bc6b7b4-7ad8-4cbe-af36-7301642d35fb",
                    "value": "Increase the timeout amount to allow more retries on client side"
                },
                {
                    "id": "21c1b662-33c8-44d7-9530-91896afeeac7",
                    "type": "task",
                    "title": "Move dependency system to Yarn for easier package management",
                    "notes": "Duis culpa ut veniam voluptate consequat proident magna eiusmod id est magna culpa nulla enim culpa mollit velit lorem mollit ut minim dolore in tempor reprehenderit cillum occaecat proident ea.\n\nVeniam fugiat ea duis qui et eu eiusmod voluptate id cillum eiusmod eu reprehenderit minim reprehenderit nisi cillum nostrud duis eu magna minim sunt voluptate eu pariatur nulla ullamco elit.",
                    "completed": true,
                    "dueDate": "2020-08-08T16:32:24.768Z",
                    "priority": 1,
                    "tags": [],
                    "assignedTo": null,
                    "subTasks": [
                        {
                            "id": "e5fece14-cc26-40df-9319-23568cf89662",
                            "title": "Tempor qui eiusmod et",
                            "completed": false
                        },
                        {
                            "id": "30e6117d-e2a2-4f97-a674-19a554a94829",
                            "title": "Tempor magna eu dolore aliquip",
                            "completed": false
                        },
                        {
                            "id": "a5dd7270-1bc7-4b2b-abf0-9366eaca972d",
                            "title": "Lorem duis esse commodo",
                            "completed": false
                        },
                        {
                            "id": "40ffd839-046f-4272-9232-5391d62477f7",
                            "title": "Minim aute eu ut id",
                            "completed": false
                        }
                    ],
                    "order": 14,
                    "link": "/apps/tasks/21c1b662-33c8-44d7-9530-91896afeeac7",
                    "value": "Move dependency system to Yarn for easier package management"
                },
                {
                    "id": "5fa52c90-82be-41ae-96ec-5fc67cf054a4",
                    "type": "task",
                    "title": "Fix permission issues that the 0.0.7-alpha.2 has introduced",
                    "notes": "Mollit nostrud ea irure ex ipsum in cupidatat irure sit officia reprehenderit adipisicing et occaecat cupidatat exercitation mollit esse in excepteur qui elit exercitation velit fugiat exercitation est officia excepteur.\n\nQuis esse voluptate laborum non veniam duis est fugiat tempor culpa minim velit minim ut duis qui officia consectetur ex nostrud ut elit elit nulla in consectetur voluptate aliqua aliqua.",
                    "completed": false,
                    "dueDate": "2019-10-13T08:25:17.064Z",
                    "priority": 0,
                    "tags": [
                        "2b884143-419a-45ca-a7f6-48f99f4e7798"
                    ],
                    "assignedTo": "b2e97a96-2f15-4e3d-aff5-4ddf2af924d4",
                    "subTasks": [
                        {
                            "id": "2ef107fb-3c21-4801-861f-abaf4fd6def0",
                            "title": "Voluptate qui excepteur id in",
                            "completed": true
                        },
                        {
                            "id": "0afb4ebf-fcc7-47dc-8351-a88cb47c39ee",
                            "title": "Laborum ipsum aute nisi anim",
                            "completed": false
                        },
                        {
                            "id": "2f22bff2-72be-4ff5-b037-c3bf0f1d5637",
                            "title": "Amet duis velit sunt non",
                            "completed": false
                        }
                    ],
                    "order": 15,
                    "link": "/apps/tasks/5fa52c90-82be-41ae-96ec-5fc67cf054a4",
                    "value": "Fix permission issues that the 0.0.7-alpha.2 has introduced"
                },
                {
                    "id": "90a3ed58-e13b-40cf-9219-f933bf9c9b8f",
                    "type": "task",
                    "title": "Examine the package loss rates that the 0.0.7-alpha.1 has introduced",
                    "notes": "Consequat consectetur commodo deserunt sunt aliquip deserunt ex tempor esse nostrud sit dolore anim nostrud nulla dolore veniam minim laboris non dolor veniam lorem veniam deserunt laborum aute amet irure.\n\nEiusmod officia veniam reprehenderit ea aliquip velit anim aute minim aute nisi tempor qui sunt deserunt voluptate velit elit ut adipisicing ipsum et excepteur ipsum eu ullamco nisi esse dolor.",
                    "completed": false,
                    "dueDate": "2023-10-04T15:48:16.507Z",
                    "priority": 1,
                    "tags": [
                        "d3ef4226-ef2c-43b0-a986-3e3e07f32799"
                    ],
                    "assignedTo": null,
                    "subTasks": [
                        {
                            "id": "eaab24ed-cf9e-4ee7-b7ff-acd8f62f617a",
                            "title": "Eiusmod nulla enim laborum deserunt in",
                            "completed": false
                        },
                        {
                            "id": "700d067c-c5be-4532-95e3-ba575effae7c",
                            "title": "Sunt sint ea est commodo id",
                            "completed": false
                        }
                    ],
                    "order": 19,
                    "link": "/apps/tasks/90a3ed58-e13b-40cf-9219-f933bf9c9b8f",
                    "value": "Examine the package loss rates that the 0.0.7-alpha.1 has introduced"
                },
                {
                    "id": "4e7ce72f-863a-451f-9160-cbd4fbbc4c3d",
                    "type": "task",
                    "title": "Pre-flight checks causes random crashes on logging service",
                    "notes": "Exercitation sit eiusmod enim officia exercitation eiusmod sunt eiusmod excepteur ad commodo eiusmod qui proident quis aliquip excepteur sit cillum occaecat non dolore sit in labore ut duis esse duis.\n\nConsequat sunt voluptate consectetur dolor laborum enim nostrud deserunt incididunt sint veniam laboris sunt amet velit anim duis aliqua sunt aliqua aute qui nisi mollit qui irure ullamco aliquip laborum.",
                    "completed": true,
                    "dueDate": "2020-09-29T02:25:14.111Z",
                    "priority": 1,
                    "tags": [],
                    "assignedTo": "ef44b39b-3272-45f5-a15e-264c3b2d118e",
                    "subTasks": [
                        {
                            "id": "654c9b65-6f94-4ae7-bf11-27f979cc670e",
                            "title": "Esse exercitation cillum ex",
                            "completed": false
                        },
                        {
                            "id": "3c49aba9-1e83-471f-b8b8-21cc7d20292e",
                            "title": "Duis sunt commodo fugiat irure minim",
                            "completed": false
                        },
                        {
                            "id": "4fcb2e0b-677c-4915-978d-70e82b16745a",
                            "title": "Anim in qui ut",
                            "completed": false
                        },
                        {
                            "id": "dd864dea-61d2-4fb0-b433-286993b6ad08",
                            "title": "Reprehenderit irure exercitation occaecat",
                            "completed": true
                        }
                    ],
                    "order": 23,
                    "link": "/apps/tasks/4e7ce72f-863a-451f-9160-cbd4fbbc4c3d",
                    "value": "Pre-flight checks causes random crashes on logging service"
                },
                {
                    "id": "0795a74f-7a84-4edf-8d66-296cdef70003",
                    "type": "task",
                    "title": "Increase the timeout amount to allow more retries on client side",
                    "notes": "Minim commodo cillum do id qui irure aliqua laboris excepteur laboris magna enim est lorem consectetur tempor laboris proident proident eu irure dolor eiusmod in officia lorem quis laborum ullamco.\n\nQui excepteur ex sit esse dolore deserunt ullamco occaecat laboris fugiat cupidatat excepteur laboris amet dolore enim velit ipsum velit sint cupidatat consectetur cupidatat deserunt sit eu do ullamco quis.",
                    "completed": true,
                    "dueDate": "2019-03-09T02:34:29.592Z",
                    "priority": 2,
                    "tags": [
                        "c6058d0d-a4b0-4453-986a-9d249ec230b1",
                        "d3ef4226-ef2c-43b0-a986-3e3e07f32799"
                    ],
                    "assignedTo": "6617b0a3-0ccd-44ea-af78-c6633115d683",
                    "subTasks": [
                        {
                            "id": "56f3dccb-a72b-485c-94e7-fe68477023e2",
                            "title": "Velit velit voluptate in occaecat nostrud",
                            "completed": true
                        },
                        {
                            "id": "70cb77a9-82fa-407b-a63e-55aedc241495",
                            "title": "Minim anim velit eiusmod qui",
                            "completed": true
                        },
                        {
                            "id": "08a31dbc-6be4-469b-9ff4-0ed5342082bd",
                            "title": "Laboris commodo laborum irure",
                            "completed": false
                        },
                        {
                            "id": "34d6c603-6f5a-4bc4-9f94-12bfd940c3c7",
                            "title": "Mollit mollit nostrud mollit id velit ullamco",
                            "completed": true
                        }
                    ],
                    "order": 24,
                    "link": "/apps/tasks/0795a74f-7a84-4edf-8d66-296cdef70003",
                    "value": "Increase the timeout amount to allow more retries on client side"
                },
                {
                    "id": "b3917466-aa51-4293-9d5b-120b0ce6635c",
                    "type": "task",
                    "title": "Move dependency system to Yarn for easier package management",
                    "notes": "Ipsum officia mollit qui laboris sunt amet aliquip cupidatat minim non elit commodo eiusmod labore mollit pariatur aute reprehenderit ullamco occaecat enim pariatur aute amet occaecat incididunt irure ad ut.\n\nIncididunt cupidatat pariatur magna sint sit culpa ad cupidatat cillum exercitation consequat minim pariatur consectetur aliqua non adipisicing magna ad nulla ea do est nostrud eu aute id occaecat ut.",
                    "completed": false,
                    "dueDate": "2018-01-14T09:58:38.444Z",
                    "priority": 1,
                    "tags": [],
                    "assignedTo": "56a3e7ce-01da-43fc-ab9f-a8a39fa980de",
                    "subTasks": [
                        {
                            "id": "3a4c4013-27f1-4164-8a64-e7bb4f1a63a9",
                            "title": "Adipisicing excepteur mollit non sunt amet laboris",
                            "completed": false
                        },
                        {
                            "id": "103bf29e-06a1-4d30-89b9-b67aa442d605",
                            "title": "Consectetur voluptate anim labore aliqua elit",
                            "completed": false
                        },
                        {
                            "id": "b77729f1-9ed1-4d9e-95d0-347f4cd0943c",
                            "title": "Laboris occaecat aliquip esse magna nulla",
                            "completed": true
                        },
                        {
                            "id": "695aace7-8679-4b35-96c7-cf23737cd9f1",
                            "title": "Exercitation eu aliquip cillum ipsum",
                            "completed": false
                        },
                        {
                            "id": "ffd45f31-7f0a-4c6a-b62c-18148f6841db",
                            "title": "Minim aute ad et esse officia nostrud",
                            "completed": true
                        }
                    ],
                    "order": 26,
                    "link": "/apps/tasks/b3917466-aa51-4293-9d5b-120b0ce6635c",
                    "value": "Move dependency system to Yarn for easier package management"
                },
                {
                    "id": "2f2fb472-24d4-4a00-aa80-d513fa6c059c",
                    "type": "task",
                    "title": "Fix permission issues that the 0.0.7-alpha.2 has introduced",
                    "notes": "Dolor cupidatat do qui in tempor dolor magna magna ut dolor est aute veniam consectetur enim sunt sunt duis magna magna aliquip id reprehenderit dolor in veniam ullamco incididunt occaecat.\n\nId duis pariatur anim cillum est sint non veniam voluptate deserunt anim nostrud duis voluptate occaecat elit ut veniam voluptate do qui est ad velit irure sint lorem ullamco aliqua.",
                    "completed": true,
                    "dueDate": "2020-06-08T00:23:24.051Z",
                    "priority": 1,
                    "tags": [
                        "91658b8a-f382-4b0c-a53f-e9390351c2c5"
                    ],
                    "assignedTo": "65f1c421-83c5-4cdf-99da-d97794328679",
                    "subTasks": [
                        {
                            "id": "4028671b-ef75-4b76-a03f-9f2bddadc618",
                            "title": "Commodo excepteur proident ipsum reprehenderit",
                            "completed": true
                        },
                        {
                            "id": "b122168f-8327-408f-8b9c-498dd6ba6c81",
                            "title": "Mollit ullamco eiusmod exercitation deserunt",
                            "completed": false
                        },
                        {
                            "id": "f233d812-be56-4d8a-ab14-a083f7d7cd70",
                            "title": "Mollit nostrud ea deserunt mollit aliquip",
                            "completed": false
                        },
                        {
                            "id": "0833be70-82b2-46cb-ad84-f11120ea634a",
                            "title": "Labore occaecat proident ullamco",
                            "completed": false
                        }
                    ],
                    "order": 27,
                    "link": "/apps/tasks/2f2fb472-24d4-4a00-aa80-d513fa6c059c",
                    "value": "Fix permission issues that the 0.0.7-alpha.2 has introduced"
                }
            ]
        }
    ]

    constructor(
        private router: Router,
        private moduleCompaniesServices: CompaniesService
    ) { }

    @HostBinding('class') get classList(): any {
        return {
            'search-appearance-bar': this.appearance === 'bar',
            'search-appearance-basic': this.appearance === 'basic',
            'search-opened': this.opened,
        };
    }

    @ViewChild('barSearchInput')
    set barSearchInput(value: ElementRef) {
        if (value) {
            setTimeout(() => {
                value.nativeElement.focus();
            });
        }
    }

    @ViewChild('matAutocomplete')
    set matAutocomplete(value: MatAutocomplete) {
        this._matAutocomplete = value;
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.searchControl.valueChanges.pipe(
            takeUntil(this.onDestroy),
            debounceTime(500),
            map((value) => {
                if (!value || value.length < this.minLength) this.resultSets = null;
                return value;
            }),
            filter(value => value && value.length >= this.minLength),
        ).subscribe((content: string) => {
            this.moduleCompaniesServices.getDataCompanySearch(content).subscribe(({ data } : any) => {
                this.resultSets = data;
                this.search.next(data);
            })
        })
    }

    seeDataCompany(id: string) {
        this.router.navigateByUrl(`/home/empresas/detalles-empresa/${id}`);
        this.close()
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('appearance' in changes) this.close();
    }

    onKeydown(event: KeyboardEvent): void {
        if (event.code === 'Escape') if (this.appearance === 'bar' && !this._matAutocomplete.isOpen) this.close();
    }

    open(): void {
        if (this.opened)  return 
        this.opened = true;
    }

    close(): void {
        if (!this.opened) return;

        this.searchControl.setValue('');
        this.opened = false;
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    ngOnDestroy(): void {
        this.onDestroy.next();
        this.onDestroy.unsubscribe();
    }
}
