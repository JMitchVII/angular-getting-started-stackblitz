import { Component, OnInit } from '@angular/core';
import { Console } from 'console';
import { IProduct } from './product';

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  private _listFilter: string = '';
  products: IProduct[] = [
    {
      productName: 'Garden Cart',
      productCode: 'GDN-023',
      releaseDate: 'March 18 2021',
      description: '15 gallon capacity rolling cart.',
      price: 32.99,
      starRating: 4.2,
      imageUrl: 'assets/images/hammer.png',
    },
  ];
  filteredProducts: IProduct[] = this.products;

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
    this._listFilter = 'cart';
  }

  displayRating(message: string) {
    this.pageTitle = this.pageTitle + message;
  }
}
