import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { FormBuilder, FormGroup } from "@angular/forms";
import { PersonService } from "src/app/person/person.service";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss']
})
export class AddPersonComponent implements OnInit {
  addForm: FormGroup;
  genderValue: string;

  horizontalPosition: MatSnackBarHorizontalPosition = "start";
  verticalPosition: MatSnackBarVerticalPosition = "top";
  constructor(
    public dialogRef: MatDialogRef<AddPersonComponent>,
    private fb: FormBuilder,
    public personService: PersonService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.addForm = this.fb.group({
      name: [""],
      age: [""],
      gender: [""],
      mobile_number: [""],
    });
  }

  getGender(value:string) {
    this.genderValue = value;
    this.addForm.patchValue({
      gender: this.genderValue,
    });

  }

  saveSettings() {
    this.personService.addPerson(this.addForm.value).subscribe(
      (res) => {
        console.log(res);
        this._snackBar.open("Added Successfuly", "close", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 1000
        });
      },
      (err) => {
        window.alert(err);
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
