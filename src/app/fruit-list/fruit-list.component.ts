import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FruitService } from '../services/fruit.service';
import { Fruit } from '../models/fruit.interface';

@Component({
  selector: 'app-fruit-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers :[FruitService],
  templateUrl: './fruit-list.component.html',
  styleUrls: ['./fruit-list.component.css']
})
export class FruitListComponent implements OnInit {
  fruits: Fruit[] = [];
  fruit: Fruit = { name: '', price: 0, quantity: 0 };
  isEditing = false;

  constructor(private fruitService: FruitService) {}

  ngOnInit(): void {
    this.loadFruits();
  }

  loadFruits(): void {
    this.fruitService.getFruits().subscribe(fruits => {
      this.fruits = fruits;
    });
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.fruitService.updateFruit(this.fruit).subscribe(() => {
        this.loadFruits();
        this.resetForm();
      });
    } else {
      this.fruitService.addFruit(this.fruit).subscribe(() => {
        this.loadFruits();
        this.resetForm();
      });
    }
  }

  editFruit(fruit: Fruit): void {
    this.fruit = { ...fruit };
    this.isEditing = true;
  }

  deleteFruit(id: number): void {
    if (confirm('Are you sure you want to delete this fruit?')) {
      this.fruitService.deleteFruit(id).subscribe(() => {
        this.loadFruits();
      });
    }
  }

  cancelEdit(): void {
    this.resetForm();
  }

  private resetForm(): void {
    this.fruit = { name: '', price: 0, quantity: 0 };
    this.isEditing = false;
  }
}