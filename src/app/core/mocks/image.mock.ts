import { Image as ImageInterface } from '../../shared/models/image.model';
import faker from 'faker';

export const Image = (imageableType: string = 'App\\Image'): ImageInterface => {
    return {
        id: Math.floor(Math.random() * 200),
        create_at: faker.date.recent(),
        update_at: faker.date.recent(),
        imageable_id: Math.floor(Math.random() * 200),
        imageable_type: imageableType,
        path: faker.image.image(),
        url: faker.image.image()
    };
}