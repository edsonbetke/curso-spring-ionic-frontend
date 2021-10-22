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

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(public storage: StorageService) {}

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
        case 403:
          this.handle403();
          break;
      }

      return Observable.throw(errorObj);
    }) as any;
  }

  handle403() {
    this.storage.setLocalUser(null);
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
