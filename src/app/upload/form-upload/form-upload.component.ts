import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { FileUpload } from '../fileupload';

@Component({
  selector: 'form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})
export class FormUploadComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 };
  items  = [{ name: "archie", age:25 }, { name: "jake", age:25 }, { name: "richard", age:30 , manager:[{empl:"Jhon"}, {empl:"Dixy"}]}, { name: "poll", age:20 }];

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress);
  }

  uploadfromBlod() {
    let myBlob = new Blob([JSON.stringify(this.items)], {type: "application/json", endings: 'native'});
    var myFile = this.blobToFile(myBlob, "jsonfromblob.json");

    this.selectedFiles = undefined;
    this.currentFileUpload = new FileUpload(myFile);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress);
  }

  public blobToFile = (theBlob: Blob, fileName:string): File => {
    var b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    //Cast to a File() type
    return <File>theBlob;
}
}
