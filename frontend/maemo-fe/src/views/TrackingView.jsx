import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
// import TrackingPath from '../utils/trackingData/banpo2yongsan.json' // Zoom Level: 13
// import TrackingPath from '../utils/trackingData/gwanghwa2jonggak.json' // Zoom Level: 15
import TrackingPath from '../utils/trackingData/deviation/gwanghwa2jonggak.json' // Zoom Level: 15
import Layer from '../components/TrackingView/layer/layer'
import marker from '../assets/marker.svg'
import {postAxios} from '../api/axios'

const TrackingView = () => {
  useEffect(() => {
    document.querySelector('#jsonData').value = JSON.stringify(TrackingPath);
    document.querySelector('#startX').value = TrackingPath[0].x;
    document.querySelector('#startY').value = TrackingPath[0].y;
    document.querySelector('#endX').value = TrackingPath[TrackingPath.length - 1].x;
    document.querySelector('#endY').value = TrackingPath[TrackingPath.length - 1].y;
    document.querySelector('#marker').value = marker;

    var target = document.getElementById('warning-layer');
    var observer = new MutationObserver(function(mutations) 
    { mutations.forEach(function(mutation) { 
      postAxios('/notification');
      observer.disconnect();
     }); });


    var config = { attributes: true, childList: true, characterData: true };
    observer.observe(target, config);

    const script = document.createElement("script");
    script.innerHTML = `
        const getPoint = (pointX, pointY) => {
          return {"x": pointX, "y": pointY};
        }
        
        const getDistance = (pointA, pointB) => {
          diffX = (pointA.x - pointB.x <= 0) ? pointB.x - pointA.x : pointA.x - pointB.x;
          diffY = (pointA.y - pointB.y <= 0) ? pointB.y - pointA.y : pointA.y - pointB.y;
          let sqrt = Math.sqrt((diffX**2) + (diffY ** 2));
          return sqrt;
        }
        const isDeviation = (centerPoint, targetPoint, radius) => {
          let distance = getDistance(centerPoint, targetPoint);
          if(distance > radius) {
            return true;
          }else {
            return false;
          }
        }
        
        var map;
        var markers = [];
        const startX = parseFloat(document.querySelector('#startX').value);
        const startY = parseFloat(document.querySelector('#startY').value);
        const startPoint = getPoint(startX, startY);
        const endX = parseFloat(document.querySelector('#endX').value);
        const endY = parseFloat(document.querySelector('#endY').value);
        const centerX = (startX + endX) / 2;
        const centerY = (startY + endY) / 2;
        const centerPoint = getPoint(centerX, centerY);
        const radius = getDistance(startPoint, centerPoint);
        const JsonObj = JSON.parse(document.querySelector('#jsonData').value);
        function initTmap() {
          map = new Tmapv2.Map("TMapApp", {
            center: new Tmapv2.LatLng(centerX, centerY),
            width: "100%",
            height: "100%",
            zoom:15
          });
          let index = 0;
          let interval = setInterval(()=>{
            var marker = new Tmapv2.Marker({
              position: new Tmapv2.LatLng(JsonObj[index].x,JsonObj[index].y), //Marker의 중심좌표 설정.
              map: map //Marker가 표시될 Map 설정..
            });
            if(index != JsonObj.length-1 && isDeviation(centerPoint, JsonObj[index], radius)) {
              console.log("Deviation");
              document.querySelector('#warning-layer').style.display = "block";
            }else {
              console.log("Not Deviation");
            }
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
              location.href="./final";
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
    <Layer id="warning-layer">예상 경로를<br/>벗어났습니다.<br/><br/>보호자에게 문자를 전송합니다.</Layer>
    <BottomDiv>
    <TrackingInput id="jsonData" type="text"></TrackingInput>
    <TrackingInput id="startX" type="text"></TrackingInput>
    <TrackingInput id="startY" type="text"></TrackingInput>
    <TrackingInput id="endX" type="text"></TrackingInput>
    <TrackingInput id="endY" type="text"></TrackingInput>
    <TrackingInput id="marker" type="text"></TrackingInput>
    <TrackingInput id="deviationState" type="text"></TrackingInput>
    </BottomDiv>
    </>
  );

}

export default TrackingView;