import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import TrackingPath from '../assets/tracking.json'
import marker from '../assets/marker.svg'

const TrackingView = () => {
  useEffect(() => {
    document.querySelector('#jsonData').value = JSON.stringify(TrackingPath);
    document.querySelector('#startX').value = TrackingPath[0].x;
    document.querySelector('#startY').value = TrackingPath[0].y;
    document.querySelector('#endX').value = TrackingPath[TrackingPath.length - 1].x;
    document.querySelector('#endY').value = TrackingPath[TrackingPath.length - 1].y;
    document.querySelector('#marker').value = marker;
    
    const script = document.createElement("script");
    script.innerHTML = `
        var map;
        var markers = [];
        const startX = parseFloat(document.querySelector('#startX').value);
        const startY = parseFloat(document.querySelector('#startY').value);
        const endX = parseFloat(document.querySelector('#endX').value);
        const endY = parseFloat(document.querySelector('#endY').value);
        const centerX = (startX + endX) / 2;
        const centerY = (startY + endY) / 2;
        const JsonObj = JSON.parse(document.querySelector('#jsonData').value);
        function initTmap() {
          map = new Tmapv2.Map("TMapApp", {
            center: new Tmapv2.LatLng(centerX, centerY),
            width: "100%",
            height: "100%",
            zoom:13
          });
          let index = 0;
          let interval = setInterval(()=>{

            var marker = new Tmapv2.Marker({
              position: new Tmapv2.LatLng(JsonObj[index].x,JsonObj[index].y), //Marker의 중심좌표 설정.
              map: map //Marker가 표시될 Map 설정..
            });
          setInterval(()=>{
            let markersEle = document.querySelectorAll("#TMapApp > div > div:nth-child(3) > img");
            for(let i=0; i<markersEle.length; i++) {
              if(markersEle[i].src != document.querySelector('#marker').value){
                markersEle[i].src = document.querySelector('#marker').value;
              }
            }
          }, 100);
            index += 1;
            if(index >= JsonObj.length) {
              clearInterval(interval);
            }
          }, 1000);
        }
        initTmap();
        
   `;
    script.type = "text/javascript";
    script.async = "async";
    document.head.appendChild(script);
  }, []);

  const BottomDiv = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
  `

  const TrackingInput = styled.input`
    display: none;
  `

  return (
    <>
    <div id="TMapApp"
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
       }}
    />
    <BottomDiv>
    <TrackingInput type="text" id="jsonData"></TrackingInput>
    <TrackingInput id="startX" type="text"></TrackingInput>
    <TrackingInput id="startY" type="text"></TrackingInput>
    <TrackingInput id="endX" type="text"></TrackingInput>
    <TrackingInput id="endY" type="text"></TrackingInput>
    <TrackingInput id="marker" type="text"></TrackingInput>
    </BottomDiv>
    </>
  );
  
}

export default TrackingView;