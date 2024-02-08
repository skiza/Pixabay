import { Component } from '@angular/core';
import { ImagenService } from '../../services/imagen.service';

@Component({
  selector: 'app-buscar-imagen',
  templateUrl: './buscar-imagen.component.html',
  styleUrl: './buscar-imagen.component.css'
})
export class BuscarImagenComponent {
  nombreImagen:string

  constructor(private _imageService:ImagenService){
    this.nombreImagen = ''
  }

  buscarImagenes(){
    if (this.nombreImagen == ''){
      this._imageService.setError('Agregar un termino de busqueda')
      return
    }
    console.log('buscarImagenes', this.nombreImagen)

    this._imageService.setTerminoBusqueda(this.nombreImagen)
  }
}
