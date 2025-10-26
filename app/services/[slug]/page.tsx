// app/services/[slug]/page.tsx  (SERVER component, sin "use client")
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ServicesContent } from "../../services-content";
import ServiceDetailClient from "@/app/components/service-detail";

type Params = { slug: string };

const EN = ServicesContent.en;
const allSlugs = EN.map(s => s.href.split("/").pop()!).filter(Boolean);

// Puedes dejarla síncrona
export function generateStaticParams(): Params[] {
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const item = EN.find(s => s.href.endsWith("/" + slug));
  return {
    title: item ? `${item.title} · Services` : "Service · Afenta",
    description: item ? `${item.title} — part of Afenta’s end-to-end stack.` : undefined,
  };
}

export default async function ServiceDetailPage(
  { params }: { params: Promise<Params> }
) {
  const { slug } = await params;
  const exists = EN.some(s => s.href.endsWith("/" + slug));
  if (!exists) return notFound();
  return <ServiceDetailClient slug={slug} />;
}
