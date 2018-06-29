/* eslint-env mocha */
import expect from 'expect';
import DescribeClass from '../src/simpleText';

describe('SimpleText', () => {
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
      altText: 'Alternate'
    };
    subject = new DescribeClass(el, options);
  });

  describe('creates an element', () => {
    it('should have a text set to altText', () => {
      expect(subject.create().innerText).toEqual(options.altText);
    });
  });
});
