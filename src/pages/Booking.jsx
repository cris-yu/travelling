import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Button, DatePicker, Toast, Dialog } from 'antd-mobile';
import { LeftOutline } from 'antd-mobile-icons';
import { mockProducts } from '../data/mockData';
import { 
  formatPrice, 
  validateIdCard, 
  validatePhone, 
  checkAgeRange,
  generateOrderNo 
} from '../utils/helpers';
import './Booking.css';

const Booking = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const product = mockProducts.find(p => p.id === parseInt(id));
  const [form] = Form.useForm();
  const [travelers, setTravelers] = useState([
    { id: 1, name: '', idCard: '', phone: '', relation: '' }
  ]);

  if (!product) {
    return <div className="booking-page">产品不存在</div>;
  }

  // 添加出行人
  const addTraveler = () => {
    setTravelers([
      ...travelers,
      { id: travelers.length + 1, name: '', idCard: '', phone: '', relation: '' }
    ]);
  };

  // 删除出行人
  const removeTraveler = (id) => {
    if (travelers.length === 1) {
      Toast.show('至少需要一位出行人');
      return;
    }
    setTravelers(travelers.filter(t => t.id !== id));
  };

  // 提交订单
  const handleSubmit = async (values) => {
    // 验证出行人信息
    for (let i = 0; i < travelers.length; i++) {
      const traveler = travelers[i];
      
      if (!traveler.name || !traveler.idCard || !traveler.phone) {
        Toast.show(`请完整填写第${i + 1}位出行人信息`);
        return;
      }

      if (!validateIdCard(traveler.idCard)) {
        Toast.show(`第${i + 1}位出行人身份证号格式不正确`);
        return;
      }

      if (!validatePhone(traveler.phone)) {
        Toast.show(`第${i + 1}位出行人手机号格式不正确`);
        return;
      }

      // 检查年龄范围
      const ageCheck = checkAgeRange(traveler.idCard);
      if (!ageCheck.valid) {
        await Dialog.confirm({
          content: `第${i + 1}位出行人：${ageCheck.message}，是否继续预订？`,
          confirmText: '继续预订',
          cancelText: '重新填写'
        });
      }
    }

    // 生成订单
    const orderNo = generateOrderNo();
    const orderData = {
      orderNo,
      productId: product.id,
      productTitle: product.title,
      travelDate: values.travelDate,
      travelers: travelers,
      contactName: values.contactName,
      contactPhone: values.contactPhone,
      totalPrice: product.price * travelers.length,
      status: 'pending'
    };

    Toast.show({
      icon: 'success',
      content: '预订成功！',
      duration: 2000
    });

    // 模拟保存订单并跳转
    setTimeout(() => {
      navigate('/my-orders');
    }, 2000);
  };

  // 更新出行人信息
  const updateTraveler = (id, field, value) => {
    setTravelers(travelers.map(t => 
      t.id === id ? { ...t, [field]: value } : t
    ));
  };

  return (
    <div className="booking-page">
      {/* 顶部导航 */}
      <div className="booking-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <LeftOutline fontSize={24} />
          <span>返回</span>
        </button>
        <h2 className="header-title">填写订单</h2>
      </div>

      {/* 产品信息摘要 */}
      <div className="product-summary">
        <div className="summary-title">{product.title}</div>
        <div className="summary-meta">
          <span>📍 {product.location}</span>
          <span>⏱️ {product.duration}</span>
          <span className="summary-price">{formatPrice(product.price)}/人</span>
        </div>
      </div>

      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        className="booking-form"
      >
        {/* 出行日期 */}
        <div className="form-section">
          <div className="section-title">📅 选择出行日期</div>
          <Form.Item
            name="travelDate"
            label="出行日期"
            rules={[{ required: true, message: '请选择出行日期' }]}
          >
            <DatePicker
              min={new Date()}
              style={{ '--height': '50px' }}
            >
              {value =>
                value ? value.toLocaleDateString('zh-CN') : '请选择日期'
              }
            </DatePicker>
          </Form.Item>
        </div>

        {/* 出行人信息 */}
        <div className="form-section">
          <div className="section-title">👥 出行人信息</div>
          <div className="section-subtitle">
            💡 支持子女代为预订，请填写实际出行人（父母）信息
          </div>
          
          {travelers.map((traveler, index) => (
            <div key={traveler.id} className="traveler-card">
              <div className="traveler-header">
                <span className="traveler-number">出行人 {index + 1}</span>
                {travelers.length > 1 && (
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeTraveler(traveler.id)}
                  >
                    删除
                  </button>
                )}
              </div>
              
              <div className="form-field">
                <label className="field-label">姓名 *</label>
                <input
                  type="text"
                  className="field-input"
                  placeholder="请输入姓名"
                  value={traveler.name}
                  onChange={(e) => updateTraveler(traveler.id, 'name', e.target.value)}
                />
              </div>

              <div className="form-field">
                <label className="field-label">身份证号 *</label>
                <input
                  type="text"
                  className="field-input"
                  placeholder="用于验证年龄和购买保险"
                  value={traveler.idCard}
                  onChange={(e) => updateTraveler(traveler.id, 'idCard', e.target.value)}
                />
              </div>

              <div className="form-field">
                <label className="field-label">手机号 *</label>
                <input
                  type="tel"
                  className="field-input"
                  placeholder="用于接收出行通知"
                  value={traveler.phone}
                  onChange={(e) => updateTraveler(traveler.id, 'phone', e.target.value)}
                />
              </div>

              <div className="form-field">
                <label className="field-label">与您的关系</label>
                <input
                  type="text"
                  className="field-input"
                  placeholder="如：父亲、母亲、本人等"
                  value={traveler.relation}
                  onChange={(e) => updateTraveler(traveler.id, 'relation', e.target.value)}
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            className="add-traveler-btn"
            onClick={addTraveler}
          >
            + 添加出行人
          </button>
        </div>

        {/* 联系人信息 */}
        <div className="form-section">
          <div className="section-title">📞 联系人信息</div>
          <div className="section-subtitle">
            💡 用于接收订单确认和行程通知
          </div>

          <Form.Item
            name="contactName"
            label="联系人姓名"
            rules={[{ required: true, message: '请输入联系人姓名' }]}
          >
            <Input
              placeholder="请输入联系人姓名"
              style={{ '--font-size': '17px', '--height': '50px' }}
            />
          </Form.Item>

          <Form.Item
            name="contactPhone"
            label="联系电话"
            rules={[
              { required: true, message: '请输入联系电话' },
              { 
                validator: (_, value) => {
                  if (!value || validatePhone(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('手机号格式不正确'));
                }
              }
            ]}
          >
            <Input
              type="tel"
              placeholder="请输入联系电话"
              style={{ '--font-size': '17px', '--height': '50px' }}
            />
          </Form.Item>
        </div>

        {/* 订单金额 */}
        <div className="form-section price-section">
          <div className="price-item">
            <span className="price-label">产品单价</span>
            <span className="price-value">{formatPrice(product.price)}</span>
          </div>
          <div className="price-item">
            <span className="price-label">出行人数</span>
            <span className="price-value">{travelers.length} 人</span>
          </div>
          <div className="price-item total">
            <span className="price-label">总计</span>
            <span className="price-value total-price">
              {formatPrice(product.price * travelers.length)}
            </span>
          </div>
        </div>

        {/* 提交按钮 */}
        <div className="submit-section">
          <Button
            type="submit"
            color="primary"
            size="large"
            className="submit-btn"
            block
          >
            提交订单
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Booking;
