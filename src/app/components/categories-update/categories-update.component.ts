import { Component, OnInit } from '@angular/core';
import {IProduct} from "../../interfaces/IProduct";
import {ICategory} from "../../interfaces/ICategories";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-categories-update',
  templateUrl: './categories-update.component.html',
  styleUrls: ['./categories-update.component.scss']
})
export class CategoriesUpdateComponent implements OnInit {
  public category: Partial<IProduct> = {};
  public categories: ICategory[] = [];

  constructor(
    private http:HttpClient,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.getCategories();
    this.route.params.subscribe(params => {
      this.initCategory(params.categoryId);
    });
  }
  public initCategory(id: string) {
    this.http.get<ICategory>(environment.apiUrl + "/categories/" + id)
      .subscribe(response => {
        this.category = response;
      });
  }
  public saveCategory() {
    this.http.put(environment.apiUrl + "/categories/" + this.category._id, this.category)
      .subscribe(response => {
        this.router.navigate(["/categories"]);
      });
  }
  public getCategories() {
    this.http.get<ICategory[]>(environment.apiUrl + "/categories")
      .subscribe(response => {
        this.categories = response;
      });
  }

}
