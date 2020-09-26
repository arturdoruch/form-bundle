# FormBundle

Provides themes and JavaScript support for Symfony form.

<!--### Themes

Themes extends Symfony default themes and modifies several blocks.

 * Symfony default themes block modifications:
     * Added `novalidate` to the `form` tag.
     * In bootstrap:   

### Features

  * Adding and removing items (without reloading the page) of the Symfony form with type of collection 
 ([https://symfony.com/doc/current/form/form_collections.html]()) by JavaScript.-->

## Installation

```sh
composer require arturdoruch/form-bundle
```

Register bundle in `AppKernel` class.

```php
public function registerBundles()
{
    $bundles = [
        // Other bundles.
        new ArturDoruch\FormBundle\ArturDoruchFormBundle(),
    ];
}    
```

Install NodeJs package with JavaScript support for the form field actions.

```sh
yarn add link:vendor/arturdoruch/form-bundle/Resources/package
```

## Usage

### Applying themes

To apply form themes follow with 
[Symfony documentation](https://symfony.com/doc/current/form/form_themes.html#applying-themes-to-all-forms).
Themes are located in [`Resources/views/Form`](https://github.com/arturdoruch/form-bundle/tree/master/Resources/views/Form) directory.

### Rendering the form collection and managing collection items

If is not used the form theme from this bundle, for rendering form collection, specify in your template code writing below:

 * In template rendering the form:

    ```twig
    {% import '@ArturDoruchForm/FormCollection/renderer.html.twig' as collectionRenderer %}
    {{ collectionRenderer.render(form_collection) }}
    ```
    
 * In custom form template by overriding `collection_widget` block:     
 
    ```twig
    {%- block collection_widget -%}
        {% import '@ArturDoruchForm/FormCollection/renderer.html.twig' as collectionRenderer %}
        {{ collectionRenderer.render(form_collection) }}
    {%- endblock collection_widget -%}
    ``` 
    
Read how to [manage the form collection items](Resources/package/form-collection/usage.md) with JavaScript.    