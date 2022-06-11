import { Expose } from 'class-transformer';
import BaseSerializableModel from './BaseSerializableModel';

class SerializableMockModel extends BaseSerializableModel {
	@Expose()
	name = '';
}

describe('Test BaseSerializableModel', () => {
	test('Converts to object correctly', () => {
		const mock = new SerializableMockModel();
		expect(mock.toObject()).toStrictEqual({ name: '' });
	});

	test('Converts from object correctly', () => {
		const mock = new SerializableMockModel();
		mock.fromObject({
			name: 'Mock',
		});
		expect(mock.name).toStrictEqual('Mock');
	});
});
