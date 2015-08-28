import React from 'react'
import ImageResponsive, {Source} from 'react-image-responsive'

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
    <ImageResponsive type="background-image" src="http://placehold.it/50x50" width="50%" height="200px" transition={false}>
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
  document.getElementById('app')
)
