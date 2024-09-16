import { Component, Inject, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

declare var $: any;
declare var Dropzone: any;

@Component({
  selector: 'app-modal-upload-document',
  templateUrl: './modal-upload-document.component.html',
  styleUrl: './modal-upload-document.component.scss'
})
export class ModalUploadDocumentComponent {
  
  @ViewChild('dropzoneContent') dropzoneContent: ElementRef;

  constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private dialogRef: MatDialogRef<any>,
	) {}

  ngOnInit(): void {
    this.loadScripts();
  }

  loadScripts(): void {
    const jqueryScript = document.createElement('script');
    jqueryScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
    jqueryScript.onload = () => {
      const dropzoneScript = document.createElement('script');
      dropzoneScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/dropzone/5.9.3/min/dropzone.min.js';
      dropzoneScript.onload = () => {
        this.initDropzone();
      };
      document.body.appendChild(dropzoneScript);
    };
    document.body.appendChild(jqueryScript);
  }

  initDropzone(): void {
    const myDropzone = new Dropzone("#my-dropzone", {
      url: "/upload",
      maxFilesize: 50,
      acceptedFiles: 'image/*',
      createImageThumbnails: true,
      autoProcessQueue: false
    });

    myDropzone.on("addedfile", (file: any) => {
      this.dropzoneContent.nativeElement.style.display = 'none';
      const imageElement = file.previewElement.querySelector('img');

      if (imageElement) {
          imageElement.style.width = '200px';
          imageElement.style.height = '150px';
      }
    });

    myDropzone.on("removedfile", () => {
      if (myDropzone.files.length === 0) {
        this.dropzoneContent.nativeElement.style.display = 'block';
      }
    });

  }

  closeModal() {
		this.dialogRef.close({
      close : true
    })
  }

}
