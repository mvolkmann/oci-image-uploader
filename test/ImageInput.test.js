import React from 'react';
import ImageInput from '../lib/ImageInput';
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';
import {shallow} from 'enzyme';

describe('Component: ImageInput', () => {
  it('should match its empty snapshot', () => {
    const tree = renderer.create(<ImageInput />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
