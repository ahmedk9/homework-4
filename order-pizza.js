var cart = new CartModel();
var total = 0;

function pizza(){
	var idx;
	var pizza;
    var template = $(".template-pizzas");
    var container = $(".meat");
    var container2 = $(".veg")
    var clonedTemplate;

	for (idx = 0; idx < com.dawgpizza.menu.pizzas.length; idx++) {
    	pizza = com.dawgpizza.menu.pizzas[idx];
        clonedTemplate = template.clone();
        clonedTemplate.find(".name").html(pizza.name);
        clonedTemplate.find(".description").html(pizza.description);


        clonedTemplate.find(".small").html('<button type= "button" class="btn btn-default btn-xs" data-type = "pizza" data-name = "'+ pizza.name + '" data-size = "small" data-price = "'+ pizza.prices[0] + '">' + "Small $" + pizza.prices[0] + '</button>' + " " );
        clonedTemplate.find(".medium").html('<button type= "button" class="btn btn-default btn-xs" data-type = "pizza" data-name = "'+ pizza.name + '" data-size = "medium" data-price = "'+ pizza.prices[1] + '">' + "Medium $" + pizza.prices[1] + '</button>' + " " );
        clonedTemplate.find(".large").html('<button type= "button" class="btn btn-default btn-xs" data-type = "pizza" data-name = "'+ pizza.name + '" data-size = "large" data-price = "'+ pizza.prices[2] + '">' + "Large $" + pizza.prices[2] + '</button>' + " ");


        clonedTemplate.removeClass("template-pizzas");
        if(pizza.vegetarian){
            container2.append(clonedTemplate);
        }
        else{
            container.append(clonedTemplate);
        }
        
	}
}

function addToCart() {
   // $(".submit-order-btn").show();

    var name = $(this).data("name");
    var type = $(this).data("type");
    var price = $(this).data("price");
    var size = "";
    if (type == "pizza") {
        size = $(this).data("size");
    }

    var item = new ItemModel({
        name : name,
        type : type,
        size : size,
        quantity : 0
    });

    if (cart.existsInCart(item) == -1) {
        cart.addItem(item);
        var itemHtml = $(".template-cart").clone().removeClass("template-cart");
        itemHtml.html("1x " + size + " " + name + "<span class=\"glyphicon glyphicon-remove\"></span>");
        itemHtml.attr("data-name", name);
        itemHtml.attr("data-type", type);
        itemHtml.attr("data-size", size);
        itemHtml.attr("data-price", price);
        $(".cart").append(itemHtml);

        $(".cart-item").unbind();
        $(".cart-item").bind("click", removeFromCart);
    } else {
        cart.addItem(item);
        var itemHtml = $('.cart-item[data-name="' + name + '"].cart-item[data-size="' + size + '"]');
        itemHtml.html(cart.getQuantity(item) + 1 + "x " + size + " " + name + "<span class=\"glyphicon glyphicon-remove\"></span>");
        itemHtml.attr("data-quantity", cart.getQuantity(item) + 1);
    }

    total += price;
    $(".cart-price").html(total);
    
}
function removeFromCart() {
        var name = $(this).data("name");
        var type = $(this).data("type");
        var price = $(this).data("price");
        var size = "";
        if (type == "pizza") {
            size = $(this).data("size");
        }

        var item = new ItemModel({
            name : name,
            type : type,
            size : size,
            quantity : 0
        });

        total -= price * (cart.getQuantity(item) + 1);
        $(".cart-price").html(total);

        cart.removeItem(item);
        $(this).remove();

        if (total == 0) {
            $(".submit-order-btn").hide();
        }
    }

function drinks(){
    var idx;
    var drink
    var template = $(".template-drinks");
    var container = $(".drink-menu");
    var clonedTemplate;

    for (idx = 0; idx < com.dawgpizza.menu.drinks.length; ++idx) {
    drink = com.dawgpizza.menu.drinks[idx];
        clonedTemplate = template.clone();

        clonedTemplate.find(".name").html(drink.name);
        clonedTemplate.find(".price").html("$" + drink.price);


        clonedTemplate.removeClass("template-drinks");
        container.append(clonedTemplate);
    //drink.name = name of drink
    //drink.price = price of drink
}
}

function desserts(){
    var idx;
    var dessert;
    var template = $(".template-dessert");
    var container = $(".dessert-menu");
    var clonedTemplate;

    for (idx = 0; idx < com.dawgpizza.menu.desserts.length; ++idx) {
    dessert = com.dawgpizza.menu.desserts[idx];
        clonedTemplate = template.clone();

        clonedTemplate.find(".name").html(dessert.name);
        clonedTemplate.find(".price").html("$" + dessert.price);


        clonedTemplate.removeClass("template-dessert");
        container.append(clonedTemplate);
}
}

$(function(){
    pizza();
    drinks();
    desserts(); 
    $(".btn-xs").click(addToCart);
 })

