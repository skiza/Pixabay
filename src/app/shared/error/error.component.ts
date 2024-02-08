import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from '../../services/imagen.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent implements OnDestroy{
  errorMessage:string
  mostrarError:boolean
  suscripcion:Subscription

  constructor(private _imagenService:ImagenService){
    this.errorMessage= ''
    this.mostrarError= false
    this.suscripcion = this._imagenService.getError().subscribe(
      {
        next: (data)=> {
          this.errorMessage = data
          this.mostratMensaje()
          
        }
      }
    )
  }
  
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe()
  }

  mostratMensaje(){
    this.mostrarError = true
    setTimeout(()=>{
      this.mostrarError = false
    }, 2000)
  }

}
