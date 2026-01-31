/// <reference types="vite/client" />

// Type declaration for Lottie animation files
declare module '*.lottie' {
    const content: any;
    export default content;
}
