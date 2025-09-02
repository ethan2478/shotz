import type { MutableRefObject } from 'react';

export type CanvasContexts = {
  panelCtx: CanvasRenderingContext2D | null;
  resultCtx: CanvasRenderingContext2D | null;
};

export type CanvasContextRef = MutableRefObject<CanvasContexts | null>;

export type EmiterListener = (...args: any) => unknown;
export type Emiter = Record<string, EmiterListener[]>;
export type EmiterRef = MutableRefObject<Emiter>;

export interface Point {
  x: number;
  y: number;
}

export enum HistoryItemType {
  Edit,
  Source,
}

export interface HistoryItemEdit<E, S> {
  type: HistoryItemType.Edit;
  data: E;
  source: HistoryItemSource<S, E>;
}

export interface HistoryItemSource<S, E> {
  name: string;
  type: HistoryItemType.Source;
  data: S;
  isSelected?: boolean;
  editHistory: HistoryItemEdit<E, S>[];
  draw: (
    ctx: CanvasRenderingContext2D,
    action: HistoryItemSource<S, E>,
  ) => void;
  isHit?: (
    ctx: CanvasRenderingContext2D,
    action: HistoryItemSource<S, E>,
    point: Point,
  ) => boolean;
}

export type HistoryItem<S, E> = HistoryItemEdit<E, S> | HistoryItemSource<S, E>;

export interface History {
  index: number;
  stack: HistoryItem<any, any>[];
}

export interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type Position = Point;

export interface Lang {
  operation_ok_title: string;
  operation_cancel_title: string;
  operation_save_title: string;
  operation_redo_title: string;
  operation_undo_title: string;
  operation_mosaic_title: string;
  operation_text_title: string;
  operation_brush_title: string;
  operation_arrow_title: string;
  operation_ellipse_title: string;
  operation_rectangle_title: string;
}

export type Theme = 'light' | 'dark';
