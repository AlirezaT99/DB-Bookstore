import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-query-panel',
  templateUrl: './query-panel.component.html',
  styleUrls: ['./query-panel.component.css']
})
export class QueryPanelComponent implements OnInit {
  queryText: string;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
  }

  async searchQuery(): Promise<void> {
    if (!this.queryText) {
      return;
    }
    const {fields, rows} = await this.dataService.performQuery(this.queryText);
    this.drawTable(fields, rows);
  }

  private drawTable(fields: any, rows: any): void {
    const resultDiv = document.getElementById('searchResults');
    let template = `<h4>نتیجه جستجو</h4><table dir="ltr" class='table table-striped' aria-labelledby="tableLabel"><thead><tr>`;
    for (const field of fields) {
      template += `<th>${field}</th>`;
    }
    template += `</tr></thead><tbody>`;
    for (const row of rows) {
      template += `<tr>`;
      for (const rowItem in row) {
        template += `<td>${row[rowItem]}</td>`;
      }
      template += `</tr>`;
    }
    template += `<tr></tr>`;
    template += `</tbody></table>`;
    resultDiv.innerHTML = template;
  }
}
