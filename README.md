# react-image-responsive
An image that is responsive to its width on the screen (can be also a background image)
Works with retina displays.

Why?
==============
Media queries only take care of the screen size and resolution, not about the actual image size.
What if your image is 300px on an iPhone and only 100px on a larger screen?

Installation
==============
```bash
npm install react-image-responsive
```

Usage (ES6 + JSX):
==============

```javascript
import React from 'react';
import ImageResponsive, {Source} from 'react-image-responsive';

React.render(
  <div>
    <ImageResponsive type="image" src="http://placehold.it/50x50" width="50%" height="200px">
        <Source src="http://placehold.it/1600x300" maxWidth={1600}/>
        <Source src="http://placehold.it/300x300"  maxWidth={300}/>
        <Source src="http://placehold.it/500x300"  maxWidth={500}/>
        <Source src="http://placehold.it/800x300"  maxWidth={800}/>
        <Source src="http://placehold.it/1000x300" maxWidth={1000}/>
    </ImageResponsive>
    <br/>
    <br/>
    <ImageResponsive type="background-image" src="http://placehold.it/50x50" width="50%" height="200px" style={{transition: 'background-image .3s linear'}}>
        <Source src="http://placehold.it/300x300"  maxWidth={300}/>
        <Source src="http://placehold.it/500x300"  maxWidth={500}/>
        <Source src="http://placehold.it/800x300"  maxWidth={800}/>
        <Source src="http://placehold.it/1600x300" maxWidth={1600}/>
        <Source src="http://placehold.it/1000x300" maxWidth={1000}/>
        This one is just a background image
        <br/>
        It looks perfect
    </ImageResponsive>
  </div>,
  document.getElementById('root')
);
```
