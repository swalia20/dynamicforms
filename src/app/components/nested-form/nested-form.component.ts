import { Component, OnInit } from "@angular/core";
import { FieldConfig } from "../../field.interface";
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-nested-form',
  templateUrl: './nested-form.component.html',
  styleUrls: ['./nested-form.component.css']
})
export class NestedFormComponent implements OnInit {
    field!: FieldConfig;
    group!: FormGroup;

constructor() {}
ngOnInit() {  
}

}