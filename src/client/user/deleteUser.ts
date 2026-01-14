export async function deleteUser(id: string) {
  const res = await fetch("/api/delete-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Не удалось удалить пользователя");
  }

  return true;
}
