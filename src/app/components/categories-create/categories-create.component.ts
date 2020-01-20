import { Component, OnInit } from '@angular/core';
import { ICategory } from "../../interfaces/ICategories";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import {IProduct} from "../../interfaces/IProduct";

@Component({
  selector: 'app-categories-create',
  templateUrl: './categories-create.component.html',
  styleUrls: ['./categories-create.component.scss']
})
export class CategoriesCreateComponent implements OnInit {
  public category: Partial<ICategory> = {};
  public categories: ICategory[] = [];

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  public saveCategory() {
    this.http.post(environment.apiUrl + "/categories", this.category)
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
