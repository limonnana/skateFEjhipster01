import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IPhoto } from 'app/shared/model/photo.model';
import { Observable } from 'rxjs';
import { ISpot } from 'app/shared/model/spot.model';
import { SpotService } from './spot.service';

@Component({
  selector: 'jhi-spot-detail',
  templateUrl: './spot-detail.component.html',
})
export class SpotDetailComponent implements OnInit {
  spot: ISpot | null = null;
  photos?: IPhoto[];
  base64textString?: string;
  photoBig1?: SafeResourceUrl;
  isPhotoBig1 = false;
  photoMedium2?: SafeResourceUrl;
  isPhotoMedium2 = false;
  photoMedium3?: SafeResourceUrl;
  isPhotoMedium3 = false;

  constructor(protected activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer, protected spotService: SpotService) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ spot }) => (this.spot = spot));
    this.photos = this.spot!.photos;
    this.getPhotoSrc();
  }

  previousState(): void {
    window.history.back();
  }

  delete(title: string): void {
    this.subscribeToSaveResponse(this.spotService.deleteImage(this.createForm(title)!));
  }

  private createForm(title: string): FormData {
    const formData = new FormData();
    formData.append('idSpot', this.spot?.id as string);
    formData.append('idImage', this.getPhotoIdFromArray(title)!);

    return formData;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISpot>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {}

  transform(src: string): SafeResourceUrl {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return this.sanitizer.bypassSecurityTrustResourceUrl(src!);
  }

  getPhotoSrcFromArray(title: string): string | undefined {
    const photoFromArray = this.photos?.find(photo => photo.title === title);
    const src = photoFromArray?.image;
    return src;
  }

  getPhotoIdFromArray(title: string): string | undefined {
    const photoFromArray = this.photos?.find(photo => photo.title === title);
    const src = photoFromArray?.id;
    return src;
  }

  protected getPhotoSrc(): void {
    let photo1 = this.getPhotoSrcFromArray('photo_big_1');
    let photo2 = this.getPhotoSrcFromArray('photo_medium_2');
    let photo3 = this.getPhotoSrcFromArray('photo_medium_3');

    if (photo1 !== undefined) {
      this.isPhotoBig1 = true;
      photo1 = 'data:image/png;base64,' + photo1;
      this.photoBig1 = this.transform(photo1);
    }
    if (photo2 !== undefined) {
      this.isPhotoMedium2 = true;
      photo2 = 'data:image/png;base64,' + photo2;
      this.photoMedium2 = this.transform(photo2);
    }
    if (photo3 !== undefined) {
      this.isPhotoMedium3 = true;
      photo3 = 'data:image/png;base64,' + photo3;
      this.photoMedium3 = this.transform(photo3);
    }
  }
}
