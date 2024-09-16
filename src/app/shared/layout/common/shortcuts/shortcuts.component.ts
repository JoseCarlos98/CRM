import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'shortcuts',
  templateUrl: './shortcuts.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'shortcuts',
  standalone: true,
  styleUrls: ['./shortcuts.component.scss'],
  imports: [MatButtonModule, MatIconModule, NgIf, MatTooltipModule, NgFor, NgClass, NgTemplateOutlet, RouterLink, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule],
})
export class ShortcutsComponent implements OnDestroy {
  private onDestroy = new Subject<void>();

  @ViewChild('shortcutsOrigin') private _shortcutsOrigin: MatButton;
  @ViewChild('shortcutsPanel') private _shortcutsPanel: TemplateRef<any>;

  private _overlayRef: OverlayRef;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _viewContainerRef: ViewContainerRef,
    private _overlay: Overlay,
    private router: Router
  ) { }


  goUrl(type?: string) {
    const routeMappings = {
      'newProspect': '/home/dashboard/nueva-cotizacion-prospecto',
      'newClient': '/home/dashboard/nueva-cotizacion-cliente',
      'all': '/home/empresas/todos',
      'campaign': '/home/captacion/campanias',
      'users': '/home/admin/usuarios',
      'products': '/home/admin/productos'
    };
  
    const route = routeMappings[type];
    this.router.navigateByUrl(route);
    this._overlayRef.detach();
  }

  public openPanel(): void {
    if (!this._overlayRef) this._createOverlay();
    this._overlayRef.attach(new TemplatePortal(this._shortcutsPanel, this._viewContainerRef));
  }

  private _createOverlay(): void {
    this._overlayRef = this._overlay.create({
      hasBackdrop: true,
      backdropClass: 'fuse-backdrop-on-mobile',
      scrollStrategy: this._overlay.scrollStrategies.block(),
      positionStrategy: this._overlay.position()
        .flexibleConnectedTo(this._shortcutsOrigin._elementRef.nativeElement)
        .withLockedPosition(true)
        .withPush(true)
        .withPositions([
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
          },
          {
            originX: 'start',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'bottom',
          },
          {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'top',
          },
          {
            originX: 'end',
            originY: 'top',
            overlayX: 'end',
            overlayY: 'bottom',
          },
        ]),
    });

    this._overlayRef.backdropClick().subscribe(() => {
      this._overlayRef.detach();
    });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
