import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isLoggedIn = false;
  user!: User;
  userEmail: string="";
  isAdmin: boolean=false;

  constructor(private authService: AuthService,private userService: UserService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
    this.authService.getUserEmail().subscribe(userEmail => {
      this.userEmail = userEmail;
      this.userService.getUserByEmail( this.userEmail).subscribe((res:User)=>{
        this.user = res;
        if(this.user.role === 'admin'){
          this.isAdmin = true
        }
      })
    });
  }

  logout(){
    this.authService.logout();
  }
}
