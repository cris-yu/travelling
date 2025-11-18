import React from 'react';
import { useNavigate } from 'react-router-dom';
import { makePhoneCall } from '../utils/helpers';
import './CustomerService.css';

// 客服悬浮按钮组件
const CustomerService = () => {
  const [showOptions, setShowOptions] = React.useState(false);

  const handleEmergencyCall = () => {
    makePhoneCall('400-8888-8888'); // 24小时紧急热线
    setShowOptions(false);
  };

  const handleNormalCall = () => {
    makePhoneCall('400-6666-6666'); // 普通客服热线
    setShowOptions(false);
  };

  return (
    <div className="customer-service">
      {showOptions && (
        <div className="service-options">
          <button 
            className="service-btn emergency-btn"
            onClick={handleEmergencyCall}
          >
            <span className="btn-icon">🚨</span>
            <span className="btn-text">紧急求助</span>
            <span className="btn-phone">400-8888-8888</span>
          </button>
          <button 
            className="service-btn normal-btn"
            onClick={handleNormalCall}
          >
            <span className="btn-icon">📞</span>
            <span className="btn-text">联系客服</span>
            <span className="btn-phone">400-6666-6666</span>
          </button>
        </div>
      )}
      
      <button 
        className="service-float-btn"
        onClick={() => setShowOptions(!showOptions)}
      >
        {showOptions ? '✕' : '客服'}
      </button>
    </div>
  );
};

export default CustomerService;
