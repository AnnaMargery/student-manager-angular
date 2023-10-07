import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './add-student/add-student.component';
import { ListStudentsComponent } from './list-students/list-students.component';

const routes: Routes = [
  {path:"add", component: AddStudentComponent},
  {path:"students", component : ListStudentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }