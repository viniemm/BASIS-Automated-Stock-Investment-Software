/* eslint-disable react/prop-types */
/**
 * @class Slider2
 */

 import React from "react";
 import styled from "styled-components";
 
 const SliderTrack = ({
   source,
   target,
   getTrackProps,
   className,
   ...restProps
 }) => (
   <Track
     className={className}
     source={source}
     target={target}
     {...restProps}
     {...getTrackProps()}
   />
 );
 
 const Track = styled.div`
   position: absolute;
   left: ${p => p.source.percent}%;
   z-index: 1;
   width: ${p => p.target.percent - p.source.percent}%;
   height: 14px;
   cursor: pointer;
   border: 0;
   border-radius: 7px;
   background-color: #3c61e7;
 `;
 
 export default SliderTrack;
 