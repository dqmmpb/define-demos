'use strict';

const lottery = require('./lottery');
const expect = require('chai').expect;

describe('抽奖测试', function () {
  describe('#lottery()', function () {
    it('从10个数中随机选取3个', function () {
      const N = 10;
      const M = 3;
      const nums = {};
      for(let i = 1; i <= N; i++) {
        nums[i] = 0;
      }
      function add(nums, num) {
        nums[num] += 1;
      }

      let times = 10000;
      do {
        const lot = lottery.lottery(N, M);
        for (let i = 0; i < lot.length; i++) {
          add(nums, lot[i]);
        }
        expect(lot).to.be.an('array');
      } while (times-- > 0);
      console.log(nums);
    })
  });
});
