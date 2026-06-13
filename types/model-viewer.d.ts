import type { DetailedHTMLProps, HTMLAttributes } from "react";

type ModelViewerElement = HTMLElement;

type ModelViewerProps = DetailedHTMLProps<
  HTMLAttributes<ModelViewerElement>,
  ModelViewerElement
> & {
  alt?: string;
  "auto-rotate"?: boolean | "";
  "auto-rotate-delay"?: string;
  "camera-controls"?: boolean | "";
  "camera-orbit"?: string;
  "camera-target"?: string;
  "disable-zoom"?: boolean | "";
  "environment-image"?: string;
  exposure?: string;
  "field-of-view"?: string;
  "interaction-prompt"?: "auto" | "none" | "when-focused";
  loading?: "auto" | "lazy" | "eager";
  "max-camera-orbit"?: string;
  "max-field-of-view"?: string;
  "min-camera-orbit"?: string;
  "min-field-of-view"?: string;
  poster?: string;
  reveal?: "auto" | "interaction" | "manual";
  "rotation-per-second"?: string;
  "shadow-intensity"?: string;
  "shadow-softness"?: string;
  src?: string;
  "touch-action"?: string;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerProps;
    }
  }
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerProps;
    }
  }
}

export {};
