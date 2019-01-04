const idCard = require('js-idcard');
const expect = require('chai').expect;

describe('补位测试', function () {
  describe('#leftPad()', function () {
    it('leftPad(\'123\', 10) => \'0000000123\'', function () {
      expect(idCard.leftPad('123', 10)).to.be.equal('0000000123');
    });
    it('leftPad(\'123\', 10, \'\') => \'123\'', function () {
      expect(idCard.leftPad('123', 10, '')).to.be.equal('123');
    });
    it('leftPad(\'123\', 10, \' \') => \'       123\'', function () {
      expect(idCard.leftPad('123', 10, ' ')).to.be.equal('       123');
    });
    it('leftPad(\'123\', 10, \'abc\') => \'cabcabc123\'', function () {
      expect(idCard.leftPad('123', 10, 'abc')).to.be.equal('cabcabc123');
    });
    it('leftPad(\'123\', 10, \'\u1234\') => \'\u1234\u1234\u1234\u1234\u1234\u1234\u1234123\'', function () {
      expect(idCard.leftPad('123', 10, '\u1234')).to.be.equal('\u1234\u1234\u1234\u1234\u1234\u1234\u1234123');
    });
    it('leftPad(\'123456789\', 5, \'\') => \'123456789\'', function () {
      expect(idCard.leftPad('123456789', 5, '')).to.be.equal('123456789');
    });
    it('leftPad(\'123456789\', 5, \' \') => \'123456789\'', function () {
      expect(idCard.leftPad('123456789', 5, ' ')).to.be.equal('123456789');
    });
  });

  describe('#rightPad()', function () {
    it('rightPad(\'123\', 10) => \'1230000000\'', function () {
      expect(idCard.rightPad('123', 10)).to.be.equal('1230000000');
    });
    it('rightPad(\'123\', 10, \'\') => \'123\'', function () {
      expect(idCard.rightPad('123', 10, '')).to.be.equal('123');
    });
    it('rightPad(\'123\', 10, \' \') => \'       123\'', function () {
      expect(idCard.rightPad('123', 10, ' ')).to.be.equal('123       ');
    });
    it('rightPad(\'123\', 10, \'abc\') => \'123abcabca\'', function () {
      expect(idCard.rightPad('123', 10, 'abc')).to.be.equal('123abcabca');
    });
    it('rightPad(\'123\', 10, \'\u1234\') => \'123\u1234\u1234\u1234\u1234\u1234\u1234\u1234\'', function () {
      expect(idCard.rightPad('123', 10, '\u1234')).to.be.equal('123\u1234\u1234\u1234\u1234\u1234\u1234\u1234');
    });
    it('rightPad(\'123456789\', 5, \'\') => \'123456789\'', function () {
      expect(idCard.rightPad('123456789', 5, '')).to.be.equal('123456789');
    });
    it('rightPad(\'123456789\', 5, \' \') => \'123456789\'', function () {
      expect(idCard.rightPad('123456789', 5, ' ')).to.be.equal('123456789');
    });
  });
});

describe('身份证验证测试', function () {
  describe('#endNum()', function () {
    it('11022619850127211 的最后1位为 6', function () {
      expect(idCard.endNum('11022619850127211')).to.be.equal(6);
    });
  });
  describe('#birthDay()', function () {
    it('110226198501272116 的生日应该为 1985/01/27', function () {
      expect(idCard.birthDay('110226198501272116').date).to.be.equal('1985/01/27');
    });
    it('110226198501272116 的农历生日应该为 1984/12/07', function () {
      expect(idCard.birthDay('110226198501272116').lunar).to.be.equal('1984/12/07');
    });
    it('110226198501272116 的星座应该为 水瓶座', function () {
      expect(idCard.birthDay('110226198501272116').zodiac).to.be.equal('水瓶座');
    });
    it('110226198501272116 的生肖应该为 鼠', function () {
      expect(idCard.birthDay('110226198501272116').zodiac_zh).to.be.equal('鼠');
    });
  });
  describe('#num15to18()', function () {
    it('411403960314001 转18位 411403199603140010', function () {
      expect(idCard.num15to18('411403960314001')).to.be.equal('411403199603140010');
    });
  });
  describe('#sex()', function () {
    it('110226198501272116 的性别为 男', function () {
      expect(idCard.sex('110226198501272116')).to.be.equal('男');
    });
  });
  describe('#address()', function () {
    it('110226198501272116 的地址为 北京市-平谷县', function () {
      expect(idCard.address('110226198501272116')).to.not.be.null;
      expect(idCard.address('110226198501272116')).to.not.be.undefined;
      expect(idCard.address('110226198501272116').province).to.be.equal('北京市');
      expect(idCard.address('110226198501272116').city).to.be.equal('无');
      expect(idCard.address('110226198501272116').area).to.be.equal('平谷县');
      expect(idCard.address('110226198501272116').address).to.be.equal('北京市平谷县');
      expect(idCard.address('110226198501272116').all).to.be.equal('北京市-平谷县');
    });
  });
  describe('#checkIdCard()', function () {
    it('411403199603140010 验证 true', function () {
      expect(idCard.checkIdCard('411403199603140010')).to.be.equal(true);
    });
    it('41140319960314001X 验证 false', function () {
      expect(idCard.checkIdCard('41140319960314001X')).to.be.equal(false);
    });
  });
});

