import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Divider } from 'antd-mobile';
import { LeftOutline } from 'antd-mobile-icons';
import { mockProducts } from '../data/mockData';
import { formatPrice, getIntensityColor, getIntensityDesc } from '../utils/helpers';
import './ProductDetail.css';

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const product = mockProducts.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="error-state">产品不存在</div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      {/* 返回按钮 */}
      <div className="detail-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <LeftOutline fontSize={24} />
          <span>返回</span>
        </button>
      </div>

      {/* 产品主图 */}
      <div className="detail-banner">
        <img src={product.imageUrl} alt={product.title} />
      </div>

      {/* 产品标题和价格 */}
      <div className="detail-title-section">
        <h1 className="detail-title">{product.title}</h1>
        <p className="detail-desc">{product.description}</p>
        <div className="detail-price">
          <span className="price-text">{formatPrice(product.price)}</span>
          <span className="price-unit">/人起</span>
        </div>
      </div>

      {/* 关键信息卡片 */}
      <div className="info-card highlight-card">
        <div className="card-title">🎯 关键信息</div>
        <div className="info-grid">
          <div className="info-item">
            <div className="info-label">适合年龄</div>
            <div className="info-value highlight">{product.ageRange}</div>
          </div>
          <div className="info-item">
            <div className="info-label">体力强度</div>
            <div 
              className="info-value highlight"
              style={{ color: getIntensityColor(product.intensity) }}
            >
              {product.intensity}
            </div>
          </div>
          <div className="info-item">
            <div className="info-label">行程天数</div>
            <div className="info-value">{product.duration}</div>
          </div>
          <div className="info-item">
            <div className="info-label">团队规模</div>
            <div className="info-value">{product.groupSize}</div>
          </div>
        </div>
        <div className="intensity-desc">
          💡 {getIntensityDesc(product.intensity)}
        </div>
      </div>

      {/* 医疗保障 */}
      <div className="info-card">
        <div className="card-title">⚕️ 医疗保障</div>
        <div className="medical-info">
          {product.medicalSupport.hasDoctor && (
            <div className="medical-item">
              <span className="check-icon">✅</span>
              <span className="medical-text">随队医护人员</span>
            </div>
          )}
          <div className="medical-item">
            <span className="label-text">急救措施：</span>
            <span className="value-text">{product.medicalSupport.emergencyMeasures}</span>
          </div>
          <div className="medical-item">
            <span className="label-text">附近医院：</span>
            <span className="value-text">
              {product.medicalSupport.nearbyHospitals.join('、')}
            </span>
          </div>
        </div>
      </div>

      {/* 交通安排 */}
      <div className="info-card">
        <div className="card-title">🚌 交通安排</div>
        <div className="transport-info">
          <div className="transport-item">
            <span className="label-text">车辆类型：</span>
            <span className="value-text bold">{product.transportation.type}</span>
          </div>
          <div className="transport-item">
            <span className="label-text">座位安排：</span>
            <span className="value-text">{product.transportation.seatArrangement}</span>
          </div>
          <div className="transport-features">
            {product.transportation.features.map((feature, idx) => (
              <span key={idx} className="feature-tag">{feature}</span>
            ))}
          </div>
        </div>
      </div>

      {/* 行程亮点 */}
      <div className="info-card">
        <div className="card-title">✨ 行程亮点</div>
        <div className="highlights-list">
          {product.highlights.map((highlight, idx) => (
            <div key={idx} className="highlight-item">
              <span className="highlight-bullet">•</span>
              <span className="highlight-text">{highlight}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 详细行程 */}
      <div className="info-card">
        <div className="card-title">📅 详细行程</div>
        <div className="itinerary-timeline">
          {product.itinerary.map((item, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-time">{item.time}</div>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-location">{item.location}</div>
                <div className="timeline-activity">{item.activity}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 产品标签 */}
      <div className="info-card">
        <div className="card-title">🏷️ 产品特色</div>
        <div className="tags-container">
          {product.tags.map((tag, idx) => (
            <span key={idx} className="product-tag">{tag}</span>
          ))}
        </div>
      </div>

      {/* 底部预订按钮 */}
      <div className="detail-footer">
        <div className="footer-price">
          <span className="footer-price-value">{formatPrice(product.price)}</span>
          <span className="footer-price-unit">/人</span>
        </div>
        <Button
          color="primary"
          size="large"
          className="book-btn"
          onClick={() => navigate(`/booking/${product.id}`)}
        >
          立即预订
        </Button>
      </div>
    </div>
  );
};

export default ProductDetail;
