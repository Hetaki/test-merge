var SHIRTS = {
  'img01': {
    name: 'Polo manga larga',
    price: 25,
    image: 'long-shirt-mask.png',
    colors: ['red', 'blue', 'green'],
  },
  'img02': {
    name: 'Polera',
    price: 45,
    image: 'polera-mask.png',
    colors: ['blue', 'gray', 'purple']
  },
  'img03': {
    name: 'Polo para niño',
    price: 110,
    image: 'shirt-kid-mask.png',
    colors: ['orange', 'red', 'yellow']
  },
  'img04': {
    name: 'Polo adulto',
    price: 120,
    image: 'shirt-mask.png',
    colors: ['red', 'orange', 'blue']
  },
  'img05': {
    name: 'Polo cuello V',
    price: 200,
    image: 'v-shirt-mask.png',
    colors: ['brown', 'green', 'skyblue']
  },
  'img06': {
    name: 'Polo para mujer',
    price: 200,
    image: 'women-shirt-mask.png',
    colors: ['pink', 'skyblue', 'gray']
  },
};

var ARTWORK = {
  'art01': {
    name:'calavera',
    image: 'calavera.png',
    price: 10
  },
  'art02': {
    name:'hoz',
    image: 'hoz.png',
    price: 45
  },
  'art03': {
    name:'tumba',
    image: 'tumba.png',
    price: 35
  }
};


var $modalProducts = $('.ui.modal.products');
var $color_container = $('.swatch');
var $modalArtWork = $('.ui.modal.mdl-art-work');
var $designArea = $('.design-area');
var $modalCreateText = $('.ui.modal.mdl-create-text');
var $currentLayouts = [];
var $currentTotal = 0;

var initProducts = function() {
  var content = $modalProducts.find('.content');
  var body = $("<div class='ui padded grid'  />");
  for(var kk in SHIRTS) {
    var shirt = SHIRTS[kk];
    body.append("<div class='five wide column'> " + 
                "<h5 class='ui top attached header'>" +
                shirt.name + '</h5>' +
                "<div class='ui attached segment'>" +
                "<img src='images/" + shirt.image + "' width='100%' /></div>"+
                "<div class='ui attached segment'>" +
                  "<a class='ui small teal button pickName' data-code='" + kk +"'>Seleccionar</a></div>" +
                "</div>");
  }
  content.html(body);
  $(document).on('click', 'a.pickName', function() {
    var shirt = SHIRTS[$(this).attr('data-code')];
    $('#mask-content').html("<img id='mask' width='80%' src='images/" + shirt.image + "'/>");
    $modalProducts.modal('hide');
    $color_container.empty();
    for(var ii in shirt.colors) {
      var color = shirt.colors[ii];
      $color_container.append('<div class="four wide column">' +
                    '<span rel="' + color + '" class="bg-colors" style="background-color:' + color + '"></span></div>');

    }
    $currentTotal = shirt.price;
    $('.money-total').html('$ ' + $currentTotal);
  });
};


var initArtWork = function() {
  var content = $modalArtWork.find('.content');
  var body = $("<div class='ui padded grid'  />");
  for(var kk in ARTWORK) {
    var artwork = ARTWORK[kk];
    body.append("<div class='five wide column'> " + 
                "<div class='ui attached segment'>" +
                "<img src='images/artwork/" + artwork.image + "' width='100%' /></div>"+
                "<div class='ui attached segment'>" +
                  "<a class='ui small teal button pickArtWork' data-code='" + kk +"'>Seleccionar</a></div>" +
                "</div>");
  }
  content.html(body);

  $(document).on('click', 'a.pickArtWork', function() {
    var artwork = ARTWORK[$(this).attr('data-code')];
    var span = $('<span />').html('<img src="images/artwork/' + artwork.image + '"/>');
    span.draggable();
    $designArea.append(span);
    $modalArtWork.modal('hide');
    $currentLayouts.push(artwork);
    $currentTotal += artwork.price;
    updateLayouts();
    alert('Agregado');
  });

}

function updateLayouts() {

  $('.layouts').html("<h5>Agregados</h5>");
  $('.layouts').show();
  var li = $('<div class="ui middle aligned divided list" />');
  for(var kk in $currentLayouts) {
    var layout = $currentLayouts[kk];
    var item = $('<div class="item" />');
    item.append('<img class="ui avatar image" src="images/artwork/' + layout.image + '" />');
    item.append($('<div class="content"/>').html('<a class="header">' + layout.name + '($ ' + layout.price + ')</a>'));
    li.append(item);
  }
  $('.layouts').append(li);
  $('.money-total').html('$ ' + $currentTotal);
}


function Init () {
  $modalProducts
    .modal('attach events', '#pickProduct', 'show');
  $modalArtWork.modal('attach events', '#pickArtWork', 'show');

  $modalCreateText.modal({
    onApprove : function() {
      var span  = $('<span />');
      span.html($('#txt-create-text').val());
      span.draggable();
      $designArea.append(span);
    }    
  }).modal('attach events', '#pickCreateText', 'show');

  initProducts(); // show products in modal
  initArtWork(); // show artwork
  $(document).on('click', 'span.bg-colors', function() {
    $.each($('.bg-colors'), function() {
      $(this).removeClass('selected');
    });
    $(this).addClass('selected');
    $('#mask').css({ 'background-color': $(this).attr('rel') });
  });

  // $designArea;
};