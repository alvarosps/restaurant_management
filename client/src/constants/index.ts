const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';
const TABLE_NUMBER = 'table_number';
const IS_ADMIN = 'is_admin';

enum OrderStatus {
  Pending = 'Pending',
  InProgress = 'In Progress',
  Complete = 'Complete',
  Paid = 'Paid',
  Cancelled = 'Cancelled',
  Refunded = 'Refunded',
}

export {
    ACCESS_TOKEN,
    REFRESH_TOKEN,
    TABLE_NUMBER,
    IS_ADMIN,
    OrderStatus
};