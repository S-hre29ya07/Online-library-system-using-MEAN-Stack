import { CrudService } from './../../service/crud.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  Books:any=[];
  constructor(private CrudApi: CrudService) { }

  ngOnInit(): void {
    this.CrudApi.getBooks().subscribe(res=>{
      console.log(res);
      this.Books=res;
    })
  }
delete(id:any, i:any){
  console.log(id);
  if(window.confirm('Are you sure you want to delete')){
    this.CrudApi.deleteBook(id).subscribe(res=>{
      this.Books.splice(i,1);
    })
  }
}
}
