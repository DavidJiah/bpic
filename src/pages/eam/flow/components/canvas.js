import ImgUrl from "@/assets/compass.jpg"

// north: rgb(229 0 5); south: rgb(0 175 80); west: rgb(93 72 191); east: rgb(255 95 16);
// straightVolume, leftTurnVolume, rightTurnVolume, uturnVolume 直行 左转 右转 掉头
var CreateDirection = function({ carVal, color, maxLineWidth, thresholdVal }, canvasWidth) {
  // 倍数
  this.magnification = canvasWidth / 600
  // 基本点
  this.baseLineEast = [canvasWidth, 230 * this.magnification]
  // 可修改的配置
  this.maxLineWidth = !maxLineWidth ? 30 : maxLineWidth
  this.color = !color ? { north: '#ff363a', south: '#0cc864', west: '#6666cc', east: '#ff7f40' } : color
  this.thresholdVal = (function() {
    if (thresholdVal) {
      if (Array.isArray(thresholdVal) && thresholdVal.length === 4) {
        return thresholdVal
      } else if (typeof thresholdVal === 'number' && !isNaN(thresholdVal)) {
        return [thresholdVal, thresholdVal * 2, thresholdVal * 3, thresholdVal * 4]
      } else {
        return [300, 600, 900, 1500]
      }
    } else {
      return [300, 600, 900, 1200]
    }
  })()
  // 其他
  this.getSumLW = function(sum) { // 获取某个方向的总宽度
    var multiple = 1
    if (sum > this.thresholdVal[this.thresholdVal.length - 1]) {
      multiple = this.thresholdVal.length + 1
    } else {
      for (var i = 0; i < this.thresholdVal.length; i++) {
        if (this.thresholdVal[i] <= sum) {
          multiple++
        }
      }
    }
    return this.maxLineWidth / (this.thresholdVal.length + 1) * multiple
  }
  this.allLW = (function(that) {
    var obj = {}
    if (carVal && carVal.length > 0) {
      carVal.map(item => {
        const itemInput = isNaN(Number(item.straightVolume)) ? 0 : Number(item.straightVolume)
        const itemInput2 = isNaN(Number(item.leftTurnVolume)) ? 0 : Number(item.leftTurnVolume)
        const itemInput3 = isNaN(Number(item.rightTurnVolume)) ? 0 : Number(item.rightTurnVolume)
        const itemInput4 = isNaN(Number(item.uturnVolume)) ? 0 : Number(item.uturnVolume)
        const carSum = itemInput + itemInput2 + itemInput3 + itemInput4
        const sLWval = isNaN(Math.ceil(itemInput / carSum * that.getSumLW(carSum))) ? 0 : Math.ceil(itemInput / carSum * that.getSumLW(carSum))
        const lLWval = isNaN(Math.ceil(itemInput2 / carSum * that.getSumLW(carSum))) ? 0 : Math.ceil(itemInput2 / carSum * that.getSumLW(carSum))
        const rLWval = isNaN(Math.ceil(itemInput3 / carSum * that.getSumLW(carSum))) ? 0 : Math.ceil(itemInput3 / carSum * that.getSumLW(carSum))
        const uLWval = isNaN(Math.ceil(itemInput4 / carSum * that.getSumLW(carSum))) ? 0 : Math.ceil(itemInput4 / carSum * that.getSumLW(carSum))
  
        const publicObj = { sLW: sLWval, lLW: lLWval, rLW: rLWval, uLW: uLWval }
        switch (item.entranceExitDirection) {
          case '北':
            obj.north = publicObj
            break
          case '南':
            obj.south = publicObj
            break
          case '西':
            obj.west = publicObj
            break
          case '东':
            obj.east = publicObj
            break
        }
      })
    }
    return obj
  })(this)
}

