import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[appOnReturn]'
})
export class OnReturnDirective {
    constructor(private _el: ElementRef) { }

    @HostListener('keyup', ['$event']) onKeyDown(e: any) {
        console.log("ggg")
        if ((e.which == 13 || e.keyCode == 13))
        if (e.srcElement.maxLength === e.srcElement.value.length) {
            e.preventDefault();
    
            let nextControl: any = e.srcElement.nextElementSibling;
           // Searching for next similar control to set it focus
            while (true)
            {
                if (nextControl)
                {
                    if (nextControl.type === e.srcElement.type)
                    {
                        nextControl.focus();
                        return;
                    }
                    else
                    {
                        nextControl = nextControl.nextElementSibling;
                    }
                }
                else
                {
                    return;
                }
            }
        }
    }
    
}
