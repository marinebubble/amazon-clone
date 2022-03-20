import React from 'react';
import "./Home.css";
import Product from './Product';

function Home() {
  return (
      <div className="home">
        <div className="home-container">
            <img className="home-image"
                src="https://images-fe.ssl-images-amazon.com/images/G/09/hpny22MDE02/Lead_Up/ja_JP_LU_EP_HR_DT_1.jpg"
                alt="">
            </img>

            <div className="home-row">
                <Product title="Dell モバイルノートパソコン" price={80819}
                image="https://m.media-amazon.com/images/I/715q5O-9F9L._AC_SL1500_.jpg" 
                rating={4} />
                <Product title="東芝 55V型 液晶テレビ レグザ 55M540X" price={31000}
                image="https://m.media-amazon.com/images/I/71pwhTqIkdL._AC_SL1500_.jpg" 
                rating={5}/>
                <Product title="GOKUMIN 低反発枕 まくら" price={3480}
                image="https://m.media-amazon.com/images/I/71+dRtyRNwL._AC_SL1500_.jpg" 
                rating={4}/>
            </div>

            <div className="home-row">
                 <Product title="シャープ 加湿 空気清浄機" price={20800}
                image="https://m.media-amazon.com/images/I/411sZm4oVcL._AC_SL1000_.jpg" 
                rating={4}/>
                 <Product title="ハイセンス 小型 冷蔵庫" price={21800}
                image="https://m.media-amazon.com/images/I/51lIQXkZZ8L._AC_SL1500_.jpg" 
                rating={4}/>
                <Product title="GTRACING ゲーミングチェア" price={18800}
                image="https://m.media-amazon.com/images/I/613SBEBLDcL._AC_SL1500_.jpg" 
                rating={4}/>
                <Product title="東京西川 マットレス" price={20474}
                image="https://m.media-amazon.com/images/I/81LtiorChfL._AC_SL1500_.jpg" 
                rating={4}/>
                
            </div>

            <div className="home-row">
            <Product title="NEC LEDシーリングライト" price={4980}
                image="https://m.media-amazon.com/images/I/4176qVTl-sL._AC_SL1000_.jpg" 
                rating={4}/>
            <Product title="ブラウン 光美容器 シルクエキスパート" price={42800}
                image="https://m.media-amazon.com/images/I/61HYhwFVPXL._AC_SL1000_.jpg" 
                rating={4}/>
            <Product title="タンスのゲン ベッド シングル" price={38980}
                image="https://m.media-amazon.com/images/I/61sO2m-+hdL._AC_SL1100_.jpg" 
                rating={4}/>
            </div>
        </div>
    </div>
  )
}

export default Home