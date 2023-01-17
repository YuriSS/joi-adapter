export interface InputValidatorDto<Entity> {
  key: keyof Entity;
}

export interface OutputValidatorDto {
  errors: Array<string>;
}

export interface Validator<Entity, Raw> {
  minLength: (input: InputValidatorDto<Entity> & { min: number }) => Validator<Entity, Raw>;
  maxLength: (input: InputValidatorDto<Entity> & { max: number }) => Validator<Entity, Raw>;
  validate: (input: Raw) => OutputValidatorDto;
}

export abstract class Validation<Entity extends { toRaw: () => Raw }, Raw> {
  public constructor(protected validator: Validator<Entity, Raw>) {}

  public execute(input: Entity): OutputValidatorDto {
    return this.configureValidation().validate(input.toRaw());
  }

  protected abstract configureValidation(): Validator<Entity, Raw>;

  protected resultInValidator(): Validator<Entity, Raw> {
    return this.validator;
  }
}
