// global.d.ts
export {};

declare global {
  interface Window {
    PayOSCheckout: any; // You can replace `any` with the specific type if you have the type definition for `PayOSCheckout`
  }
}
