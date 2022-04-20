import { Component, OnDestroy, OnInit } from '@angular/core';
import { Console } from 'console';
import { Subscription } from 'rxjs';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  //
  constructor(private productService: ProductService) {}

  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  private _listFilter: string = '';
  products: IProduct[] = [];
  filteredProducts: IProduct[] = this.products;
  private _productServiceSub!: Subscription;

  get listFilter() {
    return this._listFilter;
  }

  set listFilter(value: string) {
    console.log('in filter :' + value);
    console.log(this.filteredProducts);
    this.filteredProducts = this.performFilter(value);
    this._listFilter = value;
  }

  performFilter(filterBy: string): IProduct[] {
    return this.products.filter((element: IProduct) => {
      return element.productName.toLowerCase().includes(filterBy.toLowerCase());
    });
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this._productServiceSub = this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = this.products;
      },
      error: (error) => console.log(error),
    });
  }

  displayRating(message: string) {
    this.pageTitle = this.pageTitle + message;
  }

  ngOnDestroy() {
    this._productServiceSub.unsubscribe();
  }
}
