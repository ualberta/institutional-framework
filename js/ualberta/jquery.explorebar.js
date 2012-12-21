/** 
Explore Bar
---------------------------------------------------------------------
Author:         Lane Olson
Sources:        jQuery Plugin Patterns:
                    http://coding.smashingmagazine.com/2011/10/11/essential-jquery-plugin-patterns/
Version:        1.0
Date:           December 18, 2012
Description:    Creates a circular list of items
---------------------------------------------------------------------
**/
;(function ($) {

    // initialize namespace if it doesn't exist
    if (!$.uaDesign) {
            $.uaDesign = {};
    };
    
    $.uaDesign.explorebar = function ( el, options ) {
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;
        
        // Explore Bar
        var itemWidth, controlWidth, visAreaWidth, numItems, leftMarg, totalItems;
        
        // to keep track of plugin state
        var isCreated = false;

        // Add a reverse reference to the DOM object
        base.$el.data( "uaDesign.explorebar" , base );

        base.init = function () {
        
            base.options = $.extend({}, $.uaDesign.explorebar.defaultOptions, options);
            
            base.$el.bind("createexplorebar", function() {
                base.create();
            });
            
            base.$el.bind("destroyexplorebar", function() {
                base.destroy();
            });

            base.create();
        };
        
        base.create = function() {
            if(!isCreated)
            {
            
                itemWidth = base.$el.find('li:first').outerWidth();
                controlWidth = base.$el.find('.eb-prev').outerWidth();
                visAreaWidth = base.$el.width()-(controlWidth*2);
                numItems = Math.floor(visAreaWidth/itemWidth);
                leftMarg = (visAreaWidth-(numItems*itemWidth))/2;
                totalItems = base.$el.find('li').length;
            
                base.$el.find('.explore-bar').css('left', ((visAreaWidth-(numItems*itemWidth))/2)+controlWidth+10);
                
                if(base.options.watchResize)
                {
                    $(window).bind('resize', function() {
                      // update widths
                      base.$el = $(el);
                      itemWidth = base.$el.find('li:first').outerWidth();
                      controlWidth = base.$el.find('.eb-prev').outerWidth();
                      visAreaWidth = base.$el.width()-(controlWidth*2);
                      numItems = Math.floor(visAreaWidth/itemWidth);
                      leftMarg = (visAreaWidth-(numItems*itemWidth))/2;
                      
                      base.$el.find('.explore-bar').css('left', ((visAreaWidth-(numItems*itemWidth))/2)+controlWidth+10);
                      
                      /**
                      console.log(
                        "itemWidth:" + itemWidth + "\n" +
                        "controlWidth:" + controlWidth + "\n" +
                        "visAreaWidth:" + visAreaWidth + "\n" +
                        "numItems:" + numItems + "\n" +
                        "leftMarg:" + leftMarg
                      );
                      */
                      
                    });
                }
                
                base.$el.find('.eb-control').bind('click', function() {
                  var currentPos = base.$el.find('.explore-bar').position().left;
                  var moveLeft = numItems*itemWidth;
                  if($(this).hasClass('eb-prev')) {
                    moveLeft *= -1;
                  }
                  base.$el.find('.explore-bar').css('left', currentPos-moveLeft);
                  
                  return false;
                });

                isCreated = true;
            }
        };
        
        base.destroy = function() {
            
            if(isCreated) {

                // remove any inline styling
                base.$el.find('.explore-bar').removeAttr('style');
                
                base.$el.find('.eb-control').unbind('click');
    
                itemWidth = null; controlWidth = null; visAreaWidth = null; numItems = null; leftMarg = null;
                
                isCreated = false;
            }
        };
        
        base.init();
    };
    
    $.uaDesign.explorebar.defaultOptions = {
        watchResize: true // bind on resize if true
    };
    
    $.fn.explorebar = function( options ) {
        return this.each(function () {
                (new $.uaDesign.explorebar(this, options));
        });
    };
    
})( jQuery );