import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { Observable, catchError, map, mergeMap, of } from 'rxjs';
import * as dataRaw from '../../../data/track.json'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private readonly URL = environment.api;

  // dataTracksTrending$: Observable<TrackModel[]> = of([]);
  // dataTracksRandom$: Observable<TrackModel[]> = of([]);

  constructor(private httpClient: HttpClient) {
    // const { data }: any = (dataRaw as any).default;
    // this.dataTracksTrending$ = of(data);
    // this.dataTracksRandom$ = new Observable((observer) => {

    //   const trackExample: TrackModel = {
    //     "_id": 1,
    //     "name": "Getting Over",
    //     "album": "One Love",
    //     "cover": "https://jenesaispop.com/wp-content/uploads/2009/09/guetta_onelove.jpg",
    //     "url": "http://localhost:3000/track.mp3"
    //   }
    //   setTimeout(() => {
    //     observer.next([trackExample])
    //   },3000)

    // })
  }

  private skipById(listTracks: TrackModel[], id: number): Promise<TrackModel[]> {
    return new Promise((resolve, reject) => {
      const listTmp = listTracks.filter(a => a._id !== id)
      resolve(listTmp)
    })
  }

  getAllTracks$(): Observable<any> {
    return this.httpClient.get(`${this.URL}/tracks`)
      .pipe(
        map(({ data }: any) => {
          return data
        })
      );
  }

  getAllRandom$(): Observable<any> {
    return this.httpClient.get(`${this.URL}/tracks`)
      .pipe(
        mergeMap(({ data }: any) => this.skipById(data,1)),
        catchError((err) => {
          console.log("🚀 ~ file: track.service.ts:58 ~ TrackService ~ catchError ~ err:", err)
          return of([])
        })
      );
  }
}
