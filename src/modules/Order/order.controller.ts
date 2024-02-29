import { Body, Controller, Get, Post } from "@nestjs/common";

import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";

@Controller("orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAllOrders(): Promise<any[]> {
    return this.orderService.getAllOrders();
  }

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    const order = await this.orderService.create(createOrderDto);
    return { message: "Order created successfully", order };
  }
}
