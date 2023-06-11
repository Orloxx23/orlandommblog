import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import rehypePrettyCode from "rehype-pretty-code";
import remarkReadingTime from "./src/plugins/remark-reading-time.mjs";
import preact from "@astrojs/preact";
import compress from "astro-compress";
import Icons from "unplugin-icons/vite";

const rehypePrettyCodeOptions = {
  theme: "dracula",
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [
        {
          type: "text",
          value: " ",
        },
      ];
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className.push("highlighted");
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ["word"];
  },
};

// https://astro.build/config
export default defineConfig({
  site: "https://algorizr.com",
  integrations: [mdx(), sitemap(), tailwind(), preact(), compress()],
  markdown: {
    extendDefaultPlugins: true,
    syntaxHighlight: false,
    rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
    remarkPlugins: [remarkReadingTime],
  },
  vite: {
    plugins: [Icons({ compiler: "jsx", jsx: "preact", autoInstall: true })],
  },
});
