import { setRequestLocale } from "next-intl/server";

import type { Locale } from "@/src/i18n/routing";
import { fetchHomeProducts, fetchPosts, fetchSettings } from "@/src/sanity/fetch";
import Hero from "@/src/components/sections/Hero";
import Who from "@/src/components/sections/Who";
import Idea from "@/src/components/sections/Idea";
import ProjectTeaser from "@/src/components/sections/ProjectTeaser";
import ProductsPreview from "@/src/components/sections/ProductsPreview";
import VideoSection from "@/src/components/sections/VideoSection";
import PostsPreview from "@/src/components/sections/PostsPreview";
import LeadForm from "@/src/components/leadForm/LeadForm";
import ContactsSection from "@/src/components/sections/ContactsSection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [settings, products, posts] = await Promise.all([
    fetchSettings(),
    fetchHomeProducts(locale),
    fetchPosts(locale, 3),
  ]);

  return (
    <>
      <Hero photo={settings.heroPhoto} />
      <Who />
      <Idea />
      <ProjectTeaser settings={settings} />
      <ProductsPreview products={products} />
      <VideoSection url={settings.introVideoUrl} />
      <PostsPreview posts={posts} />
      <LeadForm />
      <ContactsSection settings={settings} />
    </>
  );
}
