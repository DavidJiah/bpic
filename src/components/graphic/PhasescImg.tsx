import React, { useEffect, useRef, useCallback } from 'react';
import type {ZRenderType} from 'zrender';
import { init, dispose, Rect, Group } from 'zrender';
import base from './base'

const onMouseover = (ctx: any) => {
  const { target } = ctx;
  const fill = target.shape.selected;
  target
    .animate('style', false)
    .when(100, {
      fill: fill ? '#F66' : '#600',
      shadowColor: '#F00',
    })
    .start();
};

const onMouseout = (ctx: any) => {
    const { target } = ctx;
    const fill = target.shape.selected;
    target
    .animate('style', false)
    .when(100, {
        fill: fill ? '#F00' : 'transparent',
        shadowColor: '#F00',
    })
    .start();
};

const onClick = (ctx: any) => {
    const { target } = ctx;
    const { editable } = target.shape;
    if (!editable){
      return;
    }
    const fill = !target.shape.selected;
    target.shape.selected = fill;
    target.listener(target.shape.index,fill);
    target
      .animate('style', false)
      .when(100, {
        fill: fill ? '#F00' : 'transparent',
        shadowColor: '#F00',
      })
      .start();
};

const registEvents = (directionArrow: any) => {
  directionArrow.on('mouseover', onMouseover);
  directionArrow.on('mouseout', onMouseout);
  directionArrow.on('click', onClick);
}

const createDirectionArrow = (props: any, listener: any) => {
  const shape = {
    x: 200,
    y: 200,
    height: 100,
    width: 25,
    angle: Math.PI / 4,
    turnRight: true,
    selected: false,
    index: [0, 0],
    editable: true,
    ... props.shape
  };
  const directionArrow: any = new base.DirectionArrow({
    shape,
    style: {
      fill: shape.selected?'#F00' : 'transparent',
      stroke: '#633',
      lineWidth: 0.5,
    },
  });
  directionArrow.listener = listener;
  registEvents(directionArrow);
  return directionArrow;
}

const createArrowGroup = ({ state, index, size }: any, listener: any, editable: boolean) => {
  const group = new Group();
  group.add(
    createDirectionArrow(
      {
        shape: {
          x: size * 2,
          y: size * 16,
          height: size * 6,
          width: size,
          angle: Math.PI / 3,
          turnRight: false,
          selected: state[0],
          index: [index, 0],
          editable,
        },
      },
      listener,
    ),
  );
  group.add(
    createDirectionArrow(
      {
        shape: {
          x: size * 2,
          y: size * 16 + size * 3,
          height: size * 6,
          width: size,
          angle: 0,
          turnRight: false,
          selected: state[1],
          index: [index, 1],
          editable,
        },
      },
      listener,
    ),
  );
  return group;
};

const mapStateToString = (state: boolean[][]) => {
  // 维度1 0:leftGroup 1:topGroup 2:rightGroup 3:bottomGroup
  // 维度2 0:左转 1：直行
  const result: number[] = [];
  if (state[3][0]) result.push(1);
  if (state[1][1]) result.push(2);
  if (state[0][0]) result.push(3);
  if (state[2][1]) result.push(4);
  if (state[1][0]) result.push(5);
  if (state[3][1]) result.push(6);
  if (state[2][0]) result.push(7);
  if (state[0][1]) result.push(8);
   return result.toString();
}
const mapStringToState = (str: string) => {
  // 维度1 0:leftGroup 1:topGroup 2:rightGroup 3:bottomGroup
  // 维度2 0:左转 1：直行
  const arr: number[] = str.split(',').map(value=>{
    return parseInt(value,10);
  });
  const state =  [ [false, false], [false, false], [false, false], [false, false], ];
  if(arr?.length){
    arr.forEach(value=>{
        if (value === 1) state[3][0] = true;
        if (value === 2) state[1][1] = true;
        if (value === 3) state[0][0] = true;
        if (value === 4) state[2][1] = true;
        if (value === 5) state[1][0] = true;
        if (value === 6) state[3][1] = true;
        if (value === 7) state[2][0] = true;
        if (value === 8) state[0][1] = true;
    });
  }
  return state;
};
const PhasescImg: React.FC<any> = (props: any = {}) => {
    const { 
      editable, // 是否可编辑 
      onChange, // 状态变更监听器 
      uid,  // 业务ID 多图共用监听器时用于区分变化来源
      state, // 初始数据
      size, // 箭头尺寸 图像大小=30*size 
    } = props;
    const guid = useRef<any>(base.guid());
    const stateRef = useRef<boolean[][]>([[]]);
    const render: any = useRef<ZRenderType>();
    const arrowSize = size || 6;
    const listener = useCallback(
      (index: number[], flag: boolean) => {
        stateRef.current[index[0]][index[1]] = flag;
        onChange(uid, mapStateToString(stateRef.current));
      },
      [onChange, uid],
    );
    const phasescImgId = `${guid.current}${uid}`;

    const clearRender = () => {
      // 组件销毁时销毁图像
      if (render.current) {
        dispose(render.current);
        render.current = null;
      }
    }
    useEffect(() => {
      const imgDom = document.getElementById(phasescImgId);
      if (!imgDom) return clearRender;
      if (render.current) {
        // 组件刷新先销毁再重建
        dispose(render.current);
      }
      render.current = init(imgDom, { width: arrowSize * 30, height: arrowSize * 30 });
      stateRef.current = state ? mapStringToState(state) : mapStringToState('');
      // 底色
      render.current.add(
        new Rect({
          shape: { x: 0, y: 0, width: arrowSize * 30, height: arrowSize * 30, },
          style: { fill: '#333', },
        }),
      );
      const leftGroup: any = createArrowGroup(
        {
          state: stateRef.current[0],
          index: 0,
          size: arrowSize,
        },
        listener,
        editable,
      );
      leftGroup.attr({
        position: [0, 0],
        origin: [arrowSize * 15, arrowSize * 15],
        rotation: 0,
      });
      render.current.add(leftGroup);
      const topGroup: any = createArrowGroup(
        {
          state: stateRef.current[1],
          index: 1,
          size: arrowSize,
        },
        listener,
        editable,
      );
      topGroup.attr({
        position: [0, 0],
        origin: [arrowSize * 15, arrowSize * 15],
        rotation: (Math.PI * 3) / 2,
      });
      render.current.add(topGroup);

      const rightGroup: any = createArrowGroup(
        {
          state: stateRef.current[2],
          index: 2,
          size: arrowSize,
        },
        listener,
        editable,
      );
      rightGroup.attr({
        position: [0, 0],
        origin: [arrowSize * 15, arrowSize * 15],
        rotation: Math.PI,
      });
      render.current.add(rightGroup);

      const bottomGroup: any = createArrowGroup(
        {
          state: stateRef.current[3],
          index: 3,
          size: arrowSize,
        },
        listener,
        editable,
      );
      bottomGroup.attr({
        position: [0, 0],
        origin: [arrowSize * 15, arrowSize * 15],
        rotation: Math.PI / 2,
      });
      render.current.add(bottomGroup);
      return clearRender;
    }, [arrowSize, editable, listener, phasescImgId, state]);
    
    return (
      <div id={phasescImgId}></div>
    );
}

export default PhasescImg;
