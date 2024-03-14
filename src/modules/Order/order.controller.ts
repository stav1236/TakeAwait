import { ApiTags } from "@nestjs/swagger";
import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";

import { Order } from "./order.schema";
import { OrderService } from "./order.service";
import { OrderStatus } from "./models/order.enums";
import { CreateOrderDto } from "./models/dto/create-order.dto";

import { MongoIdPipe } from "src/common/pipes/mongo-id.pipe";
import { EnumValidationPipe } from "src/common/pipes/enum-validation.pipe";

@ApiTags("Orders")
@Controller("orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAllOrders(): Promise<Order[]> {
    return this.orderService.getAllOrders();
  }

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.create(createOrderDto);
  }

  @Put(":id/status/:newStatus")
  async updateOrderStatus(
    @Param("id", MongoIdPipe) id: string,
    @Param("newStatus", new EnumValidationPipe(OrderStatus)) newStatus: OrderStatus
  ): Promise<Order> {
    return this.orderService.updateOrderStatus(id, newStatus);
  }

  @Get("restaurant/:restaurantId")
  async getOrdersByRestaurant(
    @Param("restaurantId", MongoIdPipe) restaurantId: string
  ): Promise<Order[]> {
    return this.orderService.getOrdersByRestaurant(restaurantId);
  }

  @Get(":id/status")
  async getOrderStatus(@Param("id", MongoIdPipe) id: string): Promise<OrderStatus> {
    return this.orderService.getOrderStatus(id);
  }
}
