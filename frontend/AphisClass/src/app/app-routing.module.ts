import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AphidsListComponent} from "./components/aphids-list/aphids-list.component";
import {AphisDetailsComponent} from "./components/aphis-details/aphis-details.component";
import {AddAphisComponent} from "./components/add-aphis/add-aphis.component";
import {ClassifyAphidComponent} from "./components/classify-aphid/classify-aphid.component";

const routes: Routes = [
  { path: '', redirectTo: 'aphids', pathMatch: 'full' },
  { path: 'aphids', component: AphidsListComponent },
  { path: 'aphids/:id', component: AphisDetailsComponent },
  { path: 'add', component: AddAphisComponent },
  { path: 'classify', component: ClassifyAphidComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
