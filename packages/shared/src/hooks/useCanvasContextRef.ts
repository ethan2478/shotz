import useStore from '@hooks/useStore';
import type { CanvasContextRef } from '@types';

export default function useCanvasContextRef(): CanvasContextRef {
  const { canvasContextRef } = useStore();

  return canvasContextRef;
}
