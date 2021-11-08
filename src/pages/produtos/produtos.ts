import { API_CONFIG } from "./../../config/api.config";
import { ProdutoService } from "./../../services/domain/produto.service";
import { ProdutoDTO } from "./../../models/produto.dto";
import { Component } from "@angular/core";
import {
  IonicPage,
  LoadingController,
  NavController,
  NavParams,
} from "ionic-angular";

/**
 * Generated class for the ProdutosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-produtos",
  templateUrl: "produtos.html",
})
export class ProdutosPage {
  items: ProdutoDTO[] = [];
  page: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let categoria_id = this.navParams.get("categoria_id");
    //faz a chamada do loading
    let loader = this.presentLoading();
    this.produtoService.findByCategoria(categoria_id, this.page, 10).subscribe(
      (response) => {
        let start = this.items.length;
        this.items = this.items.concat(response["content"]);
        let end = this.items.length - 1;
        console.log(this.page);
        console.log(this.items);
        //encerra a janela do loading
        loader.dismiss();
        this.loadImageUrls(start, end);
      },
      (error) => {
        loader.dismiss();
      }
    );
  }

  loadImageUrls(start: number, end: number) {
    for (var i = start; i < end; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id).subscribe(
        (response) => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        },
        (error) => {}
      );
    }
  }

  showDetail(produto_id: string) {
    this.navCtrl.push("ProdutoDetailPage", { produto_id: produto_id });
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde...",
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher) {
    //tem q zerar o page e fazer uma lista vazia no items para que não fique atualizando eles e deixe a pagina gigante
    this.page = 0;
    this.items = [];
    //recarrega os dados
    this.loadData();
    //Apos 1000 milisegundo fecha a janela
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }
}
