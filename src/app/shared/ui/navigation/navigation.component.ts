import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { UserInterface } from 'src/app/core/models/user-interface';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  public user: UserInterface

  constructor(
    public userService: UserService

  ) { }

  ngOnInit(): void {
    this.userService.userSubject$.subscribe((user: UserInterface) => {
      this.user = user;
    });
  }


  public doLogout(): void {
    this.userService.logout();
    
  }
  
}
