import {Component, OnInit} from '@angular/core';

import {DataService} from '../services/data.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(
    private service: DataService
  ) {
  }
  num1: string;
  num2: string;
  result: string;

  lineNumber: string;
  lineContent: string;

  private static showError(): void {
    Swal.fire({
      icon: 'error',
      title: 'خطا!',
      text: 'لطفاً مقادیر را بدرستی وارد نمایید...',
      confirmButtonText: 'حله'
    });
  }

  public ngOnInit(): void {
    // document.getElementById('shaGoButton').addEventListener('click', () => this.sendNumbers('go'));
    // document.getElementById('writeGoButton').addEventListener('click', () => this.sendPageNumber('go'));
    // document.getElementById('shaNodeButton').addEventListener('click', () => this.sendNumbers('nodejs'));
  }

  // async sendNumbers(backend: string): Promise<void> {
  //   const response = await this.service.getResult(this.num1, this.num2, backend);
  //   if (response.hasError) {
  //     SearchComponent.showError();
  //   } else {
  //     this.result = response.result;
  //   }
  // }
  //
  // async sendPageNumber(backend: string): Promise<void> {
  //   const response = await this.service.getLine(this.lineNumber, backend);
  //   if (response.hasError) {
  //     SearchComponent.showError();
  //   } else {
  //     this.lineContent = response.result;
  //   }
  // }
}
