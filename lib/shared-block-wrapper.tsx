import React from "react";
import { getBlockTypeForComponent } from "./block-registry";

export function withImprovementBlock<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  componentName: string
) {
  const blockType = getBlockTypeForComponent(componentName);

  return React.forwardRef<HTMLElement, P>((props, ref) => {
    if (!blockType) {
      return <WrappedComponent {...(props as any)} ref={ref as any} />;
    }

    // Pass data-improve-block down. The WrappedComponent MUST spread props to its root element
    // for this to work natively, or we can wrap it in a div. 
    // To ensure it works without modifying all components to accept and spread rest props,
    // we wrap it in a seamless div.
    return (
      <div data-improve-block={blockType} className="w-full h-full contents">
        <WrappedComponent {...(props as any)} ref={ref as any} />
      </div>
    );
  });
}
