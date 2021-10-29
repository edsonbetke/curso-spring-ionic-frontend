import { ProdutoDTO } from "./../../models/produto.dto";
import { Cart } from "./../../models/cart";
import { StorageService } from "./../storage.service";
import { Injectable } from "@angular/core";

@Injectable()
export class CartService {
  constructor(public storage: StorageService) {}

  createOrClearCart(): Cart {
    let cart: Cart = { items: [] };
    this.storage.setCart(cart);
    return cart;
  }

  getCart(): Cart {
    let cart: Cart = this.storage.getCart();
    if (cart == null) {
      cart = this.createOrClearCart();
    }
    return cart;
  }

  addProduto(produto: ProdutoDTO): Cart {
    let cart = this.getCart();
    //position será para verificar se o produto já existe no cart
    let position = cart.items.findIndex((x) => x.produto.id == produto.id);
    //Se for -1 é pq ainda não existia e assim será adicionado nos itens do cart
    if (position == -1) {
      cart.items.push({ quantidade: 1, produto: produto });
    }
    this.storage.setCart(cart);
    return cart;
  }

  removeProduto(produto: ProdutoDTO): Cart {
    let cart = this.getCart();
    //position será para verificar a posição do produto informado
    let position = cart.items.findIndex((x) => x.produto.id == produto.id);
    //Se for -1 é encontrou ele e irá realizar a remocao
    if (position != -1) {
      cart.items.splice(position, 1);
    }
    this.storage.setCart(cart);
    return cart;
  }

  increaseQuantity(produto: ProdutoDTO): Cart {
    let cart = this.getCart();
    //position será para verificar a posição do produto informado
    let position = cart.items.findIndex((x) => x.produto.id == produto.id);
    //Se for -1 é encontrou ele e irá incrementar
    if (position != -1) {
      cart.items[position].quantidade++;
    }
    this.storage.setCart(cart);
    return cart;
  }

  decreaseQuantity(produto: ProdutoDTO): Cart {
    let cart = this.getCart();
    //position será para verificar a posição do produto informado
    let position = cart.items.findIndex((x) => x.produto.id == produto.id);
    //Se for -1 é encontrou ele e irá decrementar
    if (position != -1) {
      cart.items[position].quantidade--;
      if (cart.items[position].quantidade < 1) {
        cart = this.removeProduto(produto);
      }
    }
    this.storage.setCart(cart);
    return cart;
  }

  total(): number {
    let cart = this.getCart();
    let sum = 0;
    for (var i = 0; i < cart.items.length; i++) {
      sum += cart.items[i].produto.preco * cart.items[i].quantidade;
    }
    return sum;
  }
}
