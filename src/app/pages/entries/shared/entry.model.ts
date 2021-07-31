import { Category } from '../../categories/shared/category.model';

export class Entry {
  constructor(
    public id?: number,
    public name?: string,
    public categoryId?: number,
    public category?: Category,
    public paid?: boolean,
    public date?: string,
    public amount?: string,
    public type?: string,
    public description?: string,
  ) {}
}
