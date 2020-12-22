import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProfileService} from './profile.service';
// @ts-ignore
import data from '../shared/db.json';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private profileService: ProfileService) { }

  isEdit = false;
  countries = [];
  languages = [];
  gender = [];
  form: FormGroup;

  ngOnInit(): void {
    this.profileService
      .getCountries()
      .subscribe((response: Array<any>) => {
        const dataCountries = response.map(item => item.name);
        this.countries = dataCountries;
      });

    this.languages = data.lang;
    this.gender = data.gender;
    console.log(this.gender);

    this.form = new FormGroup({
      name: new FormControl({value: localStorage.getItem('name') || null, disabled: true}),
      date: new FormControl({value: localStorage.getItem('date') || '', disabled: true}),
      country: new FormControl({value: localStorage.getItem('country') || 'Ukraine', disabled: true}),
      languages: new FormControl({value: localStorage.getItem('languages') || 'uk', disabled: true}),
      gender: new FormControl({value: localStorage.getItem('gender') || 'male', disabled: true})
    });
  }

  saveChanges() {
    localStorage.setItem('name', this.form.value.name);
    localStorage.setItem('languages', this.form.value.languages);
    localStorage.setItem('date', this.form.value.date);
    localStorage.setItem('country', this.form.value.country);
    localStorage.setItem('gender', this.form.value.gender);
    this.isEdit = false;
    this.form.disable();
  }

  editHandler() {
    this.isEdit = true;
    this.form.enable();
  }

  cancelHandler() {
    this.form.patchValue({
      name: localStorage.getItem('name') || null,
      date: localStorage.getItem('date') || '',
      country: localStorage.getItem('country') || 'Ukraine',
      languages: localStorage.getItem('languages') || 'uk',
      gender: localStorage.getItem('gender') || 'male',
    });
    this.isEdit = false;
    this.form.disable();
  }

}
