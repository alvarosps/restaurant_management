import { OrderStatus } from "~/constants";

export const translateStatus = (status: OrderStatus) => { 
    switch (status) {
      case OrderStatus.Pending:
        return 'Pendente';
      case OrderStatus.InProgress:
        return 'Em Progresso';
      case OrderStatus.Complete:
        return 'Completo';
      case OrderStatus.Paid:
        return 'Pago';
      case OrderStatus.Cancelled:
        return 'Cancelado';
      case OrderStatus.Refunded:
        return 'Reembolsado';
      default:
        return status;
    }
  }