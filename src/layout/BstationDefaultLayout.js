import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {Buffer} from 'buffer';
import "../assets/css/bstation.default.style.css";
import "../assets/css/bstation.vendor.style.css";

const BstationDefaultLayout = () => {

  const [searchParams] = useSearchParams();
  const [cssConfig, setCssConfig] = useState('');

  useEffect(() => {
    const ParsingConfig = () => {
      if (searchParams.get("cfg") == null)
        return;

      let decodedConfig = Buffer.from(searchParams.get("cfg"), "base64").toString();
      setCssConfig(decodedConfig);
    };

    ParsingConfig();
  }, [searchParams])
  
  return (
    <div className="style-scope yt-live-chat-app yt-live-chat-renderer chat-app light">
      <style>
        {cssConfig}
      </style>

      <div className="chat-renderer-scroll-wrapper style-scope yt-live-chat-renderer yt-live-chat-item-list-renderer">
        <div id="item-scroller" className="chat-renderer-scroller style-scope yt-live-chat-item-list-renderer animated" style={{ overflowY: 'hidden', margin: '20px', height: 'calc(100% - 40px)' }}>
          <div id="item-offset" className="style-scope yt-live-chat-item-list-renderer">
            <div id="items" className="items style-scope yt-live-chat-item-list-renderer" style={{ overflow: 'hidden', transform: 'translateY(0px)' }}>
              <div className="style-scope yt-live-chat-item-list-renderer">
                <div className="message-item-wrapper">
                  <div className="message-item">
                    <div className="message-text-part type-system"><span>System: </span> Welcome to your
                      streaming room!!!</div>
                    {/**/}
                  </div>
                </div>
              </div>
              <div className="style-scope yt-live-chat-item-list-renderer">
                <div className="message-item-wrapper">
                  <div className="message-item">
                    <div className="message-text-part type-system"><span>System: </span> Here you can see all
                      the real-time comments of your audiences. </div>
                    {/**/}
                  </div>
                </div>
              </div>
              <div className="style-scope yt-live-chat-item-list-renderer">
                <div className="message-item-wrapper" style={{ backgroundColor: 'rgba(153, 0, 0, 0)' }}>
                  <div className="message-item">
                    <div className="message-text-part type-name">
                      {/**/} Kaname Orion :
                    </div>
                    {/**/}
                    <div className="message-text-part">
                      {/**/} Hawwwooo
                    </div>
                    {/**/}
                  </div>
                </div>
              </div>
              <div className="style-scope yt-live-chat-item-list-renderer">
                <div className="message-item-wrapper" style={{ backgroundColor: 'rgba(153, 0, 0, 0)' }}>
                  <div className="message-item">
                    <div className="message-text-part type-name">
                      Kaname Orion
                    </div>
                    <div className="message-text-part">
                      sent
                    </div>
                    <div className="message-text-part type-gift">
                      Bunga
                    </div>
                    <div className="message-icon-part" style={{ width: '50px', height: '50px' }}><img alt="bunga" src="/assets/images/2d8fa2a0ac30430516c5ead3960548a9.gif" /></div>
                    <div className="message-text-part type-giftnum">
                    </div>
                  </div>
                </div>
              </div>
              <div className="style-scope yt-live-chat-item-list-renderer">
                <div className="message-item-wrapper" style={{ backgroundColor: 'rgba(153, 0, 0, 0)' }}>
                  <div className="message-item">
                    <div className="message-text-part type-name">
                      {/**/} Kaname Orion
                    </div>
                    {/**/}
                    <div className="message-text-part">
                      {/**/} sent
                    </div>
                    {/**/}
                    <div className="message-text-part type-gift">
                      {/**/} Flowers
                    </div>
                    {/**/}
                    {/**/}
                    <div className="message-icon-part" style={{ width: '50px', height: '50px' }}><img src="/assets/images/2d8fa2a0ac30430516c5ead3960548a9.gif" alt="Bunga" /></div>
                    <div className="message-text-part type-giftnum">
                      {/**/} ×5 in total
                    </div>
                    {/**/}
                  </div>
                </div>
              </div>
              <div className="style-scope yt-live-chat-item-list-renderer">
                <div className="message-item-wrapper" style={{ backgroundColor: 'rgba(153, 0, 0, 0)' }}>
                  <div className="message-item">
                    <div className="message-text-part type-name">
                      {/**/} Bambang :
                    </div>
                    {/**/}
                    <div className="message-text-part">
                      {/**/} Mantap bang
                    </div>
                    {/**/}
                  </div>
                </div>
              </div>
              <div className="style-scope yt-live-chat-item-list-renderer">
                <div className="message-item-wrapper" style={{ backgroundColor: 'rgba(153, 0, 0, 0)' }}>
                  <div className="message-item">
                    <div className="message-text-part type-name">
                      {/**/} Samsul :
                    </div>
                    {/**/}
                    <div className="message-text-part">
                      {/**/} WKWKWK bingung mau nulis apaan
                    </div>
                    {/**/}
                  </div>
                </div>
              </div>
              <div className="style-scope yt-live-chat-item-list-renderer">
                <div className="message-item-wrapper" style={{ backgroundColor: 'rgba(153, 0, 0, 0)' }}>
                  <div className="message-item">
                    {/**/}
                    <div className="message-icon-part" style={{ width: '50px', height: '25px' }}><img alt="top" src="data:image/png;base64,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" />
                    </div>
                    <div className="message-text-part type-name">
                      {/**/} Asep :
                    </div>
                    {/**/}
                    <div className="message-text-part">
                      {/**/} Gift dong bro
                    </div>
                    {/**/}
                  </div>
                </div>
              </div>
              <div className="style-scope yt-live-chat-item-list-renderer">
                <div className="message-item-wrapper" style={{ backgroundColor: 'rgba(153, 0, 0, 0)' }}>
                  <div className="message-item">
                    <div className="message-text-part type-name">
                      {/**/} Garox :
                    </div>
                    {/**/}
                    <div className="message-text-part">
                      {/**/} G ada duit bang
                    </div>
                    {/**/}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BstationDefaultLayout;