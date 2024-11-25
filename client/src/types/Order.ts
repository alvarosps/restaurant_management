import { OrderStatus } from "~/constants";

export interface Order {
    id: number;
    menu_item_name: string;
    quantity: number;
    status: OrderStatus;
    created_at: string;
    table_number: number;
    menu_item_price: number;
}
