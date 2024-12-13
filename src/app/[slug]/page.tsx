import React from "react";
import qs from "qs";
import type { PageProps } from "@/types";
import { getStrapiURL } from "@/lib/utils";

import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { Benefits } from "@/components/Benefits";
import { Video } from "@/components/Video";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { Cta } from "@/components/Cta";

import { Container } from "@/components/Container";

interface StaticParamsProps {
  id: number;
  slug: string;
}

export async function generateStaticParams() {
  const { fetchData } = await import("@/lib/fetch");
  const baseURL = getStrapiURL();

  const url = new URL("/api/pages", baseURL);
  const response = await fetchData(url.href);

  return response.data.map((page: { slug: string }) => ({
    slug: page.slug,
  }));
}

async function loader(slug: string) {
  const { fetchData } = await import("@/lib/fetch");

  const path = "/api/pages";
  const baseURL = getStrapiURL();

  const query = qs.stringify({
    filters: {
      slug: { $eq: slug },
    },
    populate: {
      blocks: {
        on: {
          "blocks.hero": {
            populate: {
              cta: {
                populate: true,
              },
              image: {
                fields: ["url", "alternativeText", "name"],
              },
            },
          },
          "blocks.section-heading": {
            populate: true,
          },
          "blocks.content-items": {
            populate: {
              item: {
                populate: true,
              },
              image: {
                fields: ["url", "alternativeText", "name"],
              },
            },
          },
          "blocks.yt-video": {
            populate: true,
          },
          "blocks.card-quote": {
            populate: {
              card: {
                populate: {
                  image: {
                    fields: ["url", "alternativeText", "name"],
                  },
                },
              },
            },
          },
          "blocks.fa-qs": {
            populate: {
              questions: {
                populate: true,
              },
            },
          },
          "blocks.cta": {
            populate: {
              cta: {
                populate: true,
              },
            },
          },
        },
      },
    },
  });

  const url = new URL(path, baseURL);
  url.search = query;
  const response = await fetchData(url.href);

  const pageData = response.data[0];
  return pageData;
}

function blockRenderer(block: any) {
  switch (block.__component) {
    case "blocks.hero":
      return <Hero key={block.id} data={block} />;
    case "blocks.section-heading":
      return <SectionHeading key={block.id} data={block} />;
    case "blocks.content-items":
      return <Benefits key={block.id} data={block} />;
    case "blocks.yt-video":
      return <Video key={block.id} data={block} />;
    case "blocks.card-quote":
      return <Testimonials key={block.id} data={block} />;
    case "blocks.fa-qs":
      return <Faq key={block.id} data={block} />;
    case "blocks.cta":
      return <Cta key={block.id} data={block} />;
    default:
      return null;
  }
}

export default async function DynamicPageRoute({
  params,
}: {
  params: { slug: string };
}) {
  const data = await loader(params.slug);

  if (!data) return <div>Page not found</div>;

  const blocks = data.blocks;

  return (
    <Container>
      {blocks ? blocks.map((block: any) => blockRenderer(block)) : null}
    </Container>
  );
}
