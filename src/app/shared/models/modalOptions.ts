import { Injectable } from "@angular/core";
import { NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";

@Injectable()
export class modalConfigOptions {
  config: NgbModalOptions = {
    backdrop: true,
    size: 'md', 
    centered: true
  };
}

export interface modalTemplateOptions {
    title: string;
    message: string;
    confirmBtnText: string;
    dismissBtnText: string;
}