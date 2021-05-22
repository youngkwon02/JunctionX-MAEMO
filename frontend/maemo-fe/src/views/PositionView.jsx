import React, {useState, useEffect} from 'react'
import styled, {css} from 'styled-components'
import PositionBottom from '../components/PositionView/positionBottom'
import axios from 'axios'
import {useHistory, useLocation} from 'react-router-dom'

const PositionView = () => {
  const location = useLocation()
  console.log(location.state)
  const history = useHistory()
  const [startPoint, setStart] = useState("")
  const [endPoint, setEnd] = useState("")
  const [startLocation, setStartLocation] = useState("")
  const [endLocation, setEndLocation] = useState("")
  const [toggle, setToggle] = useState(true)
  useEffect(() => {

    const script = document.createElement("script");
    script.innerHTML = `
        var map;
        var markers = [];
        function initTmap() {
          map = new Tmapv2.Map("TMapApp", {
            center: new Tmapv2.LatLng(37.566481622437934,126.98502302169841),
            width: "100%",
            height: "70%",
            zoom:11
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
            document.querySelector('#startPoint').value = markers[0]._marker_data.options.position._lng + ',' + markers[0]._marker_data.options.position._lat
            document.querySelector('#endPoint').value = markers[1]._marker_data.options.position._lng + ',' + markers[1]._marker_data.options.position._lat
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
    setToggle(!toggle)
    setStart((startPoint) => (document.querySelector('#startPoint').value));
    setEnd((endPoint) => (document.querySelector('#endPoint').value));
    convert(true, document.querySelector('#startPoint').value.split(","))
    convert(false, document.querySelector('#endPoint').value.split(","))
  }
  const REST_API_KEY = "f3a651e3f7153a7dd0db7dca8d289354"
  const convert = (location, pos) => {
    const [x, y] = pos
    location === true 
      ?
      axios({
        method:'get',
        headers: { Authorization: `KakaoAK ${REST_API_KEY}`, },
        url: `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${x}&y=${y}`,
      })
        .then(function (response) {
          setStartLocation(response.data.documents[1].address_name)
        })
      :
      axios({
        method:'get',
        headers: { Authorization: `KakaoAK ${REST_API_KEY}`, },
        url: `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${x}&y=${y}`,
      })
        .then(function (response) {
          setEndLocation(response.data.documents[1].address_name)
        });
  }

  const Line = styled.div`
    ${(props) =>
      props.locationQue &&
      css`
      font-weight: bold;
    `}
    ${(props) =>
      props.locationHolder &&
      css`
        margin-top: 8px;
        border-bottom: 2px solid rgba(0, 0, 0, .2);
        width: 100%;
        height: 30px;
        line-height: 30px;
        font-weight: normal;
    `}
  `;

  const NextBtn = styled.button`
    width: calc(100% - 40px);
    height: 50px;
    background-color: #fef000;
    color: black;
    border: none;
    font-weight: bold;
    margin-top: 30px;
    border-radius: 14px;
    text-align: center;
    position: absolute;
    bottom: 10px;
  `;

  const applyToggle = (
    <NextBtn onClick = {() => setPointState()}>적용하기</NextBtn>
  )

  const nextToggle = (
    <NextBtn onClick = {() => {history.push({
      pathname: "/request",
      state: {
              "timeData": location.state.timeData,
              "startLocation": startLocation,
              "endLocation": endLocation,
              "startPosition": document.querySelector('#startPoint').value.split(","),
              "endPosition": document.querySelector('#endPoint').value.split(",")
            }
    })}}>다음</NextBtn>
  )

  return (
    <>
    <div id="TMapApp"
      style={{
        height: "70%",
        width: "100%",
        position: "fixed",
       }}
    />
    <input type="text" id="startPoint"></input>
    <input type="text" id="endPoint"></input>
    <PositionBottom>
    <Line locationQue>어디로 이동하실 예정인가요?</Line>
    <Line locationHolder>{startLocation}</Line>
    <Line locationHolder>{endLocation}</Line>
       {toggle ? applyToggle : nextToggle}
    </PositionBottom>
    </>
  )
}
export default PositionView