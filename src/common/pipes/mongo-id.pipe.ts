import { Types } from "mongoose";
import { PipeTransform, Injectable, BadRequestException, ArgumentMetadata } from "@nestjs/common";

@Injectable()
export class MongoIdPipe implements PipeTransform<string, Types.ObjectId> {
  transform(value: string, metadata: ArgumentMetadata): Types.ObjectId {
    if (!Types.ObjectId.isValid(value)) {
      const variableName: string = metadata.data;

      throw new BadRequestException(`${variableName} is invalid ObjectId`);
    }
    return Types.ObjectId.createFromHexString(value);
  }
}
