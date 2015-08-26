jest.dontMock('./..')

import React from 'react/addons'
import ImageResponsive, {Source} from './../src'
const TestUtils = React.addons.TestUtils

describe('React Image Responsive', () => {
    it('should return an image element', () => {
        let html = TestUtils.renderIntoDocument(
          <ImageResponsive src="http://placehold.it/50x50">
            <Source maxWidth={500} src="http://placehold.it/500x200"/>
            <Source maxWidth={800} src="http://placehold.it/800x200"/>
            <Source maxWidth={1200} src="http://placehold.it/1200x200"/>
          </ImageResponsive>
        )

        let image = TestUtils.findRenderedDOMComponentWithTag(html, 'img')
        expect(image.getDOMNode().getAttribute('src')).toEqual('http://placehold.it/50x50')
    })

    it('should work for a background image', () => {
        let html = TestUtils.renderIntoDocument(
          <ImageResponsive type="background-image" className="col-sm-12" src="http://placehold.it/50x50">
            <Source maxWidth={500} src="http://placehold.it/500x200"/>
            <Source maxWidth={800} src="http://placehold.it/800x200"/>
            <Source maxWidth={1200} src="http://placehold.it/1200x200"/>
            <span>coucou me voila</span>
          </ImageResponsive>
        )

        let image = TestUtils.findRenderedDOMComponentWithTag(html, 'div')
        expect(image.getDOMNode().className).toEqual('col-sm-12')

        let span = TestUtils.findRenderedDOMComponentWithTag(html, 'span')
        expect(span.getDOMNode().textContent).toEqual('coucou me voila')
    })
})
