import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITrick } from 'app/shared/model/trick.model';

@Component({
  selector: 'jhi-trick-detail',
  templateUrl: './trick-detail.component.html',
})
export class TrickDetailComponent implements OnInit {
  trick: ITrick | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ trick }) => (this.trick = trick));
  }

  previousState(): void {
    window.history.back();
  }
}
