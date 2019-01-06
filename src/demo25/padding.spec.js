'use strict';

const pad = require('./padding');
const expect = require('chai').expect;

describe('补位测试', function () {
  describe('#leftPad()', function () {
    it('leftPad(\'123\', 10) => \'0000000123\'', function () {
      expect(pad.leftPad('123', 10)).to.be.equal('0000000123');
    });
    it('leftPad(\'123\', 10, \'\') => \'123\'', function () {
      expect(pad.leftPad('123', 10, '')).to.be.equal('123');
    });
    it('leftPad(\'123\', 10, \' \') => \'       123\'', function () {
      expect(pad.leftPad('123', 10, ' ')).to.be.equal('       123');
    });
    // 当多字符补位时，到底应该使用左截取还是右截取？
    it('leftPad(\'123\', 10, \'abc\') => \'cabcabc123\'', function () {
      expect(pad.leftPad('123', 10, 'abc')).to.be.equal('cabcabc123');
    });
    it('ES2017自带方法padStart对字符串的补位与上述的不同(10, \'abc\') => \'abcabca123\'', function () {
      expect('123'.padStart(10, 'abc')).to.be.equal('abcabca123');
    });
    it('leftPad(\'123\', 10, \'\u1234\') => \'\u1234\u1234\u1234\u1234\u1234\u1234\u1234123\'', function () {
      expect(pad.leftPad('123', 10, '\u1234')).to.be.equal('\u1234\u1234\u1234\u1234\u1234\u1234\u1234123');
    });
    it('leftPad(\'123456789\', 5, \'\') => \'123456789\'', function () {
      expect(pad.leftPad('123456789', 5, '')).to.be.equal('123456789');
    });
    it('leftPad(\'123456789\', 5, \' \') => \'123456789\'', function () {
      expect(pad.leftPad('123456789', 5, ' ')).to.be.equal('123456789');
    });
  });

  describe('#rightPad()', function () {
    it('rightPad(\'123\', 10) => \'1230000000\'', function () {
      expect(pad.rightPad('123', 10)).to.be.equal('1230000000');
    });
    it('rightPad(\'123\', 10, \'\') => \'123\'', function () {
      expect(pad.rightPad('123', 10, '')).to.be.equal('123');
    });
    it('rightPad(\'123\', 10, \' \') => \'       123\'', function () {
      expect(pad.rightPad('123', 10, ' ')).to.be.equal('123       ');
    });
    it('rightPad(\'123\', 10, \'abc\') => \'123abcabca\'', function () {
      expect(pad.rightPad('123', 10, 'abc')).to.be.equal('123abcabca');
    });
    it('rightPad(\'123\', 10, \'\u1234\') => \'123\u1234\u1234\u1234\u1234\u1234\u1234\u1234\'', function () {
      expect(pad.rightPad('123', 10, '\u1234')).to.be.equal('123\u1234\u1234\u1234\u1234\u1234\u1234\u1234');
    });
    it('rightPad(\'123456789\', 5, \'\') => \'123456789\'', function () {
      expect(pad.rightPad('123456789', 5, '')).to.be.equal('123456789');
    });
    it('rightPad(\'123456789\', 5, \' \') => \'123456789\'', function () {
      expect(pad.rightPad('123456789', 5, ' ')).to.be.equal('123456789');
    });
  });
});
