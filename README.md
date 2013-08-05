# AppendAround

## A pattern for responsive markup

- Original [c]2012, @scottjehl, Filament Group, Inc. MIT/GPL
- Modified to
  - preserve original element position/ordering whenever original containers are available
  - auto-initialize any elements contained in data-set containers, except any with data-fixed
  - order repositioned elements according to data-weight property on element or original container

## How-to
	1. Insert potential element containers throughout the DOM
	2. Give each container a data-set attribute with a value that matches all other containers' values
	3. Place your appendAround content in one of the potential containers
	4. Configure your CSS to only display one potential container at a time (and display others depending on @media conditions in your CSS)
	5. Any element in a data-set containers will keep itself in a visible container at all times
	6. Add data-fixed="true" to any elements in data-set containers that should not reposition themselves
	7. Add data-weight="..." to specify relative ordering among repositioned elements within a container


## Sample markup

	  <!-- potential container for appendAround -->
	  <div class="foo" data-set="foobarbaz"></div>
  
	  <ul>
	   <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
	   <li>Aliquam tincidunt mauris eu risus.</li>
	   <li>Vestibulum auctor dapibus neque.</li>
    </ul>
  
	  <!-- potential container for appendAround -->
	  <div class="bar" data-set="foobarbaz"></div>
  
	  <ul>
	   <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
	   <li>Aliquam tincidunt mauris eu risus.</li>
	   <li>Vestibulum auctor dapibus neque.</li>
	</ul>
  
    
	  <!-- initial container for appendAround -->
	  <div class="baz" data-set="foobarbaz">
  
	    <p class="sample">Sample appendAround Element</p>
  
	  </div>

## Sample CSS

   	/* the sample appendaround element */
	.sample {
		padding: 1em;
		background: tan;
	}
  
	.baz {
		display: block;
	}
	.foo,
	.bar {
		display: none; 
	}
  
	@media (min-width: 30em){
		.bar {
		  display: block;
		}
		.foo, .baz {
		  display: none; 
		}
	}
  
	@media (min-width: 50em){
		div.foo {
		  display: block;
		}
		div.bar, div.baz {
		  display: none; 
		}
	}

