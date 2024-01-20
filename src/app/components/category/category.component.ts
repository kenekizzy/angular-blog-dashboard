import { Component, OnInit } from '@angular/core';
import { Categories } from 'src/app/models/categories';
import { FirestoreService } from 'src/app/services/firestore.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoriesValue: Array<object> = [];
  categoryFormName: string = "";
  editId: number = 0;
  isEditing: boolean = false;

  constructor (private fs: FirestoreService) {}

  ngOnInit(): void {
    this.fs.getCategoryData().subscribe(val => {
      this.categoriesValue = val
    })
  }

  formData(data: any){
    let categoriesData: Categories = {
      categoryName: data.value.categoryName
    }
    if(!this.isEditing){
      this.fs.saveData(categoriesData)
      data.reset()
    }else{
      this.fs.updateCategoryData(this.editId, categoriesData)
      data.reset()
      this.isEditing = true
    } 
  }

  editCategory(categoryName: string, id: number){
    this.categoryFormName = categoryName
    this.editId = id
    this.isEditing = true
  }

  deleteCategory(categoryId: number){
    this.fs.deleteCategoryData(categoryId)
  }

}
