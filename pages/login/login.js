// pages/login/login.js
const util = require('../../utils/util.js');

Page({
  data: {
    roles: [
      { value: 'child', name: '子女', icon: '👨‍👩‍👧' },
      { value: 'parent', name: '父母', icon: '👴👵' },
      { value: 'agency', name: '旅行社', icon: '🏢' },
      { value: 'guide', name: '导游', icon: '🎯' }
    ],
    selectedRole: 'child',
    phone: '',
    password: '',
    showPassword: false,
    rememberMe: false
  },

  onLoad() {
    // 检查是否已登录
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.redirectByRole(userInfo.role);
    }

    // 加载记住的账号
    this.loadRememberedAccount();
  },

  // 加载记住的账号
  loadRememberedAccount() {
    const remembered = wx.getStorageSync('rememberedAccount');
    if (remembered) {
      this.setData({
        phone: remembered.phone,
        password: remembered.password,
        selectedRole: remembered.role,
        rememberMe: true
      });
    }
  },

  // 选择角色
  selectRole(e) {
    const role = e.currentTarget.dataset.role;
    this.setData({ selectedRole: role });
  },

  // 输入手机号
  onPhoneInput(e) {
    this.setData({ phone: e.detail.value });
  },

  // 输入密码
  onPasswordInput(e) {
    this.setData({ password: e.detail.value });
  },

  // 切换密码显示
  togglePassword() {
    this.setData({ showPassword: !this.data.showPassword });
  },

  // 记住密码
  onRememberChange(e) {
    this.setData({ rememberMe: e.detail.value.length > 0 });
  },

  // 处理登录
  handleLogin() {
    const { phone, password, selectedRole, rememberMe } = this.data;

    // 表单验证
    if (!phone) {
      util.showError('请输入手机号');
      return;
    }

    if (!util.validatePhone(phone)) {
      util.showError('手机号格式不正确');
      return;
    }

    if (!password) {
      util.showError('请输入密码');
      return;
    }

    if (password.length < 6) {
      util.showError('密码至少6位');
      return;
    }

    // 显示加载
    wx.showLoading({ title: '登录中...' });

    // 模拟登录请求（实际项目中应调用后端API）
    setTimeout(() => {
      wx.hideLoading();

      // 测试账号验证
      const testAccounts = {
        '13800000001': { role: 'child', name: '张明（子女）' },
        '13800000002': { role: 'parent', name: '张大爷' },
        '13800000003': { role: 'agency', name: '老友行旅行社' },
        '13800000004': { role: 'guide', name: '李导游' }
      };

      if (testAccounts[phone] && password === '123456') {
        const account = testAccounts[phone];
        
        if (account.role !== selectedRole) {
          util.showError('该账号不是' + this.getRoleName(selectedRole) + '身份');
          return;
        }

        // 保存用户信息
        const userInfo = {
          phone,
          role: selectedRole,
          name: account.name,
          loginTime: new Date().toISOString()
        };

        wx.setStorageSync('userInfo', userInfo);

        // 记住密码
        if (rememberMe) {
          wx.setStorageSync('rememberedAccount', { phone, password, role: selectedRole });
        } else {
          wx.removeStorageSync('rememberedAccount');
        }

        util.showSuccess('登录成功！');

        // 根据角色跳转
        setTimeout(() => {
          this.redirectByRole(selectedRole);
        }, 1000);

      } else {
        util.showError('手机号或密码错误');
      }
    }, 1000);
  },

  // 根据角色跳转
  redirectByRole(role) {
    let url = '';
    
    switch(role) {
      case 'child':
        // 子女：跳转到产品浏览页面（首页）
        url = '/pages/index/index';
        break;
      case 'parent':
        // 父母：跳转到个人行程查看页面
        url = '/pages/orders/orders';
        break;
      case 'agency':
        // 旅行社：跳转到产品管理页面（暂用首页代替）
        url = '/pages/index/index';
        wx.showToast({ title: '旅行社管理功能开发中', icon: 'none' });
        break;
      case 'guide':
        // 导游：跳转到团队管理页面（暂用订单页面代替）
        url = '/pages/orders/orders';
        wx.showToast({ title: '导游管理功能开发中', icon: 'none' });
        break;
    }

    wx.reLaunch({ url });
  },

  // 获取角色名称
  getRoleName(role) {
    const roleMap = {
      'child': '子女',
      'parent': '父母',
      'agency': '旅行社',
      'guide': '导游'
    };
    return roleMap[role] || '';
  },

  // 忘记密码
  forgotPassword() {
    wx.showModal({
      title: '忘记密码',
      content: '请联系客服：400-8888-8888',
      showCancel: false,
      confirmText: '我知道了'
    });
  },

  // 微信登录
  wechatLogin(e) {
    if (!e.detail.userInfo) {
      util.showError('您拒绝了授权');
      return;
    }

    wx.showLoading({ title: '登录中...' });

    // 模拟微信登录
    setTimeout(() => {
      wx.hideLoading();
      
      const userInfo = {
        phone: '微信用户',
        role: this.data.selectedRole,
        name: e.detail.userInfo.nickName,
        avatar: e.detail.userInfo.avatarUrl,
        loginTime: new Date().toISOString()
      };

      wx.setStorageSync('userInfo', userInfo);
      util.showSuccess('登录成功！');

      setTimeout(() => {
        this.redirectByRole(this.data.selectedRole);
      }, 1000);
    }, 1000);
  },

  // 跳转注册
  goToRegister() {
    wx.showToast({
      title: '注册功能开发中',
      icon: 'none'
    });
  },

  // 填充测试账号（方便测试）
  fillTestAccount(e) {
    const role = e.currentTarget.dataset.role;
    const testPhones = {
      'child': '13800000001',
      'parent': '13800000002',
      'agency': '13800000003',
      'guide': '13800000004'
    };

    this.setData({
      selectedRole: role,
      phone: testPhones[role],
      password: '123456'
    });
  }
});
