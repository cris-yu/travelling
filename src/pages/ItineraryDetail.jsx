import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'antd-mobile';
import { LeftOutline } from 'antd-mobile-icons';
import { mockOrders, mockProducts } from '../data/mockData';
import { formatDate, makePhoneCall, openMap } from '../utils/helpers';
import './ItineraryDetail.css';

const ItineraryDetail = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const order = mockOrders.find(o => o.id === orderId);
  const product = order ? mockProducts.find(p => p.id === order.productId) : null;

  if (!order || !product) {
    return (
      <div className="itinerary-page">
        <div className="error-state">行程不存在</div>
      </div>
    );
  }

  return (
    <div className="itinerary-page">
      {/* 顶部导航 */}
      <div className="itinerary-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <LeftOutline fontSize={24} />
          <span>返回</span>
        </button>
        <h2 className="header-title">详细行程</h2>
      </div>

      {/* 当日关键信息 - 醒目展示 */}
      <div className="today-info-card">
        <div className="today-badge">当日行程</div>
        <h1 className="today-title">{order.productTitle}</h1>
        
        {/* 集合时间 - 超大字体 */}
        <div className="key-info time-info">
          <div className="info-icon">⏰</div>
          <div className="info-content">
            <div className="info-label">集合时间</div>
            <div className="info-value mega">{order.meetingTime}</div>
          </div>
        </div>

        {/* 集合地点 - 带地图导航 */}
        <div className="key-info location-info">
          <div className="info-icon">📍</div>
          <div className="info-content">
            <div className="info-label">集合地点</div>
            <div className="info-value large">{order.meetingPoint}</div>
          </div>
          <Button
            color="primary"
            size="large"
            className="navigate-btn"
            onClick={() => openMap(
              product.meetingPoint.latitude,
              product.meetingPoint.longitude,
              order.meetingPoint
            )}
          >
            🧭 一键导航
          </Button>
        </div>

        {/* 导游联系方式 - 一键拨打 */}
        <div className="key-info guide-info">
          <div className="info-icon">👨‍🏫</div>
          <div className="info-content">
            <div className="info-label">导游信息</div>
            <div className="info-value medium">
              {order.guideName} {order.guidePhone}
            </div>
          </div>
          <Button
            color="success"
            size="large"
            className="call-btn"
            onClick={() => makePhoneCall(order.guidePhone)}
          >
            📞 一键拨打
          </Button>
        </div>
      </div>

      {/* 详细行程时间轴 */}
      <div className="itinerary-section">
        <div className="section-title">📅 详细行程安排</div>
        <div className="itinerary-timeline">
          {product.itinerary.map((item, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-time-wrapper">
                <div className="timeline-time">{item.time}</div>
              </div>
              <div className="timeline-marker">
                <div className="timeline-dot"></div>
                {idx < product.itinerary.length - 1 && (
                  <div className="timeline-line"></div>
                )}
              </div>
              <div className="timeline-content">
                <div className="timeline-location">{item.location}</div>
                <div className="timeline-activity">{item.activity}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 温馨提示 */}
      <div className="tips-section">
        <div className="section-title">💡 温馨提示</div>
        <div className="tips-list">
          <div className="tip-item">
            <span className="tip-bullet">•</span>
            <span className="tip-text">请提前10分钟到达集合地点</span>
          </div>
          <div className="tip-item">
            <span className="tip-bullet">•</span>
            <span className="tip-text">请携带身份证等有效证件</span>
          </div>
          <div className="tip-item">
            <span className="tip-bullet">•</span>
            <span className="tip-text">如有身体不适请及时告知导游</span>
          </div>
          <div className="tip-item">
            <span className="tip-bullet">•</span>
            <span className="tip-text">请保管好随身贵重物品</span>
          </div>
          <div className="tip-item">
            <span className="tip-bullet">•</span>
            <span className="tip-text">请跟随导游，不要单独行动</span>
          </div>
        </div>
      </div>

      {/* 紧急联系 */}
      <div className="emergency-section">
        <div className="section-title">🚨 紧急联系</div>
        <div className="emergency-contacts">
          <Button
            color="danger"
            size="large"
            block
            className="emergency-btn"
            onClick={() => makePhoneCall('110')}
          >
            报警电话：110
          </Button>
          <Button
            color="danger"
            size="large"
            block
            className="emergency-btn"
            onClick={() => makePhoneCall('120')}
          >
            急救电话：120
          </Button>
          <Button
            color="primary"
            size="large"
            block
            className="emergency-btn"
            onClick={() => makePhoneCall('400-8888-8888')}
          >
            24小时客服：400-8888-8888
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ItineraryDetail;
