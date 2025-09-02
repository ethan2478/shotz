import React, { Dispatch, SetStateAction } from 'react';
import { zhCN } from '@constants';
import type {
  EmiterRef,
  History,
  Bounds,
  CanvasContextRef,
  Lang,
} from '@types';

export interface ImageEditorContextStore {
  url?: string;
  isLoading: boolean;
  image: HTMLImageElement | null;
  width: number;
  height: number;
  lang: Lang;
  emiterRef: EmiterRef;
  imageElRef: React.RefObject<HTMLImageElement>;
  canvasContextRef: CanvasContextRef;
  history: History;
  bounds: Bounds | null;
  cursor?: string;
  operation?: string;
}

export interface ImageEditorDispatcher {
  call?: <T>(funcName: string, ...args: T[]) => void;
  setHistory?: Dispatch<SetStateAction<History>>;
  setBounds?: Dispatch<SetStateAction<Bounds | null>>;
  setCursor?: Dispatch<SetStateAction<string | undefined>>;
  setOperation?: Dispatch<SetStateAction<string | undefined>>;
  setWidth?: Dispatch<SetStateAction<number>>;
  setHeight?: Dispatch<SetStateAction<number>>;
}

export interface ImageEditorContextValue {
  store: ImageEditorContextStore;
  dispatcher: ImageEditorDispatcher;
}

export const ImageEditorContext = React.createContext<ImageEditorContextValue>({
  store: {
    url: undefined,
    isLoading: false,
    image: null,
    width: 0,
    height: 0,
    lang: zhCN,
    emiterRef: { current: {} },
    imageElRef: { current: null },
    canvasContextRef: { current: null },
    history: {
      index: -1,
      stack: [],
    },
    bounds: null,
    cursor: 'move',
    operation: undefined,
  },
  dispatcher: {
    call: undefined,
    setHistory: undefined,
    setBounds: undefined,
    setCursor: undefined,
    setOperation: undefined,
    setWidth: undefined,
    setHeight: undefined,
  },
});
