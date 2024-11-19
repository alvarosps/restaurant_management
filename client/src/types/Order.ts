export interface Order {
    id: number;
    menu_item__name: string; // Nome do item do menu retornado pelo backend
    quantity: number;
    status: string;
    created_at: string; // Data do pedido em formato de string
}
