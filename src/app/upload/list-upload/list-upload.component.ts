import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';

import { UploadFileService } from '../upload-file.service';
import { FileUpload } from '../fileupload';

@Component({
  selector: 'list-upload',
  templateUrl: './list-upload.component.html',
  styleUrls: ['./list-upload.component.css']
})
export class ListUploadComponent implements OnInit {

  fileUploads: FileUpload[];

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
    // Use snapshotChanges().pipe(map()) to store the key
    this.uploadService.getFileUploads(6).snapshotChanges().pipe().subscribe(actionArray => {
      this.fileUploads = actionArray.map(item => { //console.log(JSON.stringify(item.payload.val().name));
        return { key: item.payload.key,
              ...item.payload.val()
        } as FileUpload;
      })
    });
  
  }
}
