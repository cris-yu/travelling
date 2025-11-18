// components/customer-service/index.js
const util = require('../../utils/util.js');

Component({
  data: {
    showOptions: false
  },

  methods: {
    toggleOptions() {
      this.setData({
        showOptions: !this.data.showOptions
      });
    },

    handleEmergencyCall() {
      util.makePhoneCall('400-8888-8888');
      this.setData({ showOptions: false });
    },

    handleNormalCall() {
      util.makePhoneCall('400-6666-6666');
      this.setData({ showOptions: false });
    }
  }
})
