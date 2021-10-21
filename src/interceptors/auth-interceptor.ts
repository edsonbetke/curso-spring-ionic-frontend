import { API_CONFIG } from "./../config/api.config";
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
export class AuthInterceptor implements HttpInterceptor {
  constructor(public storage: StorageService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let localUser = this.storage.getLocalUser();

    //pega o tamanho da url base
    let N = API_CONFIG.baseUrl.length;
    //pega o inicio da url da requisicao e compara com a url base
    let requestToAPI = req.url.substring(0, N) == API_CONFIG.baseUrl;

    if (localUser && requestToAPI) {
      //feito um clone da requisição
      const authReq = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + localUser.token),
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
