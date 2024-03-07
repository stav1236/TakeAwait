import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";

import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrderStatus } from "./order.constants";

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

  @Put(":id/status/:newStatus")
  async updateOrderStatus(
    @Param("id") id: string,
    @Param("newStatus") newStatus: OrderStatus
  ) {
    return this.orderService.updateOrderStatus(id, newStatus);
  }

  @Get("restaurant/:restaurantId")
  async getOrdersByRestaurant(@Param("restaurantId") restaurantId: string) {
    return this.orderService.getOrdersByRestaurant(restaurantId);
  }

  @Get(":id/status")
  async getOrderStatus(@Param("id") id: string) {
    return this.orderService.getOrderStatus(id);
  }
}
