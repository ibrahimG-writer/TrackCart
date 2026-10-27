
const ORDERS_KEY = "trizip-mock-orders";

function readOrders() {
  try {
    const value = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function saveOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

function generateReference(prefix) {
  return `${prefix}-${crypto.randomUUID().replaceAll("-", "").slice(0, 10).toUpperCase()}`;
}

export function createMockOrder({ customer, items }) {
  if (!items?.length) {
    throw new Error("Your shopping bag is empty.");
  }

  const orderId = generateReference("TRZ");
  const trackingId = generateReference("TRK");
  const trackingPin = String(
    Math.floor(100000 + Math.random() * 900000)
  );

  const orderItems = items.map((item) => ({
    productId: item.productId,
    productName: item.name,
    quantity: item.quantity,
    unitPrice: Number(item.price),
    size: item.size || "",
    color: item.color || "",
  }));

  const totalAmount = orderItems.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0
  );

  const now = new Date();
  const expectedDelivery = new Date(now);
  expectedDelivery.setDate(expectedDelivery.getDate() + 7);

  const order = {
    orderId,
    trackingId,
    trackingPin,
    orderDate: now.toISOString(),
    totalAmount,
    currentStatus: "Order Placed",
    expectedDelivery: expectedDelivery.toISOString(),
    customer: { ...customer },
    items: orderItems,
    trackingEvents: [
      {
        trackingId,
        status: "Order Placed",
        location: "Order Processing",
        updatedAt: now.toISOString(),
        remarks: "Mock order created for frontend testing.",
        updatedBy: null,
      },
    ],
    isMock: true,
  };

  saveOrders([...readOrders(), order]);

  return order;
}

export function getMockOrderById(orderId) {
  return readOrders().find((order) => order.orderId === orderId) ?? null;
}

export function trackMockOrder(orderId, trackingPin) {
  const order = getMockOrderById(orderId);

  if (!order || order.trackingPin !== trackingPin.trim()) {
    return null;
  }

  return order;
}
