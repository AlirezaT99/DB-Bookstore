import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {
  userName: string;
  userEmail: string;
  userBalance: string;
  userPhoneNumber: string;
  userPassword: string;

  updatePhoneNumber: string;
  updateAmount: string;

  commentText: string;
  commentProduct: string;
  commentPhoneNumber: string;
  commentRate: number;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
  }

  async increaseBalance(userPhoneNumber: string, userBalance: string): Promise<void> {
    await this.dataService.updateBalance(userPhoneNumber, userBalance);
  }

  async createUser(): Promise<void> {
    await this.dataService.signUpUser({
      name: this.userName,
      phone_number: this.userPhoneNumber,
      email: this.userEmail,
      balance: this.userBalance,
      password: this.userPassword
    });
  }

  async submitComment(): Promise<void> {
    await this.dataService.writeComment({
      comment: this.commentText,
      productId: this.commentProduct,
      phoneNumber: this.commentPhoneNumber,
      rate: this.commentRate
    });
  }
}
