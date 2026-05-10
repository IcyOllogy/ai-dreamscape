const rateLimitCache = new Map<string, { count: number; timestamp: number }>();

/**
 * Basic in-memory rate limiter for server functions.
 * @param identifier User ID or IP address
 * @param limit Max requests allowed
 * @param windowMs Time window in milliseconds
 * @returns true if allowed, false if rate limited
 */
export function checkRateLimit(identifier: string, limit: number = 5, windowMs: number = 60000): boolean {
  const now = Date.now();
  const record = rateLimitCache.get(identifier);

  // Clean up old entries occasionally to prevent memory leaks in the edge worker
  if (Math.random() < 0.05) {
    for (const [key, value] of rateLimitCache.entries()) {
      if (now - value.timestamp > windowMs) {
        rateLimitCache.delete(key);
      }
    }
  }

  if (!record) {
    rateLimitCache.set(identifier, { count: 1, timestamp: now });
    return true; // Allowed
  }

  if (now - record.timestamp > windowMs) {
    // Window expired, reset
    rateLimitCache.set(identifier, { count: 1, timestamp: now });
    return true; // Allowed
  }

  if (record.count >= limit) {
    return false; // Rate limited
  }

  record.count += 1;
  return true; // Allowed
}
