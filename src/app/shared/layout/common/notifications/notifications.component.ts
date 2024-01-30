import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { DatePipe, NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { NotificationsService } from 'app/shared/layout/common/notifications/notifications.service';
import { Notification } from 'app/shared/layout/common/notifications/notifications.types';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector       : 'notifications',
    templateUrl    : './notifications.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs       : 'notifications',
    standalone     : true,
    imports        : [MatButtonModule, NgIf, MatIconModule, MatTooltipModule, NgFor, NgClass, NgTemplateOutlet, RouterLink, DatePipe],
})
export class NotificationsComponent implements OnInit, OnDestroy
{
    @ViewChild('notificationsOrigin') private _notificationsOrigin: MatButton;
    @ViewChild('notificationsPanel') private _notificationsPanel: TemplateRef<any>;

    notifications = [
        {
            "id": "493190c9-5b61-4912-afe5-78c21f1044d7",
            "icon": "heroicons_mini:star",
            "title": "Lead aprobado",
            "description": "Aceptado.",
            "time": "Enero 29, 5:30pm",
            "read": false
        },
        {
            "id": "493190c9-5b61-4912-afe5-78c21f1044d7",
            "icon": "heroicons_mini:star",
            "title": "Prospecto aprobado",
            "description": "Aceptado.",
            "time": "Enero 29, 5:30pm",

            "read": false
        },
        {
            "id": "493190c9-5b61-4912-afe5-78c21f1044d7",
            "icon": "heroicons_mini:star",
            "title": "Cliente aprobado",
            "description": "Aceptado.",
            "time": "Enero 29, 5:30pm",

            "read": false
        },
    
      
    ]
    unreadCount: number = 0;
    private _overlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

   
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _notificationsService: NotificationsService,
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef,
    )
    {
    }

    ngOnInit(): void {
        this._notificationsService.notifications$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((notifications: Notification[]) => {
                this._calculateUnreadCount();
                this._changeDetectorRef.markForCheck();
            });
    }

  
    ngOnDestroy(): void{
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

        if ( this._overlayRef ) this._overlayRef.dispose();
    }

 
    openPanel(): void
    {
        if ( !this._notificationsPanel || !this._notificationsOrigin ) return;

        if ( !this._overlayRef )this._createOverlay();
        this._overlayRef.attach(new TemplatePortal(this._notificationsPanel, this._viewContainerRef));
    }

  
    closePanel(): void{
        this._overlayRef.detach();
    }

   
    markAllAsRead(): void {
        this._notificationsService.markAllAsRead().subscribe();
    }

 
    toggleRead(notification: Notification): void {
        notification.read = !notification.read;

        this._notificationsService.update(notification.id, notification).subscribe();
    }

    delete(notification: Notification): void {
        this._notificationsService.delete(notification.id).subscribe();
    }

    
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    private _createOverlay(): void {
        this._overlayRef = this._overlay.create({
            hasBackdrop     : true,
            backdropClass   : 'fuse-backdrop-on-mobile',
            scrollStrategy  : this._overlay.scrollStrategies.block(),
            positionStrategy: this._overlay.position()
                .flexibleConnectedTo(this._notificationsOrigin._elementRef.nativeElement)
                .withLockedPosition(true)
                .withPush(true)
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

        this._overlayRef.backdropClick().subscribe(() =>
        {
            this._overlayRef.detach();
        });
    }

    private _calculateUnreadCount(): void {
        let count = 0;

        if ( this.notifications && this.notifications.length ) count = this.notifications.filter(notification => !notification.read).length;

        this.unreadCount = count;
    }
}
