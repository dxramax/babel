import { parse } from '../lib';

function getParser(code) {
  return () => parse(code, { sourceType: 'module', plugins: ['jsNext'] });
}

describe('jjjj', function() {
  it('should parse', function() {
    // expect(getParser(`💰({ total: 1 })`)()).toMatchSnapshot();
    // expect(getParser(`🤷‍♂️(a > 1) { } 🤔 { }`)()).toMatchSnapshot();
    expect(getParser(`let a.b = 3.142;`)()).toMatchSnapshot();
  });
});