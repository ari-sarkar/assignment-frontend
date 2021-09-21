import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PersonService } from "src/app/person/person.service";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

export interface DialogData {
  id: string;
  name: string;
  age: string;
  gender: string;
  mobile_number: string;
}
@Component({
  selector: "app-edit-person",
  templateUrl: "./edit-person.component.html",
  styleUrls: ["./edit-person.component.scss"],
})
export class EditPersonComponent implements OnInit {
  editForm: FormGroup;
  genderValue: string;

  horizontalPosition: MatSnackBarHorizontalPosition = "start";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  constructor(
    public dialogRef: MatDialogRef<EditPersonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    public personService: PersonService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if (this.data) {
      this.genderValue = this.data.gender;
      this.buildForm();
      this.editForm.patchValue({
        name: this.data.name,
        age: this.data.age,
        mobile_number: this.data.mobile_number,
        gender: this.genderValue,
      });
    }
  }

  buildForm(): void {
    this.editForm = this.fb.group({
      id: [this.data.id],
      name: [""],
      age: [""],
      gender: [""],
      mobile_number: [""],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getGender(value) {
    this.genderValue = value;
    this.editForm.patchValue({
      gender: this.genderValue,
    });

  }

  saveSettings() {
    this.personService.editPerson(this.data.id, this.editForm.value).subscribe(
      (res) => {
        console.log(res);
        this._snackBar.open("Saved Successfuly", "close", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      },
      (err) => {
        window.alert(err);
      }
    );
  }
}
