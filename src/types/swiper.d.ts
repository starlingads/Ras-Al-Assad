// Type declarations for Swiper Web Components custom elements.
//
// These back the `<swiper-container>` / `<swiper-slide>` elements registered via
// `swiper/element/bundle` in ExpertiseSlider and ProjectsSlider.
//
// React 19 removed the global `JSX` namespace, so custom intrinsic elements are
// declared by augmenting the `JSX` namespace inside the "react" module instead.
// The `import` below is what makes this file a module, which is required for
// `declare module` augmentation to apply.
import type * as React from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "swiper-container": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          init?: string;
          class?: string;
          navigation?: string;
          pagination?: string;
          ref?: React.RefObject<any>;
        },
        HTMLElement
      >;
      "swiper-slide": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          class?: string;
        },
        HTMLElement
      >;
    }
  }
}
