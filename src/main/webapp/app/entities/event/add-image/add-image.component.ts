import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventService } from '../event.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { IEvent } from 'app/shared/model/event.model';
import { ActivatedRoute } from '@angular/router';

export interface IAddImageForm {
  idEvent?: string;
  title?: string;
  file?: any;
}

export class AddImageForm {
  idEvent?: string;
  title?: string;
  file?: any;
}

@Component({
  selector: 'jhi-add-image',
  templateUrl: './add-image.component.html',
})
export class AddImageComponent implements OnInit {
  event?: IEvent;
  base64textString = '';
  isSaving = false;
  imageSrc?: string;
  titles: string[] = ['photo_big_1', 'photo_medium_2', 'photo_medium_3'];
  addImageForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required]),
  });

  constructor(private http: HttpClient, protected eventService: EventService, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ event }) => {
      this.event = event;
    });
  }

  get f(): any {
    return this.addImageForm.controls;
  }

  onFileChange(event: any): void {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;

        this.addImageForm.patchValue({
          fileSource: reader.result,
          idEvent: this.event?.id,
          title: this.addImageForm.get('title'),
        });
      };
    }
  }

  submit(): void {
    this.subscribeToSaveResponse(this.eventService.addImage(this.createFromForm()));
  }

  private createFromForm(): FormData {
    const formData = new FormData();
    formData.append('idEvent', this.event?.id as string);
    formData.append('title', this.addImageForm.get(['title'])!.value);
    // formData.append('file' ,this.imageSrc!);
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    formData.append('file', this.base64textString!);

    return formData;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEvent>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  previousState(): void {
    window.history.back();
  }

  handleFileSelect(evt: any): void {
    const files = evt.target.files;
    const file = files[0];

    if (files && file) {
      const reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      // reader.readAsDataURL(file);

      // this.imageSrc = reader.result as string;

      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt: any): void {
    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
  }
}
