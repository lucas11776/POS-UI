import { 
    Category as CategoryInterface,
    CreateCategory as CreateCategoryInterface,
    UpdateCategory as UpdateCategoryInterface,
} from '../../shared/models/category.model';
import faker from 'faker';

export const CreateCategory = (): CreateCategoryInterface => {
    return {
        name: faker.commerce.department()
    };
} 

export const Category = (): CategoryInterface => {
    const name = faker.commerce.department();
    return {
        id: Math.floor(Math.random() * 200),
        create_at: faker.date.recent(),
        update_at: faker.date.recent(),
        name: name,
        url: `${name}`.replace(' ', '-')
    }
}

export const UpdateCategory = (): UpdateCategoryInterface => {
    return {
        id: Math.floor(Math.random() * 200),
        name: faker.commerce.department()
    };
}