/**
 * @class Slider2Handle
 */

 import React from "react";
 import styled from "styled-components";
 
 const SliderHandle = ({
   className,
   domain: [min, max],
   handle: { id, value, percent },
   getHandleProps,
   ...restProps
 }) => (
   <HandleButton
     role="slider"
     className={className}
     aria-valuemin={min}
     aria-valuemax={max}
     aria-valuenow={value}
     percent={percent}
     {...restProps}
     {...getHandleProps(id)}
   />
 );
 
 const HandleButton = styled.button`
   position: absolute;
   left: ${p => p.percent}%;
   margin-left: -11px;
   margin-top: -6px;
   z-index: 2;
   width: 24px;
   height: 24px;
   cursor: pointer;
   border: 0;
   border-radius: 50%;
   box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
   background-color: #fff;
   border: 1px solid #cbcbcb;
   transition: box-shadow 0.2s ease;
 
   &:focus,
   &:active,
   &:hover {
     outline: 0;
     box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.15);
   }
 `;
 
 export default SliderHandle;
 