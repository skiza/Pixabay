import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  private error$ = new Subject<string>()
  private terminoBusqueda$ = new Subject<string>();

 
  constructor(private http:HttpClient) { }

  getTerminoBusqueda():Observable<string> {
    return this.terminoBusqueda$.asObservable();
  }
  setTerminoBusqueda(termino:string) {
    this.terminoBusqueda$.next(termino);
  }

  setError(message:string){
    this.error$.next(message)
  }
  getError():Observable<string>{
    return this.error$.asObservable()
  }

  getImagenes(termino:string, pagina:number):Observable<any>{
    const apiKey = '42019668-db3061e9d3f5738f855da53bb'
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${termino}&orientation=horizontal&page=${pagina}&per_page=6`

    return this.http.get(url)
  }


}
