// For CSS imports with queries
declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
  }
  