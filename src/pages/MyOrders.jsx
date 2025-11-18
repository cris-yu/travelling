import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Tabs } from 'antd-mobile';
import { LeftOutline } from 'antd-mobile-icons';
import { mockOrders, mockProducts } from '../data/mockData';
import { 
  formatDate, 
  formatPrice, 
  makePhoneCall, 
  openMap,
  shareItinerary,
  getOrderStatusText,
  getOrderStatusColor
} from '../utils/helpers';
import './MyOrders.css';

const MyOrders = () => {
  const navigate = useNavigate();

  return (
    <div className="my-orders-page">
      {/* 顶部导航 */}
      <div className="orders-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          <LeftOutline fontSize={24} />
          <span>返回</span>
        </button>
        <h2 className="header-title">我的行程</h2>
      </div>

      {/* 订单列表 */}
      <div className="orders-container">
        {mockOrders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <div className="empty-text">暂无行程记录</div>
            <Button
              color="primary"
              size="large"
              onClick={() => navigate('/')}
            >
              去看看旅游产品
            </Button>
          </div>
        ) : (
          mockOrders.map(order => (
            <div key={order.id} className="order-card">
              {/* 订单头部 */}
              <div className="order-header">
                <div className="order-title">{order.productTitle}</div>
                <div 
                  className="order-status"
                  style={{ color: getOrderStatusColor(order.status) }}
                >
                  {getOrderStatusText(order.status)}
                </div>
              </div>

              {/* 关键信息突出显示 */}
              <div className="order-highlights">
                <div className="highlight-item urgent">
                  <div className="highlight-label">集合时间</div>
                  <div className="highlight-value time">{order.meetingTime}</div>
                </div>
                
                <div className="highlight-item urgent">
                  <div className="highlight-label">集合地点</div>
                  <div className="highlight-value location">{order.meetingPoint}</div>
                  <button 
                    className="action-btn map-btn"
                    onClick={() => openMap(39.9163, 116.4079, order.meetingPoint)}
                  >
                    📍 导航
                  </button>
                </div>

                <div className="highlight-item">
                  <div className="highlight-label">导游电话</div>
                  <div className="highlight-value phone">{order.guidePhone}</div>
                  <button 
                    className="action-btn call-btn"
                    onClick={() => makePhoneCall(order.guidePhone)}
                  >
                    📞 拨打
                  </button>
                </div>

                <div className="highlight-item">
                  <div className="highlight-label">导游姓名</div>
                  <div className="highlight-value">{order.guideName}</div>
                </div>
              </div>

              {/* 订单详情 */}
              <div className="order-details">
                <div className="detail-row">
                  <span className="detail-label">订单编号</span>
                  <span className="detail-value">{order.id}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">出行日期</span>
                  <span className="detail-value">{formatDate(order.travelDate)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">预订日期</span>
                  <span className="detail-value">{formatDate(order.bookingDate)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">出行人</span>
                  <span className="detail-value">
                    {order.travelers.map(t => t.name).join('、')}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">订单金额</span>
                  <span className="detail-value price">{formatPrice(order.totalPrice)}</span>
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="order-actions">
                <Button
                  color="primary"
                  fill="outline"
                  size="large"
                  onClick={() => navigate(`/itinerary/${order.id}`)}
                >
                  查看详细行程
                </Button>
                <Button
                  color="primary"
                  size="large"
                  onClick={() => shareItinerary(order)}
                >
                  分享给家人
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 底部导航 */}
      <div className="bottom-nav">
        <div className="nav-item" onClick={() => navigate('/')}>
          <span className="nav-icon">🏠</span>
          <span className="nav-text">首页</span>
        </div>
        <div className="nav-item active">
          <span className="nav-icon">📋</span>
          <span className="nav-text">我的行程</span>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
