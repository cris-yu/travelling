import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBar, Tabs, Tag } from 'antd-mobile';
import { mockProducts } from '../data/mockData';
import { formatPrice, getIntensityColor } from '../utils/helpers';
import './ProductList.css';

const ProductList = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('全部');
  const [selectedIntensity, setSelectedIntensity] = useState('全部');

  const locations = ['全部', '北京', '天津', '河北承德', '河北秦皇岛'];
  const intensityLevels = ['全部', '轻松', '适中'];

  // 筛选产品
  const filteredProducts = mockProducts.filter(product => {
    const matchLocation = selectedLocation === '全部' || product.location === selectedLocation;
    const matchIntensity = selectedIntensity === '全部' || product.intensity === selectedIntensity;
    const matchSearch = !searchText || 
      product.title.includes(searchText) || 
      product.description.includes(searchText);
    
    return matchLocation && matchIntensity && matchSearch;
  });

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="product-list-page">
      {/* 顶部搜索栏 */}
      <div className="search-header">
        <h1 className="page-title">夕阳红旅游</h1>
        <SearchBar 
          placeholder="搜索目的地或产品名称"
          value={searchText}
          onChange={setSearchText}
          style={{ '--height': '48px', '--border-radius': '24px' }}
        />
      </div>

      {/* 筛选区域 */}
      <div className="filter-section">
        <div className="filter-group">
          <div className="filter-label">目的地：</div>
          <div className="filter-tags">
            {locations.map(loc => (
              <Tag
                key={loc}
                color={selectedLocation === loc ? 'primary' : 'default'}
                fill={selectedLocation === loc ? 'solid' : 'outline'}
                onClick={() => setSelectedLocation(loc)}
                style={{ fontSize: '16px', padding: '8px 16px', margin: '4px' }}
              >
                {loc}
              </Tag>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <div className="filter-label">体力强度：</div>
          <div className="filter-tags">
            {intensityLevels.map(level => (
              <Tag
                key={level}
                color={selectedIntensity === level ? 'primary' : 'default'}
                fill={selectedIntensity === level ? 'solid' : 'outline'}
                onClick={() => setSelectedIntensity(level)}
                style={{ fontSize: '16px', padding: '8px 16px', margin: '4px' }}
              >
                {level}
              </Tag>
            ))}
          </div>
        </div>
      </div>

      {/* 产品列表 */}
      <div className="products-container">
        {filteredProducts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <div className="empty-text">暂无符合条件的产品</div>
          </div>
        ) : (
          filteredProducts.map(product => (
            <div 
              key={product.id} 
              className="product-card"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="product-image">
                <img src={product.imageUrl} alt={product.title} />
                <div className="product-tags-overlay">
                  {product.tags.slice(0, 2).map((tag, idx) => (
                    <span key={idx} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
              
              <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-desc">{product.description}</p>
                
                <div className="product-meta">
                  <div className="meta-item">
                    <span className="meta-icon">📍</span>
                    <span className="meta-text">{product.location}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon">⏱️</span>
                    <span className="meta-text">{product.duration}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon">👥</span>
                    <span className="meta-text">{product.groupSize}</span>
                  </div>
                </div>

                <div className="product-features">
                  <div 
                    className="intensity-badge"
                    style={{ backgroundColor: getIntensityColor(product.intensity) }}
                  >
                    {product.intensity}
                  </div>
                  <div className="age-badge">
                    适合 {product.ageRange}
                  </div>
                  {product.medicalSupport.hasDoctor && (
                    <div className="medical-badge">
                      ⚕️ 医护随行
                    </div>
                  )}
                </div>

                <div className="product-footer">
                  <div className="price-section">
                    <span className="price-label">起</span>
                    <span className="price">{formatPrice(product.price)}</span>
                    <span className="price-unit">/人</span>
                  </div>
                  <button className="view-btn">查看详情</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 底部导航提示 */}
      <div className="bottom-nav">
        <div className="nav-item active">
          <span className="nav-icon">🏠</span>
          <span className="nav-text">首页</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/my-orders')}>
          <span className="nav-icon">📋</span>
          <span className="nav-text">我的行程</span>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
