import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LightboxModule } from 'ngx-lightbox';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddNewProductModalComponent } from './add-new-product-modal/add-new-product-modal.component';
import { ListPageHeaderComponent } from './list-page-header/list-page-header.component';
import { ProfileUserSocialComponent } from './profile-user-social/profile-user-social.component';
import { ComponentsPagesModule } from '../../components/pages/components.pages.module';
import { ComponentsCardsModule } from '../../components/cards/components.cards.module';

import { ComponentsPlayerModule } from 'src/app/components/player/components.player.module';
import { LayoutContainersModule } from '../layout/layout.containers.module';

import {CourseProfileAdminComponent} from './course-profile-admin/course-profile-admin.component'
 import {CourseProfileTabsComponent} from './course-profile-tabs/course-prfile-tabs.component'
import {CourseMembersComponent} from './course-members/course-members.component'
import {CourseModulesComponent} from './course-modules/course-modules.component'

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { RatingModule } from 'ngx-bootstrap/rating';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { QuillModule } from 'ngx-quill';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { studentsReducer } from 'src/app/views/app/students/state/students.reducer';
import { StudentEffect } from 'src/app/views/app/students/state/students.effects';

@NgModule({
  declarations: [
    AddNewProductModalComponent,
    ListPageHeaderComponent,
    ProfileUserSocialComponent,
    CourseProfileAdminComponent,
    CourseProfileTabsComponent,
    CourseMembersComponent,
    CourseModulesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    CollapseModule,
    FormsModule,
    LayoutContainersModule,
    NgSelectModule,
    LightboxModule,
    ComponentsPagesModule,
    ComponentsCardsModule,
    ComponentsPlayerModule,
    RatingModule.forRoot(),
    TabsModule.forRoot(),
    AccordionModule.forRoot(),
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    QuillModule.forRoot(),
    StoreModule.forFeature("students",studentsReducer),
    EffectsModule.forFeature([StudentEffect])
  ],
  exports: [
    AddNewProductModalComponent,
    ListPageHeaderComponent,
    ProfileUserSocialComponent,

    CourseProfileAdminComponent,
    CourseProfileTabsComponent,
    CourseMembersComponent,
    CourseModulesComponent

  ]
})
export class PagesContainersModule { }
