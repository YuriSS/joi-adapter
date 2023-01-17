import { UserEntity } from "@domain/entity/user.entity";
import { UserValidationFactory } from "@domain/validation/user.validation";

describe("User validation", () => {
  const userEntity: UserEntity = new UserEntity({ username: "jhondoe", password: "123" });
  const validator = ({
    validate: jest.fn(),
    minLength: jest.fn().mockReturnThis(),
    maxLength: jest.fn().mockReturnThis(),
  });

  it("should validate min lenght of username and password", () => {
    UserValidationFactory.create(validator).execute(userEntity);

    expect(validator.minLength).toHaveBeenCalledTimes(2);
    expect(validator.minLength.mock.calls).toEqual([
      [{ min: 1, key: "username" }],
      [{ min: 8, key: "password" }],
    ]);
  });

  it("should validate max lenght of username", () => {
    UserValidationFactory.create(validator).execute(userEntity);

    expect(validator.maxLength).toHaveBeenCalledTimes(1);
    expect(validator.maxLength).toHaveBeenCalledWith({ max: 20, key: "username" });
  });
});
