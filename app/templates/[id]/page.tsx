import { templates } from "@/lib/templates";
import TemplateDetailClient from "./TemplateDetailClient";

export function generateStaticParams() {
  return templates.map((t) => ({ id: t.id }));
}

export default function TemplateDetailPage({ params }: { params: { id: string } }) {
  return <TemplateDetailClient id={params.id} />;
}
