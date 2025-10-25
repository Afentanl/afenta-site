import { notFound } from "next/navigation";
import { ServicesContent } from "../../services-content";
import ServiceDetailClient from "@/app/components/service-detail";

type Params = { slug: string };

const EN = ServicesContent.en;
const allSlugs = EN.map(s => s.href.split("/").pop()!).filter(Boolean);

export function generateStaticParams() {
  return allSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Params }) {
  const item = EN.find(s => s.href.endsWith("/" + params.slug));
  return {
    title: item ? `${item.title} · Services` : "Service · Afenta",
    description: item ? `${item.title} — part of Afenta’s end-to-end stack.` : undefined,
  };
}

export default function ServiceDetailPage({ params }: { params: Params }) {
  const exists = EN.some(s => s.href.endsWith("/" + params.slug));
  if (!exists) return notFound();
  return <ServiceDetailClient slug={params.slug} />;
}
