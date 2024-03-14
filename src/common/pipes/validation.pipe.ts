import { ValidationPipe } from "@nestjs/common";

export const globalValidationPipe = new ValidationPipe({
  transform: true,
});
