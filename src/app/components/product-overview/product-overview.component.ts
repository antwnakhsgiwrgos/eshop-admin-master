import { Component, OnInit } from '@angular/core';
import {IProduct} from '../../interfaces/IProduct';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss']
})
export class ProductOverviewComponent implements OnInit {
  public product: IProduct[] = [];
  public loading:boolean = false;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {

  }

  public getProduct(id) {
    this.loading = true;
    this.http.get<IProduct[]>(environment.apiUrl + "/products/" + id).subscribe(response =>{
      this.product = response;
      this.loading = false;
    });
  }

}
