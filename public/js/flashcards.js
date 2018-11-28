function getCard() {

	var question = document.getElementById("question").value; 
	var answer = document.getElementById("answer").value;

    if ((question === null) || (answer === null)) {
        alert("Please enter both a question and answer.");
        return false
    } else if ((question.length < 3) || (answer.length < 3)) {
        alert("Invalid length for question or answer");
        return false
    }
};

document.getElementById("save").addEventListener("click", function() {
    getCard();
});