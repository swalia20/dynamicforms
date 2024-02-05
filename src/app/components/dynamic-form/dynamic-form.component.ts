import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
  } from "@angular/core";
  import {
    FormGroup,
    FormBuilder,
    Validators
  } from "@angular/forms";
  import { FieldConfig } from "../../field.interface";
  
  @Component({
    exportAs: "dynamicForm",
    selector: "dynamic-form",
    template: `
    <form class="dynamic-form" [formGroup]="form" (submit)="onSubmit($event)">
    <ng-container *ngFor="let field of fields;" dynamicField [field]="field" [group]="form">
    </ng-container>
    </form>
    `,
    styles: []
  })
  export class DynamicFormComponent implements OnInit {
    @Input() fields: FieldConfig[] = [];
    form!: FormGroup;
    @Output() submit: EventEmitter<any> = new EventEmitter<any>();
    @Output() childFG: EventEmitter<any> = new EventEmitter<any>();
  
    get value() {
      return this.form.value;
    }
    constructor(private fb: FormBuilder) {}
  
    ngOnInit() {
      this.form = this.createControl(this.fields);
      this.form.valueChanges.subscribe(x => {
        this.submit.emit(x);
      });
    }
  
    onSubmit(event: Event) {
      event.preventDefault();
      event.stopPropagation();
      if (this.form.valid) {
        this.submit.emit(this.form.value);
      } else {
        this.validateAllFormFields(this.form);
      }
    }
  
    createControl(fields: any[]) {
      console.log("fields",fields)
      const group = this.fb.group({});
      fields.forEach(field => {
        if (field.type === "button") return;
        if(field.type === "childform"){
          let items: any[] = [];
          field.formArrays.forEach((fields: any[]) => {
            items.push(this.createControl(fields));
          });
          let controlArray = this.fb.array(items);
          group.addControl(field.name, controlArray);
        }else{
          const control = this.fb.control(
          field.value,
          this.bindValidations(field.validations || [])
          );
          group.addControl(field.name, control);
        }
      });
      console.log(group);
      return group;
    }
  
    bindValidations(validations: any) {
      if (validations.length > 0) {
        const validList: any[] = [];
        validations.forEach((valid: { validator: any; }) => {
          validList.push(valid.validator);
        });
        return Validators.compose(validList);
      }
      return null;
    }
  
    validateAllFormFields(formGroup: FormGroup) {
      Object.keys(formGroup.controls).forEach(field => {
        const control = formGroup.get(field);
        if (control) {
            control.markAsTouched({ onlySelf: true });
        }
      });
    }
  }
  