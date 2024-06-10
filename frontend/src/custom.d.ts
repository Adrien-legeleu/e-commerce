declare namespace JSX {
  interface IntrinsicElements {
    "lord-icon": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      src?: string;
      trigger?: string;
      style?: any;
      state?: string;
      colors?: string;
      delay?: string;
    };
  }
}
