import { StorageService } from "./../services/storage.service";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AlertController } from "ionic-angular";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    public storage: StorageService,
    public alertCtrl: AlertController
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).catch((error, caught) => {
      let errorObj = error;
      //verifica se o campo errorObj possui o "campo" erro, se tiver ele realmente deu erro e recebe ele
      if (errorObj.error) {
        errorObj = errorObj.error;
      }
      //verifica se o objeto passado é um JSON, só por garantia, normalmente ele retorna um JSON, mas pode acontecer de retornar uma string. A verificação será pelo status, se tiver ele é um JSON, caso contrário irá transformá-lo em um JSON
      if (!errorObj.status) {
        errorObj = JSON.parse(errorObj);
      }

      console.log("Erro detectado pelo interceptor: ");
      console.log(errorObj);

      switch (errorObj.status) {
        case 401:
          this.handle401();
          break;

        case 403:
          this.handle403();
          break;

        default:
          this.handleDefaultError(errorObj);
      }

      return Observable.throw(errorObj);
    }) as any;
  }

  handle403() {
    this.storage.setLocalUser(null);
  }

  handle401() {
    let alert = this.alertCtrl.create({
      title: "Erro 401: Falha de autenticação",
      message: "Email ou senha incorretos",
      enableBackdropDismiss: false,
      buttons: [{ text: "Ok" }],
    });
    alert.present();
  }

  handleDefaultError(errorObj) {
    let alert = this.alertCtrl.create({
      title: `Erro ${errorObj.status}: ${errorObj.error}`,
      message: errorObj.message,
      enableBackdropDismiss: false,
      buttons: [{ text: "Ok" }],
    });
    alert.present();
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
