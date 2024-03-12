export const ORDER_STATUS = {
  paid: "שולם",
  inPreparation: "בהכנה",
  onDelivery: "במשלוח",
  arrived: "הגיעה ליעד",
  cancelled: "בוטלה",
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export enum ORDER_STATUSs{ //TODO better
  paid= "שולם",
  inPreparation= "בהכנה",
  onDelivery= "במשלוח",
  arrived= "הגיעה ליעד",
  cancelled= "בוטלה",
}