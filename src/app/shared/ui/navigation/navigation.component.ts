import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(
    public userService: UserService
  ) { }

  ngOnInit(): void {
  }


  public doLogout(): void {
    this.userService.logout();
    
  }
  
}
