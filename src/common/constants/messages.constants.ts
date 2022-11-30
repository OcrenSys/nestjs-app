export const ONLY_ONE = true;

export const MODEL = Object.freeze({
  AdvertisingSource: 'Advertising Source',
  Brand: 'Brand',
  Customer: 'Customer',
  DeliveryType: 'Delivery Type',
  PaymentType: 'Payment Type',
  Product: 'Product',
  ProductStock: 'Product Stock',
  PurchaseOrder: 'Purchase Order',
  PurchaseOrderDetail: 'Purchase Order Detail',
  Role: 'Role',
  SaleOrder: 'Sale Order',
  SaleOrderDetail: 'Sale Order Detail',
});

export const ACTION_CREATE = Object.freeze({
  success: (model) => `${model} has been created successfully.`,
  error: (model) => `${model} has not been created.`,
});

export const ACTION_UPDATE = Object.freeze({
  success: (model) => `${model} has been updated successfully.`,
  error: (model) => `${model} has not been updated.`,
});

export const ACTION_DELETE = Object.freeze({
  success: (model) => `${model} has been deleted successfully`,
  error: (model) => `${model} has not been deleted.`,
});

export const ACTION_REMOVE = Object.freeze({
  success: (model) => `${model} has been removed successfully.`,
  error: (model) => `${model} has not been removed.`,
});

export const ACTION_FIND = Object.freeze({
  success: (model, onlyOne?: boolean) =>
    `${model}${onlyOne ? '' : "'s list"} has been found successfully.`,
  error: (model, onlyOne?: boolean) =>
    `${model}${onlyOne ? '' : "'s list"} has not been found.`,
});
