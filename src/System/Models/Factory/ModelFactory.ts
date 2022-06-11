import ModelFactoryError from './ModelFactoryError';
import SerializableModel from './SerializableModel';
import { UniqueModel } from './UniqueModel';

class ModelFactory {
	storedModels: Map<string, Map<string, UniqueModel>> = new Map();

	create<T extends UniqueModel & SerializableModel>(
		model: new () => T,
		data: any,
		override = true
	): T {
		const store = this.getModelStore(model);

		const instance: T = new model();

		instance.fromObject(data);
		const uniqueId = instance.uniqueId;

		if (!uniqueId) {
			throw new ModelFactoryError(
				`Undefined Unique id on instance ${instance.constructor.name}`
			);
		}

		if (store.has(uniqueId) && !override) {
			return store?.get(uniqueId) as T;
		}

		store?.set(uniqueId, instance);

		return store?.get(uniqueId) as T;
	}

	get<T extends UniqueModel>(
		model: new () => T,
		uniqueId: string
	): UniqueModel | undefined {
		const store = this.getModelStore(model);

		return store.get(uniqueId);
	}

	protected getModelStore<T extends UniqueModel>(
		model: new () => T
	): Map<string, UniqueModel> {
		const modelName = model.constructor.name;

		if (!this.storedModels.has(modelName)) {
			this.storedModels.set(modelName, new Map());
		}

		return this.storedModels.get(modelName) as Map<string, UniqueModel>;
	}
}

export default new ModelFactory();
