$(function() {

  // form to create a new pet
  var $newItem = $('#new-item');

  // element to hold our list of pets
  var $itemsList = $('#items-list');

  // pets template (this is a function)
  var itemsTemplate = _.template($('#items-template').html());
  console.log("this is the compiled template");
  console.log(itemsTemplate);

  // start with seed data
  var items = [
    {name: "Dinner", description: "hamburgers"},
    {name: "Chores", description: "paint"},
    {name: "Workout", description: "jog"}
  ];

  // append our existing pets (from seed data) to `$petsList`
  _.each(items, function (item, index) {
    var $item = $(itemsTemplate(item));
    console.log($item);
    // $pet.attr('data-index', index);
    $itemsList.append($item);
  });

  // submit form to create a new pet
  $newItem.on('submit', function(event) {
    event.preventDefault();

    // create new pet object from form data
    var itemName = $('#item-name').val();
    var itemDescription = $('#item-description').val();
    var itemData = {name: itemName, description: itemDescription};

    // store our new pet in the `pets` array
    items.push(itemData);
    console.log(items);
    var index = items.indexOf(itemData);

    // append new pet to `$petsList`
    var $item = $(itemsTemplate(itemData));
    $item.attr('data-index', index);
    $itemsList.append($item);

    // reset the form and add autofocus back to first input
    $newItem[0].reset();
    $('#item-name').focus();
  });

  // remove pets from model and view
  $itemsList.on("click", ".delete", function () {
    var $item = $(this).closest(".item");
    var index = $item.attr('data-index');

    // remove pet from the `pets` array (model)
    items.splice(index, 1);
    console.log(items);

    // remove pet from the DOM (view)
    $item.remove();

    // reset indexes in DOM to match `pets` array
    // $.each loops through DOM elements
    $('.item').each(function(index) {
      $(this).attr('data-index', index);
    });
  });

});