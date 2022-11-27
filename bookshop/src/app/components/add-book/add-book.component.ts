import { CrudService } from './../../service/crud.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  bookForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private router:Router,
    private ngZone:NgZone,
    private CrudApi: CrudService){
      this.bookForm=this.formBuilder.group({
        name:[''],
        price:[''],
        description:['']
      })
    }
  ngOnInit(): void {
  }
  onSubmit():any{
    this.CrudApi.AddBook(this.bookForm.value)
    .subscribe(()=>{
      console.log('Data added successfully!')
      this.ngZone.run(()=> this.router.navigateByUrl('/books-list'))
    },(err)=>{
      console.log(err);
    });
  }
}
