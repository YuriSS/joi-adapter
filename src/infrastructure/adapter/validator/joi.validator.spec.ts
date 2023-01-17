import { InputUserEntity, UserEntity } from "@domain/entity/user.entity";
import { UserValidationFactory } from "@domain/validation/user.validation";
import { JoiValidator } from "./joi.validator";

describe("Joi validator adapter", () => {
  it("should return errors", () => {
    const userEntity = new UserEntity({ username: "j238173891207389173081730821730891", password: "1" });
    const validator = new JoiValidator<UserEntity, InputUserEntity>();
    const userValidation = UserValidationFactory.create(validator);

    const result = userValidation.execute(userEntity);

    expect(result.errors).toEqual([
      "\"username\" length must be less than or equal to 20 characters long",
      "\"password\" length must be at least 8 characters long"
    ]);
  });

  it("should not return errors", () => {
    const userEntity = new UserEntity({ username: "jhondoe", password: "12345678" });
    const validator = new JoiValidator<UserEntity, InputUserEntity>();
    const userValidation = UserValidationFactory.create(validator);

    const result = userValidation.execute(userEntity);

    expect(result.errors).toEqual([]);

  });
});
