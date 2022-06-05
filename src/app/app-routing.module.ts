import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ManualPageComponent} from '@lotto/pages/manual-page/manual-page.component';
import {AutoPageComponent} from '@lotto/pages/auto-page/auto-page.component';
import {StatisticsPageComponent} from '@lotto/pages/statistics-page/statistics-page.component';
import {ModalCloserGuard} from '@tk-ui/components/modal/modal-closer.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'manual',
  },
  {
    path: 'manual',
    component: ManualPageComponent,
    canDeactivate: [
      ModalCloserGuard,
    ],
  },
  {
    path: 'auto',
    component: AutoPageComponent,
    canDeactivate: [
      ModalCloserGuard,
    ],
  },
  {
    path: 'statistics',
    component: StatisticsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
