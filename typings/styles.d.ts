declare module '*.scss' {
    const content: { readonly [className: string]: string };
    export default content;
}

declare module '*.css' {
    const content: { readonly [className: string]: string };
    export default content;
}