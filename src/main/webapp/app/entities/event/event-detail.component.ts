import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEvent } from 'app/shared/model/event.model';
import { IPlayer } from 'app/shared/model/player.model';
import { ITrick } from 'app/shared/model/trick.model';
import { IPhoto } from 'app/shared/model/photo.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TrickService } from '../trick/trick.service';
import { EventService } from './event.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-event-detail',
  templateUrl: './event-detail.component.html',
})
export class EventDetailComponent implements OnInit {
  event: IEvent | null = null;
  tricks?: ITrick[];
  players?: IPlayer[];
  photos?: IPhoto[];
  base64textString?: string;
  photoBig1?: SafeResourceUrl;
  isPhotoBig1 = false;
  photoMedium2?: SafeResourceUrl;
  isPhotoMedium2 = false;
  photoMedium3?: SafeResourceUrl;
  isPhotoMedium3 = false;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected trickService: TrickService,
    private sanitizer: DomSanitizer,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ event }) => {
      this.event = event;
      this.tricks = event.tricks;
      this.players = event.players;
      this.photos = event.photos;
      this.getPhotoSrc();
    });
  }

  trackId(index: number, item: ITrick): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  trackPlayerId(index: number, item: IPlayer): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  previousState(): void {
    window.history.back();
  }

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

  delete(title: string): void {
    this.subscribeToSaveResponse(this.eventService.deleteImage(this.createForm(title)!));
  }

  private createForm(title: string): FormData {
    const formData = new FormData();
    formData.append('idEvent', this.event?.id as string);
    formData.append('idImage', this.getPhotoIdFromArray(title)!);

    return formData;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEvent>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {}

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
