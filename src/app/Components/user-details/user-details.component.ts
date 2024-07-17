import { Component, Input, ViewChild } from '@angular/core';
import { FetchApiService } from '../../Services/fetch-api.service';
import { User } from '../../Interfaces/user';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  isLoading?:boolean = true; 
  userID:number = -1;
  userData?:User; 
  errorMessage?:string;
  constructor(private fetchData:FetchApiService){}
  @Input() set id(value:number){
    this.userID = value;

    this.fetchData.gettingUserDetails(value).subscribe(
      {
        next:(res)=>{
          this.isLoading = true; 
          this.userData = res;
          this.errorMessage = undefined;  
        },error: (err) => {
          this.errorMessage = 'Failed to load user data';
          this.isLoading = false;
        },
        complete:()=>{
          this.isLoading = false;
        }
      }
    )
  }  
}
