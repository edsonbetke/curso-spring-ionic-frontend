import { StorageService } from "./../storage.service";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "./../../models/cliente.dto";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "./../../config/api.config";

@Injectable()
export class ClienteService {
  constructor(public http: HttpClient, public storage: StorageService) {}

  findByEmail(email: string) {
    // com o interceptor não é necessario mais pegar o token e passar o headers

    return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
  }

  getImageFromBucket(id: string): Observable<any> {
    //busca a imagem no bucket pelo id
    let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
    return this.http.get(url, { responseType: "blob" });
  }

  insert(obj: ClienteDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/clientes`, obj, {
      observe: "response",
      responseType: "text",
    });
  }
}
