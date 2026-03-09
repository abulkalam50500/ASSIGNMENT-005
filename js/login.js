const PressLogin = () => {

    const Username = document.getElementById("user_name").value;
    const Password = document.getElementById("password").value;

    if (Username.trim() == null || Username.trim() == "") {
        alert("Please enter your username ")
        return;
    }

    if (Password.trim() == null || Password.trim() == "") {
        alert("Please enter your password ")
        return;
    }

    const CorrectUser = "admin";
    const CorrectPassword = "admin123";

    if (Username.trim() === CorrectUser && Password.trim() === CorrectPassword) {

       alert("successfully login");
        window.location.assign("home.html");

    } else {
        alert("Credentials Not Match!! Please Try Again");
        return;
    }



   

}