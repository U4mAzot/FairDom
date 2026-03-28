import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import React from "react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
});

vi.mock("next/image", () => {
  function MockImage({
    src,
    alt,
    fill: _fill,
    priority: _priority,
    sizes: _sizes,
    className,
    ...rest
  }: {
    src: string | { src?: string };
    alt?: string;
    fill?: boolean;
    priority?: boolean;
    sizes?: string;
    className?: string;
    [k: string]: unknown;
  }) {
    const url = typeof src === "string" ? src : (src?.src ?? "");
    return <img src={url} alt={alt ?? ""} className={className} {...rest} />;
  }
  return { default: MockImage };
});

vi.mock("next/link", () => {
  function MockLink({
    href,
    children,
    ...rest
  }: {
    href: string;
    children?: React.ReactNode;
    className?: string;
  }) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }
  return { default: MockLink };
});

vi.mock("next/dynamic", () => ({
  default: function mockDynamic() {
    function DynamicStub() {
      return <div data-testid="dynamic-map-stub" />;
    }
    return DynamicStub;
  },
}));

vi.mock("framer-motion", async () => {
  const React = await import("react");
  function el(tag: keyof React.JSX.IntrinsicElements) {
    return React.forwardRef(function MotionEl(
      props: React.HTMLAttributes<HTMLElement> & {
        children?: React.ReactNode;
        initial?: unknown;
        animate?: unknown;
        exit?: unknown;
        transition?: unknown;
        layout?: unknown;
        viewport?: unknown;
        whileInView?: unknown;
        whileHover?: unknown;
        whileTap?: unknown;
      },
      ref: React.Ref<HTMLElement>,
    ) {
      const { children, initial, animate, exit, transition, layout, viewport, whileInView, whileHover, whileTap, ...rest } =
        props;
      return React.createElement(tag, { ...rest, ref }, children);
    });
  }
  return {
    motion: {
      header: el("header"),
      main: el("main"),
      nav: el("nav"),
      div: el("div"),
      article: el("article"),
      section: el("section"),
      footer: el("footer"),
      button: el("button"),
      ul: el("ul"),
      li: el("li"),
      span: el("span"),
      a: el("a"),
      form: el("form"),
      p: el("p"),
      h1: el("h1"),
      h2: el("h2"),
      h3: el("h3"),
      aside: el("aside"),
    },
    AnimatePresence: ({ children }: { children?: React.ReactNode }) => (
      <>{children}</>
    ),
  };
});
