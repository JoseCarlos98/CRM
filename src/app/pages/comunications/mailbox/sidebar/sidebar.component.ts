import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FuseNavigationItem, FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { Subject, takeUntil } from 'rxjs';
import { MailFilter, MailFolder, MailLabel } from '../mailbox.types';
import { MailboxService } from '../mailbox.service';
import { labelColorDefs } from '../mailbox.constants';
import { MailboxComposeComponent } from '../compose/compose.component';

@Component({
    selector     : 'mailbox-sidebar',
    templateUrl  : './sidebar.component.html',
    styleUrls    : ['./sidebar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    imports      : [MatButtonModule, MatIconModule, FuseVerticalNavigationComponent],
})
export class MailboxSidebarComponent implements OnInit, OnDestroy
{
    filters: MailFilter[] = [
        {
            "id": "de1b41f6-6839-4f1b-9d2c-07e55f6f8f82",
            "title": "Starred",
            "slug": "starred",
            "icon": "heroicons_outline:star"
        },
        {
            "id": "71bba1ec-a90e-4a71-9932-4bab0a99aa1c",
            "title": "Important",
            "slug": "important",
            "icon": "heroicons_outline:exclamation-circle"
        }
    ]

    folders: MailFolder[];
    labels: MailLabel[];
    menuData: FuseNavigationItem[] = [];
    private _filtersMenuData: FuseNavigationItem[] = [];
    private _foldersMenuData: FuseNavigationItem[] = [];
    private _labelsMenuData: FuseNavigationItem[] = [];
    private _otherMenuData: FuseNavigationItem[] = [];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _mailboxService: MailboxService,
        private _matDialog: MatDialog,
        private _fuseNavigationService: FuseNavigationService,
    ) { }

    ngOnInit(): void {
        // this._mailboxService.filters$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((filters: MailFilter[]) =>
        //     {
        //         this.filters = filters;

                this._generateFiltersMenuLinks();
        //     });

        // this._mailboxService.folders$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((folders: MailFolder[]) =>
        //     {
        //         this.folders = folders;

        //         this._generateFoldersMenuLinks();

        //         this._updateNavigationBadge(folders);
        //     });

        // this._mailboxService.labels$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((labels: MailLabel[]) =>
        //     {
        //         this.labels = labels;

        //         this._generateLabelsMenuLinks();
        //     });

        // this._generateOtherMenuLinks();
    }

    openComposeDialog() {
        const dialogRef = this._matDialog.open(MailboxComposeComponent);

        dialogRef.afterClosed()
            .subscribe((result) =>
            {
                console.log('Compose dialog was closed!');
            });
    }

    private _generateFoldersMenuLinks() {
        this._foldersMenuData = [];

        this.folders.forEach((folder) => {
            const menuItem: FuseNavigationItem = {
                id   : folder.id,
                title: folder.title,
                type : 'basic',
                icon : folder.icon,
                link : '/apps/mailbox/' + folder.slug,
            };

            if ( folder.count && folder.count > 0 ) {
                menuItem['badge'] = {
                    title: folder.count + '',
                };
            }

            this._foldersMenuData.push(menuItem);
        });

        this._updateMenuData();
    }

    private _generateFiltersMenuLinks() {
        this._filtersMenuData = [];

        this.filters.forEach((filter) => {
            this._filtersMenuData.push({
                id   : filter.id,
                title: filter.title,
                type : 'basic',
                icon : filter.icon,
                link : '/apps/mailbox/filter/' + filter.slug,
            });
        });

        this._updateMenuData();
    }

    private _generateLabelsMenuLinks() {
        this._labelsMenuData = [];

        this.labels.forEach((label) => {
            this._labelsMenuData.push({
                id     : label.id,
                title  : label.title,
                type   : 'basic',
                icon   : 'heroicons_outline:tag',
                classes: {
                    icon: labelColorDefs[label.color].text,
                },
                link   : '/apps/mailbox/label/' + label.slug,
            });
        });

        this._updateMenuData();
    }
   
    private _generateOtherMenuLinks() {
        this._otherMenuData.push({
            title: 'Settings',
            type : 'basic',
            icon : 'heroicons_outline:cog-8-tooth',
            link : '/apps/mailbox/settings',
        });

        this._updateMenuData();
    }

    private _updateMenuData() {
        this.menuData = [
            {
                title   : 'ENTRADA',
                type    : 'group',
                children: [
                    {
                        id: "7c004a19-4506-48ef-93ab-f16381302e3b",
                        title: "Bandeja de entrada",
                        type: "basic",
                        icon: "heroicons_outline:inbox",
                        link: "/apps/mailbox/inbox",
                        badge: {
                            title: "5"
                        }
                    },
                    /*{
                        id: "7c004a19-4506-48ef-93ab-f16381302e3b",
                        title: "Enviados",
                        type: "basic",
                        icon: "heroicons_outline:paper-airplane",
                        link: "/apps/mailbox/inbox",
                        badge: {
                            title: "17"
                        }
                    },
                    {
                        id: "7c004a19-4506-48ef-93ab-f16381302e3b",
                        title: "Borradores",
                        type: "basic",
                        icon: "heroicons_outline:document",
                        link: "/apps/mailbox/inbox",
                        badge: {
                            title: "7"
                        }
                    },
                    {
                        id: "7c004a19-4506-48ef-93ab-f16381302e3b",
                        title: "Correo basura",
                        type: "basic",
                        icon: "heroicons_outline:exclamation-triangle",
                        link: "/apps/mailbox/inbox",
                        badge: {
                            title: "37"
                        }
                    },
                    {
                        id: "heroicons_outline:trash",
                        title: "Basura",
                        type: "basic",
                        icon: "heroicons_outline:inbox",
                        link: "/apps/mailbox/inbox",
                        badge: {
                            title: "1"
                        }
                    },*/
                ],
            },
        ];
    }

    private _updateNavigationBadge(folders: MailFolder[]) {
        const inboxFolder = this.folders.find(folder => folder.slug === 'inbox');

        const mainNavigationComponent = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>('mainNavigation');

        if ( mainNavigationComponent ) {
            const mainNavigation = mainNavigationComponent.navigation;
            const menuItem = this._fuseNavigationService.getItem('apps.mailbox', mainNavigation);
            menuItem.badge.title = inboxFolder.count + '';
            mainNavigationComponent.refresh();
        }
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
