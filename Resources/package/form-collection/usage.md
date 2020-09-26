# Form collection manager

Manages items of the Symfony form with type of collection [https://symfony.com/doc/current/form/form_collections.html]().

## Usage

Import JS and CSS files in template rendering the form or globally in application main javascript file.

```js
import '@arturdoruch/form-bundle/form-collection/styles.css';
import '../../vendor/arturdoruch/css-styles/module.css'; // For styling add/remove collection item buttons.
import formCollectionManager from '@arturdoruch/form-bundle/form-collection/form-collection-manager';
```

### Class API

`form-collection-manager` methods:

 * `update` 
  
   Updates form collections data and registers events (on buttons) of adding and removing collection items.
   Call this method after modifying the form elements.
  
 * `addItem`
 
   Adds one item ("li" element) to the all form collections.