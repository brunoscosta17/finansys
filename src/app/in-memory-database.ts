import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Category } from './pages/categories/shared/category.model';

export class InMemoryDatabase implements InMemoryDbService {
    
    createDb() {
        
        const categories = [
            { id: 1, name: "Lazer", description: "Categoria lazer" },
            { id: 2, name: "Moradia", description: "Categoria moradia"},
            { id: 3, name: "Saúde", description: "Categoria saúde" },
            { id: 4, name: "Salário", description: "Categoria salário" },
            { id: 5, name: "Freelas", description: "Categoria freelas" },
        ];

        return { categories }

    }

}