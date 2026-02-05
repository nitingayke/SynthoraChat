const DAY = 24 * 60 * 60 * 1000;

export function computeFollowStats(list = []) {
  const now = Date.now();

  const total = list.length;

  // Followers in last 30 days
  const last30Days = list.filter(
    (f) => now - new Date(f.followedAt).getTime() <= 30 * DAY,
  ).length;

  // Followers in previous 30 days (30–60)
  const prev30Days = list.filter((f) => {
    const diff = now - new Date(f.followedAt).getTime();
    return diff > 30 * DAY && diff <= 60 * DAY;
  }).length;

  const zeroGrowth = last30Days > 0 ? 100 : 0;
  const growth = prev30Days === 0
      ? zeroGrowth
      : Math.round(((last30Days - prev30Days) / prev30Days) * 100);

  const activeUsers = list.filter(
    (f) => now - new Date(f.followedAt).getTime() <= 7 * DAY,
  ).length;

  const activeRate = total === 0 ? 0 : Math.round((activeUsers / total) * 100);

  return {
    total,
    monthly: last30Days,
    growth,
    activeRate,
  };
}
