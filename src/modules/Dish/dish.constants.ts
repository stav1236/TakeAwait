export const DISH_TYPE = { //todo to enum
  vegetarian: "צמחוני",
  vegan: "טבעוני",
  meat: "בשרי",
} as const;

export type DishType = (typeof DISH_TYPE)[keyof typeof DISH_TYPE];
