import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // console.warn(route.data.roles);
    // console.warn(state.url);

    //check the role from this route data and the one in the local storage
    //if both are same then user is authorised
    //this fucntion will return true if bot the array elements are same irrespective of the order of elements
    const isBothArraySame = (a: string[], b: string[]) => {
      if (a.length !== b.length) return false;
      else {
        for (var i = 0; i < a.length; i++) {
          let count = 0;
          for (var j = 0; j < a.length; j++) {
            if (a[i] === b[j]) {
              ++count;
            }
          }
          if (count === 0) {
            return false;
          }
        }
        return true;
      }
    };

    const routeRolesArray: string[] = Object.values(route.data.roles); //['ADMIN']
    const localStorageRolesArray: string[] = localStorage.myroles.
      substring(1, localStorage.myroles.length - 1).split(","); //['ADMIN']
    console.warn(isBothArraySame(routeRolesArray, localStorageRolesArray));
    let bothRolesMatch: boolean = isBothArraySame(routeRolesArray, localStorageRolesArray);

    return bothRolesMatch;
  }



}
