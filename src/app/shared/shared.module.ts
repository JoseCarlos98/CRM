import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShortcutsComponent } from './layout/common/shortcuts/shortcuts.component';

@NgModule({
	declarations: [],
	imports: [
		CommonModule, 
		MaterialModule, 
		FormsModule, 
		ReactiveFormsModule,
		ShortcutsComponent
	
	],
	exports: [],
})
export class SharedModule {}