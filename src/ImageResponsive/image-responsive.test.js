import React from 'react';
import ReactDOM from 'react-dom';
import ImageResponsive from './ImageResponsive';

it('renders without crashing', () => {
  const sources = [
    { maxWidth: 100, src: 'http://placehold.it/100x100' },
    { maxWidth: 200, src: 'http://placehold.it/200x200' },
    { maxWidth: 400, src: 'http://placehold.it/400x400' },
    { maxWidth: 800, src: 'http://placehold.it/800x800' }
  ];

  const div = document.createElement('div');
  ReactDOM.render(
    <ImageResponsive src="http://placehold.it/100x100" sources={sources} />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
  expect(true).toBe(true);
});
