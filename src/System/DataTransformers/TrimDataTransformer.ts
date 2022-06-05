import DataTransformerInterface from "./DataTransformerInterface";

class TrimDataTransformer implements DataTransformerInterface<string, string> {
  transformToIn(newValue: string | null): string {
    return newValue ?? "";
  }

  transformToOut(newValue: string | null): string {
    return newValue ? newValue.trimStart() : "";
  }
}

export default new TrimDataTransformer();
