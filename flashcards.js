document.getElementById("save").addEventListener("click", getQA);

var question = "";
var answer = "";
var qA = [];

function getQA() {
	question = document.getElementById("question").value; 
	answer = document.getElementById("answer").value;
	localStorage.setItem("question", question);
	localStorage.setItem("answer", answer);
};

var makeQA = () => {
	qA = [localStorage.getItem("question"), localStorage.getItem("answer")];
	return qA;
};

module.exports = {
	makeQA
}