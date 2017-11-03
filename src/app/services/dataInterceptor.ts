import { HttpInterceptor } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpRequest } from "@angular/common/http";
import { HttpHandler } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { HttpSentEvent } from "@angular/common/http";
import { HttpHeaderResponse } from "@angular/common/http";
import { HttpProgressEvent } from "@angular/common/http";
import { HttpResponse,HttpUserEvent } from "@angular/common/http";
import 'rxjs/add/operator/do';


@Injectable()
export class DataInterceptor implements HttpInterceptor
{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | 
                                                    HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> 
    {
        //Since requests are immutable, they cannot be modified directly. To mutate them, use clone():
        const dupreq = req.clone();//// This is an example of duplicate request body. It is exactly the same as the original.
        
        // Clone the request to add the new header. Append content-type on header if it doesn't have One!//'
        if(!req.headers.has('Content-Type'))
        {
            req = req.clone({headers : req.headers.set('Content-Type','application/json')});
            //Alternative Short-cut-> req = req.clone({setHeaders: {'Content-Type':'application/json'} });
        }

        req = req.clone({headers : req.headers.set('Accept','application/json')});
  
        
      
        // Pass on the cloned request instead of the original request.
        return next.handle(req);
                    
    }

}