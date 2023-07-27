interface Order {
    id: number;
    name: string;
    quantity: number;
}

interface CartItem {
    key: string;
    id: number;
    name: string;
    quantity: number;
}

export type { Order, CartItem }