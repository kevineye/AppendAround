/*! appendAround markup pattern. [c]2012, @scottjehl, Filament Group, Inc. MIT/GPL 
how-to:
	1. Insert potential element containers throughout the DOM
	2. give each container a data-set attribute with a value that matches all other containers' values
	3. Place your appendAround content in one of the potential containers
*/
(function( $ ){
    $.fn.appendAround = function(){
        return this.each(function(){

            var $self = $( this ),
                att = "data-set",
                $parent = $self.parent(),
                parent = $parent[ 0 ],
                attval = $parent.attr( att ),
                $set = $( "["+ att +"='" + attval + "']"),
                $waypoint = null, // tracks original location
                waypointParent = null,
                weight = $self.data('weight');

            if(weight === undefined) {
                weight = $parent.data('weight');
                if(weight !== undefined) $self.data('weight', weight);
            }

            function isHidden( elem ){
                return window.getComputedStyle( elem ,null).getPropertyValue( "display" ) === "none";
            }

            function appendToVisibleContainer(){
                if( isHidden( parent ) ){
                    if( waypointParent && !isHidden( waypointParent ) ) {
                        $self.insertAfter( $waypoint );
                        parent = waypointParent;
                    } else {
                        var found = 0;
                        $set.each(function(){
                            if( !isHidden( this ) && !found ){
                                if(!$waypoint) {
                                    $waypoint = $('<span>').insertBefore( $self );
                                    waypointParent = $waypoint.parent()[0];
                                }
                                if(weight === undefined) {
                                    $self.appendTo( this );
                                } else {
                                    // $self.insertBefore( the first child of this as heavy as $self )
                                    var $foundChild;
                                    $(this).children().each(function() {
                                        var $this = $(this);
                                        var thisWeight = $this.data('weight');
                                        if($foundChild === undefined && thisWeight !== undefined) {
                                            if(thisWeight >= weight) $foundChild = $this;
                                        }
                                    });
                                    if($foundChild === undefined) {
                                        $self.appendTo( this );
                                    } else {
                                        $self.insertBefore($foundChild);
                                    }
                                }

                                found++;
                                parent = this;
                            }
                        });
                    }
                }
            }

            appendToVisibleContainer();

            $(window).bind( "resize", appendToVisibleContainer );

        });
    };

    $(document).ready(function() {
        // auto-init any direct descendants of elements with data-set property
        // except any with data-fixed
        $('[data-set] > :not([data-fixed])').appendAround();
    })
}( jQuery ));
