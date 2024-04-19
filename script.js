const start_game_button = document.querySelector("#start_game_button");
const display_wrapper = document.querySelector("#display_wrapper")
const score_counter = document.querySelector("#score_counter")
let user_input = document.querySelector("#user_input")
const ok_button_user_input = document.querySelector("#ok_button_user_input")
const quiz_box_wrapper = document.querySelector("#quiz_box");
const student_image = document.querySelector("#student_image")
let all_option_buttons = Array.from(document.querySelectorAll(".all_option_buttons"));
const answer_button = document.querySelector("#answer_button")
let guessing_box = [];
let score = 0;
let correct_answer;
let correct_guesses = 0;
let total_guesses = 0;
let focused_student;
let gameOver = false;


start_game_button.addEventListener("click", () => {
    display_wrapper.style.display = "block";
});

function randomPersonFromArray(array) {
    return random_unit = array[Math.floor(Math.random() * array.length)]; //<-- returnerar en random unit ifrån arrayen som man skickar in.
}

function selectNumberOfUniquePersons(array, number) {
    const units = new Set(); //<-- nytt set som heter units, där unika studenter hamnar

    while(units.size < number) { //<-- sålänge nya setet är mindre än användarens önskan i input, 
        let random_unit = randomPersonFromArray(array); //<-- random_unit returneringen från funktionen som plockar ut en random student från students.
        units.add(random_unit); //<-- lägg till den studenten i nya setet
    }

    return [...units]; //<-- array med antal unika studenter användaren vill gissa på
}

function selectCandidates() {
    const candidates = new Set(); //<-- nytt set med 4 unika kandidater
    correct_answer = guessing_box.pop(); // <- Väljer sista ifrån guessing box, och poppar ut den, så den kommer inte kunna bli vald igen. Sätter den som correct answer. Om den inte finns kommer den bli undefined.

    if (correct_answer === undefined) { // <- Fånga ifall spelet är över, resetta spelet om man trycker ok

        if (confirm(`Game over!\n Din poäng: ${correct_guesses}/${total_guesses}\n Tryck OK för att återställa spelet`)) {
            resetGame();
        }

    } else {
        candidates.add(correct_answer);
        while(candidates.size < 4) {
            let random_student = randomPersonFromArray(students); //<-- här gör jag random_student till en random student från students
            candidates.add(random_student); //<-- lägger till kandidaten i nya setet, eftersom det är ett Set är alla unika per automatik
        }
    
        return shuffleArray([...candidates]); //<-- gör om Set:et till array med de 4 unika kandidaterna, omshufflade
    }

}

function fillGuessingBox() {
    guessing_box = selectNumberOfUniquePersons(students, parseInt(user_input.value)); //<-- fyller min guessing_box med x antal studenter användaren vill gissa på
    user_input.value = '';
};


ok_button_user_input.addEventListener("click", () => { //<-- en funktion som lyssnar efter OK efter användaren skrivit in hur många hen vill gissa på
    let use_number_input = parseInt(user_input.value);

    if(isNaN(use_number_input)){
        alert("Oj, du glömde att skriva in ett tal!");
    } else if (use_number_input < 4){
        alert("Inte mindre än 4! Försök igen");
    } else if(use_number_input > students.length){
        alert("Nein! Inte högre än 41 sa jag ju!");
    } else {
        ok_button_user_input.disabled = true;
        quiz_box_wrapper.style.display = "block";
        
        fillGuessingBox(); //<-- startar funktionen som är att fylla den tomma arrayn med x antal unika studenter baserat på user input value
        startNewRound(); //<- startar ny runda
    }  
});

function setAndAppendCorrectAnswer(){   //<- detta funkar
    student_image.setAttribute("id", correct_answer.id); //<-- sätter ett attribut som är den random_units'ens id. (id't på objektet från students)
    student_image.src = correct_answer.image; //<-- img src, urlen, är .image på objektet som är correct_answer, den rätta (in pushade) personen
    student_image.append(correct_answer.image);
} 

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5) // <- Långsam och inte så hög variation, men duger för ändamålet
}


function assigningPersonsToButtons(candidates) { //<-- en funktion som ändrar innerHTML på knapparna till .name från objekten i funktionen selectCandidates() 
    for(i = 0; i < candidates.length; i++){
        if(all_option_buttons !== Number){
        all_option_buttons[i].setAttribute("function-id", candidates[i].id); //<-- sätter ett attribut, ett nytt "id", som är det nuvarande objektets .id 
        all_option_buttons[i].innerHTML = `${candidates[i].name}`; //<-- ändrar innerHTML till [i]-objektets .name.
    }};
};

function startNewRound() {
    const candidates = selectCandidates(); //<-- sätter variabeln candidates till funktionen som väljer ut de 4 unika, så att variabeln "blir" de 4 unika
    if (candidates) { // <- kontrollerar så koden inte kör vidare om det inte finns kandidater
        setAndAppendCorrectAnswer(); //<-- kör funktionen och skickar in de fyra unika i funktionen som väljer ut rätt "svar"
        assigningPersonsToButtons(candidates); //<-- kör funktionen och skickar in de fyra unika i funktionen som innerHTML:ar knapparna
    }
}

function resetGame() {
    guessing_box = [];
    total_guesses = 0;
    correct_guesses = 0;
    updateScore();
    ok_button_user_input.disabled = false;
    quiz_box_wrapper.style.display = "none";
}

function updateScore() {
    score_counter.textContent = `${correct_guesses}/${total_guesses}`;
}

function updateButtons() {
    all_option_buttons.forEach((button) => {
        button.disabled = true;
        if (button.getAttribute("function-id") === correct_answer.id.toString()) {
            button.style.backgroundColor = 'rgb(0, 221, 11)';
        } else {
            button.style.backgroundColor = 'rgb(255, 0, 0)';
        }
    })
}

function resetButtons() {
    all_option_buttons.forEach((button) => {
        button.style.backgroundColor = "";
        button.disabled = false;
    })

}

all_option_buttons.forEach((button) => {
    button.addEventListener("click", function(e) {
        focused_student = {
            id: Number(e.target.getAttribute("function-id")),
            name: e.target.innerHTML
        } ;
    })
})

answer_button.addEventListener("click", function() { 
    if(focused_student.id){
        total_guesses++;
        updateScore();
        if(focused_student.id === correct_answer.id) {
            correct_guesses++;
            updateScore();
        }

        updateButtons();

        setTimeout(() => {
            startNewRound();
            resetButtons()
        }, 2000)
}});

