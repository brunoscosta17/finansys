import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { Category } from '../../categories/shared/category.model';

export class Entry extends BaseResourceModel {
  constructor(
    public id: number = 0,
    public name?: string,
    public categoryId: number = 0,
    public category?: Category,
    public paid?: boolean,
    public date?: string,
    public amount?: string,
    public type?: string,
    public description?: string,
  ) {
    super()
  }

  static types = {
    expense: 'Despesa',
    revenue: 'Receita'
  }

  get paidText(): string {
    return this.paid ? 'Pago' : 'Pendente';
  }

}
