function ItemModel(input){
	this.type = input.type;
	this.name = input.name;
	this.quantity = input.quantity;
	this.size = input.size;
}

function CartModel(input){
	this.items = [];
	this.name = "";
	this.address1 = "";
	this.address2 = "";
	this.zip = "";
	this.phone = "";
	this.nextUrl = "";
	this.nextCaption = "";
	this.items = [];

	this.clearCart = function(){
		items = [];
	};

	this.populateInfo = function(input){
		this.name= input.name;
		this.address1 = input.address1;
		this.address2 = input.address2;
		this.zip = input.zip;
		this.phone = input.phone;
		this.nextUrl = input.nextUrl;
		this.nextCaption = input.nextCaption;
	};

	this.addItem = function(item){
		var i = this.existsInCart(item);
		if(i>-1){
			this.items[i].quantity++;
		}
		else{
			this.items.push(item);
		}
		
	};

	this.existsInCart = function(item){
		for(var i = 0; i< this.items.length; i++){
			if(this.items[i].name == item.name && this.items[i].size == item.size){
				return i;
			}
		}
		return -1;
	};
this.getQuantity = function(item){
	var i = this.existsInCart(item);
	if(i == -1){
		return 0;
	}
	return this.items[i].quantity;
};

 
    
	this.removeItem = function(item){
		var index = this.existsInCart(item);
		if(index > -1){
			this.items.splice(index,1);
		}
	};
}