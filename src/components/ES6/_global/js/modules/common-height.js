
/* 
 *************************************
 * <!-- Common Height -->
 
 *
 * Note: 
 *
 * Automatically sets the div height of the grid system to the height of the 
 * outer container when ".js-uix-common-height" class on ".row" or ".uix-core-grid__row" div.
 *
 *************************************
 */
import {
    templateUrl,
	homeUrl,
	ajaxUrl,
    browser,
    UixModuleInstance,
	UixGUID,
	UixMath,
	UixCssProperty,
	UixApplyAsyncScripts,
	UixApplyAsyncAllScripts
} from '@uixkit/core/_global/js';


export const COMMON_HEIGHT = ( ( module, $, window, document ) => {
	
	
	
	module.COMMON_HEIGHT               = module.COMMON_HEIGHT || {};
	module.COMMON_HEIGHT.version       = '0.0.1';
	module.COMMON_HEIGHT.pageLoaded = function() {

		$( '.js-uix-common-height' ).each( function()  {
			var $this        = $( this ),
				$window      = $( window ),
				windowWidth  = window.innerWidth,
				windowHeight = window.innerHeight,
				element      = $this,
				selectors    = '[class*=col-], [class*=uix-core-grid__col-]', //Bootstrap grid system and Custom uix grid system
				maxHeight    = 0;


			element.children( selectors ).each( function() {
				var element = $( this ).children();
				
				//Solve the problem that the image cannot be read accurately
				element.find( 'img' ).each( function()  {
					var imgOuter = $( this ).parent( 'a' ).css( 'display' );
					if ( imgOuter == 'inline' ) {
						$( this ).parent( 'a' ).css( 'display', 'inline-block' );
					}
				});
				
				
				//Height condition judgment
				if( element.hasClass( 'max-height' ) ) {
					maxHeight = element.outerHeight();
				} else {
					if ( element.outerHeight() > maxHeight )
					maxHeight = element.outerHeight();
				}
			});

			

			//No on mobile devices
			commonHeightInit( windowWidth );
			
			$window.on( 'resize', function() {
				// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
				if ( window.innerWidth != windowWidth ) {

					// Update the window width for next time
					windowWidth = window.innerWidth;

					// Do stuff here
					commonHeightInit( windowWidth );


				}
			});

			
			function commonHeightInit( w ) {

				if ( w > 768 ) {
					element.children( selectors ).each( function() {
						$( this ).css( 'height', maxHeight );
					});	
				} else {
					element.children( selectors ).each( function() {
						$( this ).css( 'height', 'auto' );
					});		
				}


			}		
		});	

	};

	module.components.pageLoaded.push( module.COMMON_HEIGHT.pageLoaded );

	return class COMMON_HEIGHT {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );
