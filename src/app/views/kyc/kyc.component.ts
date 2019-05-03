import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { KycService } from '../../services/kyc.service';
import { HttpService } from '../../services/http.service';
import { FileService } from '../../services/file.service';
import { environment } from '../../../environments/environment';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { saveAs } from 'file-saver/FileSaver';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.css']
})
export class KycComponent implements OnInit, OnDestroy {
  @Input() typeList = [];
  issueDate;
  expiryDate;
  newDocType = null;
  selected = 'pan';
  documentsHolder = [];
  typeHolder = {};
  finalValue = null;

  public uploader: FileUploader = new FileUploader({url: environment.services.document.upload.url, itemAlias: 'photo'});
  userData = {
    pan: '',
    name: '',
    email: '',
    address: '',
    phone: '',
    documents: []
  };
  buttonName: String = 'Continue';
  stage;
  authorizedRep;
  viewActive;
  constructor(private kycService: KycService, private httpService: HttpService, private fileservice: FileService) {
    kycService.stage$.subscribe(stage => {
      this.stage = stage;
    });
    kycService.authorizedRep$.subscribe(rep => {
      this.authorizedRep = rep;
    });
    kycService.viewActive$.subscribe(active => {
      this.viewActive = active;
    });
   }

   getfileTypes() {
    this.httpService.callApi('POST', environment.services.document.uniqueType.url, null)
      .subscribe(res => {
        this.typeList = res.types;
      },
      err => {
        if (err.error['success'] === false) {
          // console.log('updating stage', this.stage);
        } else {
          console.log('Error Occured');
        }
      });
   }

   downloadFile(filename) {
    //  console.log(filename);
    //  console.log(`http://localhost:8001/document/download?f=${filename}`);
    //  console.log('hitting');
     const url = `${environment.services.document.download.url}${filename}`;
    // saveAs(`http://localhost:8001/document/download?f=${filename}`, `${filename}`);
    this.fileservice.downloadReport(url).subscribe(
      data => {
        // console.log('reaching just before save');
        saveAs(data, filename);
      },
      err => {
        alert('Problem while downloading the file');
        console.error(err);
      }
    );
   }
  processDocumentList() {
    this.typeHolder = {};
    if (this.documentsHolder) {
      this.documentsHolder.forEach((filename) => {
        if (!(this.typeHolder[filename.type])) {
          this.typeHolder[filename.type] = [filename];
        } else {
          this.typeHolder[filename.type].push(filename);
        }
      });
    }
  }

  panPressed() {
    if (this.stage === 1) {
      this.buttonPressed();
    }
  }
  typePressed() {
    console.log(this.newDocType);
    this.finalValue = this.newDocType;
  }
  buttonPressed() {
    if (this.stage === 1) {
      // check logic TODO
      this.userData.pan = this.userData.pan.toUpperCase();
      this.buttonName = 'Create Customer';
      this.httpService.callApi(environment.services.profile.resources.read.method,
      environment.url + ':' + environment.services.profile.port + '/' +
      environment.services.profile.resources.read.endpoint, {pan: this.userData.pan})
      .subscribe(res => {
        if (res['success'] === true) {
          this.kycService.updateStage(3);
          delete res['profile']._id;
          delete res['profile'].__v;
          this.userData = res['profile'];
          this.buttonName = 'Save';
          this.documentsHolder = res['profile']['documents'];
          this.processDocumentList();
        } else {
          this.kycService.updateStage(2);
          // console.log('updating stage', this.stage);
        }
      },
      err => {
        console.log(err)
        if (err.error['success'] === false) {
        this.kycService.updateStage(2);
          // console.log('updating stage', this.stage);
        } else {
          console.log('Error Occured');
        }
        
      });
    } else if (this.stage === 2) {
      //TODO Save profile
      this.httpService.callApi(environment.services.profile.resources.create.method,
        environment.url + ':' + environment.services.profile.port + '/' +
        environment.services.profile.resources.create.endpoint, this.userData)
        .subscribe(res => {
          if (res['success'] === true) {
            this.kycService.updateStage(3);
            // this.userData = res['profile'];
          }
        },
        err => {
          console.log('Error Occured');
        });
      this.kycService.updateStage(3);
      this.buttonName = 'Save';
    } else if (this.stage === 3) {
      //TODO Save profile
      this.httpService.callApi(environment.services.profile.resources.update.method,
        environment.url + ':' + environment.services.profile.port + '/' +
        environment.services.profile.resources.update.endpoint, this.userData)
        .subscribe(res => {
          if (res['success'] === true) {
            delete res['profile']._id;
            delete res['profile'].__v;
            this.userData = res['profile'];
          }
        },
        err => {
          console.log('Error Occured');
        });
      this.buttonName = 'Save';
      }
  }

  ngOnDestroy() {
    this.kycService.resetAll();
  }
  ngOnInit() {
    this.kycService.initAll();
    this.getfileTypes();
    // console.log('stage', this.stage);
    // console.log('authrep', this.authorizedRep);
    // console.log('viewActive', this.viewActive);
    // this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
    //   form.append('type', this.fileType); //note comma separating key and value
    //   form.append('name', `test`);
    //  };

    // this.uploader.authToken = `${localStorage.getItem('token')}`;
    // this.uploader.options.additionalParameter = {
    // 'fileType': this.selected,
    // 'pan': this.userData.pan,
    // };
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    // this.uploader.onAfterAddingFile = (file) => {
    //   this.uploader.options.additionalParameter = {
    //         'fileType': this.selected,
    //         'pan': this.userData.pan,
    //     };
    // };
    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      if (!this.finalValue) {
        this.finalValue = this.selected;
      }
      console.log('iss', this.issueDate);
      console.log('ex', this.expiryDate);
      form.append('filetype', this.finalValue); //note comma separating key and value
      form.append('pan', this.userData.pan);
      this.finalValue = null;
     };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        // console.log('ImageUpload:uploaded:', item, status, response);
        this.httpService.callApi(environment.services.profile.resources.read.method,
          environment.url + ':' + environment.services.profile.port + '/' +
          environment.services.profile.resources.read.endpoint, {pan: this.userData.pan})
          .subscribe(res => {
            if (res['success'] === true) {
              this.documentsHolder = res['profile']['documents'];
              this.processDocumentList();
            }
            },
            err => {
              console.log('Could not refresh the document list');
            });
        alert('File uploaded successfully');
    };
  }

}
