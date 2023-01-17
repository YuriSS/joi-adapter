import { InputValidatorDto, OutputValidatorDto, Validator } from "@shared/domain/adapter/validator/validator";
import Joi from "joi";

export class JoiValidator<Entity, Raw> implements Validator<Entity, Raw> {
  private _schema: Joi.ObjectSchema<unknown> = Joi.object({});

  public minLength(input: InputValidatorDto<Entity> & { min: number }): Validator<Entity, Raw> {
    this._schema = this._schema.append({
      [input.key]: Joi.string().min(input.min)
    });
    return this;
  }

  public maxLength(input: InputValidatorDto<Entity> & { max: number }): Validator<Entity, Raw> {
    this._schema = this._schema.append({
      [input.key]: Joi.string().max(input.max)
    });
    return this;
  }

  public validate(input: Raw): OutputValidatorDto {
    const { error } = this._schema.validate(input, { abortEarly: false });
    const messages = (error?.details || []).map((detail) => detail.message);
    return { errors: messages };
  }
}
