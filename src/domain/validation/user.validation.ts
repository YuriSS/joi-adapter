import { Validation, Validator } from "@shared/domain/adapter/validator/validator";
import { InputUserEntity, UserEntity } from "@domain/entity/user.entity";

export class UserValidation extends Validation<UserEntity, InputUserEntity> {
  public constructor(protected validator: Validator<UserEntity, InputUserEntity>) {
    super(validator);
  }

  protected override configureValidation(): Validator<UserEntity, InputUserEntity> {
    return this.configureUsernameVaidation()
      .configurePasswordVaidation()
      .resultInValidator();
  }

  private configureUsernameVaidation(): UserValidation {
    const key = "username";

    this.validator
      .minLength({ key, min: 1 })
      .maxLength({ key, max: 20 });

    return this;
  }

  private configurePasswordVaidation(): UserValidation {
    const key = "password";

    this.validator
      .minLength({ key, min: 8 });

    return this;
  }
}

export class UserValidationFactory {
  public static create(validator: Validator<UserEntity, InputUserEntity>) {
    return new UserValidation(validator);
  }
}
