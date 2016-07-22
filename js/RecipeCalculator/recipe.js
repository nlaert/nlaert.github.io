function Ingredient (name, amount)
{
	this.name = name;
	this.amount = amount;
};

Ingredient.prototype.toString = function() {
	if(this.hasAmount())
		return this.amount + ' ' + this.name;
	return this.name; 
};

Ingredient.prototype.hasAmount = function() {
	return this.amount > 0;
};

var ingredients = [];
/************ HTML ids to be used ********************/
var recipeInput = 'originalRecipe';
var originalPortionsInput = 'originalPortions';
var newPortionsInput = 'newPortions';
var resultDiv = 'resultDiv';
var resultUl = 'result';
var amountRadio = 'amountRadio';
var amountDiv = 'amountDiv';
var portionsRadio = 'portionsRadio';
var portionsDiv = 'portionsDiv';

/************ User Interface functions****************/
function modeSelected()
{
	if(document.getElementById(amountRadio).checked)
	{
		$('#'+amountDiv).removeClass('hidden');
		$('#'+portionsDiv).addClass('hidden');
	}
	else if(document.getElementById(portionsRadio).checked)
	{
		$('#'+portionsDiv).removeClass('hidden');
		$('#'+amountDiv).addClass('hidden');
	}
}

function execute()
{
	readRecipe();
	var originalPortions = document.getElementById(originalPortionsInput).value;
	var newPortions = document.getElementById(newPortionsInput).value;
	calculateByPortions(originalPortions, newPortions);
	printRecipe();
}

function readRecipe()
{
	var text = document.getElementById(recipeInput).value;
	var lines = text.split(/\n/);
	console.log(lines);
	lines.forEach(function(line)
	{
		var ing = newIngredient(line);
		ingredients.push(ing);
	});

}

function newIngredient(line)
{
	line = line.trim();
	var firstChar = line.charAt(0);
	if ((firstChar != ',' && firstChar!='.') && (firstChar < '0' || firstChar > '9'))
		return new Ingredient(line);
	var space = line.indexOf(' ');
	if (space < 0)
		throw 'Invalid Format';
	var amount = parseInt(line.substring(0,space));
	return new Ingredient(line.substring(space + 1), amount);
}

function calculateByPortions(originalPortions, newPortions)
{
	var percent = newPortions / originalPortions;
	ingredients.forEach(function(ingredient)
		{
			calculate(ingredient, percent);
		});
}

function calculate(ingredient, percent)
{
	if (ingredient.hasAmount())
		ingredient.amount = ingredient.amount * percent;
}

function printRecipe()
{
	var newRecipe = '';
	ingredients.forEach(function (elem) {
		 newRecipe = newRecipe + '<li class="list-group-item">' + elem.toString() + '</li>';
	});
	document.getElementById(resultDiv).className = 'row';
	document.getElementById(resultUl).innerHTML = newRecipe;
}