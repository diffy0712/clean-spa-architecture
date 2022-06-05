export default interface SerializableModel {
  toObject(): any;
  fromObject(data: any): void;
}
