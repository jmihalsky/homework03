var ltr_game = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
var ltr_cmp = "";
var psychic_wins = 0;
var psychic_losses = 0;
var guesses = 10;
var psychic_guesses = "";

function cmp_sel(){
    var cmp = Math.floor((Math.random()*25)+1);
    ltr_cmp = ltr_game[cmp];
    return ltr_cmp;
}

function key_val(){
    if(val_key >= 65 && val_key <= 90)
    {
        if(start_key != ltr_cmp)
        {
            guesses--;
            psychic_guesses = psychic_guesses + start_key + " ";
            document.getElementById("guesses_ltr").innerHTML = psychic_guesses;
            document.getElementById("guesses_left").innerHTML = guesses;

            if (guesses == 0){
                psy_loss();
            }
            else
            {
                
                document.getElementById("msg").innerHTML = "You're guess was not correct, try again.";
            }
        }
        else
        {
            psy_win();
        }
    }
    else
    {
        return document.getElementById("msg").innerHTML = "You need to select a letter!";
    }
}

function psy_loss(){
    psychic_losses++;
    guesses = 10;
    document.getElementById("msg").innerHTML = "You lose. I have another number for you to guess, try again.";
    document.getElementById("losses").innerHTML = psychic_losses;
    cmp_sel();
    document.getElementById("guesses_left").innerHTML = guesses;
    psychic_guesses = "";
    document.getElementById("guesses_ltr").innerHTML = psychic_guesses;
}

function psy_win(){
    psychic_wins++;
    guesses = 10;
    document.getElementById("msg").innerHTML = "You Win!!!!! Test your luck and see if you can guess my new letter.";
    document.getElementById("wins").innerHTML = psychic_wins;
    cmp_sel();
    document.getElementById("guesses_left").innerHTML = guesses;
    psychic_guesses = "";
    document.getElementById("guesses_ltr").innerHTML = psychic_guesses;
}