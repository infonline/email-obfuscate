/* eslint-env mocha */
import expect from 'expect';
import DescribeClass from '../src/pseudoElement';

describe('PseudoElement', () => {
  let subject;
  let el;

  beforeEach(() => {
    el = document.createElement('div');
    document.body.appendChild(el);
  });

  afterEach(() => {
    document.body.removeChild(el);
  });

  it('should throw an error without element', () => {
    expect(() => new DescribeClass()).toThrow();
  });

  it('should determine attributes of the psedueo element', () => {
    const options = {
      name: 'email',
      domain: 'obfuscate',
      tld: 'js'
    };
    subject = new DescribeClass(el, options);
    const style = subject.determineStyle();
    expect(style.color).toEqual('rgb(0, 0, 0)');
    expect(style.fontSize).toBe(16);
    expect(style.font).toContain('16px');
    expect(style.text).toEqual('email@obfuscate.js');
    expect(style.underline).toEqual(false);
    expect(style.width).toBeGreaterThan(110);
    expect(style.height).toBeGreaterThan(15);
  });
  it('should render with a different color when forced', () => {
    const options = {
      name: 'email',
      domain: 'obfuscate',
      tld: 'js',
      color: '#FF0000'
    };
    subject = new DescribeClass(el, options);
    const style = subject.determineStyle();
    expect(style.color).toEqual('#FF0000');
    expect(style.fontSize).toBe(16);
    expect(style.font).toContain('16px');
    expect(style.text).toEqual('email@obfuscate.js');
    expect(style.underline).toEqual(false);
    expect(style.width).toBeGreaterThan(110);
    expect(style.height).toBeGreaterThan(15);
  });
});
