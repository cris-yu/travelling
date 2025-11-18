# 老友行后端API

Node.js + Express + MongoDB 后端服务

## 快速开始

### 1. 安装依赖

```bash
cd backend
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env` 并修改配置：

```bash
cp .env.example .env
```

### 3. 启动MongoDB

确保MongoDB已安装并运行：

```bash
# macOS使用Homebrew
brew services start mongodb-community

# 或直接启动
mongod
```

### 4. 初始化数据库

```bash
npm run seed
```

### 5. 启动服务器

```bash
# 开发模式（热重载）
npm run dev

# 生产模式
npm start
```

服务器将运行在 `http://localhost:3000`

## API文档

### 产品相关

#### 获取产品列表
- **URL**: `GET /api/products`
- **参数**:
  - `location`: 目的地（可选）
  - `intensity`: 体力强度（可选）
  - `search`: 搜索关键词（可选）
  - `page`: 页码，默认1
  - `limit`: 每页数量，默认10

#### 获取产品详情
- **URL**: `GET /api/products/:id`

#### 创建产品（管理员）
- **URL**: `POST /api/products`

#### 更新产品（管理员）
- **URL**: `PUT /api/products/:id`

#### 删除产品（管理员）
- **URL**: `DELETE /api/products/:id`

### 订单相关

#### 创建订单
- **URL**: `POST /api/orders`
- **请求体**:
```json
{
  "productId": "产品ID",
  "openId": "微信openId",
  "travelDate": "出行日期",
  "travelers": [
    {
      "name": "姓名",
      "idCard": "身份证号",
      "phone": "电话"
    }
  ],
  "contactName": "联系人姓名",
  "contactPhone": "联系人电话"
}
```

#### 获取用户订单列表
- **URL**: `GET /api/orders?openId=xxx`

#### 获取订单详情
- **URL**: `GET /api/orders/:id`

#### 取消订单
- **URL**: `PUT /api/orders/:id/cancel`

## 数据库结构

### Product（产品）
- title: 标题
- description: 描述
- location: 目的地
- price: 价格
- intensity: 体力强度
- itinerary: 行程安排
- medicalSupport: 医疗保障
- transportation: 交通信息

### Order（订单）
- orderNo: 订单号
- openId: 微信用户openId
- productId: 产品ID
- travelers: 出行人信息
- status: 订单状态
- paymentStatus: 支付状态

### User（用户）
- openId: 微信openId
- nickName: 昵称
- phone: 电话
- role: 角色
