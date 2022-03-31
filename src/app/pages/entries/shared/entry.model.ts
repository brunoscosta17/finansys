import { Category } from '../../categories/shared/category.model';

export class Entry {

    constructor(
        public id: number = 0,
        public name?: string,
        public description?: string,
        public type?: string,
        public amount?: string,
        public date?: string,
        public paid?: boolean,
        public category?: Category,
        public categoryId: number = 0,
    ) {}

    static types = {
        'expense': 'Despesa',
        'revenue': 'Receita'
    };

    get paidText(): string {
        return this.paid ? 'Pago' : 'Pendente ';
    }

}
