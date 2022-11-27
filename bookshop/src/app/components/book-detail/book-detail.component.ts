import { CrudService } from './../../service/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  getId:any;
  updateForm!: FormGroup;

  constructor(private formBuilder:FormBuilder,
    private router: Router,
    private ngZone:NgZone,
    private activatedRoute:ActivatedRoute,
    private CrudApi: CrudService) {
      this.getId= this.activatedRoute.snapshot.paramMap.get('id');
      this.CrudApi.getBook(this.getId).subscribe(res=>{
        this.updateForm.setValue({
          name: res['name'],
          price: res['price'],
          description: res['description']
        })
      });
      this.updateForm= this.formBuilder.group({
        name: [''],
        price: [''],
        description: ['']
      })
     }

  ngOnInit(): void {}

  onUpdate(){
    this.CrudApi.updateBook(this.getId,this.updateForm.value).subscribe(res=>{
      console.log("Data Updated Successfully");
      this.ngZone.run(()=>{this.router.navigateByUrl('/books-list')})
    },(err)=>{
      console.log(err)
    })
  }

}