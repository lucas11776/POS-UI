import faker from 'faker';

import { CreateService as CreateServiceInterface } from '../../shared/models/service.model';
import { Service as ServiceModel } from '../../shared/models/service.model';
import { _File as FileMock, FileList as FileListMock } from './file.mock';
import { Category } from './category.mock';
import { Image } from './image.mock';


export const Service = (): ServiceModel => {
    const name = faker.commerce.productName();
    const price = Math.round(Math.random() * 3500);
    return {
        id: Math.floor(Math.random() * 200),
        created_at: faker.date.recent(),
        updated_at: faker.date.recent(),
        deleted_at: null,
        category_id: Math.floor(Math.random() * 20),
        name: name,
        url: `${name}`.replace(' ', '-'),
        price: price,
        discount: Math.floor(price / 1.5),
        in_stock: Math.round(Math.floor(Math.random() * 30)),
        description: faker.lorem.words(500),
        category: Category(),
        image: Image('App\\Product'),
        images: [Image('App\\Product'), Image('App\\Product'), Image('App\\Product')]
    }
};

export const CreateService = (): CreateServiceInterface => {
    const name = faker.commerce.productName();
    const price = Math.round(Math.random() * 3500);
    return {
        image: FileMock('pic.png', 'image/png'),
        images: FileListMock([FileMock('pic.png', 'image/png'), FileMock('pic.png', 'image/png')]),
        category_id: Math.floor(Math.random() * 20),
        name: name,
        price: price,
        discount: Math.floor(price / 1.5),
        in_stock: Math.round(Math.floor(Math.random() * 30)),
        description: faker.lorem.words(500)
    }
};