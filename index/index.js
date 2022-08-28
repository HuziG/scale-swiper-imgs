const app = getApp()

Page({
  data: {
    current: 0,
    albumData: [{
      title: '',
      url: 'https://ts1.cn.mm.bing.net/th/id/R-C.81b63f822e20dc3443d7f7edf9ee6054?rik=breJKQVPhHlkEA&riu=http%3a%2f%2fimage.qianye88.com%2fpic%2f814220a699efbaac4d7b07b365ac335b&ehk=6Wi2N%2fM1wNBL0tipamYG0UjNia0Q2ZGoQn0Es31aePo%3d&risl=&pid=ImgRaw&r=0',
      createTime: ''
    }, {
      title: '',
      url: 'https://img.8264.com/ecmme/wan/xl/goods/20201111/202011111513542261_1.jpg',
      createTime: ''
    }, {
      title: '',
      url: 'https://img.zcool.cn/community/01b0505c47e220a801203d220defd7.jpg@1280w_1l_2o_100sh.jpg',
      createTime: ''
    }, {
      title: '',
      url: 'https://img.8264.com/ecmme/wan/xl/goods/20201111/202011111513047533_1.jpg',
      createTime: ''
    }, {
      title: '',
      url: 'https://pic1.zhimg.com/v2-909b0abc9811efc79e0481b62562b490_r.jpg',
      createTime: ''
    }, {
      title: '',
      url: 'https://img.zcool.cn/community/0173cf59d9c407a80121ae0c5b90f0.JPG@1280w_1l_2o_100sh.jpg',
      createTime: ''
    }],

    translateX: 0, // 位移x坐标 单位px
    translateY: '-50%', // 位移y坐标 单位px
    distance: 0, // 双指接触点距离
    scale: 1, // 缩放倍数
    rotate: 0, // 旋转角度
    oldRotate: 0, // 上一次旋转停止后的角度
    startMove: { // 起始位移距离
      x: 0,
      y: 0,
    },
    startTouches: [], // 起始点touch数组

    swiperTimeoutInstance: null,
    scaleIng: false
  },

  onLoad() {
    // console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    // console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
  },

  touchStart(e) {
    const touches = e.touches
    // const { translateX, translateY } = this.data
    // const { pageX, pageY } = touches[0]
    // this.data.startMove = {
    //   x: pageX - translateX,
    //   y: pageY - translateY
    // }
    this.data.startTouches = touches
  },

  touchMove(e) {
    const touches = e.touches
    const {
      pageX: onePageX,
      pageY: onePageY
    } = touches[0]
    const {
      startMove,
      scale,
      distance: oldDistance,
      startTouches,
      oldRotate
    } = this.data

    if (this.data.scaleIng && touches.length === 1) {
      if (this.data.scaleIng) {
        const {
          pageX: oldPageX
        } = startTouches[0]
        this.setData({
          translateX: onePageX - oldPageX
        })
      }
    }

    if (touches.length === 2 && startTouches.length === 2) {
      const {
        pageX: twoPageX,
        pageY: twoPageY
      } = touches[1]
      const distance = Math.sqrt((twoPageX - onePageX) ** 2 + (twoPageY - onePageY) ** 2)
      this.data.distance = distance
      this.setData({
        scale: scale * (distance / (oldDistance || distance))
      })
      this.data.scaleIng = true

      if (this.data.scaleIng) {
        const {
          pageX: oldPageX
        } = startTouches[0]
        this.setData({
          translateX: onePageX - oldPageX
        })
      }
    } else {
      if (!this.data.scaleIng) {
        if (touches[0].pageX - startTouches[0].pageX < -40) {
          this.changeCurrent('add')
        } else if (touches[0].pageX - startTouches[0].pageX > 40) {
          this.changeCurrent('reduce')
        }
      }
    }
  },

  changeCurrent(type) {
    if (type === 'add' && this.data.current === this.data.albumData.length - 1) {
      return false
    }

    if (type === 'reduce' && this.data.current === 0) {
      return false
    }

    if (this.data.swiperTimeoutInstance) {
      clearTimeout(this.data.swiperTimeoutInstance)
    }
    this.data.swiperTimeoutInstance = setTimeout(() => {
      this.setData({
        current: type === 'add' ? this.data.current + 1 : this.data.current - 1
      })
      clearTimeout(this.data.swiperTimeoutInstance)
    }, 60)
  },

  touchEnd(e) {
    if (e.touches.length !== 0) {
      return false
    }

    if (this.data.scaleIng) {
      this.setData({
        translateX: 0, // 位移x坐标 单位px
        translateY: '-50%', // 位移y坐标 单位px
        distance: 0, // 双指接触点距离
        scale: 1, // 缩放倍数
        rotate: 0, // 旋转角度
        oldRotate: 0, // 上一次旋转停止后的角度
      })

      this.data.scaleIng = false
    }
  },
})