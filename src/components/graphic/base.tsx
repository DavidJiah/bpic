import {Path} from 'zrender';
/**
 * 坐标旋转 
 */
const rotate = ( point: number[], center: number[], rad: number, out: number[])=>{
  const x = point[0] - center[0];
  const y = point[1] - center[1];
  const c = x * Math.cos(rad) - y * Math.sin(rad);
  const d = y * Math.cos(rad) + x * Math.sin(rad);
  // eslint-disable-next-line no-param-reassign
  out[0] = c + center[0];
  // eslint-disable-next-line no-param-reassign
  out[1] = d + center[1];
};

const S4 = () => {
  // eslint-disable-next-line no-bitwise
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};
const guid = () => {
  // UUID生成
  return `${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
};

const DirectionArrow = Path.extend({
  type: 'directionArrow',
  shape: {
    x: 0, // 基准位置横坐标
    y: 0, // 基准位置纵坐标
    width: 0, // 箭头尾巴宽度
    height: 0, // 箭头尾巴高度
    angle: 0, // 箭头旋转角度
    selected: false, // 是否已选择
    turnRight: true, // 是否右转箭头
    index: [0, 0], // 箭头索引
    editable: true, // 是否允许编辑
  },

  buildPath(ctx, shape) {
    const { x, y, width, height, turnRight, angle } = shape;
    ctx.moveTo(x, y);

    // 从尾部开始
    ctx.lineTo(x, y - width / 2);
    ctx.lineTo(x + height, y - width / 2);
    // 画圆弧1
    if (turnRight) {
      ctx.arc( x + height, y + (width * 3) / 2, 2 * width, -0.5 * Math.PI, angle - 0.5 * Math.PI, false, );
    } else {
      ctx.arc(x + height, y - (width * 3) / 2, width, 0.5 * Math.PI, 0.5 * Math.PI - angle, true);
    }
    // 箭头
    const path: number[][] = [
      [x + height, y - width / 2],
      [x + height + width, y - width / 2],
      [x + height + width, y - width],
      [x + height + width * 2, y],
      [x + height + width, y + width],
      [x + height + width, y + width / 2],
      [x + height, y + width / 2],
    ];
    // 旋转中心
    const center = turnRight
      ? [x + height, y + (width * 3) / 2]
      : [x + height, y - (width * 3) / 2];
    // 旋转箭头
    path.forEach((value) => {
      rotate(value, center, turnRight ? angle : -angle, value);
      ctx.lineTo(value[0], value[1]);
    });

    // 画圆弧2
    if (turnRight) {
      ctx.arc(x + height, y + (width * 3) / 2, width, angle - 0.5 * Math.PI, -0.5 * Math.PI, true);
    } else {
      ctx.arc( x + height, y - (width * 3) / 2, width * 2, 0.5 * Math.PI - angle, 0.5 * Math.PI, false, );
    }
    // 闭合尾部
    ctx.lineTo(x + height, y + width / 2);
    ctx.lineTo(x, y + width / 2);
    ctx.lineTo(x, y);
    ctx.closePath();
  },
});

const base = {
  DirectionArrow,
  rotate,
  guid,
};
export default base;