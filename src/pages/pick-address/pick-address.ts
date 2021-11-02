import { CartService } from "./../../services/domain/cart.service";
import { PedidoDTO } from "./../../models/pedido.dto";
import { ClienteService } from "./../../services/domain/cliente.service";
import { StorageService } from "./../../services/storage.service";
import { EnderecoDTO } from "./../../models/endereco.dto";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the PickAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-pick-address",
  templateUrl: "pick-address.html",
})
export class PickAddressPage {
  items: EnderecoDTO[];
  pedido: PedidoDTO;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    public cartService: CartService
  ) {}

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email).subscribe(
        (response) => {
          this.items = response["enderecos"];

          //Pega os produtos/itens que estão no carrinho de compras
          let cart = this.cartService.getCart();

          //irah preencher o pedido no formato criado na interface
          this.pedido = {
            cliente: { id: response["id"] },
            enderecoDeEntrega: null,
            pagamento: null,
            //no item usa um map para ter o retorno da maneira e formato desejado
            itens: cart.items.map((x) => {
              return {
                quantidade: x.quantidade,
                produto: { id: x.produto.id },
              };
            }),
          };
        },
        (error) => {
          if (error.status == 403) {
            this.navCtrl.setRoot("HomePage");
          }
        }
      );
    } else {
      this.navCtrl.setRoot("HomePage");
    }
  }

  nextPage(item: EnderecoDTO) {
    this.pedido.enderecoDeEntrega = { id: item.id };
    console.log(this.pedido);
  }
}
