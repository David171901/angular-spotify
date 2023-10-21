import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '../../services/track.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit, OnDestroy {
  tracksTrending: Array<TrackModel> = [];
  tracksRandom: Array<TrackModel> = [];

  listObservers$: Array<Subscription> = [];

  constructor(private _TrackService: TrackService) { }

  ngOnInit(): void {
    // const observer1$ = this._TrackService.dataTracksTrending$
    // .subscribe(response => {
    //   this.tracksTrending = response;
    //   this.tracksRandom = response;
    //   console.log("🚀 ~ file: tracks-page.component.ts:19 ~ TracksPageComponent ~ ngOnInit ~ response:", response)
    // })

    // const observer2$ = this._TrackService.dataTracksRandom$
    // .subscribe((response) => {
    //   this.tracksRandom = [...this.tracksRandom, ...response];
    // })

    // this.listObservers$ = [observer1$, observer2$]

    this.loadDataAll();
    this.loadDataRandom();
  }

  loadDataAll(): void {
    this._TrackService.getAllTracks$()
      .subscribe((response: TrackModel[]) => {
        this.tracksTrending = response
      })
  }

  loadDataRandom(): void {
    this._TrackService.getAllRandom$()
      .subscribe((response: TrackModel[]) => {
        this.tracksRandom = response
      }, 
      // err => {
      //   console.log("🚀 ~ file: tracks-page.component.ts:50 ~ TracksPageComponent ~ .subscribe ~ err:", err)
      // }
      )
  }

  ngOnDestroy(): void {
    // this.listObservers$.forEach(u => u.unsubscribe());
  }
}
