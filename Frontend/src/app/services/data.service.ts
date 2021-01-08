import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {User} from '../models/User';
import {MessageResponse} from '../models/MessageResponse';
import {UsersResponse} from '../models/UsersResponse';
import {CommentsResponse} from '../models/CommentsResponse';
import {Comment} from '../models/Comment';
import {Product} from '../models/Product';
import {ProductsResponse} from '../models/ProductsResponse';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) {
  }

  private baseUrl = `localhost:3000`;

  public async getUsers(): Promise<User[]> {
    return new Promise<User[]>((resolve) => {
      this.http.get(`http://${this.baseUrl}/api/users`).subscribe((result: UsersResponse) => {
        resolve(result.users);
      });
    });
  }

  public async deleteUser(phoneNumber: string): Promise<MessageResponse> {
    return new Promise<MessageResponse>((resolve) => {
      this.http.delete(`http://${this.baseUrl}/api/users/${phoneNumber}`).subscribe((result: MessageResponse) => {
        resolve(result);
      });
    });
  }

  public async updateBalance(phoneNumber: string, amount: string): Promise<MessageResponse> {
    return new Promise<MessageResponse>((resolve) => {
      this.http.put(`http://${this.baseUrl}/api/users/`, {phoneNumber, amount})
        .subscribe((result: MessageResponse) => {
          resolve(result);
        });
    });
  }

  public async signUpUser(user: User): Promise<MessageResponse> {
    return new Promise<MessageResponse>((resolve) => {
      this.http.post(`http://${this.baseUrl}/api/users`, user).subscribe((result: MessageResponse) => {
        resolve(result);
      });
    });
  }

  public async getComments(): Promise<Comment[]> {
    return new Promise<Comment[]>((resolve) => {
      this.http.get(`http://${this.baseUrl}/api/comments`).subscribe((result: CommentsResponse) => {
        resolve(result.comments);
      });
    });
  }

  public async deleteComment(commentId: string): Promise<MessageResponse> {
    return new Promise<MessageResponse>((resolve) => {
      this.http.delete(`http://${this.baseUrl}/api/comments/${commentId}`).subscribe((result: MessageResponse) => {
        resolve(result);
      });
    });
  }

  public async createProduct(product: Product): Promise<MessageResponse> {
    return new Promise<MessageResponse>((resolve) => {
      this.http.post(`http://${this.baseUrl}/api/products`, product).subscribe((result: MessageResponse) => {
        resolve(result);
      });
    });
  }

  public async getProducts(): Promise<Product[]> {
    return new Promise<Product[]>((resolve) => {
      this.http.get(`http://${this.baseUrl}/api/products`).subscribe((result: ProductsResponse) => {
        resolve(result.products);
      });
    });
  }

  public async writeComment(comment: { productId: string; rate: number; comment: string; phoneNumber: string }): Promise<MessageResponse> {
    return new Promise<MessageResponse>((resolve) => {
      this.http.post(`http://${this.baseUrl}/api/comments`, comment).subscribe((result: MessageResponse) => {
        resolve(result);
      });
    });
  }

  public async performQuery(queryText: string): Promise<{ fields; rows }> {
    return new Promise<{ fields, rows }>((resolve) => {
      this.http.post(`http://${this.baseUrl}/api/query`, {queryText}).subscribe((result: { fields, rows }) => {
        resolve(result);
      });
    });
  }
}
