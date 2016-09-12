.. Vaimo_MultiOptionFilter documentation master file, created by
   sphinx-quickstart on Mon Nov 24 16:21:12 2014.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Welcome to Vaimo_MultiOptionFilter's documentation!
===================================================

Vaimo_MultiOptionFilter is a Magento module that enables filtering on multiple options in layered navigation. It is
based on Icommerce_MultiOptionFilter. The old documentation of Icommerce_MultiOptionFilter can be found
`here <http://confluence.vaimo.com/display/CUSEXP/Icommerce+MultiOptionFilter>`_.

Features
--------

* Multiple options filtering in layered navigation
* Independent of layout / design, uses the same templates as the standard layered navigation
* Very well adaptable pre-configured selectors (only targeting ol and li)
* jQuery widget factory based javascript implementation that is really easy to extend/customize
* Generic horizontal filter with drop-downs option. Enabled via layout.xml (based on standard templates).

Features moved
--------------

One of the goals with the new module is to move functionality out from the module that does not belong there. The module
should only take care of implementing multiple options filtering. This list contains features that now can be found in
separate modules.

* Ajax loading, `Vaimo_AjaxProductList <http://docs.vaimo.com/Vaimo_Ajaxproductlist/>`_


Features currently not supported
--------------------------------

This list contains features that are part of Icommerce_MultiOptionFilter but not yet supported by Vaimo_MultiOptionFilter.

* Infinite scrolling



Documentation
-------------

.. toctree::
   :maxdepth: 2

   migration
   development
