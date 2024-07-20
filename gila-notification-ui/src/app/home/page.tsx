import PageContainer from "@/components/Layout/PageContainer";
import Home from "@/components/Logs/Main";
import { getCategories } from "@/server/categories.actions";
import { getNotificationLogs } from "@/server/logs.actions";
import { Category } from "@/shared/types/category.type";

export default async function Page() {
  const categories = await getCategories()
    .then((res) => res.map((c: Category) => ({ ...c, id: c._id })) || [])
    .catch(() => []);

  const logs = await getNotificationLogs()
    .then((res) => res || [])
    .catch(() => []);

  return (
    <PageContainer>
      <Home categories={categories} logs={logs} />
    </PageContainer>
  );
}
