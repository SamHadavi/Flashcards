function checkSignup() {
	var email = document.getElementById('emailInput').value;
	var username = document.getElementById('usernameInput').value;
	var password = document.getElementById('passwordInput').value;

	// if any entrys are blank display an alert
	if(email === "" || password.indexOf(' ') >= 0) {
		alert("Please enter your Email");
		return false
	} else if(username === "" || username.indexOf(' ') >= 0) {
		alert("Please enter your Username");
		return false
	} else if(password === "" || password.indexOf(' ') >= 0) {
		alert("Please enter your Password")
		return false
	} 
}