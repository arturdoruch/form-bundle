/*!
 * (c) Artur Doruch <arturdoruch@interia.pl>
 */

/**
 * Manages items of the Symfony form collection.
 * @link https://symfony.com/doc/current/form/form_collections.html
 */
import $ from 'jquery';
import eventRegistry from '@arturdoruch/event-registry';

let collectionSelector = '*[data-form-collection]';
let $collections;
let collections = {};
let addItemEventIds = [];

const _object = {
    /**
     * Updates form collections data and registers events (on buttons) of adding and removing collection items.
     *
     * @return {_object}
     */
    update() {
        setCollectionsData();
        registerEvents();

        return this;
    },

    /**
     * Adds one item ("li" element) to the all form collections.
     *
     * @return {_object}
     */
    addItem() {
        triggerAddItem();

        return this;
    }
};

_object.update();

export default _object;

function setCollectionsData() {
    $collections = $(collectionSelector);

    for (const collection of $collections) {
        const data = collection.dataset;
        const $list = $(collection).find('ul').first();

        collections[data.formCollection] = {
            template: data.template,
            totalItems: $list.find('li').length,
            $list: $list
        };
    }
}

/**
 * Registers events (on buttons) of adding and removing collection items.
 */
function registerEvents() {
    for (let collection of $collections) {
        addItemEventIds.push(eventRegistry.on('click', $(collection).find('*[data-add-item]'), addItem));
    }
    eventRegistry.on('click', $collections.find('*[data-remove-item]'), removeItem, [true]);
}

/**
 * Adds one item ("li" element) to the all form collections.
 */
function triggerAddItem() {
    for (let eventId of addItemEventIds) {
        eventRegistry.trigger(eventId);
    }
}

/**
 * Adds item ("li" element) to the form collection.
 *
 * @param {object} e
 */
function addItem(e) {
    let $collection = getCollectionElement(e.currentTarget);

    if ($collection.length === 0) {
        return;
    }

    let collectionName = $collection.data('form-collection'),
        data = collections[collectionName],
        index = data.totalItems++,
        formTemplate = data.template
            .replace(/__name__label__/g, index)
            .replace(/__name__/g, index),
        $li = $('<li>').append(formTemplate);

    data.$list.append($li);

    eventRegistry.on('click', $li.find('*[data-remove-item]'), removeItem);
    //removeCollectionErrorMessage($collection);
}

/**
 * Removes item ("li" element) from the form collection.
 *
 * @todo Restore element.
 */
function removeItem(e, confirmRequired) {
    const $li = $(e.target).closest('li');
    const value = $li.find('*[name]').val();

    if (value && confirmRequired && !confirm('Are you sure you want to delete this item?')) {
        return;
    }

    //removeCollectionErrorMessage(getCollectionElement($li));
    $li.remove();
}

/**
 * @param {string} target
 * @return {*|jQuery}
 */
function getCollectionElement(target) {
    return $(target).closest(collectionSelector);
}

/*function removeCollectionErrorMessage($collection) {
 $collection.parent().find('> span.help-block').first().remove();
 }*/