CreateDirection.prototype = {
  createFC: function(ctx, carVal, carSum, ox, oy, degree, fcolor) {
    var cDotS = this.baseLineEast[1] // 直行线点位置
    var cDotL = this.baseLineEast[1] + this.allLW[fcolor].sLW / 2 + this.allLW[fcolor].lLW / 2 // 左转向线出点位置
    var cDotr = this.baseLineEast[1] - this.allLW[fcolor].sLW / 2 - this.allLW[fcolor].rLW / 2 // 右转向线出点位置
    var cDotU = this.baseLineEast[1] + this.allLW[fcolor].sLW / 2 + this.allLW[fcolor].lLW + this.allLW[fcolor].uLW / 2 // 掉头线出点位置
    var rDotObj = (function(that) { // 左右转向线入点位置
      let val = that.baseLineEast[1]
      let val2 = that.baseLineEast[0] - that.baseLineEast[1]
      let val3 = that.baseLineEast[0] - that.baseLineEast[1]
      switch (fcolor) {
        case 'north':
          val = val + that.allLW['west'].sLW / 2 + that.allLW[fcolor].lLW / 2
          val2 = val2 + that.allLW['east'].sLW / 2 + that.allLW[fcolor].rLW / 2
          val3 = val3 - that.allLW['south'].sLW / 2 - that.allLW['west'].lLW - that.allLW[fcolor].uLW / 2
          break
        case 'south':
          val = val + that.allLW['east'].sLW / 2 + that.allLW[fcolor].lLW / 2
          val2 = val2 + that.allLW['west'].sLW / 2 + that.allLW[fcolor].rLW / 2
          val3 = val3 - that.allLW['north'].sLW / 2 - that.allLW['east'].lLW - that.allLW[fcolor].uLW / 2
          break
        case 'west':
          val = val + that.allLW['south'].sLW / 2 + that.allLW[fcolor].lLW / 2
          val2 = val2 + that.allLW['north'].sLW / 2 + that.allLW[fcolor].rLW / 2
          val3 = val3 - that.allLW['east'].sLW / 2 - that.allLW['south'].lLW - that.allLW[fcolor].uLW / 2
          break
        case 'east':
          val = val + that.allLW['north'].sLW / 2 + that.allLW[fcolor].lLW / 2
          val2 = val2 + that.allLW['south'].sLW / 2 + that.allLW[fcolor].rLW / 2
          val3 = val3 - that.allLW['west'].sLW / 2 - that.allLW['north'].lLW - that.allLW[fcolor].uLW / 2
          break
      }
      return { rDotL: val, rDotR: val2, rDotU: val3 }
    })(this)
    this.ctx = ctx
    this.ctx.save()
    // 旋转
    this.ctx.translate(ox, oy)
    this.ctx.rotate((Math.PI / 180) * degree)
    this.ctx.translate(-ox, -oy)
    // 直行线
    if (Number(carVal.straightVolume) > 0) {
      this.ctx.lineWidth = this.allLW[fcolor].sLW
      this.ctx.strokeStyle = this.color[fcolor]
      this.ctx.beginPath()
      this.ctx.moveTo(this.baseLineEast[0], cDotS)
      this.ctx.lineTo(40 * this.magnification, cDotS)
      this.ctx.closePath()
      this.ctx.stroke()
    }
    // 左转向线
    if (Number(carVal.leftTurnVolume) > 0) {
      this.ctx.lineWidth = this.allLW[fcolor].lLW
      this.ctx.strokeStyle = this.color[fcolor]
      this.ctx.beginPath()
      this.ctx.moveTo(this.baseLineEast[0], cDotL)
      this.ctx.lineTo(this.baseLineEast[0] - 80 * this.magnification, cDotL)
      this.ctx.arcTo(rDotObj.rDotL, cDotL, rDotObj.rDotL, this.baseLineEast[0], (this.baseLineEast[0] - rDotObj.rDotL) - 80 * this.magnification)
      this.ctx.lineTo(rDotObj.rDotL, 560 * this.magnification)
      this.ctx.stroke()
    }
    // 掉头线
    if (Number(carVal.uturnVolume) > 0) {
      this.ctx.lineWidth = this.allLW[fcolor].uLW
      this.ctx.strokeStyle = this.color[fcolor]
      this.ctx.beginPath()
      this.ctx.moveTo(this.baseLineEast[0], cDotU)
      this.ctx.lineTo(520 * this.magnification, cDotU)
      this.ctx.stroke()
      this.ctx.beginPath()
      this.ctx.arc(520 * this.magnification, cDotU + (rDotObj.rDotU - cDotU) / 2, (rDotObj.rDotU - cDotU) / 2, 0.5 * Math.PI, 1.5 * Math.PI)
      this.ctx.stroke()
      this.ctx.beginPath()
      this.ctx.moveTo(520 * this.magnification, rDotObj.rDotU)
      this.ctx.lineTo(560 * this.magnification, rDotObj.rDotU)
      this.ctx.stroke()
    }
    // 右转向线
    if (Number(carVal.rightTurnVolume) > 0) {
      this.ctx.lineWidth = this.allLW[fcolor].rLW
      this.ctx.strokeStyle = this.color[fcolor]
      this.ctx.beginPath()
      this.ctx.moveTo(this.baseLineEast[0], cDotr)
      this.ctx.lineTo(this.baseLineEast[0] - 40 * this.magnification, cDotr)
      this.ctx.arcTo(rDotObj.rDotR, cDotr, rDotObj.rDotR, 0, (this.baseLineEast[0] - rDotObj.rDotR) - 80 * this.magnification)
      this.ctx.lineTo(rDotObj.rDotR, 40 * this.magnification)
      this.ctx.stroke()
    }
    // 文本
    this.ctx.font = 'bold ' + 24 * this.magnification + 'px Arial'
    this.ctx.fillStyle = '#fff'
    this.ctx.textBaseline = 'middle'
    this.ctx.textAlign = 'center'
    if (carVal.entranceExitDirection === '西') {
      if (Number(carSum) > 0) {
        this.ctx.save()
        this.ctx.translate(carSum, this.baseLineEast[0] - 50 * this.magnification, this.baseLineEast[1])
        this.ctx.rotate((Math.PI / 180) * -degree)
        this.ctx.translate(-(this.baseLineEast[0] - 50 * this.magnification), -(this.baseLineEast[1]))
        this.ctx.fillText(carSum, carSum, this.baseLineEast[0] - 50 * this.magnification, this.baseLineEast[1])
        this.ctx.restore()
      }

      if (Number(carVal.straightVolume) > 0) {
        this.ctx.save()
        this.ctx.translate(this.baseLineEast[0] - this.baseLineEast[1] + this.maxLineWidth * 1.5, cDotS)
        this.ctx.rotate((Math.PI / 180) * -degree)
        this.ctx.translate(-(this.baseLineEast[0] - this.baseLineEast[1] + this.maxLineWidth * 1.5), -cDotS)
        this.ctx.fillText(carVal.straightVolume, this.baseLineEast[0] - this.baseLineEast[1] + this.maxLineWidth * 1.5, cDotS)
        this.ctx.restore()
      }

      if (Number(carVal.leftTurnVolume) > 0) {
        this.ctx.save()
        this.ctx.translate(this.baseLineEast[0] - this.baseLineEast[1] + this.maxLineWidth * 1.5, cDotS + 35 * this.magnification)
        this.ctx.rotate((Math.PI / 180) * -degree)
        this.ctx.translate(-(this.baseLineEast[0] - this.baseLineEast[1] + this.maxLineWidth * 1.5), -(cDotS + 35 * this.magnification))
        this.ctx.fillText(carVal.leftTurnVolume, this.baseLineEast[0] - this.baseLineEast[1] + this.maxLineWidth * 1.5, cDotS + 35 * this.magnification)
        this.ctx.restore()
      }

      if (Number(carVal.rightTurnVolume) > 0) {
        this.ctx.save()
        this.ctx.translate(this.baseLineEast[0] - this.baseLineEast[1] + this.maxLineWidth * 1.5, cDotS - 50 * this.magnification)
        this.ctx.rotate((Math.PI / 180) * -degree)
        this.ctx.translate(-(this.baseLineEast[0] - this.baseLineEast[1] + this.maxLineWidth * 1.5), -(cDotS - 50 * this.magnification))
        this.ctx.fillText(carVal.rightTurnVolume, this.baseLineEast[0] - this.baseLineEast[1] + this.maxLineWidth * 1.5, cDotS - 50 * this.magnification)
        this.ctx.restore()
      }

      if (Number(carVal.uturnVolume) > 0) {
        this.ctx.save()
        this.ctx.translate(460 * this.magnification, cDotU + (rDotObj.rDotU - cDotU) / 2)
        this.ctx.rotate((Math.PI / 180) * -degree)
        this.ctx.translate(-(460 * this.magnification), -(cDotU + (rDotObj.rDotU - cDotU) / 2))
        this.ctx.fillText(carVal.uturnVolume, 460 * this.magnification, cDotU + (rDotObj.rDotU - cDotU) / 2)
        this.ctx.restore()
      }
    } else {
      Number(carSum) > 0 ? this.ctx.fillText(carSum, this.baseLineEast[0] - 50 * this.magnification, this.baseLineEast[1]) : ''
      Number(carVal.straightVolume) > 0 ? this.ctx.fillText(carVal.straightVolume, this.baseLineEast[0] - this.baseLineEast[1] + this.maxLineWidth * 1.5, cDotS) : ''
      Number(carVal.leftTurnVolume) > 0 ? this.ctx.fillText(carVal.leftTurnVolume, this.baseLineEast[0] - this.baseLineEast[1] + this.maxLineWidth * 1.5, cDotS + 35 * this.magnification) : ''
      Number(carVal.rightTurnVolume) > 0 ? this.ctx.fillText(carVal.rightTurnVolume, this.baseLineEast[0] - this.baseLineEast[1] + this.maxLineWidth * 1.5, cDotS - 50 * this.magnification) : ''
      Number(carVal.uturnVolume) > 0 ? this.ctx.fillText(carVal.uturnVolume, 460 * this.magnification, cDotU + (rDotObj.rDotU - cDotU) / 2) : ''
    }
    this.ctx.restore()

  },
  createArrow: function(ctx, carVal, carSum, ox, oy, degree, fcolor) {
    // 箭头
    var arrowPoint = (function(that) {
      var middleDot = null
      var sumSize = null
      switch (fcolor) {
        case 'north':
          sumSize = that.allLW['south'].sLW + that.allLW['west'].lLW + that.allLW['east'].rLW + that.allLW[fcolor].uLW
          middleDot = (that.baseLineEast[0] - that.baseLineEast[1]) + that.allLW['south'].sLW / 2 + that.allLW['east'].rLW - sumSize / 2
          break
        case 'south':
          sumSize = that.allLW['north'].sLW + that.allLW['east'].lLW + that.allLW['west'].rLW + that.allLW[fcolor].uLW
          middleDot = (that.baseLineEast[0] - that.baseLineEast[1]) + that.allLW['north'].sLW / 2 + that.allLW['west'].rLW - sumSize / 2
          break
        case 'west':
          sumSize = that.allLW['east'].sLW + that.allLW['south'].lLW + that.allLW['north'].rLW + that.allLW[fcolor].uLW
          middleDot = (that.baseLineEast[0] - that.baseLineEast[1]) + that.allLW['east'].sLW / 2 + that.allLW['north'].rLW - sumSize / 2
          break
        case 'east':
          sumSize = that.allLW['west'].sLW + that.allLW['north'].lLW + that.allLW['south'].rLW + that.allLW[fcolor].uLW
          middleDot = (that.baseLineEast[0] - that.baseLineEast[1]) + that.allLW['west'].sLW / 2 + that.allLW['south'].rLW - sumSize / 2
          break
      }
      return { middleDot: middleDot, sumSize: sumSize }
    })(this)
    // console.log(arrowPoint)
    this.ctx = ctx
    this.ctx.save()
    // 旋转
    this.ctx.translate(ox, oy)
    this.ctx.rotate((Math.PI / 180) * degree)
    this.ctx.translate(-ox, -oy)
    if (arrowPoint.sumSize > 0) {
      this.ctx.beginPath()
      this.ctx.moveTo(520 * this.magnification, arrowPoint.middleDot - arrowPoint.sumSize / 2)
      this.ctx.lineTo(560 * this.magnification, arrowPoint.middleDot - arrowPoint.sumSize / 2)
      this.ctx.lineTo(560 * this.magnification, arrowPoint.middleDot - arrowPoint.sumSize)
      this.ctx.lineTo(this.baseLineEast[0], arrowPoint.middleDot)
      this.ctx.lineTo(560 * this.magnification, arrowPoint.middleDot + arrowPoint.sumSize)
      this.ctx.lineTo(560 * this.magnification, arrowPoint.middleDot + arrowPoint.sumSize / 2)
      this.ctx.lineTo(520 * this.magnification, arrowPoint.middleDot + arrowPoint.sumSize / 2)
      this.ctx.closePath()
      this.ctx.fillStyle = this.color[fcolor]
      this.ctx.fill()
    }
    this.ctx.restore()
  },
  createCompass: function(ctx, x, y, width, height) {
    const newx = x * this.magnification
    const newy = y * this.magnification
    const newwidth = width * this.magnification
    const newheight = height * this.magnification
    var image = new Image()
    image.src = ImgUrl
    image.onload = function() {
      ctx.drawImage(image, newx, newy, newwidth, newheight)
    }
  },
  nullData: function(ctx) {
    this.ctx = ctx
    this.ctx.font = 40 * this.magnification + 'px Arial'
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
    this.ctx.textBaseline = 'middle'
    this.ctx.textAlign = 'center'
    this.ctx.fillText('暂无数据', this.baseLineEast[0] / 2, this.baseLineEast[0] / 2)
  }
}

