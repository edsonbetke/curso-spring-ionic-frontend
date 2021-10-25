import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-signup",
  templateUrl: "signup.html",
})
export class SignupPage {
  formGroup: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuider: FormBuilder
  ) {
    this.formGroup = this.formBuider.group({
      nome: [
        "Edson",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(120),
        ],
      ],
      email: ["etke@hotmail.com", [Validators.required, Validators.email]],
      tipo: ["1", [Validators.required]],
      cpfOuCnpj: [
        "57207325002",
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(14),
        ],
      ],
      senha: ["123456", [Validators.required]],
      logradouro: ["Condomínio", [Validators.required]],
      numero: ["20", [Validators.required]],
      complemento: ["conjunto 5", []],
      bairro: ["Parque Industrial", []],
      cep: ["71680348", [Validators.required]],
      telefone1: ["983755034", [Validators.required]],
      telefone2: ["", []],
      telefone3: ["", []],
      estadoId: [null, [Validators.required]],
      cidadeId: [null, [Validators.required]],
    });
  }

  signupUser() {
    console.log("enviou o form");
  }

  updateCidades() {
    console.log("Atualiza a cidade selecionada");
  }
}
