export class ExceptionMessages {
  static doesNotExist = (modelName: string) => {
    return `${modelName} doesn't exist.`;
  };
  static fieldIsRequired = (fieldName: string) => {
    return `${fieldName} field is required.`;
  };
}
