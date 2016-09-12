Migration info
==============

This documentation is based on a actual experience on migrating one installation of `icommerce/multioptionfilter` to
`vaimo/multioptionfilter`. Note that some parts of this guide might suggest methods that require more time, but all
of them will have explanations on why certain migration paths/methods are recommended or even essential.

The main purpose of this documentation is to:

1. Help the user to get the best possible output from switching to the new module.
2. Encourage the output of the migration process to have some benefit to the new modules architecture and feature list (For example: while writing this guide, `vaimo/multioptionfilter` got another feature: generic css and .js, to allow filter to be displayed as a list of option drop-downs)

Introduction
------------

The main differences between the old and the new module come from the following:

1. The new module has no templates - it uses the standard templates of Magento Navigation Layer (that's the standard Magento filtering system).
2. The new module does not know anything about AJAX updating - that is done by another module.
3. Option selection is done when the page is rendered.
4. The javascript implementation is built using jQuery widget factory.

Why jQuery widget factory?
~~~~~~~~~~~~~~~~~~~~~~~~~~

The reasoning behind using widget factory is relatively simple, as it:

1. Has built-in extendability.
2. Binds directly to DOM nodes and treats them as singletons (if instantiated in a required way).
3. Supports very understandable name-spacing.
4. Is perfect for feature encapsulation.
5. Is the approach used by Magento2 core team. This is the new standard (as long as Vaimo is considered a Magento company).

Feature encapsulation
~~~~~~~~~~~~~~~~~~~~~

Is a concept that allows the user to create extensions of an object that add a certain single feature (with single
responsibility) to the overall architecture. In context of jQuery widget factory sub-classes this allows the developer to keep
all features in a separate javascript files / objects without worrying all too much about how they all work together.

1. Increased readability - complex systems are split into pieces by feature/purpose.
2. Encourages user to write generic .js snippets that can be re-used in different projects
3. Improves the possibility that the implemented features will end up in the general module (in this case: `vaimo/multioptionfilter`)

The suggested customization options
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following list indicates which customizations are recommended. The higher place in the list indicating a higher rank (stronger
recommendation). The main reasoning behind the order is to make the module easily upgradeable in the future.

Configuration changes
*********************

System configuration change, requires the least amount of effort. Don't shy away from coming up with new ideas about
configurable options to achieve the possibility of using this approach.

Do all the configuration changes in a data installation scripts of the project-specific module.

Layout changes
**************

Block configuration change or moving one block under new parent. Both cases allow really clear way of following what has
changed. Use separate layout .xml if possible. Note that using more than single layout xml for the whole project has literally
no downsides. It only makes it easier to understand what the layout changes relate to. Changes like this stack well.

CSS changes
***********

Also easy to track and easy to do multiple times when needed.

Javascript extensions
*********************

Note that it's always recommended to extend the base javascript classes that come with the module - this allows you to get
access to the base resources made available by the module. Note that you can extend the base object infinite number of times and
jQuery widget factory pattern makes it really easy this to accomplish.

Additional block
****************

In case the old filter has some extra visual features that are totally missing from the original module, do not rush to override
the templates - if possible - add another block/template to the mix that takes care of rendering the parts that are missing.

Suggesting changes to `vaimo/multioptionfilter`
***********************************************

The new module is far from being done. There is always something to improve - so if there are ways of making it more customizable
in a way that helps the future upgrades to happen faster - then there is no real reason why this should be overlooked.

Note that these changes should be introduced in a way of `fix` or `feature` branches that allow other team members to review your
work and suggest possible improvements.

Model/block rewrite
*******************

If the output from the blocks is almost what you need and there is no other way to achieve what you want - then rewriting a block
is a possible way out. This is not a recommended way of doing things as it is something that can be done only once and will not
translate well into repeated extendability. Still - it's relatively easy to read if done correctly.

Custom templates / template override
************************************

If everything else fails and the customization is so non-standard that all other options fail, then make the changes directly to
the template. Note that this will mean that you cut yourself off from possible upgrades and improvements in the future versions
and changes in templates are harder to understand and detect as custom templates require the whole original template code to be
transferred to the project-specific/customization-specific scope.

*This will also make it harder for you to isolate/encapsulate features for the purpose of having them added to the standard module (as it's design now on purpose avoids overwriting templates)*

Avoid at all costs, but do not resort to hacks.

Making changes to the `vaimo/multioptionfilter`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

As long as the changes are made in a branch, there really are no limitations in what a person can do. Still - most of the changes
should be supervised by other developers and it should be extremely clear that the customizations could not be applied in any
other way. All in all - if the changes end up back in the module, it's almost always a positive sign.

References
~~~~~~~~~~

Following projects have already migrated to the new module:

1. **project_purefun3** (project branch: feature/new-mof) - benefit to the standard module: generic horizontal filter (with dropdowns) implementation.

Preparation
-----------

It's essential that the person who is responsible for the migration has a good overview about the different feats that make the
implementation in hand unique and which customizations have been done to following parts of the standard module.

Note that although it's important to understand the customizations, most of them should be noted down in most generic way possible
as most of them (template and .js changes) will NOT translate directly to the customizations of the new module (due to the new
module sharing ZERO lines of template and .js code with the old one).

The best way is to be sure that you re-implement the styling and functionality with minimal amount of wasted code (no code copying, reuse as much as possible from standard module, etc).

Create customization containers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Apply all changes in custom feature-specific files so that it's clear what and why was customized.

* Name the css file as `<project_name>-multioptionfilter.css`
* Name the layout file as `<project_name>_multioptionfilter.xml`

Do a crude manual analysis of the filter's work
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Click around on the filter and see how it works in original implementation of the site. If possible, consult with the
developers who customized or implemented it.

See how it compares to the general non-tampered way the `icommerce/multioptionfilter` works.

Analyze template customizations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The old module has full set of custom templates for both full filter block and for each filter separately. All of those have been
removed from the new module and standard templates (with MUCH cleaner markup) have been used.

1. See what templates the original implementation has in project specific module or in the site-repository.
2. If needed, do a rough diff between the `icommerce/multioptionfilter` template and the template in the project.
3. Make notes about the differences - if needed - store the diff for future reference

Analyze .js customizations
~~~~~~~~~~~~~~~~~~~~~~~~~~

The old module had it's full library in skin/js folder, so there is a high chance that the whole javascript ended up in the
project skin folder as well.

1. See how the javascript customizations were implemented
2. If the full .js was copied to the project-specific skin folder, run a diff against it and note down the changes.
3. If the Prototype class in .js was extended in a proper way, take notes on what was changed.

Take notes on CSS customizations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This is actually something that you can avoid doing as you get much better overview of this when you use Developer Tools
provided by your favourite browser.

Uninstall the `icommerce/multioptionfilter`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

As the new module does not use any custom templates, most of the migration will actually concentrate re-implementing the
look and the feel of the original implementation without having any multioptionfilter modules installed.

This has several benefits

1. It limits the scope of what you're working on - the `look` of the filtering block.
2. It forces you to make sure that the standard filtering is also styled. This means that you have a guarantee, that the filtering will not get defaced, if multioptionfilter for some reason has to be turned off.

Make sure that the standard filter renders
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

See that all the standard filter templates are used and that it renders without any defects. If there are any defects due to additional block
rewrites or observers, makes sure that they are disabled and take note about the changes they introduce.

See that you have access to the original site
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

We will use this to port over the CSS to the new templates.

Install a module that allows automatic CSS updates
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This will prove immensely helpful as it allows you to write your new CSS directly to the customization file without and does not
require any page reloads.

Recommended module: `vaimo/gruntlivereload` - features both CSS and PHTML reload (when the specified file is changed and saved).

Note that the module repository has installation guide included in the README.md

Automated tests
~~~~~~~~~~~~~~~

If the filter is complicated and involves a lot of different test-cases to assure that most of the logic works, consider
creating CasperJS tests to assure that the implementation works.

Note that there are considerable resources to be found in vaimo/theme_carbon_tests when it comes to starting out with
test-automation and they are fairly easy to write. The module repository comes with a README.md that explains how to execute
them.

Migration
---------

The migration guide has been composed so that we move closer to the actual implementation in a really small increments where
the fact that the filter still works holds the highest importance.

Note that you might find it easier by not really going in-depth with analysing the original implementation as the modules
differ mainly on the areas where most of the customization takes place.

Don't forget to involve other developers with similar experience in the migration process as the migration guide itself
might still be missing some essential steps.

Create a project branch
~~~~~~~~~~~~~~~~~~~~~~~

If you're migrating the multioptionfilter on an aja project, start by creating a new branch for the migration process that
would hold all the branch references for the modules that were changed/involved. This makes it easier for other developers
who have to go through the same process to refer to an already-completed solution.

Suggested branch name: `feature/new-mof`

Note that you can refer to module branches in aja project when using `dev-<branch_name>` as version.

Install a module that allows automatic CSS updates
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Due to our projects having css in one large files, this might not be all that easy to do - so consider using Web Browser's
Developer Tools for analysing the CSS changes.

1. (Optional) If the original implementation uses horizontal filter toolbar (with drop-downs), then install/add `vaimo/multioptionfilter` right now and enable horizontal filter feature in the module. Otherwise continue without any multioptionfilter module installed.
2. Apply layout.xml changes that move the filter to the correct core/text_list type of block - prefer these blocks if possible as they render the content automatically.
3. Port over the CSS changes so that the filter block (not the options) looks similar to the original.
4. Port over the CSS changes that relate to filter options appearance.
5. Test that the filter works.
6. Re-do the .phtml customizations in the original module with CSS if possible.
7. (Optional) Style the state block. Note that in most `multioptionfilter` implementations, this is hidden.

Functional changes
~~~~~~~~~~~~~~~~~~

Avoid implementing anything related to AJAX functionality. This has been removed from the new module and is now handled by another module. Do not worry yourself about this at this point.

1. Add the module `vaimo/multioptionfilter` if you have not done this yet (see pt. 1 on the last step).
2. Create a branch named migration/<project name> - this allows you to suggest changes to the behaviour of the module if something about the customizations do not translate to new approach at all.
3. Check that the base functionality (multiple options in single filter block) works.
4. Create a custom .js file for any functional customizations needed. Name it `<project_name>-multioptionfilter.js`. Note that if there are multiple features that you have to implement - encapsulate them in different extensions - this will make it easier to port them over to the standard module later.
5. Re-implement most of the features that the original module had using the notes you got from both manual inspection and from notes/observations from the .js customizations.

Module configuration changes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Most of the module's logic will remain intact so as far as configuration is concerned, there aren't all that many things
to worry about. Note that some configuration options no longer have any effect (some features have been disabled on purpose):

1. Filtering with AJAX updates. This is now implemented in another module.
2. Integration with Icommerce_UrlRewrites. The solution involved a very risky way of replacing option ids with option labels and will be reimplemented in the future.
3. Sticky filter. The logic of using a cookie for doing this has been removed as it is known to corrupt FPC records.
4. Incremental loading. This will be implemented in another module.

Note that if the migration is done correctly, all these features will become available to the user without any extra modifications.

Advanced changes (AJAX, FPC, etc)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Install `vaimo/ajaxproductlist`
2. Make sure that the filtering works as expected
3. Customize the loader/spinner. Do not rewrite the template if possible. If the spinner/loader used by the original implementation differs from the one ajaxproductlist, consider adding a new customization option to modules related to ajaxproductlist.
4. In case FPC is used, make sure that it works. In case it does not, increase the parameter depth (standard configuration option in Magento for Page Cache) to match your needs for the caching. This can be found from: System > Configuration > Advanced:System > Full Page Cache Settings

Please do note that if you have to change the AJAX behaviour, DO NOT intermingle multioptionfilter's behaviour with AJAX
update as they have been built to be independent from each other for the sole purpose of keeping multioptionfilter module
and functionality as one-sided (single responsibility) as possible. Find alternative ways for implementing the feature that
would allow responsibility separation.

Polishing the end result
~~~~~~~~~~~~~~~~~~~~~~~~

1. Clean up the code/css/templates and be sure that your changes are as small and as localized as possible.
2. If you feel that there is nothing that one can take to the standard module, then now is the time to customize the templates.
3. Do a clearer functionality separation and make sure that most of your functions and extensions serve a single purpose and are easily understandable.
4. See if there is a feasible way of moving implemented features to `vaimo/multioptionfilter` as extra configurable features (which would make next migration/implementation much easier).
5. Ask other team members or somebody from the original team to review the new filter.

Post-Migration Assessment
-------------------------

After everything seems to be in place (the filter looks as it was on the original implementation). Take notes on which
features are related to customizations and which are features that have been implemented due to the new module lacking them.

1. Separate project specific customizations from the feature (most of the non-critical styling, etc).
2. Port over the feature to the standard module (to the project-specific branch though) and create a very clear-cut way of enabling/disabling/reusing the feature in other projects. Example for this: horizontal filter (filter with drop-sdowns).
3. Ask other team members (and someone from the Product Department team) to assess the ported generic features.

Congratulations. You are now running the new cleaned-up version of multioptionfilter.

Full Example (purefun)
----------------------

Here's a small overview of the migration process of migrating purefun and the end-result of this process.

1. New project at the time of migration was project_purefun3
2. Old project was kept at project_purefun

Analysis
~~~~~~~~

We take this step-by-step going from simple observation to doing the actual diff for the .phtml changes

Observations
************

1. The project has horizontal drop-downs for filter that are presented on top of product list.
2. It has several .phtml overrides (filter_mof, state_mof,view_mof_view_mof_container)
3. Javascript in vuxen-scripts.js and in ic_multioptionfilter.js

Comparing with module files
***************************

Now it's time to analyse the customizations

1. The templates are VERY different - so it can be assumed that they are from older mof version. It's very hard to pin-point the exact version at this point so we decide to base our migration on the visual representation.
2. Javascript changes is vuxen-scripts.js are mostly related to drop-down functionality
3. There are slight changes in ic_multioptionfilter.js which seems to indicate (considering the changes) that even that library is from older version. Most of the changes deal with error handling and not with any significant functionality changes.

Preparation
~~~~~~~~~~~

Now it's time to migrate us to the new module.

Removing old module
*******************

1. We remove `icommerce/multioptionfilter` from out project.
2. Do preliminary cleanup in places where it matters. Mainly, we take care of making sure that there are now modifications applied to the Navigation Layer blocks and that no CSS selectors are heavily involved in styling them.

Creating customization containers
*********************************

We create our own containers for customization which we keep strictly separated from the rest of the design changes already applied:

1. Separate layout file for block changes and for css/js adding purefun_multioptionfilter.xml which we declare in config.xml as well
2. Separate CSS file

Migration
~~~~~~~~~

Customizing the CSS
*******************

As there is no CSS provided by `vaimo/multioptionfilter`, we have nothing to override. There are only standard CSS rules in power which we will override by
having higher-weight selectors. We use the container `purefun_multioptionfilter.xml` declared earlier for this.

Most of the CSS customizations are applied via porting over the styling-related CSS from the live site by using Chrome developer tools.

Functional customizations
*************************

Standard filtering does not involve filter options to be shown in drop-downs - for this, we will need to apply certain javascript changes. This is now the
moment where we add the `vaimo/multioptionfilter` to the project which gives us access to some of the javascript helpers used by the module. The code is exclusively
related to only are related to selecting/unselecting options and does not deal with anything AJAX related (note that we don not do anything with AJAX at this point).

Implementing drop-downs
***********************

We extend mofSelector which will guarantee us that certain triggers/selectors will be correct and implement the basic drop-down logic.

We use the container `purefun-multioptionfilter.js` for this.

Enabling AJAX
*************

Now we add the Ajax support by installing `vaimo/ajaxproductlist`. Although this is not implemented on the actual/live site, we
decide that we want the drop-down to remain open after the filter options update (when we click on any of them). For this, we create another extension inside
`purefun-multioptionfilter.js` to encapsulate this feature separately from the base functionality of the drop-downs.

Polishing
*********

As the end-result was mostly achieved with keeping away from templates, it was quite obvious that the javascript put in place could be moved to `vaimo/multioptionfilter`.

Most of the code from `purefun-multioptionfilter.js` was moved to `horizontalFilter.js` in `vaimo/multioptionfilter`, which the exception of keeping some places there
that dealt with project-specific customizations:

1. multiple-columns of options in drop-downs
2. box-shadow compensation

Note that even those features have been encapsulated separately in `purefun-multioptionfilter.js` for clarity

Result
~~~~~~

For the next migration, the person responsible for going through the process can use layout update handle "mof_horizontal" in their project to switch the filter to
be presented as horizontal list filters with drop-downs without customizing anything other than adding a single line into layout updates.

`vaimo/multioptionfilter`
*************************

1. `js/vaimo/multioptionfilter/horizontalFilter.js`
2. `skin/frontend/base/default/css/horizontal-multioptionfilter.css`
3. <mof_horizontal> in `app/design/frontend/base/default/layout/vaimo_multioptionfilter.xml`

`vaimo/purefun3`
****************

1. Minor tweaks to drop-down behaviour: `skin/frontend/carbon/purefun/js/purefun-multioptionfilter.js`
2. Base for tweaking the filter on layout-level: `app/design/frontend/base/default/layout/vaimo_multioptionfilter.xml`
3. Styling on top of the base functional styling from the main module: `skin/frontend/carbon/purefun/css/purefun-multioptionfilter.css`