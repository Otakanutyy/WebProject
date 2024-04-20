import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const access:string|null = localStorage.getItem("access");
    if(access){
      console.log('Request URL:', req.url);
        console.log('Request headers before interception:', req.headers);
        const newReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${access}`)
        });
        console.log('Request headers after interception:', newReq.headers);
        return next.handle(newReq);
    }

    return next.handle(req);
  }
}