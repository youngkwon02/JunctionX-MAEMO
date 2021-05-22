import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
const PositionView = () => {
  const [startPoint, setStart] = useState("")
  const [endPoint, setEnd] = useState("")
  useEffect(() => {

    const script = document.createElement("script");
    script.innerHTML = `
        var map;
        var markers = [];
        function initTmap() {
          map = new Tmapv2.Map("TMapApp", {
            center: new Tmapv2.LatLng(37.566481622437934,126.98502302169841),
            width: "100%",
            height: "80%",
            zoom:15
          });
          map.addListener("click", onClick);
        }
        initTmap();
        function onClick(e){
          // 클릭한 위치에 새로 마커를 찍기 위해 이전에 있던 마커들을 제거
          if(markers.length >= 2) {
            removeMarkers();
          }
          lonlat = e.latLng;
          //Marker 객체 생성.
          marker = new Tmapv2.Marker({
            position: new Tmapv2.LatLng(lonlat.lat(),lonlat.lng()), //Marker의 중심좌표 설정.
            map: map //Marker가 표시될 Map 설정.
          });
          markers.push(marker);
          if(markers.length === 2) {
            setTimeout(()=>{
              document.querySelector('#startPoint').value = markers[0]._elementBounds._left + ',' + markers[0]._elementBounds._top;
              document.querySelector('#endPoint').value = markers[1]._elementBounds._left + ',' + markers[1]._elementBounds._top;
            },500);
          }
        }
        function removeMarkers() {
          for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
          }
          markers = [];
        }
   `;
    script.type = "text/javascript";
    script.async = "async";
    document.head.appendChild(script);
  }, []);
  



  const setPointState = () => {
    setStart((startPoint) => (document.querySelector('#startPoint').value));
    setEnd((endPoint) => (document.querySelector('#endPoint').value));
  }

  return (
    <>
    <div id="TMapApp"
      style={{
        height: "80%",
        width: "100%",
        position: "fixed",
       }}
    />
    <input type="text" id="startPoint"></input>
    <input type="text" id="endPoint"></input>
    <div onClick = {() => {setPointState()}} style={{position: "absolute", bottom: "0"}}>test</div>
    <div style={{position: "absolute", bottom: "20px"}}>{startPoint}</div>
    <div style={{position: "absolute", bottom: "10px"}}>{endPoint}</div>
    </>
  )
}
export default PositionView