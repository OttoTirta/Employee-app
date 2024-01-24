import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
    })
export class AuthGuard implements CanActivate {
    constructor(private router:Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
        return new Observable<boolean>((observer) => {
            const token = localStorage.getItem("token");
            if(token){
                observer.next(true);
            }else{
                this.router.navigate(["/login"]);
                observer.next(false);
            }
        });
    }
}

@Injectable({
    providedIn: "root"
    })
export class UnauthGuard implements CanActivate {
    constructor(private router:Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
        return new Observable<boolean>((observer) => {
            const token = localStorage.getItem("token");
            if(token){
                this.router.navigate([""]);
                observer.next(false);
            }else{
                observer.next(true);
            }
        });
    }
}

