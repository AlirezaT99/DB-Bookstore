import {Component, OnInit} from '@angular/core';
import {User} from '../models/User';
import {Comment} from '../models/Comment';
import Swal from 'sweetalert2';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  userToRemove: string;
  users: User[];
  comments: Comment[];
  commentToRemove: string;

  constructor(private dataService: DataService) {
  }

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  showMessage(message, success): void {
    if (success) {
      this.Toast.fire({
        icon: 'success',
        title: message
      });
    } else {
      this.Toast.fire({
        icon: 'error',
        title: message
      });
    }
  }

  async ngOnInit(): Promise<void> {
    await this.fetchTables();
  }

  async removeUser(userToRemove: string): Promise<void> {
    if (userToRemove) {
      window.location.reload();
      await this.dataService.deleteUser(userToRemove);
    }
  }

  private async fetchTables(): Promise<void> {
    this.comments = await this.dataService.getComments();
    this.users = await this.dataService.getUsers();
  }

  async removeComment(commentToRemove: string): Promise<void> {
    if (commentToRemove) {
      window.location.reload();
      await this.dataService.deleteComment(commentToRemove);
    }
  }
}
