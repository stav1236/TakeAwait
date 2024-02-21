export const ORDER_STATUS = {
  paid: "שולם",
  inPreparation: "בהכנה",
  onDelivery: "במשלוח",
  arrived: "הגיעה ליעד",
  cancelled: "בוטלה",
} as const;

export type OrderStatus = keyof typeof ORDER_STATUS;
