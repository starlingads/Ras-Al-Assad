// Type declarations for Swiper Web Components custom elements

declare namespace JSX {
  interface IntrinsicElements {
    'swiper-container': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        init?: string;
        class?: string;
        navigation?: string;
        pagination?: string;
        ref?: React.RefObject<any>;
      },
      HTMLElement
    >;
    'swiper-slide': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        class?: string;
      },
      HTMLElement
    >;
  }
}
