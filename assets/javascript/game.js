// code for the psychic game

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
            psychic_guesses = psychic_guesses + start_key + ", ";
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

// code for the hangman game below
//  Global variables
var hangman_word = ['PITTSBURGH','SACRAMENTO','SEATTLE','LOS ANGLES','CHICAGO','AUSTIN','PHOENIX','RENO','OAKLAND','SAN FRANCISCO','BALTIMORE','SALT LAKE CITY','ALBUQUERQUE','DENVER','HOUSTON','ATLANTA','NEW YORK CITY','BOSTON','MINNEAPOLIS'];
var hangman_img = ["<img src='assets/images/Hangman01.png'>","<img src='assets/images/Hangman02.png'>","<img src='assets/images/Hangman03.png'>","<img src='assets/images/Hangman04.png'>","<img src='assets/images/Hangman05.png'>","<img src='assets/images/Hangman06.png'>","<img src='assets/images/Hangman07.png'>"];
var word_cmp = "";
var word_string = "";
var word_arry = [];
var guess_arry = [];
var word_ltrs = 0;
var missed_guess = 0;
var missed_ltr = [];
var hang_losses = 0;
var hang_wins = 0;

// Randomly select a city from the hangman word array
function cmp_wrd_sel(){
    var cmp_rnd = Math.floor((Math.random()* hangman_word.length)+ 1);
    word_cmp = hangman_word[cmp_rnd];
    return word_cmp;
}

// Take the random city and figure out the number of letters, spaces, etc and place in arrays for showing the number of letters and validation later

function word_space(){
var ltr_cnt = word_cmp.length;
for (var i = 0; i < ltr_cnt; i++){
    var wrd = word_cmp.substr(i,1);
    if (wrd == " ")
    {
        word_arry.push(wrd);
        guess_arry.push("&nbsp&nbsp");
        word_string = word_string + "&nbsp&nbsp";
    }
    else
    {
        word_arry.push(wrd);
        guess_arry.push("__  ");
        word_string = word_string + "__  ";
        word_ltrs++;
    }
}
}

function word_start(){
    word_cmp = "";
    word_string = "";
    word_arry = [];
    guess_arry = [];
    word_ltrs = 0;
    missed_guess = 0;
    missed_ltr = [];
    cmp_wrd_sel();
    word_space();
    if (hang_start = 0){
    document.getElementById("word_msg").innerHTML = "Select a letter for the word wich is a City.";
    }
    document.getElementById("man").innerHTML = hangman_img[missed_guess];
    // console.log(word_string);
    document.getElementById("letters").innerHTML = word_string;
    document.getElementById("letter_guesses").innerHTML = missed_ltr;
    // console.log(word_arry);
    // console.log(guess_arry);
    // console.log(word_ltrs);
}

// check the the key that is pressed to see if it is a valid letter and then see if that is part of the word.

function letter_check(){
    if(usr_keycode >= 65 && usr_keycode <= 90)
    {
        var usr_key_tst = usr_key.toUpperCase();
        var matches = 0;
        for (var i = 0; i < word_arry.length ; i++){
            
            if(usr_key_tst == word_arry[i])
            {
                matches++;
                word_ltrs--;
                guess_arry[i] = usr_key_tst + "  ";
                // console.log(word_ltrs);
            }
        }
        if (matches > 0)
        {
            match_ltr();
            document.getElementById("letters").innerHTML = word_string;
            game_chk();
        }
        else
        {
            var used = 0;
            for (var i = 0; i < missed_ltr.length; i++){
                if (usr_key_tst == missed_ltr[i])
                {
                    used++;
                }
            }
            if (used > 0 )
            {
                document.getElementById("word_msg").innerHTML = "You already tried that letter already. Select one that is not a miss."
            }
            else
            {
                missed_guess++;
                missed_ltr.push(usr_key_tst);
                document.getElementById("man").innerHTML = hangman_img[missed_guess];
                document.getElementById("letter_guesses").innerHTML = missed_ltr;
                game_chk();
            }
        }
    }
    else
    {
        document.getElementById("word_msg").innerHTML = "Please select a letter.";
    }
}

function match_ltr(){
    word_string = guess_arry.join("");
}

// check to see if the user has won or lost the game

function game_chk(){
    if(missed_guess == 6){
        hang_losses++;
        document.getElementById("losses").innerHTML = hang_losses;
        document.getElementById("word_msg").innerHTML = "You Lose. :-(";
        word_start();
    }
    else
    {
        if(word_ltrs == 0 && missed_guess < 6)
        {
            hang_wins++;
            document.getElementById("wins").innerHTML = hang_wins;
            document.getElementById("word_msg").innerHTML = "You Win!!!";
            word_start();
        }
    }
}