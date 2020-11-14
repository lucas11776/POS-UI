import { Category as CategoryInterface } from '../../shared/models/category.model';
import faker from 'faker';

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