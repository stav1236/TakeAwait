import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from "@nestjs/common";

@Injectable()
export class EnumValidationPipe implements PipeTransform {
  constructor(private readonly enumType: any) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if (!this.isValidEnumValue(value)) {
      const variableName: string = metadata.data;
      throw new BadRequestException(
        `${variableName} is not include in ${Object.values(this.enumType)}`
      );
    }
    return value;
  }

  private isValidEnumValue(value: any): boolean {
    return Object.values(this.enumType).includes(value);
  }
}
