var hasSelectedPlayer = false,
	hasSelectedDefender = false,
	myAttack = 8,
	myChosenPlayer = "",
	chosenDefender = "",
	attackNumber = 0,
	playersDefeated = 0,
	obiWan = {
		HP:120,
		attack:10,
		name: "Obiwan Kenobe"
	},
	luke = {
		HP:100,
		attack:5,
		name: "Luke Skywalker"
	},
	maul = {
		HP:180,
		attack:25,
		name: "Darth Maul"
	},
	vader = {
		HP:150,
		attack:20,
		name: "Darth Vader"
	},
	myPlayer = {
		HP:0,
		attack:0,
	},
	defender = {
		HP:0,
		attack:0,
		name: ""
	};

function assignMyPlayer(myChosenPlayer){		
	myPlayer.attack = myAttack;
	switch (myChosenPlayer) {
		case 'obiWan':			
			myPlayer.HP = obiWan.HP;
			break;
		case 'luke':			
			myPlayer.HP = luke.HP;
			break;
		case 'maul':			
			myPlayer.HP = maul.HP;
			break;
		case 'vader':			
			myPlayer.HP = vader.HP;
			break;
	}
}

function assignDefender(chosenDefender){		
	switch (chosenDefender) {
			case 'obiWan':			
				defender.attack = obiWan.attack;
				defender.HP = obiWan.HP;
				defender.name = obiWan.name;
				break;
			case 'luke':			
				defender.attack = luke.attack;
				defender.HP = luke.HP;
				defender.name = luke.name;
				break;
			case 'maul':			
				defender.attack = maul.attack;
				defender.HP = maul.HP;
				defender.name = maul.name;
				break;
			case 'vader':			
				defender.attack = vader.attack;
				defender.HP = vader.HP;
				defender.name = vader.name;
				break;
		}			
}

function updateMyPlayerHP(myChosenPlayer){		
	switch (myChosenPlayer) {
		case 'obiWan':			
			obiWan.HP = myPlayer.HP;
			$("#obiWanHP").html(obiWan.HP);
			break;
		case 'luke':			
			luke.HP = myPlayer.HP;
			$("#lukeHP").html(luke.HP);
			break;
		case 'maul':			
			maul.HP = myPlayer.HP;
			$("#maulHP").html(maul.HP);
			break;
		case 'vader':			
			vader.HP = myPlayer.HP;
			$("#vaderHP").html(vader.HP);
			break;
	}
}

function updateDefenderHP(chosenDefender){		
	switch (chosenDefender) {
		case 'obiWan':			
			obiWan.HP = defender.HP;
			$("#obiWanHP").html(obiWan.HP);
			break;
		case 'luke':			
			luke.HP = defender.HP;
			$("#lukeHP").html(luke.HP);
			break;
		case 'maul':			
			maul.HP = defender.HP;
			$("#maulHP").html(maul.HP);
			break;
		case 'vader':			
			vader.HP = defender.HP;
			$("#vaderHP").html(vader.HP);
			break;
	}
}

$( document ).ready(function() {
	$("#obiWanHP").html(obiWan.HP);
	$("#lukeHP").html(luke.HP);
	$("#vaderHP").html(vader.HP);
	$("#maulHP").html(maul.HP);

	$(".player").on("click",function(){			
		if(hasSelectedPlayer === false){		
			myChosenPlayer = $(this).attr('id');		
			assignMyPlayer(myChosenPlayer);
			$(this).attr('class','myPlayer');
			$(".myPlayer").appendTo("#myPlayerDiv");
			$(".player").appendTo("#middleDiv");
			$(".player").css("background-color","red");
			hasSelectedPlayer = true;
		}		
		else{
			chosenDefender = $(this).attr('id');
			$(this).attr('class','defender');
			$(".defender").appendTo("#bottomDiv");
			assignDefender(chosenDefender);
			hasSelectedDefender = true;
		}
	})

	$("#attack").on("click",function(){
		if(hasSelectedDefender){
			attackNumber ++; 	
			myPlayer.attack = myAttack*attackNumber;		
			defender.HP = defender.HP - myPlayer.attack;
			updateDefenderHP(chosenDefender);
			if (myPlayer.HP <= 0){
				$(".message1").html("You have been defeated...GAME OVER!!!");
				$(".message2").html("");
			}	
			else if(defender.HP > 0){
				myPlayer.HP = myPlayer.HP - defender.attack;
				updateMyPlayerHP(myChosenPlayer);
				$(".message1").html("You attacked " + defender.name + " for " + myPlayer.attack + " damage");
				$(".message2").html(defender.name + " attacked you back for " + defender.attack + " damage");
			}
			else if(defender.HP <= 0)
			{
				playersDefeated ++;                 
				if(playersDefeated <3){
					$(".defender").addClass("defeated");
					$(".message1").html("You have defeated " + chosenDefender + ", you can choose another enemy.");
					$(".message2").html("");
					hasSelectedDefender = false;
				}
				else{
					$(".message1").html("You Won!!! Game Over!!! The Force is strong in you!");
					$(".message2").html("");
					hasSelectedDefender = false;
				}
			}				
		}
		else{
			$(".message1").html("No Enemy Selected.");
			$(".message2").html("");
		}	
	})

	$("#restart").on("click",function(){
		location.reload();
	})

})
