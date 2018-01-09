import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FileQueueObject, FileUploaderService } from './file-uploader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @Output() onCompleteItem = new EventEmitter();

  @ViewChild('fileInput') fileInput;

  queue: Observable<any[]>;

  constructor(public uploader: FileUploaderService) {
  }

  public ngOnInit() {
    this.queue = this.uploader.queue;
    this.uploader.onCompleteItem = this.completeItem;
  }

  public completeItem = (item: FileQueueObject, response: any) => {
    this.onCompleteItem.emit({item, response});
  };

  public addToQueue() {
    const fileBrowser = this.fileInput.nativeElement;
    this.uploader.addToQueue(fileBrowser.files);
  }
}
