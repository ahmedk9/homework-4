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


        clonedTemplate.find(".small").html('<button type= "button" class="btn btn-primary btn-xs" data-type = "pizza" data-name = "'+ pizza.name + '" data-size = "small" data-price = "'+ pizza.prices[0] + '">' + "Small $" + pizza.prices[0] + '</button>' + " " );
        clonedTemplate.find(".medium").html('<button type= "button" class="btn btn-primary btn-xs" data-type = "pizza" data-name = "'+ pizza.name + '" data-size = "medium" data-price = "'+ pizza.prices[1] + '">' + "Medium $" + pizza.prices[1] + '</button>' + " " );
        clonedTemplate.find(".large").html('<button type= "button" class="btn btn-primary btn-xs" data-type = "pizza" data-name = "'+ pizza.name + '" data-size = "large" data-price = "'+ pizza.prices[2] + '">' + "Large $" + pizza.prices[2] + '</button>' + " ");


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
    $(".submit-order-btn").show();

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
        quantity : 1
    });

    if (cart.existsInCart(item) == -1) {
        cart.addItem(item);
        var itemHtml = $(".template-cart").clone().removeClass("template-cart");
        itemHtml.html("1x $" + price + " " + size + " " + name + "<span class=\"glyphicon glyphicon-remove\"></span>");
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
        itemHtml.html(cart.getQuantity(item)  + "x $" +price +" " + size + " " + name + "<span class=\"glyphicon glyphicon-remove\"></span>");
        itemHtml.attr("data-quantity", cart.getQuantity(item));
    }

    total += price;
    $(".cart-price").html("Total: " + "$" + total + " + $" + (total * 0.095).toFixed(2) + "(Tax) = " + (total * 1.095).toFixed(2));
    
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

        total -= price * (cart.getQuantity(item));
    $(".cart-price").html("Total: " + "$" + total + " + $" + (total * 0.095).toFixed(2) + "(Tax) = " + (total * 1.095).toFixed(2));

        cart.removeItem(item);
        $(this).remove();

        if( total == 0) {
            $(".cart-price").html("Total: $0 ");
        }
    }
function submitForm(){
    cart.populateInfo({
        name: $(".form-name").val(),
        address1: $(".form-line1").val(),
        address2: $(".form-line2").val(),
        zip: $(".form-zip").val(),
        phone: $(".form-phone").val(),
    });

    $("#jsonForm").val(JSON.stringify(cart));
        $(".address-form").find('[type="submit"]').trigger("click");
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
        clonedTemplate.find(".price").html('<button type= "button" class="btn btn-primary btn-xs" data-type = "drink" data-name = "'+ drink.name +'" data-price = "'+ drink.price + '">' + " $" + drink.price + '</button>' + " ");


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
        clonedTemplate.find(".price").html('<button type= "button" class="btn btn-primary btn-xs" data-type = "dessert" data-name = "'+ dessert.name +'" data-price = "'+ dessert.price + '">' + " $" + dessert.price + '</button>' + " ");


        clonedTemplate.removeClass("template-dessert");
        container.append(clonedTemplate);
}
}

$(function(){
    pizza();
    drinks();
    desserts(); 
    $(".btn-xs").click(addToCart);
    $(".submit-order-btn").click(function(){
         if (total >= 20) {
            $("#submitOrderForm").modal();
             $(".finalSubmitButton").click(submitForm);
            $(".minimum").html("");

        } else {
            $(".minimum").html("To deliver, the total should be at least $20.");
        }
    });
    $(".clear-cart").click(function(){
        cart.clearCart();
        total = 0;
        $(".cart-item").not(".template-cart").remove();
        $(".cart-price").html("Total: $0 ");
    });
 })

