import { ApiTags } from "@nestjs/swagger";
import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";

import { OrderService } from "./order.service";
import { CreateOrderDto } from "./models/dto/create-order.dto";
import { OrderStatus } from "./models/order.enums";
import { Order } from "./order.schema";

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
    @Param("id") id: string,
    @Param("newStatus") newStatus: OrderStatus
  ): Promise<Order> {
    return this.orderService.updateOrderStatus(id, newStatus);
  }

  @Get("restaurant/:restaurantId")
  async getOrdersByRestaurant(@Param("restaurantId") restaurantId: string): Promise<Order[]> {
    return this.orderService.getOrdersByRestaurant(restaurantId);
  }

  @Get(":id/status")
  async getOrderStatus(@Param("id") id: string): Promise<OrderStatus> {
    return this.orderService.getOrderStatus(id);
  }
}
