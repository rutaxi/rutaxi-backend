import React from 'react';
import './TaxiPartyDetail.css'
import { LoadMap } from '../components/loadMap';
import { TaxiDetail } from '../components/taxiDetail';

function TaxiPartyDetail({ userName }) {
  return (
    <div id='taxi-party-detail-wrapper'>
        {/* 택시팟 디테일 타이틀 */}
        <div id='taxi-party-detail-community'>97여단</div>
        <h2>Taxi Party</h2>
    
        {/* 구글 지도 */}
        <LoadMap />

        {/* 택시팟 디테일 박스 */}
        <TaxiDetail userName={userName} />
    </div>
  );
}

export default TaxiPartyDetail;