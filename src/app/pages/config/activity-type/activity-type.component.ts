import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalnewActivityComponent } from './modalnew-activity/modalnew-activity.component';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-activity-type',
  templateUrl: './activity-type.component.html',
})
export class ActivityTypeComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public selectedOption: string = 'activity';
  public title: string = 'actividad';

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void { }

  onTabChange(event: MatTabChangeEvent): void {
    const option = event.tab.textLabel;

    if (option.includes('Actividad')) {
      this.selectedOption = 'activity';
      this.title = 'actividad'
    } else {
      this.selectedOption = 'subactivity';
      this.title = 'subactividad'
    }
  }

  newData(data = null) {
    this.dialog.open(ModalnewActivityComponent, {
      data: {
        info: data,
        type: this.selectedOption,
      },
      disableClose: true,
      width: '1000px',
      maxHeight: '428px',
      panelClass: 'custom-dialog',
    })
      .afterClosed()
      .subscribe((_) => { });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
