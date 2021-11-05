import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "./../../config/api.config";
import { PedidoDTO } from "./../../models/pedido.dto";

@Injectable()
export class PedidoService {
  constructor(public http: HttpClient) {}

  insert(obj: PedidoDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/pedidos`, obj, {
      observe: "response",
      //retorna tipo texto pq não retorna nada, se retorna JSON ele pode pensar que teria resposta e gera erro
      responseType: "text",
    });
  }
}
