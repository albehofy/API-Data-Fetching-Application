import { Component } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FetchApiService } from '../../Services/fetch-api.service';
import { User } from '../../Interfaces/user';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [RouterLink, FormsModule, MatPaginatorModule,CommonModule],
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent {
  users?: Array<User>;
  filteredUsers?: Array<User>;
  isLoading: boolean = true; 
  userInfo: string = '';
  
  totalItems: number = 0;
  pageSize: number = 10;
  currentPage: number = 0;
  items: Array<User> = [];

  constructor(private fetchData: FetchApiService) {}

  ngOnInit() {
    this.fetchData.gettingAllUsers().subscribe({
      next: (res) => {
        this.users = res; 
        this.filteredUsers = res;
        this.totalItems = res.length;
        this.items = this.getData(this.currentPage, this.pageSize);
      }, 
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  filterUsers() {
    const query = this.userInfo.toLowerCase();
    if (this.users) {
      this.filteredUsers = this.users.filter(user =>
        user.name.toLowerCase().includes(query) || 
        user.username.toLowerCase().includes(query)
      );
      
      this.totalItems = this.filteredUsers.length; // Update totalItems based on filtered results
      this.currentPage = 0; // Reset to first page on filter
      this.items = this.getData(this.currentPage, this.pageSize);
    }
  }

  getData(pageIndex: number, pageSize: number): Array<User> {
    const start = pageIndex * pageSize;
    return this.filteredUsers?.slice(start, start + pageSize) || [];
  }

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.items = this.getData(this.currentPage, this.pageSize);
  }
}
