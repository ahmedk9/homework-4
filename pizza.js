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

        clonedTemplate.find(".small").html("$" +pizza.prices[0] + " / ");
        clonedTemplate.find(".medium").html("$" +pizza.prices[1] + " / ");
        clonedTemplate.find(".large").html("$" +pizza.prices[2]);


        clonedTemplate.removeClass("template-pizzas");
        if(pizza.vegetarian){
            container2.append(clonedTemplate);
        }
        else{
            container.append(clonedTemplate);
        }
        
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
 })

