import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IProduct} from "../../interfaces/IProduct";
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: []
})
export class ProductsComponent implements OnInit {
  public products: IProduct[] = [];
  public product: IProduct[] = [];
  public loading:boolean = false;
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
   this.getProducts()
  }
  public getProducts() {
    this.loading = true;
    this.http.get<IProduct[]>(environment.apiUrl + "/products").subscribe(response => {
      this.products = response;
      this.loading = false;
    });
  }
  public deleteProduct(id) {
    this.http.delete(environment.apiUrl + "/products/" + id)
      .subscribe(_ => {this.getProducts()});
  }

}

