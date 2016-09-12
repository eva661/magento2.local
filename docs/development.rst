Development
===========

Please note that while Vaimo_Multioptionfilter is still a full-feature module, it no longer includes functionality
for doing AJAX-based updates to product list. This functionality has been factored out into another module to have
more clean-cut separation and responsibility between module (In the end, AJAX updated product list has nothing to do
with allowing multiple options to be selected in single filter).

Javascripts in the module
-------------------------

There are some javascripts included with module which has been split into multiple files based on the feature that they
add to the multioptionfilter, most of them can be removed if the feature is not required.

==================== ===================================================================================================
File                 Description
==================== ===================================================================================================
optionSelector.js    Basic functionality of marking certain MOF options as selected after page load (mandatory)
instantSelector.js   Select the filter options as soon as the filter is clicked (instead of selecting them after the block refresh)
horizontalFilter.js  Basic functionality to display filter as option drop-downs
==================== ===================================================================================================

The javascript is strictly written in jQuery using widget factory which makes it really easy to extend each of the
functions included in the javascript libraries.