import { instanceToPlain, plainToClassFromExist } from 'class-transformer';
import SerializableModel from './Factory/SerializableModel';

export default abstract class BaseSerializableModel
	implements SerializableModel
{
	toObject() {
		return instanceToPlain(this, {
			excludePrefixes: ['_'],
			strategy: 'excludeAll',
		});
	}

	fromObject(data: any): void {
		plainToClassFromExist(this, data, {
			excludePrefixes: ['_'],
			strategy: 'excludeAll',
		});
	}
}
