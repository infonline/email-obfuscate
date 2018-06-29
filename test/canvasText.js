/* eslint-env mocha */
import expect from 'expect';
import DescribeClass from '../src/canvasText';

describe('CanvasText', () => {
  let subject;
  let options = {};
  let el;
  beforeEach(() => {
    el = document.createElement('div');
    document.body.appendChild(el);
  });
  afterEach(() => {
    document.body.removeChild(el);
  });
  it('should throw an error without options', () => {
    expect(() => new DescribeClass(el)).toThrow();
  });
  beforeEach(() => {
    options = {
      color: 'rgb(0, 0, 0)',
      font: '',
      fontSize: 16,
      height: 17,
      text: 'email@obfuscate.js',
      underline: false,
      width: 123
    };
    subject = new DescribeClass(el, options);
  });
  describe('creates a canvas element', () => {
    it('should have a set width', () => {
      expect(subject.create().width).toEqual(options.width);
    });
    it('should have a set height', () => {
      expect(subject.create().height).toEqual(options.height);
    });
  });
});
