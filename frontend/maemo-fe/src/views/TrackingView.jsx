import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import TrackingPath from '../assets/tracking.json'

const TrackingView = () => {
  useEffect(() => {
    document.querySelector('#jsonData').value = JSON.stringify(TrackingPath);
    document.querySelector('#startX').value = TrackingPath[0].x;
    document.querySelector('#startY').value = TrackingPath[0].y;
    document.querySelector('#endX').value = TrackingPath[TrackingPath.length - 1].x;
    document.querySelector('#endY').value = TrackingPath[TrackingPath.length - 1].y;
    

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
            height: "80%",
            zoom:15
          });
          let index = 0;
          let interval = setInterval(()=>{
            new Tmapv2.Circle({
              center: new Tmapv2.LatLng(JsonObj[index].x,JsonObj[index].y),
              radius: 4,
              strokeColor: "red",
              fillColor: "red",
              map: map
            });
            
            index += 1;
            if(index >= JsonObj.length) {
              console.log("ClearInterval");
              clearInterval(interval);
            }
          }, 1000)
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

  return (
    <>
    <div id="TMapApp"
      style={{
        height: "80%",
        width: "100%",
        position: "fixed",
       }}
    />
    <BottomDiv>
    <span>Start</span>
    <input type="text" id="jsonData"></input>
    <input id="startX" type="text"></input>
    <input id="startY" type="text"></input><br />
    <span>End</span>
    <input id="endX" type="text"></input>
    <input id="endY" type="text"></input><br />
    </BottomDiv>
    </>
  );
  
}

export default TrackingView;