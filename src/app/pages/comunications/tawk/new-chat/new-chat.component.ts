import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Subject } from 'rxjs';

@Component({
    selector       : 'chat-new-chat',
    templateUrl    : './new-chat.component.html',
})
export class NewChatComponent implements OnInit, OnDestroy {
    @Input() drawer: MatDrawer;
    // contacts: any[] = [];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    contacts = [
        {
            "id": "22f18d47-ff8d-440e-888d-a1747c093052",
            "avatar": "assets/images/avatars/female-12.jpg",
            "name": "Alice Harding",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "7184be71-a28f-4f2b-8c45-15f78cf2f825",
            "avatar": "assets/images/avatars/female-05.jpg",
            "name": "Alissa Nelson",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "bedcb6a2-da83-4631-866a-77d10d239477",
            "avatar": "assets/images/avatars/male-04.jpg",
            "name": "Alvarado Turner",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "ab4f712d-d712-41a8-b567-be4c66c349a3",
            "avatar": "assets/images/avatars/female-13.jpg",
            "name": "Alyce Cash",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "5ac1f193-f150-45f9-bfe4-b7b4e1a83ff9",
            "avatar": "assets/images/avatars/female-06.jpg",
            "name": "Angela Gallagher",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "114642a2-ccb7-4cb1-ad2b-5e9b6a0c1d2e",
            "avatar": "assets/images/avatars/male-09.jpg",
            "name": "Barber Johnson",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "9d3f0e7f-dcbd-4e56-a5e8-87b8154e9edf",
            "avatar": "assets/images/avatars/male-02.jpg",
            "name": "Bernard Langley",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "77a4383b-b5a5-4943-bc46-04c3431d1566",
            "avatar": "assets/images/avatars/male-19.jpg",
            "name": "Best Blackburn",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "32c73a6a-67f2-48a9-b2a1-b23da83187bb",
            "avatar": null,
            "name": "Bolton Obrien",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "0a8bc517-631a-4a93-aacc-000fa2e8294c",
            "avatar": "assets/images/avatars/female-20.jpg",
            "name": "Candice Munoz",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "944764c0-b261-4428-9188-bbd3022d66a8",
            "avatar": "assets/images/avatars/female-16.jpg",
            "name": "Cathryn Snider",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "310ece7d-dbb0-45d6-9e69-14c24e50fe3d",
            "avatar": "assets/images/avatars/male-10.jpg",
            "name": "Cervantes Kramer",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "cdcc62e4-1520-4ccc-803d-52868c7e01ba",
            "avatar": "assets/images/avatars/female-04.jpg",
            "name": "Dee Alvarado",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "cd5fa417-b667-482d-b208-798d9da3213c",
            "avatar": "assets/images/avatars/male-01.jpg",
            "name": "Dejesus Michael",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "beec5287-ed50-4504-858a-5dc3f8ce6935",
            "avatar": null,
            "name": "Dena Molina",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "8bb0f597-673a-47ca-8c77-2f83219cb9af",
            "avatar": null,
            "name": "Duncan Carver",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "c674b6e1-b846-4bba-824b-0b4df0cdec48",
            "avatar": "assets/images/avatars/male-13.jpg",
            "name": "Duran Barr",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "81fdc48c-5572-4123-8a73-71b7892120de",
            "avatar": "assets/images/avatars/female-09.jpg",
            "name": "Earlene Rosales",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "bf172879-423a-4fd6-8df3-6d1938bbfe1f",
            "avatar": "assets/images/avatars/male-06.jpg",
            "name": "Edwards Mckenzie",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "abd9e78b-9e96-428f-b3ff-4d934c401bee",
            "avatar": "assets/images/avatars/female-04.jpg",
            "name": "Elsie Melendez",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "c500255a-1173-47d0-a0e4-4944d48fc12a",
            "avatar": "assets/images/avatars/male-10.jpg",
            "name": "English Haney",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "faf979c7-a13b-445a-b30a-08845f5fa90e",
            "avatar": "assets/images/avatars/female-18.jpg",
            "name": "Enid Sparks",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "2fb89a90-5622-4b5b-8df3-d49b85905392",
            "avatar": null,
            "name": "Estela Lyons",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "142abf21-e635-4a7d-9330-e57f66adcdbe",
            "avatar": "assets/images/avatars/female-12.jpg",
            "name": "Evangelina Mcclain",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "a9a9f382-e4c3-42fb-9fe9-65aa534732b5",
            "avatar": "assets/images/avatars/female-13.jpg",
            "name": "Francisca Perkins",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "e4f255a3-b5dd-45a7-975f-c399604a399a",
            "avatar": "assets/images/avatars/male-09.jpg",
            "name": "Herring Gonzales",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "f004ea79-98fc-436c-9ba5-6cfe32fe583d",
            "avatar": "assets/images/avatars/male-02.jpg",
            "name": "Holt Manning",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "995df091-d78a-4bb7-840c-ba6a7d14a1bd",
            "avatar": "assets/images/avatars/male-11.jpg",
            "name": "Hutchinson Levy",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "b7c355e9-e003-467e-82d2-4f6978c1a696",
            "avatar": "assets/images/avatars/female-09.jpg",
            "name": "Jacklyn Morgan",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "8b1befd2-66a7-4981-ae52-77f01b382d18",
            "avatar": "assets/images/avatars/female-03.jpg",
            "name": "Jeannette Stanton",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "844668c3-5e20-4fed-9e3a-7d274f696e61",
            "avatar": "assets/images/avatars/female-04.jpg",
            "name": "Johnnie Cleveland",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "d6462af2-c488-4de7-9b26-3845bd2983f9",
            "avatar": "assets/images/avatars/male-14.jpg",
            "name": "Johnston Riddle",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "b62359fd-f2a8-46e6-904e-31052d1cd675",
            "avatar": "assets/images/avatars/male-11.jpg",
            "name": "Joseph Strickland",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "19662ecf-0686-4aad-a46c-24b552eb2ff5",
            "avatar": "assets/images/avatars/female-15.jpg",
            "name": "Juana Morrow",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "6d80a6f6-2884-4ac4-9c73-06b82c220017",
            "avatar": "assets/images/avatars/female-06.jpg",
            "name": "Kristie Hall",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "5d067800-c301-46c6-a7f7-28dc89d9a554",
            "avatar": null,
            "name": "Kristine Pacheco",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "efae92cc-3bd1-4c6a-a395-b6760c69bd55",
            "avatar": "assets/images/avatars/male-07.jpg",
            "name": "Lamb Underwood",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "26dfe954-8bf3-45ee-b285-1d0a88c8d3ea",
            "avatar": "assets/images/avatars/male-13.jpg",
            "name": "Lara Gaines",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "00feeb63-c83a-4655-a37e-a07da10cfa1c",
            "avatar": "assets/images/avatars/female-11.jpg",
            "name": "Latonya Cruz",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "2012d4a5-19e4-444d-aaff-1d8b1d853650",
            "avatar": "assets/images/avatars/female-01.jpg",
            "name": "Laurel Parker",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "780d0111-5e5c-4694-8d1d-0ea421971fbf",
            "avatar": "assets/images/avatars/female-02.jpg",
            "name": "Laverne Dodson",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "cd482941-3eaf-4560-ac37-56a9296025df",
            "avatar": "assets/images/avatars/female-11.jpg",
            "name": "Liliana Ayala",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "07dd64eb-8b8f-4765-a16c-8db083c45096",
            "avatar": "assets/images/avatars/female-08.jpg",
            "name": "Lorraine Pennington",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "8141dd08-3a6e-4770-912c-59d0ed06dde6",
            "avatar": null,
            "name": "Madeleine Fletcher",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "66f9de1b-f842-4d4c-bb59-f97e91db0462",
            "avatar": "assets/images/avatars/male-05.jpg",
            "name": "Maldonado Rodriquez",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "f8bbf6be-d49a-41a3-bb80-3d51df84c12b",
            "avatar": "assets/images/avatars/female-10.jpg",
            "name": "Marcia Hatfield",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "7e8e1f1e-d19f-45c7-86bd-6fef599dae71",
            "avatar": "assets/images/avatars/female-16.jpg",
            "name": "Margo Witt",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "a7806ced-03f1-4197-8b30-00bdd463366b",
            "avatar": "assets/images/avatars/male-04.jpg",
            "name": "Marsh Cochran",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "b018c194-68ec-4915-ab56-e9f3bd2d98db",
            "avatar": "assets/images/avatars/female-08.jpg",
            "name": "Martha Swanson",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "c318e31f-1d74-49c5-8dae-2bc5805e2fdb",
            "avatar": "assets/images/avatars/male-01.jpg",
            "name": "Martin Richards",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "0630f1ca-cdb9-405d-b134-68f733334089",
            "avatar": "assets/images/avatars/female-14.jpg",
            "name": "Maryann Mcintyre",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "823e6166-c0c8-4373-9270-8a0d17489a08",
            "avatar": "assets/images/avatars/male-16.jpg",
            "name": "Mccall Day",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "42a5da95-5e6d-42fd-a09d-de755d123a47",
            "background": "assets/images/cards/16-640x480.jpg",
            "name": "Mclaughlin Steele",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "6519600a-5eaa-45f8-8bed-c46fddb3b26a",
            "background": "assets/images/cards/24-640x480.jpg",
            "name": "Mcleod Wagner",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "dcc673f6-de59-4715-94ed-8f64663d449b",
            "avatar": "assets/images/avatars/female-19.jpg",
            "name": "Megan Suarez",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "7585015c-ada2-4f88-998d-9646865d1ad2",
            "avatar": "assets/images/avatars/male-07.jpg",
            "name": "Meyer Roach",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "8b69fe2d-d7cc-4a3d-983d-559173e37d37",
            "background": "assets/images/cards/28-640x480.jpg",
            "name": "Misty Ramsey",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "f2b3c756-5ad2-4d4b-aee5-b32c91457128",
            "avatar": null,
            "name": "Mooney Cantrell",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "2bfa2be5-7688-48d5-b5ac-dc0d9ac97f14",
            "avatar": null,
            "name": "Nadia Mcknight",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "16b9e696-ea95-4dd8-86c4-3caf705a1dc6",
            "avatar": "assets/images/avatars/male-12.jpg",
            "name": "Nunez Faulkner",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "3e4ca731-d39b-4ad9-b6e0-f84e67f4b74a",
            "background": "assets/images/cards/26-640x480.jpg",
            "name": "Ofelia Ratliff",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "12148fa2-e0a4-49fb-b3c5-daeecdb5180a",
            "avatar": "assets/images/avatars/female-07.jpg",
            "name": "Olga Rhodes",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "325d508c-ca49-42bf-b0d5-c4a6b8da3d5c",
            "avatar": null,
            "name": "Oliver Head",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "f4ad15d9-5a24-463a-88ea-6189d6bb3a53",
            "avatar": "assets/images/avatars/male-05.jpg",
            "name": "Parrish Austin",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "fdc77706-6ba2-4397-b2f8-a9a0b6495153",
            "avatar": "assets/images/avatars/female-06.jpg",
            "name": "Rhea Landry",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "e2946946-b4b5-4fd7-bab4-62c38cdff2f1",
            "avatar": "assets/images/avatars/female-05.jpg",
            "name": "Samantha Jacobson",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "54b1c201-4b2b-4be0-ad70-a6413e9628cd",
            "avatar": "assets/images/avatars/female-17.jpg",
            "name": "Saundra Murphy",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "35190d23-036e-44ef-b545-cc744c626edd",
            "avatar": "assets/images/avatars/female-07.jpg",
            "name": "Shannon Kennedy",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "999c24f3-7bb8-4a01-85ca-2fca7863c57e",
            "avatar": "assets/images/avatars/female-15.jpg",
            "name": "Sharon Marshall",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "2c37ed00-427a-46d7-8f8f-d711c768d1ee",
            "avatar": "assets/images/avatars/male-17.jpg",
            "name": "Silva Foster",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "5a01e870-8be1-45a5-b58a-ec09c06e8f28",
            "avatar": "assets/images/avatars/female-05.jpg",
            "name": "Staci Hyde",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "bde636a7-c3d2-4bff-939a-aab11df1516b",
            "avatar": null,
            "name": "Tessa Valdez",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "b8258ccf-48b5-46a2-9c95-e0bd7580c645",
            "avatar": "assets/images/avatars/female-02.jpg",
            "name": "Tina Harris",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "cfa07b7c-93d1-42e7-9592-493d9efc78ae",
            "avatar": "assets/images/avatars/female-10.jpg",
            "name": "Tonya Bowers",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "012b8219-74bf-447c-af2c-66904d90a956",
            "avatar": "assets/images/avatars/female-02.jpg",
            "name": "Tracy Delacruz",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "9cb0ea57-3461-4182-979b-593b0c1ec6c3",
            "avatar": "assets/images/avatars/male-06.jpg",
            "name": "Tran Duke",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "1eaa3213-ece2-4ba6-8e15-eb36ca388f50",
            "avatar": "assets/images/avatars/female-03.jpg",
            "name": "Trudy Berg",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "a1723c04-69fe-4573-a135-6645658afe76",
            "avatar": null,
            "name": "Vargas Gardner",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "a4c9945a-757b-40b0-8942-d20e0543cabd",
            "avatar": "assets/images/avatars/female-01.jpg",
            "name": "Vickie Mosley",
            "about": "Hi there! I'm using FuseChat."
        },
        {
            "id": "0222b24b-c288-48d1-b356-0f087fa172f8",
            "avatar": null,
            "name": "Warren Gates",
            "about": "Hi there! I'm using FuseChat."
        }
    ]

    constructor() { }

    ngOnInit(): void {
        console.log('INFORMACIÓN DE NUEVO CHAT: ', this.contacts);
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
