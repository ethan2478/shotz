import type { Bounds, HistoryItemSource, Point } from '@types';

interface DrawCrispImage {
  /** 源图 */
  sourceImg: HTMLImageElement;
  /** 目标canvas */
  canvas: HTMLCanvasElement;
  /** 目标canvas context，默认为 canvas.getContext('2d') */
  ctx?: CanvasRenderingContext2D;
  /** 目标canvas宽度 */
  width: number;
  /** 目标canvas高度 */
  height: number;
  /** 绘制前是否先清空画布，默认为true */
  clear?: boolean;
}

interface CopyCanvasRegion {
  /** 源canvas */
  sourceCanvas: HTMLCanvasElement;
  /** 源canvas是否启用了dpr，默认为true */
  enableDpr?: boolean;
  /** 目标canvas */
  resultCanvas: HTMLCanvasElement;
  /** 目标canvas context，默认为 resultCanvas.getContext('2d') */
  resultCtx?: CanvasRenderingContext2D;
  /** 复制源canvas的范围，其中，复制时也会以源canvas复制范围的宽高作为目标canvas的宽高 */
  bounds: Bounds;
  /** 复制前是否清空目标canvas画布，默认为true */
  clear?: boolean;
}

/**
 * 高保真绘制图片到canvas上
 */
export const drawCrispImage = ({
  sourceImg,
  canvas,
  ctx,
  width,
  height,
  clear = true,
}: DrawCrispImage) => {
  const dpr = window.devicePixelRatio || 1;

  ctx = ctx || (canvas.getContext('2d') as CanvasRenderingContext2D);

  if (!ctx || !canvas || !sourceImg) return;

  // 画布大小
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  // 样式大小
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  // 缩放坐标系到dpr
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  // 抗锯齿
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  if (clear) {
    ctx.clearRect(0, 0, width, height);
  }

  ctx.drawImage(sourceImg, 0, 0, width, height);
};

/**
 * 从源canvas复制到目标canvas
 */
export const copyCanvasRegion = ({
  sourceCanvas,
  enableDpr = true,
  resultCanvas,
  resultCtx,
  bounds,
  clear = true,
}: CopyCanvasRegion) => {
  const dpr = window.devicePixelRatio || 1;
  const { x, y, width, height } = bounds;

  const canvas = resultCanvas;
  const ctx = resultCtx || canvas.getContext('2d');

  if (!sourceCanvas || !canvas || !ctx) return;

  // 画布大小
  canvas.width = enableDpr ? width * dpr : width;
  canvas.height = enableDpr ? height * dpr : height;
  // 样式大小
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  // 抗锯齿
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // 缩放坐标系到dpr
  if (enableDpr) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  if (clear) {
    ctx.clearRect(0, 0, width, height);
  }

  const sx = enableDpr ? x * dpr : x;
  const sy = enableDpr ? y * dpr : y;
  const sw = enableDpr ? width * dpr : width;
  const sh = enableDpr ? height * dpr : height;

  ctx.drawImage(sourceCanvas, sx, sy, sw, sh, 0, 0, width, height);
};

/**
 * 将目标canvas输出为image
 */
export const composeImage = (ctx: CanvasRenderingContext2D): Promise<Blob> => {
  return new Promise<Blob>((resolve, reject) => {
    if (!ctx) {
      return reject(new Error('Canvas context is required'));
    }

    ctx.canvas.toBlob(blob => {
      if (!blob) {
        return reject(new Error('Canvas to Blob failed'));
      }
      resolve(blob);
    }, 'image/png');
  });
};

const DRAG_CIRCLE_RADIUS = 4;
const DRAG_CIRCLE_STROKE_COLOR = '#000000';
const DRAG_CIRCLE_FILL_COLOR = '#ffffff';

/**
 * 画拖拽的小圆
 */
export const drawDragCircle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
) => {
  ctx.lineWidth = 1;
  ctx.strokeStyle = DRAG_CIRCLE_STROKE_COLOR;
  ctx.fillStyle = DRAG_CIRCLE_FILL_COLOR;

  ctx.beginPath();
  ctx.arc(x, y, DRAG_CIRCLE_RADIUS, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
};

export const isHit = <S, E>(
  ctx: CanvasRenderingContext2D,
  action: HistoryItemSource<S, E>,
  point: Point,
) => {
  action.draw(ctx, action);
  const { data } = ctx.getImageData(point.x, point.y, 1, 1);
  return data.some(val => val !== 0);
};

export const isHitCircle = (
  canvas: HTMLCanvasElement | null,
  e: MouseEvent,
  point: Point,
) => {
  if (!canvas) {
    return false;
  }

  const { left, top } = canvas.getBoundingClientRect();

  const x = e.clientX - left;
  const y = e.clientY - top;

  // 点到圆心的距离是否小于半径
  return (point.x - x) ** 2 + (point.y - y) ** 2 < DRAG_CIRCLE_RADIUS ** 2;
};
