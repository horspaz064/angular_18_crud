import { Component, NgModule} from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeModel } from './model/Employee';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular_18_crud';

  employeeForm: FormGroup = new FormGroup({});

  employeeObj: EmployeeModel = new EmployeeModel();
  employeeList: EmployeeModel[] = [];


  constructor() {
    this.createdForm();
    debugger;
    const oldData = localStorage.getItem("EmpData"); 
    if(oldData != null ){
      const parseData = JSON.parse(oldData);
      this.employeeList = parseData;
    }
 
  }

  createdForm() {
    this.employeeForm = new FormGroup ({
      empId: new FormControl(this.employeeObj.empId),
      name: new FormControl(this.employeeObj.name,[Validators.required]),
      city: new FormControl(this.employeeObj.city),
      address: new FormControl(this.employeeObj.address),
      contactNo: new FormControl(this.employeeObj.contactNo),
      emailId: new FormControl(this.employeeObj.emailId),
      pinCode: new FormControl(this.employeeObj.pinCode,[Validators.required,Validators.minLength(6)]),
      state: new FormControl(this.employeeObj.state),


    })
  }

  onSave() {
    debugger;
    const oldData = localStorage.getItem("EmpData");
    if(oldData != null) {
      const parseData = JSON.parse(oldData);
      this.employeeForm.controls['empId'].setValue(parseData.length + 1);
      this.employeeList.unshift(this.employeeForm.value);
    }else {
      this.employeeList.unshift(this.employeeForm.value);
    }
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList))
    this.reset()
  }

  onEdit(item: EmployeeModel){
    this.employeeObj = item;
    this.createdForm()
  }

  reset(){
    this.employeeObj = new EmployeeModel();
    this.createdForm();
  }
  
  onUpdate(){
    const record = this.employeeList.find(m=>m.empId == this.employeeForm.controls['empId'].value);
    if(record != undefined) {
      record.address = this.employeeForm.controls['address'].value;
      record.name = this.employeeForm.controls['name'].value;
      record.contactNo = this.employeeForm.controls['contactNo'].value;
      record.emailId = this.employeeForm.controls['emailId'].value;
    }
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList))
    this.reset()
  }
  
   onDelete(id: number){
    const isDelete = confirm("Are you sure want to Delete!");
    if(isDelete) {
      const index = this.employeeList.findIndex(m=>m.empId == id);
        this.employeeList.splice(index, 1);
        localStorage.setItem("EmpData", JSON.stringify(this.employeeList));     
    }
   }

   onCopy(item: EmployeeModel) {
    const copiedEmployee = { ...item };
    copiedEmployee.empId = this.employeeList.length + 1; 
    copiedEmployee.name = `${item.name}.copy`; 
    this.employeeList.push(copiedEmployee);
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
  }

}




