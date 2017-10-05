export default {
  services: {
    payments: { path: "payments/index.js" },
    notifications: { path: "notifications/index.js" }
  },

  locations: {
    "^/api/payments/$": "payments",
    "^/api/notifications$": "notifications"
  }
};