function Draw(opts) {
  var part = opts.el
  var canvas = document.createElement('canvas')
  if (canvas.getContext && part) {
    part.innerHTML = ''
    var ctx = canvas.getContext('2d')
    var partStyle = window.getComputedStyle(part)
    var width = parseInt(partStyle.width)
    var height = parseInt(partStyle.height)
    var cssText = 'width: ' + width + 'px; height: ' + height + 'px;'
    canvas.setAttribute('style', cssText)
    canvas.width = (width * 2).toString()
    canvas.height = (height * 2).toString()
    part.appendChild(canvas)

    var direction = new CreateDirection(opts, canvas.width)
    if (opts.carVal && opts.carVal.length > 0) {
      direction.createCompass(ctx, 30, 15, 30, 120)
      opts.carVal.map(obj => {
        var carSum = (Number(obj.straightVolume) || 0) + (Number(obj.leftTurnVolume) || 0) + (Number(obj.rightTurnVolume) || 0) + (Number(obj.uturnVolume) || 0)
        switch (obj.entranceExitDirection) {
          case '北':
            // carSum <= 0 ? canvas.style.margin = '-50px 0 0 0' : ''
            direction.createFC(ctx, obj, carSum, canvas.width / 2, canvas.height / 2, -90, 'north')
            break
          case '南':
            // carSum <= 0 ? canvas.style.margin = '0 0 -50px 0' : ''
            direction.createFC(ctx, obj, carSum, canvas.width / 2, canvas.height / 2, 90, 'south')
            break
          case '西':
            // carSum <= 0 ? canvas.style.margin = '0 0 0 -50px' : ''
            direction.createFC(ctx, obj, carSum, canvas.width / 2, canvas.height / 2, 180, 'west')
            break
          case '东':
            // carSum <= 0 ? canvas.style.margin = '0 -50px 0 0' : ''
            direction.createFC(ctx, obj, carSum, canvas.width / 2, canvas.height / 2, 0, 'east')
            break
        }
      })
  
      opts.carVal.map(obj => {
        var carSum = Number(obj.straightVolume) + Number(obj.leftTurnVolume) + Number(obj.rightTurnVolume) + Number(obj.uturnVolume)
        switch (obj.entranceExitDirection) {
          case '北':
            direction.createArrow(ctx, obj, carSum, canvas.width / 2, canvas.height / 2, -90, 'north')
            break
          case '南':
            direction.createArrow(ctx, obj, carSum, canvas.width / 2, canvas.height / 2, 90, 'south')
            break
          case '西':
            direction.createArrow(ctx, obj, carSum, canvas.width / 2, canvas.height / 2, 180, 'west')
            break
          case '东':
            direction.createArrow(ctx, obj, carSum, canvas.width / 2, canvas.height / 2, 0, 'east')
            break
        }
      })
    } else {
      direction.nullData(ctx)
    }
  }
}

export default Draw
