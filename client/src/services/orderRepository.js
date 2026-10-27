
import {
  createMockOrder,
  getMockOrderById,
  trackMockOrder,
} from "./orderServices";

// Temporary adapter. Replace these implementations when the API is supplied.
// No real API URLs are assumed or invented here.

export const orderRepository = {
  async createOrder(payload) {
    return createMockOrder(payload);
  },

  async getOrder(orderId) {
    return getMockOrderById(orderId);
  },

  async trackOrder(orderId, trackingPin) {
    return trackMockOrder(orderId, trackingPin);
  },
};

