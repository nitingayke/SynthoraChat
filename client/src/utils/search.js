export function matchUserSearch(user, query) {
  if (!query) return true;

  const q = query.toLowerCase().trim();

  const username = user?.username?.toLowerCase() || "";
  const firstName = user?.profile?.firstName?.toLowerCase() || "";
  const lastName = user?.profile?.lastName?.toLowerCase() || "";

  const fullName = `${firstName} ${lastName}`.trim();

  return (
    username.includes(q) ||
    firstName.includes(q) ||
    lastName.includes(q) ||
    fullName.includes(q)
  );
}
