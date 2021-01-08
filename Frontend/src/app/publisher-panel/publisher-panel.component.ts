import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import {Product} from '../models/Product';

@Component({
  selector: 'app-publisher-panel',
  templateUrl: './publisher-panel.component.html',
  styleUrls: ['./publisher-panel.component.css']
})
export class PublisherPanelComponent implements OnInit {
  products: Product[];

  productName: string;
  productType: string;
  productSubject: string;
  productPrice: string;
  publisherName: string;

  constructor(private dataService: DataService) {
  }

  async ngOnInit(): Promise<void> {
    await this.fetchTables();
  }

  async createProduct(): Promise<void> {
    if (this.productName) {
      // window.location.reload();
      await this.dataService.createProduct({
        id: null,
        name: this.productName,
        type: this.productType,
        subject: this.productSubject,
        price: this.productPrice,
        publisher: this.publisherName,
        publish_date: null
      });
    }
  }

  private async fetchTables(): Promise<void> {
    this.products = await this.dataService.getProducts();
  }
}
