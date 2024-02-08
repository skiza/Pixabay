import { Component } from '@angular/core';
import { ImagenService } from '../../services/imagen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrl: './listar-imagen.component.css'
})
export class ListarImagenComponent {

  termino:string
  subscripcion :Subscription
  imagenes: any[]
  loading = false
  imagenesPorPagina = 6
  pagina = 1
  totalPaginas = 0

  constructor(private _imagenService:ImagenService){
    this.termino=''
    this.imagenes=[]
    this.subscripcion = this._imagenService.getTerminoBusqueda().subscribe(
      {
        next:(data)=>{
          console.log("getTerminoBusqueda", data)
          this.termino = data
          this.pagina = 1
          this.obtenerImagenes()
        }
      }
    )
  }

  obtenerImagenes(){
    this.imagenes=[]
    this.loading = true
    this.totalPaginas = 0
    this._imagenService.getImagenes(this.termino,this.pagina).subscribe({
      next: (data) => {
        console.log(data)
        if(data.totalHits == 0){
          this._imagenService.setError(`Opsss.. no encontramos imagenes para ${this.termino}`)
          return
        } else{
          this.imagenes = data.hits
          this.totalPaginas = Math.ceil(data.totalHits / this.imagenesPorPagina)
        }       
      },
      error: (error)=>{
        this._imagenService.setError(`Opss.. ocurrio un error durante la búsqueda`)
        this.pagina = 1
      },
      complete: ()=>{
        this.loading = false
      }
    })
  }

  paginaAnterior(){
    if(this.pagina - 1 < 1){
      return
    }
    
    this.pagina = this.pagina - 1
    this.obtenerImagenes()
  }

  paginaSiguiente(){
    if(this.pagina + 1 > this.totalPaginas){
      return
    }

    this.pagina = this.pagina + 1
    
    this.obtenerImagenes()
  }

}
