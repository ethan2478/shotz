import type { HistoryItemSource, Point } from '@types';

export const sizes: Record<number, number> = {
  3: 18,
  6: 32,
  9: 46,
};

export interface TextData {
  size: number;
  color: string;
  fontFamily: string;
  x: number;
  y: number;
  text: string;
}

export interface TextEditData {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

export interface TextReEditData {
  size: number;
  color: string;
  text: string;
}

export interface TextareaBounds {
  x: number;
  y: number;
  maxWidth: number;
  maxHeight: number;
}

export default function draw(
  ctx: CanvasRenderingContext2D,
  action: HistoryItemSource<TextData, any>,
) {
  const { size, color, fontFamily, x, y, text } = action.data;

  const lastEditItem = action.editHistory.findLast(item => !!item.data.size);

  let finalColor = color;
  let finalSize = size;
  let finalText = text;
  if (lastEditItem?.data) {
    finalColor = lastEditItem.data.color;
    finalSize = lastEditItem.data.size;
    finalText = lastEditItem.data.text || '';
  }

  ctx.fillStyle = finalColor;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.font = `${sizes[finalSize]}px ${fontFamily}`;

  const distance = action.editHistory.reduce(
    (distance, { data }) => ({
      x: distance.x + (data.x2 || 0) - (data.x1 || 0),
      y: distance.y + (data.y2 || 0) - (data.y1 || 0),
    }),
    { x: 0, y: 0 },
  );

  finalText.split('\n').forEach((item, index) => {
    ctx.fillText(item, x + distance.x, y + distance.y + index * size);
  });
}

export function isHit(
  ctx: CanvasRenderingContext2D,
  action: HistoryItemSource<TextData, any>,
  point: Point,
) {
  const { size, color, fontFamily, text } = action.data;

  const lastEditItem = action.editHistory.findLast(item => !!item.data.size);

  let finalColor = color;
  let finalSize = size;
  let finalText = text;
  if (lastEditItem?.data) {
    finalColor = lastEditItem.data.color;
    finalSize = lastEditItem.data.size;
    finalText = lastEditItem.data.text || '';
  }

  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.font = `${sizes[finalSize]}px ${fontFamily}`;

  let width = 0;
  let height = 0;

  finalText.split('\n').forEach(item => {
    const measured = ctx.measureText(item);
    if (width < measured.width) {
      width = measured.width;
    }
    height += sizes[finalSize];
  });

  const distance = action.editHistory.reduce(
    (distance, { data }) => ({
      x: distance.x + (data.x2 || 0) - (data.x1 || 0),
      y: distance.y + (data.y2 || 0) - (data.y1 || 0),
    }),
    { x: 0, y: 0 },
  );

  const left = action.data.x + distance.x;
  const top = action.data.y + distance.y;
  const right = left + width;
  const bottom = top + height;

  return (
    point.x >= left && point.x <= right && point.y >= top && point.y <= bottom
  );
}
