import { Component, OnInit } from "@angular/core";
import { PersonService } from "./person/person.service";
import { MatDialog } from "@angular/material/dialog";
import { EditPersonComponent } from "./edit-person/edit-person/edit-person.component";
import { AddPersonComponent } from "./add-person/add-person/add-person.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  persons: any;
  personPayload: any = {
    name: "",
    age: "",
    gender: "",
    mobile_number: "",
  };

  constructor(public persinService: PersonService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getPersons();
  }

  editPersonDialogueOpen(data) {
    const dialogRef = this.dialog.open(EditPersonComponent, {
      width: "450px",
      data: {
        id: data._id,
        name: data.name,
        age: data.age,
        gender: data.gender,
        mobile_number: data.mobile_number,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.getPersons();
      }
    });
  }

  addPersonDialogueOpen() {
    const dialogRef = this.dialog.open(AddPersonComponent, {
      width: "500px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.getPersons();
      }
    });
  }

  getPersons() {
    this.persinService.getAllPersons().subscribe(
      (res) => {
        console.log(res);
        this.persons = res.data;
      },
      (err) => {
        window.alert(err);
      }
    );
  }

  addPerson(data: any) {
    this.persinService.addPerson(data).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        window.alert(err);
      }
    );
  }

  deletePerson(id: string) {
    const result = window.confirm("Confirm to delete this person !");
    if(result){
    this.persinService.deletePerson(id).subscribe(
      res => {
        this.getPersons();
      },
      err =>{
        window.alert(err)
      }
      )
    }
  }
}
