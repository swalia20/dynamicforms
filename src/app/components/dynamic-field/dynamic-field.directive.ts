import {
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    Input,
    OnInit,
    ViewContainerRef
  } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
import { InputComponent } from "../input/input.component";
import { SelectComponent } from "../select/select.component";
import { TextAreaComponent } from "../textarea/textarea.component";

 @Directive({
    selector: "[dynamicField]"
  })
  export class DynamicFieldDirective implements OnInit {
    @Input()
      field!: FieldConfig;
    @Input()
      group!: FormGroup;
    componentRef: any;
    constructor(
      private resolver: ComponentFactoryResolver,
      private container: ViewContainerRef
    ) {}
    ngOnInit() {
      const factory = this.resolver.resolveComponentFactory(
        this.mapComponentToFieldType(this.field.type)
      );
      this.componentRef = this.container.createComponent(factory);
      this.componentRef.instance.field = this.field;
      this.componentRef.instance.group = this.group;
    }

    mapComponentToFieldType(fieldType: string) : any {
        if (fieldType === 'input')
            return InputComponent;

        if (fieldType === 'select')
            return InputComponent;

        if (fieldType === 'textarea')
            return TextAreaComponent;    
    };
  }
  