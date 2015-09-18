/**
 *    @setViewport
 *    class MyComponent extends React.Component {
 *
 *    }
 */

function setViewport(target) {
  target.annotated = true;

  let metaViewport = document.querySelector('meta[name=viewport]');
  metaViewport.content = 'width=device-width, initial-scale=1, maximum-scale=1';
}

export default setViewport;
