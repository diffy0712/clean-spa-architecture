import ModelFactory from "./ModelFactory";
import SerializableModel from "./SerializableModel";
import { UniqueModel } from "./UniqueModel";

class TestModel implements UniqueModel, SerializableModel {
  id?: string;

  get uniqueId(): string | undefined {
    return this.id;
  }

  toObject(): object {
    return {
      id: this.id
    };
  }

  fromObject(data: any): void {
    this.id = data.id;
  }
}

afterEach(() => {
  jest.resetAllMocks();
});

test("Can create new model", () => {
  const model = ModelFactory.create(TestModel, {
    id: "someee iiiidd"
  });
  expect(model).toBeInstanceOf(TestModel);
  expect(model.id).toEqual("someee iiiidd");
});

test("Throws error on undefined uniqueId", () => {
  class TestModelWithUndefinedUniqueId extends TestModel{
    get uniqueId(): string | undefined {
      return undefined;
    }
  }

  expect(() => ModelFactory.create(TestModelWithUndefinedUniqueId, {
    id: "someee iiiidd"
  })).toThrowError();
});

test("Can get existing model", () => {
  const model = ModelFactory.create(TestModel, {
    id: "test2"
  });
  expect(model.uniqueId).toEqual("test2");

  const modelFromFactory = ModelFactory.get(TestModel, model.uniqueId || "");
  expect(modelFromFactory).toBeInstanceOf(TestModel);
  expect(modelFromFactory).toEqual(model);
});

test("Returns same instance on get and create with no override", () => {
  const model = ModelFactory.create(TestModel, {
    id: "test3"
  });
  expect(model).toBeInstanceOf(TestModel);
  expect(model.uniqueId).toEqual("test3");
  const sameModelCreate = ModelFactory.create(
    TestModel,
    {
      id: "test3"
    },
    false
  );
  expect(sameModelCreate).toBe(model);

  const modelFromFactory = ModelFactory.get(TestModel, model.uniqueId || "");
  expect(modelFromFactory).toBe(model);
});

test("Returns new instance on create with override.", () => {
  const model = ModelFactory.create(TestModel, {
    id: "test4"
  });
  expect(model).toBeInstanceOf(TestModel);
  expect(model.uniqueId).toEqual("test4");
  const modelFromFactoryBeforeCreate = ModelFactory.get(
    TestModel,
    model.uniqueId || ""
  );
  expect(modelFromFactoryBeforeCreate).toBe(model);

  const newModelCreate = ModelFactory.create(TestModel, {
    id: "test4"
  });
  expect(newModelCreate).toBeInstanceOf(TestModel);
  expect(newModelCreate).not.toBe(model);

  const modelFromFactoryAfterCreate = ModelFactory.get(
    TestModel,
    model.uniqueId || ""
  );
  expect(modelFromFactoryAfterCreate).not.toBe(model);
  expect(modelFromFactoryAfterCreate).toBe(newModelCreate);
});
