import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";

@Component({
  selector: "app-textarea",
  template: `
<mat-form-field class="demo-full-width margin-top" [formGroup]="group">
<textarea matInput [formControlName]="field.name" [placeholder]="field.label" [type]="field.inputType">
<ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
<mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
</ng-container>
</mat-form-field>
`,
  styles: [``]
})
export class TextAreaComponent implements OnInit {
  className: string = "box1";
  field!: FieldConfig;
  group!: FormGroup;
  
  constructor() {}
  ngOnInit() { }
}
