import { Category } from '../../categories/shared/category.model';

export class Entry {
  id!: number;
  name!: string;
  categoryId!: number;
  category!: Category;
  paid!: boolean;
  date!: string;
  amount!: string;
  type!: string;
  description!: string;
}
