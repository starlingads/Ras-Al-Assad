import "server-only";

/**
 * Fixed-window rate limiter, in memory.
 *
 * The site runs as a single long-lived Node process (Hostinger VPS /
 * `node .next/standalone/server.js`), so process memory is shared across all
 * requests and this is genuinely effective — the usual "in-memory limits don't
 * work" caveat applies to serverless/multi-instance hosting, not here. If the
 * app is ever scaled to multiple instances or moved back to serverless, swap
 * the Map for Redis; the call sites do not change.
 */

type Entry = { count: number; resetAt: number };

const buckets = new Map<string, Entry>();

/** Drop expired buckets so the Map cannot grow without bound. */
function sweep(now: number) {
  if (buckets.size < 500) return;
  for (const [key, entry] of buckets) {
    if (entry.resetAt <= now) buckets.delete(key);
  }
}

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  /** Seconds until the window resets — sent as Retry-After on a 429. */
  retryAfter: number;
};

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const entry = buckets.get(key);
  if (!entry || entry.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, retryAfter: 0 };
  }

  entry.count += 1;
  const allowed = entry.count <= limit;
  return {
    allowed,
    remaining: Math.max(0, limit - entry.count),
    retryAfter: allowed ? 0 : Math.ceil((entry.resetAt - now) / 1000),
  };
}

/**
 * Best-effort client IP.
 *
 * Behind nginx on Hostinger the real address arrives in X-Forwarded-For (set
 * `proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;`). The first
 * entry is the client; the rest are proxies. Falls back to a constant so a
 * missing header degrades to a global limit rather than no limit at all.
 */
export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return headers.get("x-real-ip")?.trim() || "unknown";
}
