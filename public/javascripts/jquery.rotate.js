/* ===========================================================
* jquery.rotate.js
* http://ibandominguez.com
* ===========================================================
* Copyright 2014 Ibán Domínguez, Spain.
*
* Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
* ========================================================== */

(function ( $ ) {

  $.fn.rotate = function( config, callback ) {
    // get $ this ref
    var $this = $(this);

    // define defaults opts
    var opts = {
      degrees: 360,
      speed: 100
    };

    // extend config
    $.extend( opts, config );

    // perform animation
    $({deg: 0}).animate({deg: opts.degrees}, {
      duration: opts.speed,
      step: function ( now ) {
        $this.css({
          transform: "rotate(" + now + "deg)",
          "-webkit-transform": "rotate(" + now + "deg)",
          "-ms-transform": "rotate(" + now + "deg)",
          "-moz-transform": "rotate(" + now + "deg)",
          "-o-transform": "rotate(" + now + "deg)"
        });
      },
      complete: function () {
        // check for callback
        // and if so append it to
        // animate complete
        if (typeof callback == 'function') callback.call(this);
      }
    });

    // return this for method chaining
    return this;
  };

} ( jQuery ) );
