// ========================================
// QUIZ MASTER
// Main JavaScript
// ========================================
// ========================================
// AUTHENTICATION
// ========================================

const authScreen = document.getElementById("auth-screen");
const loginBox = document.getElementById("login-box");
const signupBox = document.getElementById("signup-box");

const loginUsername = document.getElementById("login-username");
const loginPassword = document.getElementById("login-password");
const loginError = document.getElementById("login-error");
const loginBtn = document.getElementById("login-btn");

const signupUsername = document.getElementById("signup-username");
const signupDob = document.getElementById("signup-dob");
const signupPassword = document.getElementById("signup-password");
const signupConfirmPassword =
    document.getElementById("signup-confirm-password");

const signupError = document.getElementById("signup-error");
const signupBtn = document.getElementById("signup-btn");

const showSignupBtn =
    document.getElementById("show-signup-btn");

const showLoginBtn =
    document.getElementById("show-login-btn");

const logoutBtn =
    document.getElementById("logout-btn");

const welcomeUsername =
    document.getElementById("welcome-username");


// ========================================
// CURRENT USER
// ========================================

let currentUser = localStorage.getItem("quizCurrentUser");

function getUserKey(key) {
    if (!currentUser) return key;
    return `quiz_${currentUser}_${key}`;
}


// ========================================
// SHOW LOGIN
// ========================================

function showLogin() {

    loginBox.classList.remove("hide");
    signupBox.classList.add("hide");

    loginError.textContent = "";

}


// ========================================
// SHOW SIGN UP
// ========================================

function showSignup() {

    loginBox.classList.add("hide");
    signupBox.classList.remove("hide");

    signupError.textContent = "";

}


// ========================================
// SIGN UP
// ========================================

signupBtn.addEventListener("click", () => {

    const username =
        signupUsername.value.trim();

    const dob =
        signupDob.value;

    const password =
        signupPassword.value;

    const confirmPassword =
        signupConfirmPassword.value;


    signupError.textContent = "";


    // Check empty fields

    if (
        !username ||
        !dob ||
        !password ||
        !confirmPassword
    ) {

        signupError.textContent =
            "Please fill in all fields.";

        return;
    }


    // Check password match

    if (password !== confirmPassword) {

        signupError.textContent =
            "Passwords do not match.";

        return;
    }


    // Password length

    if (password.length < 6) {

        signupError.textContent =
            "Password must contain at least 6 characters.";

        return;
    }


    // Check existing users

    const users =
        JSON.parse(
            localStorage.getItem("quizUsers")
        ) || [];


    const existingUser =
        users.find(
            user =>
                user.username.toLowerCase() ===
                username.toLowerCase()
        );


    if (existingUser) {

        signupError.textContent =
            "Username already exists. Please choose another.";

        return;
    }


    // Create user

    const newUser = {

        username: username,

        dob: dob,

        password: password

    };


    users.push(newUser);


    localStorage.setItem(
        "quizUsers",
        JSON.stringify(users)
    );


    // Automatically login

    currentUser = username;

    localStorage.setItem(
        "quizCurrentUser",
        username
    );


    signupUsername.value = "";
    signupDob.value = "";
    signupPassword.value = "";
    signupConfirmPassword.value = "";


    showDashboard();

});


// ========================================
// LOGIN
// ========================================

loginBtn.addEventListener("click", () => {

    const username =
        loginUsername.value.trim();

    const password =
        loginPassword.value;


    loginError.textContent = "";


    if (!username || !password) {

        loginError.textContent =
            "Please enter your username and password.";

        return;
    }


    const users =
        JSON.parse(
            localStorage.getItem("quizUsers")
        ) || [];


    const user =
        users.find(
            user =>
                user.username.toLowerCase() ===
                    username.toLowerCase() &&
                user.password === password
        );


    if (!user) {

        loginError.textContent =
            "Invalid username or password.";

        return;
    }


    currentUser = user.username;


    localStorage.setItem(
        "quizCurrentUser",
        currentUser
    );


    loginUsername.value = "";
    loginPassword.value = "";


    showDashboard();

});


// ========================================
// LOGOUT
// ========================================

logoutBtn.addEventListener("click", () => {

    currentUser = null;

    localStorage.removeItem(
        "quizCurrentUser"
    );


    dashboardScreen.classList.add("hide");
    setupScreen.classList.add("hide");
    quizScreen.classList.add("hide");
    resultScreen.classList.add("hide");

    authScreen.classList.remove("hide");

    showLogin();

});


// ========================================
// LOGIN / SIGNUP SWITCH
// ========================================

showSignupBtn.addEventListener(
    "click",
    showSignup
);


showLoginBtn.addEventListener(
    "click",
    showLogin
);


// ========================================
// SHOW DASHBOARD
// ========================================

function showDashboard() {

    authScreen.classList.add("hide");

    setupScreen.classList.add("hide");
    quizScreen.classList.add("hide");
    resultScreen.classList.add("hide");

    dashboardScreen.classList.remove("hide");


    if (welcomeUsername && currentUser) {

        welcomeUsername.textContent =
            currentUser;

    }


    updateStatistics();
    updateSubjectScores();

}

// ========================================
// QUESTION BANK
// ========================================

const questionBank = {

    // ========================================
// PYTHON
// ========================================

Python: [

    {
        question: "Which keyword is used to define a function in Python?",
        difficulty: "Easy",
        explanation: "The def keyword is used to define a function in Python.",
        answers: [
            { text: "function", correct: false },
            { text: "def", correct: true },
            { text: "fun", correct: false },
            { text: "define", correct: false }
        ]
    },

    {
        question: "Which symbol is used for a single-line comment in Python?",
        difficulty: "Easy",
        explanation: "The # symbol is used to create a single-line comment in Python.",
        answers: [
            { text: "//", correct: false },
            { text: "/* */", correct: false },
            { text: "#", correct: true },
            { text: "<!-- -->", correct: false }
        ]
    },

    {
        question: "Which data type is used to store True or False?",
        difficulty: "Easy",
        explanation: "The bool data type represents Boolean values such as True and False.",
        answers: [
            { text: "int", correct: false },
            { text: "bool", correct: true },
            { text: "str", correct: false },
            { text: "float", correct: false }
        ]
    },

    {
        question: "Which function is used to display output in Python?",
        difficulty: "Easy",
        explanation: "The print() function is used to display output on the screen.",
        answers: [
            { text: "display()", correct: false },
            { text: "echo()", correct: false },
            { text: "print()", correct: true },
            { text: "output()", correct: false }
        ]
    },

    {
        question: "Which of the following is a mutable Python collection?",
        difficulty: "Easy",
        explanation: "A list is mutable, meaning its elements can be changed after creation.",
        answers: [
            { text: "Tuple", correct: false },
            { text: "String", correct: false },
            { text: "List", correct: true },
            { text: "Integer", correct: false }
        ]
    },

    {
        question: "Which operator is used for exponentiation in Python?",
        difficulty: "Easy",
        explanation: "The ** operator performs exponentiation. For example, 2 ** 3 produces 8.",
        answers: [
            { text: "^", correct: false },
            { text: "**", correct: true },
            { text: "//", correct: false },
            { text: "%%", correct: false }
        ]
    },

    {
        question: "Which keyword is used to create a class in Python?",
        difficulty: "Easy",
        explanation: "The class keyword is used to define a class in Python.",
        answers: [
            { text: "object", correct: false },
            { text: "class", correct: true },
            { text: "struct", correct: false },
            { text: "define", correct: false }
        ]
    },

    {
        question: "Which function returns the number of items in a list?",
        difficulty: "Easy",
        explanation: "The len() function returns the number of elements in a collection such as a list.",
        answers: [
            { text: "length()", correct: false },
            { text: "size()", correct: false },
            { text: "len()", correct: true },
            { text: "count()", correct: false }
        ]
    },

    {
        question: "Which method adds an item to the end of a list?",
        difficulty: "Medium",
        explanation: "The append() method adds one item to the end of a list.",
        answers: [
            { text: "add()", correct: false },
            { text: "append()", correct: true },
            { text: "push()", correct: false },
            { text: "insertEnd()", correct: false }
        ]
    },

    {
        question: "Which keyword is commonly used to handle exceptions?",
        difficulty: "Medium",
        explanation: "The try keyword starts a block of code that may raise an exception and is normally used with except.",
        answers: [
            { text: "catch", correct: false },
            { text: "try", correct: true },
            { text: "error", correct: false },
            { text: "handle", correct: false }
        ]
    },

    {
        question: "What is the output of print(10 // 3)?",
        difficulty: "Medium",
        explanation: "The // operator performs floor division. 10 divided by 3 is 3.333..., so the result is 3.",
        answers: [
            { text: "3", correct: true },
            { text: "3.33", correct: false },
            { text: "4", correct: false },
            { text: "1", correct: false }
        ]
    },

    {
        question: "Which collection stores key-value pairs in Python?",
        difficulty: "Medium",
        explanation: "A dictionary stores data as key-value pairs, such as {'name': 'John'}.",
        answers: [
            { text: "List", correct: false },
            { text: "Tuple", correct: false },
            { text: "Dictionary", correct: true },
            { text: "Set", correct: false }
        ]
    },

    {
        question: "What is the output of print(len(\"Python\"))?",
        difficulty: "Medium",
        explanation: "The string Python contains six characters: P, y, t, h, o and n.",
        answers: [
            { text: "5", correct: false },
            { text: "6", correct: true },
            { text: "7", correct: false },
            { text: "8", correct: false }
        ]
    },

    {
        question: "Which keyword is used to create an anonymous function?",
        difficulty: "Medium",
        explanation: "The lambda keyword is used to create small anonymous functions in Python.",
        answers: [
            { text: "anonymous", correct: false },
            { text: "lambda", correct: true },
            { text: "function", correct: false },
            { text: "def", correct: false }
        ]
    },

    {
        question: "Which method removes and returns the last item from a list?",
        difficulty: "Medium",
        explanation: "The pop() method removes and returns an item from a list. Without an index, it removes the last item.",
        answers: [
            { text: "remove()", correct: false },
            { text: "delete()", correct: false },
            { text: "pop()", correct: true },
            { text: "discard()", correct: false }
        ]
    },

    {
        question: "What is the output of print(2 ** 3)?",
        difficulty: "Medium",
        explanation: "The ** operator performs exponentiation. 2 raised to the power of 3 is 8.",
        answers: [
            { text: "5", correct: false },
            { text: "6", correct: false },
            { text: "8", correct: true },
            { text: "9", correct: false }
        ]
    },

    {
        question: "Which keyword is used to exit a loop immediately?",
        difficulty: "Medium",
        explanation: "The break statement immediately terminates the nearest enclosing loop.",
        answers: [
            { text: "stop", correct: false },
            { text: "exit", correct: false },
            { text: "break", correct: true },
            { text: "return", correct: false }
        ]
    },

    {
        question: "What is the output of print([1, 2, 3][1])?",
        difficulty: "Hard",
        explanation: "Python uses zero-based indexing. Index 0 is 1, index 1 is 2, and index 2 is 3.",
        answers: [
            { text: "1", correct: false },
            { text: "2", correct: true },
            { text: "3", correct: false },
            { text: "Error", correct: false }
        ]
    },

    {
        question: "What is the output of print(\"Python\"[0:3])?",
        difficulty: "Hard",
        explanation: "Python slicing includes the start index but excludes the end index. [0:3] therefore returns Pyt.",
        answers: [
            { text: "Pyt", correct: true },
            { text: "Pyth", correct: false },
            { text: "yth", correct: false },
            { text: "Python", correct: false }
        ]
    },

    {
        question: "Which keyword is used to skip the current iteration of a loop?",
        difficulty: "Hard",
        explanation: "The continue statement skips the remaining statements in the current iteration and moves to the next iteration.",
        answers: [
            { text: "skip", correct: false },
            { text: "pass", correct: false },
            { text: "continue", correct: true },
            { text: "next", correct: false }
        ]
    },

    {
        question: "What is the output of print(bool([]))?",
        difficulty: "Hard",
        explanation: "An empty list is considered falsy in Python, so bool([]) returns False.",
        answers: [
            { text: "True", correct: false },
            { text: "False", correct: true },
            { text: "None", correct: false },
            { text: "Error", correct: false }
        ]
    },

    {
        question: "Which statement correctly creates a set containing 1, 2 and 3?",
        difficulty: "Hard",
        explanation: "Curly braces with comma-separated values create a set when the values are not key-value pairs.",
        answers: [
            { text: "{1, 2, 3}", correct: true },
            { text: "[1, 2, 3]", correct: false },
            { text: "(1, 2, 3)", correct: false },
            { text: "{1: 2: 3}", correct: false }
        ]
    },

    {
        question: "What is the output of print(3 == 3.0)?",
        difficulty: "Hard",
        explanation: "Python considers the integer 3 and floating-point number 3.0 equal when comparing their values.",
        answers: [
            { text: "True", correct: true },
            { text: "False", correct: false },
            { text: "3.0", correct: false },
            { text: "Error", correct: false }
        ]
    },

    {
        question: "Which built-in function converts a string containing a number into an integer?",
        difficulty: "Hard",
        explanation: "The int() function converts a suitable numeric string such as '25' into the integer 25.",
        answers: [
            { text: "str()", correct: false },
            { text: "float()", correct: false },
            { text: "int()", correct: true },
            { text: "number()", correct: false }
        ]
    },

    {
        question: "What is the output of print([x * 2 for x in range(3)])?",
        difficulty: "Hard",
        explanation: "range(3) produces 0, 1 and 2. Multiplying each value by 2 produces [0, 2, 4].",
        answers: [
            { text: "[0, 1, 2]", correct: false },
            { text: "[2, 4, 6]", correct: false },
            { text: "[0, 2, 4]", correct: true },
            { text: "[1, 2, 3]", correct: false }
        ]
    }

],

    // ========================================
// JAVA
// ========================================

Java: [

    {
        question: "Which keyword is used to create a class in Java?",
        difficulty: "Easy",
        explanation: "The class keyword is used to declare a class in Java.",
        answers: [
            { text: "class", correct: true },
            { text: "struct", correct: false },
            { text: "define", correct: false },
            { text: "object", correct: false }
        ]
    },

    {
        question: "Which method is the entry point of a Java program?",
        difficulty: "Easy",
        explanation: "The main() method is the standard entry point of a Java application.",
        answers: [
            { text: "start()", correct: false },
            { text: "main()", correct: true },
            { text: "run()", correct: false },
            { text: "execute()", correct: false }
        ]
    },

    {
        question: "Which keyword is used for inheritance between classes in Java?",
        difficulty: "Easy",
        explanation: "The extends keyword is used when one class inherits from another class.",
        answers: [
            { text: "inherits", correct: false },
            { text: "extends", correct: true },
            { text: "implements", correct: false },
            { text: "super", correct: false }
        ]
    },

    {
        question: "Which keyword is used to create an object in Java?",
        difficulty: "Easy",
        explanation: "The new keyword is used to create an object and allocate memory for it.",
        answers: [
            { text: "create", correct: false },
            { text: "object", correct: false },
            { text: "new", correct: true },
            { text: "instance", correct: false }
        ]
    },

    {
        question: "Which data type is commonly used to store whole numbers in Java?",
        difficulty: "Easy",
        explanation: "The int data type is commonly used to store whole numbers such as 10, 25 and -5.",
        answers: [
            { text: "float", correct: false },
            { text: "double", correct: false },
            { text: "int", correct: true },
            { text: "char", correct: false }
        ]
    },

    {
        question: "Which symbol is used to terminate most Java statements?",
        difficulty: "Easy",
        explanation: "A semicolon (;) is used to terminate most Java statements.",
        answers: [
            { text: ".", correct: false },
            { text: ":", correct: false },
            { text: ";", correct: true },
            { text: ",", correct: false }
        ]
    },

    {
        question: "Which keyword refers to the current object in Java?",
        difficulty: "Easy",
        explanation: "The this keyword refers to the current object inside an instance method or constructor.",
        answers: [
            { text: "self", correct: false },
            { text: "this", correct: true },
            { text: "current", correct: false },
            { text: "object", correct: false }
        ]
    },

    {
        question: "Which of the following is a valid Java primitive data type?",
        difficulty: "Easy",
        explanation: "int is one of Java's eight primitive data types.",
        answers: [
            { text: "String", correct: false },
            { text: "Array", correct: false },
            { text: "int", correct: true },
            { text: "Scanner", correct: false }
        ]
    },

    {
        question: "Which keyword prevents a class from being inherited?",
        difficulty: "Medium",
        explanation: "A class declared as final cannot be extended by another class.",
        answers: [
            { text: "static", correct: false },
            { text: "private", correct: false },
            { text: "final", correct: true },
            { text: "constant", correct: false }
        ]
    },

    {
        question: "What is method overloading in Java?",
        difficulty: "Medium",
        explanation: "Method overloading allows multiple methods with the same name but different parameter lists.",
        answers: [
            { text: "Using different class names", correct: false },
            { text: "Multiple methods with the same name and different parameters", correct: true },
            { text: "Using multiple packages", correct: false },
            { text: "Creating multiple objects", correct: false }
        ]
    },

    {
        question: "Which keyword is used when a class implements an interface?",
        difficulty: "Medium",
        explanation: "The implements keyword is used when a class provides implementations for an interface.",
        answers: [
            { text: "extends", correct: false },
            { text: "inherits", correct: false },
            { text: "implements", correct: true },
            { text: "interface", correct: false }
        ]
    },

    {
        question: "Which keyword is used to access the parent class members?",
        difficulty: "Medium",
        explanation: "The super keyword is used to refer to members of the immediate parent class.",
        answers: [
            { text: "parent", correct: false },
            { text: "base", correct: false },
            { text: "super", correct: true },
            { text: "this", correct: false }
        ]
    },

    {
        question: "Which access modifier allows access from anywhere?",
        difficulty: "Medium",
        explanation: "The public access modifier allows a class member to be accessed from any class where the class itself is accessible.",
        answers: [
            { text: "private", correct: false },
            { text: "protected", correct: false },
            { text: "public", correct: true },
            { text: "default", correct: false }
        ]
    },

    {
        question: "Which collection does not allow duplicate elements?",
        difficulty: "Medium",
        explanation: "A Set is a collection that does not permit duplicate elements.",
        answers: [
            { text: "List", correct: false },
            { text: "Set", correct: true },
            { text: "ArrayList", correct: false },
            { text: "Vector", correct: false }
        ]
    },

    {
        question: "Which exception occurs when an integer is divided by zero?",
        difficulty: "Medium",
        explanation: "Dividing an integer by zero in Java causes an ArithmeticException.",
        answers: [
            { text: "NullPointerException", correct: false },
            { text: "ArithmeticException", correct: true },
            { text: "IOException", correct: false },
            { text: "NumberFormatException", correct: false }
        ]
    },

    {
        question: "Which class is commonly used to take input from the keyboard?",
        difficulty: "Medium",
        explanation: "The Scanner class from java.util is commonly used to read keyboard input.",
        answers: [
            { text: "Input", correct: false },
            { text: "Reader", correct: false },
            { text: "Scanner", correct: true },
            { text: "Keyboard", correct: false }
        ]
    },

    {
        question: "Which concept allows a subclass to provide its own version of a parent method?",
        difficulty: "Medium",
        explanation: "Method overriding occurs when a subclass provides a specific implementation of a method already defined in its parent class.",
        answers: [
            { text: "Overloading", correct: false },
            { text: "Overriding", correct: true },
            { text: "Encapsulation", correct: false },
            { text: "Compilation", correct: false }
        ]
    },

    {
        question: "What is the output of System.out.println(10 + 20);?",
        difficulty: "Medium",
        explanation: "The + operator performs numeric addition when both operands are integers, so 10 + 20 produces 30.",
        answers: [
            { text: "1020", correct: false },
            { text: "30", correct: true },
            { text: "10 + 20", correct: false },
            { text: "20", correct: false }
        ]
    },

    {
        question: "What is the output of System.out.println(\"Java\".length());?",
        difficulty: "Hard",
        explanation: "The string Java contains four characters, so the length() method returns 4.",
        answers: [
            { text: "3", correct: false },
            { text: "4", correct: true },
            { text: "5", correct: false },
            { text: "Error", correct: false }
        ]
    },

    {
        question: "What is the output of System.out.println(5 / 2);?",
        difficulty: "Hard",
        explanation: "Both operands are integers, so Java performs integer division. The fractional part is discarded, resulting in 2.",
        answers: [
            { text: "2", correct: true },
            { text: "2.5", correct: false },
            { text: "3", correct: false },
            { text: "1", correct: false }
        ]
    },

    {
        question: "Which statement about Java constructors is correct?",
        difficulty: "Hard",
        explanation: "A constructor has the same name as its class and does not have a return type.",
        answers: [
            { text: "It must have a return type", correct: false },
            { text: "It has the same name as the class", correct: true },
            { text: "It can be called only static", correct: false },
            { text: "It must be private", correct: false }
        ]
    },

    {
        question: "Which keyword is used to declare a variable whose value cannot be reassigned?",
        difficulty: "Hard",
        explanation: "The final keyword can be used to declare a variable whose value can be assigned only once.",
        answers: [
            { text: "constant", correct: false },
            { text: "static", correct: false },
            { text: "final", correct: true },
            { text: "fixed", correct: false }
        ]
    },

    {
        question: "What is the output of System.out.println(3 == 3);?",
        difficulty: "Hard",
        explanation: "The == operator compares the two integer values. Since both values are 3, the result is true.",
        answers: [
            { text: "3", correct: false },
            { text: "false", correct: false },
            { text: "true", correct: true },
            { text: "Error", correct: false }
        ]
    },

    {
        question: "Which statement is used to explicitly throw an exception in Java?",
        difficulty: "Hard",
        explanation: "The throw keyword is used to explicitly throw an exception object.",
        answers: [
            { text: "throws", correct: false },
            { text: "throw", correct: true },
            { text: "exception", correct: false },
            { text: "catch", correct: false }
        ]
    },

    {
        question: "Which keyword is used in a method declaration to indicate that the method may pass an exception to its caller?",
        difficulty: "Hard",
        explanation: "The throws keyword is used in a method declaration to specify exceptions that the method may throw.",
        answers: [
            { text: "throw", correct: false },
            { text: "throws", correct: true },
            { text: "catch", correct: false },
            { text: "exception", correct: false }
        ]
    }

],


    // ========================================
// HTML
// ========================================

HTML: [

    {
        question: "What does HTML stand for?",
        difficulty: "Easy",
        explanation: "HTML stands for HyperText Markup Language and is used to structure content on web pages.",
        answers: [
            { text: "HyperText Markup Language", correct: true },
            { text: "HighText Machine Language", correct: false },
            { text: "Hyperlink Text Management Language", correct: false },
            { text: "Home Tool Markup Language", correct: false }
        ]
    },

    {
        question: "Which tag is used to create the largest heading in HTML?",
        difficulty: "Easy",
        explanation: "The h1 element represents the highest-level heading in HTML.",
        answers: [
            { text: "<h6>", correct: false },
            { text: "<heading>", correct: false },
            { text: "<h1>", correct: true },
            { text: "<head>", correct: false }
        ]
    },

    {
        question: "Which HTML tag is used to create a paragraph?",
        difficulty: "Easy",
        explanation: "The p element is used to define a paragraph of text.",
        answers: [
            { text: "<para>", correct: false },
            { text: "<p>", correct: true },
            { text: "<paragraph>", correct: false },
            { text: "<text>", correct: false }
        ]
    },

    {
        question: "Which tag is used to create a hyperlink?",
        difficulty: "Easy",
        explanation: "The a (anchor) element creates hyperlinks, usually using the href attribute.",
        answers: [
            { text: "<link>", correct: false },
            { text: "<a>", correct: true },
            { text: "<href>", correct: false },
            { text: "<url>", correct: false }
        ]
    },

    {
        question: "Which attribute specifies the destination of a hyperlink?",
        difficulty: "Easy",
        explanation: "The href attribute specifies the URL or destination of an anchor link.",
        answers: [
            { text: "src", correct: false },
            { text: "link", correct: false },
            { text: "href", correct: true },
            { text: "url", correct: false }
        ]
    },

    {
        question: "Which tag is used to display an image?",
        difficulty: "Easy",
        explanation: "The img element embeds an image in an HTML document.",
        answers: [
            { text: "<image>", correct: false },
            { text: "<picture>", correct: false },
            { text: "<img>", correct: true },
            { text: "<src>", correct: false }
        ]
    },

    {
        question: "Which tag creates an unordered list?",
        difficulty: "Easy",
        explanation: "The ul element creates an unordered list, usually displayed with bullet points.",
        answers: [
            { text: "<ol>", correct: false },
            { text: "<ul>", correct: true },
            { text: "<li>", correct: false },
            { text: "<list>", correct: false }
        ]
    },

    {
        question: "Which tag is used to create a line break?",
        difficulty: "Easy",
        explanation: "The br element inserts a line break without starting a new paragraph.",
        answers: [
            { text: "<break>", correct: false },
            { text: "<lb>", correct: false },
            { text: "<br>", correct: true },
            { text: "<newline>", correct: false }
        ]
    },

    {
        question: "Which HTML element is used to define a navigation section?",
        difficulty: "Medium",
        explanation: "The nav element represents a section containing navigation links.",
        answers: [
            { text: "<navigate>", correct: false },
            { text: "<navigation>", correct: false },
            { text: "<nav>", correct: true },
            { text: "<menu>", correct: false }
        ]
    },

    {
        question: "Which tag is used to create a numbered list?",
        difficulty: "Medium",
        explanation: "The ol element creates an ordered list, which is normally displayed with numbers.",
        answers: [
            { text: "<ul>", correct: false },
            { text: "<ol>", correct: true },
            { text: "<li>", correct: false },
            { text: "<nl>", correct: false }
        ]
    },

    {
        question: "Which attribute provides alternative text for an image?",
        difficulty: "Medium",
        explanation: "The alt attribute provides alternative text that can be used when an image cannot be displayed and improves accessibility.",
        answers: [
            { text: "title", correct: false },
            { text: "alt", correct: true },
            { text: "text", correct: false },
            { text: "description", correct: false }
        ]
    },

    {
        question: "Which HTML element is used to create a table row?",
        difficulty: "Medium",
        explanation: "The tr element defines a row within an HTML table.",
        answers: [
            { text: "<td>", correct: false },
            { text: "<row>", correct: false },
            { text: "<tr>", correct: true },
            { text: "<th>", correct: false }
        ]
    },

    {
        question: "Which element defines a table data cell?",
        difficulty: "Medium",
        explanation: "The td element represents a standard data cell in an HTML table.",
        answers: [
            { text: "<cell>", correct: false },
            { text: "<data>", correct: false },
            { text: "<td>", correct: true },
            { text: "<tr>", correct: false }
        ]
    },

    {
        question: "Which HTML element is used to create a form?",
        difficulty: "Medium",
        explanation: "The form element is used to create a section containing interactive controls for submitting information.",
        answers: [
            { text: "<input>", correct: false },
            { text: "<form>", correct: true },
            { text: "<fieldset>", correct: false },
            { text: "<submit>", correct: false }
        ]
    },

    {
        question: "Which input type is used for entering an email address?",
        difficulty: "Medium",
        explanation: "The input element with type='email' is designed for entering email addresses and provides browser validation.",
        answers: [
            { text: "text", correct: false },
            { text: "mail", correct: false },
            { text: "email", correct: true },
            { text: "address", correct: false }
        ]
    },

    {
        question: "Which semantic element represents the main content of a document?",
        difficulty: "Medium",
        explanation: "The main element represents the dominant content of the document body.",
        answers: [
            { text: "<content>", correct: false },
            { text: "<body-content>", correct: false },
            { text: "<main>", correct: true },
            { text: "<section-main>", correct: false }
        ]
    },

    {
        question: "Which attribute is used to uniquely identify an HTML element?",
        difficulty: "Medium",
        explanation: "The id attribute assigns a unique identifier to an HTML element within a document.",
        answers: [
            { text: "class", correct: false },
            { text: "id", correct: true },
            { text: "name", correct: false },
            { text: "key", correct: false }
        ]
    },

    {
        question: "Which attribute can be used to assign one or more classes to an HTML element?",
        difficulty: "Medium",
        explanation: "The class attribute assigns one or more class names to an element, commonly for CSS styling and JavaScript selection.",
        answers: [
            { text: "style", correct: false },
            { text: "group", correct: false },
            { text: "class", correct: true },
            { text: "type", correct: false }
        ]
    },

    {
        question: "Which element is used to define a footer for a document or section?",
        difficulty: "Hard",
        explanation: "The footer element represents footer content for its nearest sectioning content or the page.",
        answers: [
            { text: "<bottom>", correct: false },
            { text: "<footer>", correct: true },
            { text: "<end>", correct: false },
            { text: "<foot>", correct: false }
        ]
    },

    {
        question: "Which HTML element is used to group introductory content or navigation links?",
        difficulty: "Hard",
        explanation: "The header element represents introductory content or navigational aids for a page or section.",
        answers: [
            { text: "<top>", correct: false },
            { text: "<intro>", correct: false },
            { text: "<header>", correct: true },
            { text: "<head>", correct: false }
        ]
    },

    {
        question: "Which HTML element is used to define an independent, self-contained piece of content?",
        difficulty: "Hard",
        explanation: "The article element represents self-contained content that could be distributed or reused independently.",
        answers: [
            { text: "<section>", correct: false },
            { text: "<article>", correct: true },
            { text: "<content>", correct: false },
            { text: "<aside>", correct: false }
        ]
    },

    {
        question: "Which HTML element represents content that is indirectly related to the main content?",
        difficulty: "Hard",
        explanation: "The aside element represents content related to the surrounding content, such as a sidebar or related information.",
        answers: [
            { text: "<side>", correct: false },
            { text: "<aside>", correct: true },
            { text: "<extra>", correct: false },
            { text: "<related>", correct: false }
        ]
    },

    {
        question: "Which attribute makes an input field mandatory before form submission?",
        difficulty: "Hard",
        explanation: "The required attribute specifies that the user must provide a value before the form can be submitted.",
        answers: [
            { text: "mandatory", correct: false },
            { text: "validate", correct: false },
            { text: "required", correct: true },
            { text: "must", correct: false }
        ]
    },

    {
        question: "Which attribute specifies where a form's submitted data should be sent?",
        difficulty: "Hard",
        explanation: "The action attribute specifies the URL or endpoint that processes the submitted form data.",
        answers: [
            { text: "method", correct: false },
            { text: "target", correct: false },
            { text: "action", correct: true },
            { text: "submit", correct: false }
        ]
    },

    {
        question: "Which HTML element is used to embed another webpage inside the current page?",
        difficulty: "Hard",
        explanation: "The iframe element embeds another HTML document within the current document.",
        answers: [
            { text: "<frame>", correct: false },
            { text: "<embed-page>", correct: false },
            { text: "<iframe>", correct: true },
            { text: "<window>", correct: false }
        ]
    }

],


    // ========================================
// DSA
// ========================================

DSA: [

    {
        question: "What does DSA stand for?",
        difficulty: "Easy",
        explanation: "DSA stands for Data Structures and Algorithms.",
        answers: [
            { text: "Data Structures and Algorithms", correct: true },
            { text: "Data System and Applications", correct: false },
            { text: "Database Structures and Algorithms", correct: false },
            { text: "Digital Systems and Applications", correct: false }
        ]
    },

    {
        question: "Which data structure follows the LIFO principle?",
        difficulty: "Easy",
        explanation: "A stack follows Last In, First Out (LIFO), meaning the most recently added element is removed first.",
        answers: [
            { text: "Queue", correct: false },
            { text: "Stack", correct: true },
            { text: "Array", correct: false },
            { text: "Linked List", correct: false }
        ]
    },

    {
        question: "Which data structure follows the FIFO principle?",
        difficulty: "Easy",
        explanation: "A queue follows First In, First Out (FIFO), meaning the first element inserted is removed first.",
        answers: [
            { text: "Stack", correct: false },
            { text: "Tree", correct: false },
            { text: "Queue", correct: true },
            { text: "Graph", correct: false }
        ]
    },

    {
        question: "Which data structure stores elements in contiguous memory locations?",
        difficulty: "Easy",
        explanation: "An array normally stores its elements in contiguous memory locations.",
        answers: [
            { text: "Array", correct: true },
            { text: "Graph", correct: false },
            { text: "Tree", correct: false },
            { text: "Stack", correct: false }
        ]
    },

    {
        question: "Which data structure consists of nodes connected by links?",
        difficulty: "Easy",
        explanation: "A linked list consists of nodes where each node stores data and one or more links to other nodes.",
        answers: [
            { text: "Array", correct: false },
            { text: "Linked List", correct: true },
            { text: "Stack", correct: false },
            { text: "Hash Table", correct: false }
        ]
    },

    {
        question: "Which algorithm is commonly used to find the smallest element by repeatedly selecting it?",
        difficulty: "Easy",
        explanation: "Selection Sort repeatedly selects the smallest element from the unsorted portion and places it in the correct position.",
        answers: [
            { text: "Merge Sort", correct: false },
            { text: "Selection Sort", correct: true },
            { text: "Binary Search", correct: false },
            { text: "BFS", correct: false }
        ]
    },

    {
        question: "Which traversal visits the left subtree, root, and then right subtree of a binary tree?",
        difficulty: "Easy",
        explanation: "Inorder traversal follows the order Left → Root → Right.",
        answers: [
            { text: "Preorder", correct: false },
            { text: "Postorder", correct: false },
            { text: "Inorder", correct: true },
            { text: "Level Order", correct: false }
        ]
    },

    {
        question: "Which data structure is commonly used to implement recursion?",
        difficulty: "Easy",
        explanation: "Recursive function calls are managed using the call stack.",
        answers: [
            { text: "Queue", correct: false },
            { text: "Stack", correct: true },
            { text: "Graph", correct: false },
            { text: "Heap", correct: false }
        ]
    },

    {
        question: "What is the time complexity of accessing an element by index in an array?",
        difficulty: "Medium",
        explanation: "Arrays provide direct access using an index, so accessing an element takes constant time, O(1).",
        answers: [
            { text: "O(1)", correct: true },
            { text: "O(n)", correct: false },
            { text: "O(log n)", correct: false },
            { text: "O(n²)", correct: false }
        ]
    },

    {
        question: "What is the worst-case time complexity of linear search?",
        difficulty: "Medium",
        explanation: "In the worst case, linear search may need to check every element, resulting in O(n) time.",
        answers: [
            { text: "O(1)", correct: false },
            { text: "O(log n)", correct: false },
            { text: "O(n)", correct: true },
            { text: "O(n²)", correct: false }
        ]
    },

    {
        question: "Binary search requires the data to be:",
        difficulty: "Medium",
        explanation: "Binary search works by repeatedly dividing the search range, so the data must be sorted.",
        answers: [
            { text: "Random", correct: false },
            { text: "Sorted", correct: true },
            { text: "Duplicated", correct: false },
            { text: "Unstructured", correct: false }
        ]
    },

    {
        question: "What is the average time complexity of binary search?",
        difficulty: "Medium",
        explanation: "Binary search eliminates approximately half of the remaining elements at each step, giving O(log n) average time.",
        answers: [
            { text: "O(n)", correct: false },
            { text: "O(n²)", correct: false },
            { text: "O(log n)", correct: true },
            { text: "O(1)", correct: false }
        ]
    },

    {
        question: "Which sorting algorithm uses the divide-and-conquer approach?",
        difficulty: "Medium",
        explanation: "Merge Sort divides the array into smaller parts, sorts them, and then merges the sorted parts.",
        answers: [
            { text: "Bubble Sort", correct: false },
            { text: "Merge Sort", correct: true },
            { text: "Linear Search", correct: false },
            { text: "Selection Sort", correct: false }
        ]
    },

    {
        question: "Which traversal algorithm uses a queue?",
        difficulty: "Medium",
        explanation: "Breadth-First Search (BFS) explores nodes level by level and commonly uses a queue.",
        answers: [
            { text: "DFS", correct: false },
            { text: "BFS", correct: true },
            { text: "Binary Search", correct: false },
            { text: "Inorder", correct: false }
        ]
    },

    {
        question: "Which traversal algorithm commonly uses a stack?",
        difficulty: "Medium",
        explanation: "Depth-First Search (DFS) can be implemented using a stack, either explicitly or through recursion.",
        answers: [
            { text: "BFS", correct: false },
            { text: "DFS", correct: true },
            { text: "Binary Search", correct: false },
            { text: "Linear Search", correct: false }
        ]
    },

    {
        question: "What is the worst-case time complexity of Bubble Sort?",
        difficulty: "Medium",
        explanation: "Bubble Sort may require repeated comparisons and swaps across the array, resulting in O(n²) worst-case time.",
        answers: [
            { text: "O(1)", correct: false },
            { text: "O(log n)", correct: false },
            { text: "O(n)", correct: false },
            { text: "O(n²)", correct: true }
        ]
    },

    {
        question: "Which data structure is commonly used for implementing a priority queue?",
        difficulty: "Medium",
        explanation: "A heap is commonly used to efficiently implement a priority queue.",
        answers: [
            { text: "Heap", correct: true },
            { text: "Stack", correct: false },
            { text: "Linked List only", correct: false },
            { text: "Array only", correct: false }
        ]
    },

    {
        question: "What is the maximum number of children a node can have in a binary tree?",
        difficulty: "Medium",
        explanation: "In a binary tree, each node can have at most two children: a left child and a right child.",
        answers: [
            { text: "1", correct: false },
            { text: "2", correct: true },
            { text: "3", correct: false },
            { text: "Unlimited", correct: false }
        ]
    },

    {
        question: "What is the time complexity of inserting an element at the beginning of an array when elements must be shifted?",
        difficulty: "Hard",
        explanation: "Inserting at the beginning may require shifting all existing elements, resulting in O(n) time.",
        answers: [
            { text: "O(1)", correct: false },
            { text: "O(log n)", correct: false },
            { text: "O(n)", correct: true },
            { text: "O(n²)", correct: false }
        ]
    },

    {
        question: "Which sorting algorithm has an average time complexity of O(n log n) and is based on partitioning?",
        difficulty: "Hard",
        explanation: "Quick Sort partitions the array around a pivot and recursively sorts the resulting partitions. Its average time complexity is O(n log n).",
        answers: [
            { text: "Bubble Sort", correct: false },
            { text: "Selection Sort", correct: false },
            { text: "Quick Sort", correct: true },
            { text: "Linear Search", correct: false }
        ]
    },

    {
        question: "What is the worst-case time complexity of Quick Sort?",
        difficulty: "Hard",
        explanation: "Quick Sort can degrade to O(n²) when the pivot repeatedly produces highly unbalanced partitions.",
        answers: [
            { text: "O(1)", correct: false },
            { text: "O(log n)", correct: false },
            { text: "O(n log n)", correct: false },
            { text: "O(n²)", correct: true }
        ]
    },

    {
        question: "Which data structure is most suitable for detecting whether an element has already been seen?",
        difficulty: "Hard",
        explanation: "A hash set provides efficient average-case lookup and is commonly used to track previously seen elements.",
        answers: [
            { text: "Stack", correct: false },
            { text: "Queue", correct: false },
            { text: "Hash Set", correct: true },
            { text: "Binary Tree only", correct: false }
        ]
    },

    {
        question: "What is the space complexity of an adjacency matrix for a graph with V vertices?",
        difficulty: "Hard",
        explanation: "An adjacency matrix stores a V × V matrix, requiring O(V²) space.",
        answers: [
            { text: "O(1)", correct: false },
            { text: "O(V)", correct: false },
            { text: "O(V²)", correct: true },
            { text: "O(log V)", correct: false }
        ]
    },

    {
        question: "Which algorithm is commonly used to find the shortest path from a source vertex in a graph with non-negative edge weights?",
        difficulty: "Hard",
        explanation: "Dijkstra's algorithm finds shortest paths from a source vertex when edge weights are non-negative.",
        answers: [
            { text: "Dijkstra's Algorithm", correct: true },
            { text: "Binary Search", correct: false },
            { text: "Bubble Sort", correct: false },
            { text: "DFS only", correct: false }
        ]
    },

    {
        question: "Which traversal of a Binary Search Tree produces values in sorted order?",
        difficulty: "Hard",
        explanation: "Inorder traversal of a Binary Search Tree visits nodes in ascending order of their values.",
        answers: [
            { text: "Preorder", correct: false },
            { text: "Postorder", correct: false },
            { text: "Inorder", correct: true },
            { text: "Level Order", correct: false }
        ]
    }

],
    // ========================================
// LOGICAL REASONING
// ========================================

Logical: [

    {
        question: "Find the next number: 2, 4, 6, 8, ?",
        difficulty: "Easy",
        explanation: "Each number increases by 2. Therefore, the next number is 10.",
        answers: [
            { text: "9", correct: false },
            { text: "10", correct: true },
            { text: "11", correct: false },
            { text: "12", correct: false }
        ]
    },

    {
        question: "Find the next number: 5, 10, 15, 20, ?",
        difficulty: "Easy",
        explanation: "Each number increases by 5, so the next number is 25.",
        answers: [
            { text: "22", correct: false },
            { text: "24", correct: false },
            { text: "25", correct: true },
            { text: "30", correct: false }
        ]
    },

    {
        question: "If CAT is coded as DBU, how is DOG coded?",
        difficulty: "Easy",
        explanation: "Each letter is shifted one position forward in the alphabet: D→E, O→P, G→H. Therefore DOG becomes EPH.",
        answers: [
            { text: "EPH", correct: true },
            { text: "FQI", correct: false },
            { text: "CNG", correct: false },
            { text: "DOH", correct: false }
        ]
    },

    {
        question: "Which number is different from the others?",
        difficulty: "Easy",
        explanation: "2, 4 and 8 are powers of 2. 9 is not a power of 2, so it is the odd one out.",
        answers: [
            { text: "2", correct: false },
            { text: "4", correct: false },
            { text: "8", correct: false },
            { text: "9", correct: true }
        ]
    },

    {
        question: "If today is Monday, what day will it be after 10 days?",
        difficulty: "Easy",
        explanation: "After 7 days it is Monday again. Three more days gives Thursday.",
        answers: [
            { text: "Wednesday", correct: false },
            { text: "Thursday", correct: true },
            { text: "Friday", correct: false },
            { text: "Saturday", correct: false }
        ]
    },

    {
        question: "Find the missing number: 3, 6, 12, 24, ?",
        difficulty: "Easy",
        explanation: "Each number is multiplied by 2. Therefore, 24 × 2 = 48.",
        answers: [
            { text: "36", correct: false },
            { text: "42", correct: false },
            { text: "48", correct: true },
            { text: "54", correct: false }
        ]
    },

    {
        question: "If all roses are flowers and some flowers are red, which statement must be true?",
        difficulty: "Easy",
        explanation: "Since all roses are flowers, every rose belongs to the group of flowers.",
        answers: [
            { text: "All flowers are roses", correct: false },
            { text: "Some roses are red", correct: false },
            { text: "All roses are flowers", correct: true },
            { text: "No roses are red", correct: false }
        ]
    },

    {
        question: "A is taller than B, and B is taller than C. Who is the shortest?",
        difficulty: "Easy",
        explanation: "Since A > B and B > C in height, C is the shortest.",
        answers: [
            { text: "A", correct: false },
            { text: "B", correct: false },
            { text: "C", correct: true },
            { text: "Cannot determine", correct: false }
        ]
    },

    {
        question: "Find the next number: 1, 4, 9, 16, ?",
        difficulty: "Medium",
        explanation: "These are perfect squares: 1², 2², 3², 4². The next is 5² = 25.",
        answers: [
            { text: "20", correct: false },
            { text: "24", correct: false },
            { text: "25", correct: true },
            { text: "36", correct: false }
        ]
    },

    {
        question: "Find the next number: 2, 6, 12, 20, ?",
        difficulty: "Medium",
        explanation: "The pattern is n(n+1): 1×2=2, 2×3=6, 3×4=12, 4×5=20. Therefore, 5×6=30.",
        answers: [
            { text: "28", correct: false },
            { text: "30", correct: true },
            { text: "32", correct: false },
            { text: "36", correct: false }
        ]
    },

    {
        question: "If BOOK is coded as CPPL, how is PEN coded?",
        difficulty: "Medium",
        explanation: "Each letter is shifted one position forward: P→Q, E→F, N→O. Therefore PEN becomes QFO.",
        answers: [
            { text: "QFO", correct: true },
            { text: "QEP", correct: false },
            { text: "RGP", correct: false },
            { text: "PDO", correct: false }
        ]
    },

    {
        question: "A man walks 5 km north and then 3 km east. In which direction is he from his starting point?",
        difficulty: "Medium",
        explanation: "Moving north and then east places him in the north-east direction relative to his starting point.",
        answers: [
            { text: "North-West", correct: false },
            { text: "South-East", correct: false },
            { text: "North-East", correct: true },
            { text: "South-West", correct: false }
        ]
    },

    {
        question: "If P is the brother of Q and Q is the sister of R, what is P's relation to R?",
        difficulty: "Medium",
        explanation: "P is Q's brother, and Q and R are siblings. Therefore, P is also R's brother.",
        answers: [
            { text: "Father", correct: false },
            { text: "Brother", correct: true },
            { text: "Uncle", correct: false },
            { text: "Cousin", correct: false }
        ]
    },

    {
        question: "Find the odd one out: 3, 5, 7, 9, 11",
        difficulty: "Medium",
        explanation: "3, 5, 7 and 11 are prime numbers. 9 is composite because it is divisible by 3.",
        answers: [
            { text: "3", correct: false },
            { text: "7", correct: false },
            { text: "9", correct: true },
            { text: "11", correct: false }
        ]
    },

    {
        question: "If SOUTH is written as HTUOS, what type of coding is being used?",
        difficulty: "Medium",
        explanation: "The word SOUTH is written in reverse order as HTUOS.",
        answers: [
            { text: "Alphabet shifting", correct: false },
            { text: "Reversal", correct: true },
            { text: "Substitution", correct: false },
            { text: "Alternation", correct: false }
        ]
    },

    {
        question: "A clock shows 3:00. What is the angle between the hour and minute hands?",
        difficulty: "Medium",
        explanation: "At 3:00, the minute hand is at 12 and the hour hand is at 3. The angle between them is 90°.",
        answers: [
            { text: "45°", correct: false },
            { text: "60°", correct: false },
            { text: "90°", correct: true },
            { text: "120°", correct: false }
        ]
    },

    {
        question: "If 5 machines make 5 products in 5 minutes, how many minutes will 1 machine take to make 1 product?",
        difficulty: "Medium",
        explanation: "Each machine makes one product in 5 minutes. Therefore, one machine needs 5 minutes for one product.",
        answers: [
            { text: "1 minute", correct: false },
            { text: "5 minutes", correct: true },
            { text: "10 minutes", correct: false },
            { text: "25 minutes", correct: false }
        ]
    },

    {
        question: "Find the next number: 3, 8, 15, 24, ?",
        difficulty: "Hard",
        explanation: "The differences are 5, 7, 9, so the next difference is 11. Therefore, 24 + 11 = 35.",
        answers: [
            { text: "32", correct: false },
            { text: "34", correct: false },
            { text: "35", correct: true },
            { text: "36", correct: false }
        ]
    },

    {
        question: "A person faces north. He turns 90° clockwise, then 180° anticlockwise. Which direction is he facing?",
        difficulty: "Hard",
        explanation: "Starting north, 90° clockwise gives east. Turning 180° anticlockwise from east gives west.",
        answers: [
            { text: "North", correct: false },
            { text: "South", correct: false },
            { text: "East", correct: false },
            { text: "West", correct: true }
        ]
    },

    {
        question: "In a row, Ravi is 12th from the left and 18th from the right. How many people are in the row?",
        difficulty: "Hard",
        explanation: "Total people = position from left + position from right − 1 = 12 + 18 − 1 = 29.",
        answers: [
            { text: "28", correct: false },
            { text: "29", correct: true },
            { text: "30", correct: false },
            { text: "31", correct: false }
        ]
    },

    {
        question: "Find the missing number: 2, 3, 5, 8, 13, ?",
        difficulty: "Hard",
        explanation: "Each number is the sum of the previous two: 2+3=5, 3+5=8, 5+8=13. Therefore, 8+13=21.",
        answers: [
            { text: "18", correct: false },
            { text: "20", correct: false },
            { text: "21", correct: true },
            { text: "23", correct: false }
        ]
    },

    {
        question: "If all engineers are graduates and some graduates are programmers, which conclusion is definitely true?",
        difficulty: "Hard",
        explanation: "Since every engineer belongs to the group of graduates, all engineers are graduates. The information does not prove that engineers are programmers.",
        answers: [
            { text: "All engineers are programmers", correct: false },
            { text: "Some engineers are programmers", correct: false },
            { text: "All engineers are graduates", correct: true },
            { text: "No graduates are engineers", correct: false }
        ]
    },

    {
        question: "A train travels 60 km in 45 minutes. What is its average speed?",
        difficulty: "Hard",
        explanation: "45 minutes is 0.75 hours. Speed = distance ÷ time = 60 ÷ 0.75 = 80 km/h.",
        answers: [
            { text: "60 km/h", correct: false },
            { text: "75 km/h", correct: false },
            { text: "80 km/h", correct: true },
            { text: "90 km/h", correct: false }
        ]
    },

    {
        question: "Five people A, B, C, D and E stand in a line. A is before B, C is after D, and B is before D. Who must be before C?",
        difficulty: "Hard",
        explanation: "Since B is before D and D is before C, B must be before C. Also A is before B, so A is before C as well.",
        answers: [
            { text: "Only E", correct: false },
            { text: "Only D", correct: false },
            { text: "B and D", correct: true },
            { text: "C and E", correct: false }
        ]
    }

],


    // ========================================
// VOCABULARY
// ========================================

Vocabulary: [

    {
        question: "What is the meaning of 'Diligent'?",
        difficulty: "Easy",
        explanation: "Diligent means showing careful and persistent effort in one's work.",
        answers: [
            { text: "Lazy", correct: false },
            { text: "Hardworking and careful", correct: true },
            { text: "Confused", correct: false },
            { text: "Careless", correct: false }
        ]
    },

    {
        question: "What is the meaning of 'Brisk'?",
        difficulty: "Easy",
        explanation: "Brisk means quick, energetic, or lively.",
        answers: [
            { text: "Slow and weak", correct: false },
            { text: "Quick and energetic", correct: true },
            { text: "Silent", correct: false },
            { text: "Uncertain", correct: false }
        ]
    },

    {
        question: "What is the meaning of 'Resilient'?",
        difficulty: "Easy",
        explanation: "Resilient describes someone or something that can recover quickly from difficulties.",
        answers: [
            { text: "Easily defeated", correct: false },
            { text: "Able to recover from difficulties", correct: true },
            { text: "Very careless", correct: false },
            { text: "Unable to change", correct: false }
        ]
    },

    {
        question: "What is the meaning of 'Meticulous'?",
        difficulty: "Easy",
        explanation: "Meticulous means extremely careful and attentive to detail.",
        answers: [
            { text: "Careless", correct: false },
            { text: "Very careful and precise", correct: true },
            { text: "Impatient", correct: false },
            { text: "Uninterested", correct: false }
        ]
    },

    {
        question: "What is the opposite of 'Ancient'?",
        difficulty: "Easy",
        explanation: "Ancient means very old, while modern refers to something of the present or recent time.",
        answers: [
            { text: "Old", correct: false },
            { text: "Historic", correct: false },
            { text: "Modern", correct: true },
            { text: "Traditional", correct: false }
        ]
    },

    {
        question: "What is a synonym for 'Happy'?",
        difficulty: "Easy",
        explanation: "Joyful means feeling or expressing great happiness.",
        answers: [
            { text: "Sad", correct: false },
            { text: "Angry", correct: false },
            { text: "Joyful", correct: true },
            { text: "Worried", correct: false }
        ]
    },

    {
        question: "What is the meaning of 'Brief'?",
        difficulty: "Easy",
        explanation: "Brief means short in duration or containing only a small amount of information.",
        answers: [
            { text: "Long", correct: false },
            { text: "Short", correct: true },
            { text: "Difficult", correct: false },
            { text: "Detailed", correct: false }
        ]
    },

    {
        question: "What is the opposite of 'Expand'?",
        difficulty: "Easy",
        explanation: "Expand means to become larger, while contract means to become smaller.",
        answers: [
            { text: "Increase", correct: false },
            { text: "Develop", correct: false },
            { text: "Contract", correct: true },
            { text: "Extend", correct: false }
        ]
    },

    {
        question: "What is the meaning of 'Coerce'?",
        difficulty: "Medium",
        explanation: "Coerce means to persuade or force someone to do something through pressure or threats.",
        answers: [
            { text: "Encourage gently", correct: false },
            { text: "Force someone to do something", correct: true },
            { text: "Ignore someone", correct: false },
            { text: "Praise someone", correct: false }
        ]
    },

    {
        question: "Choose the synonym of 'Abundant'.",
        difficulty: "Medium",
        explanation: "Abundant means existing in large quantities, so plentiful is its synonym.",
        answers: [
            { text: "Rare", correct: false },
            { text: "Scarce", correct: false },
            { text: "Plentiful", correct: true },
            { text: "Limited", correct: false }
        ]
    },

    {
        question: "Choose the antonym of 'Transparent'.",
        difficulty: "Medium",
        explanation: "Transparent means clear or easy to see through, while opaque means not allowing light to pass through.",
        answers: [
            { text: "Clear", correct: false },
            { text: "Visible", correct: false },
            { text: "Opaque", correct: true },
            { text: "Bright", correct: false }
        ]
    },

    {
        question: "What does 'Pragmatic' mean?",
        difficulty: "Medium",
        explanation: "Pragmatic means dealing with problems in a practical way rather than relying only on theory.",
        answers: [
            { text: "Highly emotional", correct: false },
            { text: "Practical and realistic", correct: true },
            { text: "Careless", correct: false },
            { text: "Unrealistic", correct: false }
        ]
    },

    {
        question: "Choose the synonym of 'Candid'.",
        difficulty: "Medium",
        explanation: "Candid means truthful, frank, and straightforward.",
        answers: [
            { text: "Secretive", correct: false },
            { text: "Frank", correct: true },
            { text: "Dishonest", correct: false },
            { text: "Confused", correct: false }
        ]
    },

    {
        question: "What does 'Inevitable' mean?",
        difficulty: "Medium",
        explanation: "Inevitable describes something that cannot be avoided or prevented.",
        answers: [
            { text: "Impossible", correct: false },
            { text: "Unavoidable", correct: true },
            { text: "Unlikely", correct: false },
            { text: "Optional", correct: false }
        ]
    },

    {
        question: "Choose the antonym of 'Hostile'.",
        difficulty: "Medium",
        explanation: "Hostile means unfriendly or aggressive, while friendly has the opposite meaning.",
        answers: [
            { text: "Aggressive", correct: false },
            { text: "Unfriendly", correct: false },
            { text: "Friendly", correct: true },
            { text: "Violent", correct: false }
        ]
    },

    {
        question: "What is the meaning of 'Concise'?",
        difficulty: "Medium",
        explanation: "Concise means expressing something clearly using few words.",
        answers: [
            { text: "Very lengthy", correct: false },
            { text: "Brief and clear", correct: true },
            { text: "Difficult to understand", correct: false },
            { text: "Unorganized", correct: false }
        ]
    },

    {
        question: "Choose the synonym of 'Versatile'.",
        difficulty: "Medium",
        explanation: "Versatile means able to adapt to many different activities, situations, or uses.",
        answers: [
            { text: "Flexible", correct: true },
            { text: "Limited", correct: false },
            { text: "Rigid", correct: false },
            { text: "Weak", correct: false }
        ]
    },

    {
        question: "What does 'Ambiguous' mean?",
        difficulty: "Medium",
        explanation: "Ambiguous means open to more than one interpretation or unclear in meaning.",
        answers: [
            { text: "Very clear", correct: false },
            { text: "Having more than one possible meaning", correct: true },
            { text: "Completely accurate", correct: false },
            { text: "Extremely simple", correct: false }
        ]
    },

    {
        question: "Choose the best meaning of 'Ubiquitous'.",
        difficulty: "Hard",
        explanation: "Ubiquitous means present, appearing, or found everywhere.",
        answers: [
            { text: "Very rare", correct: false },
            { text: "Present everywhere", correct: true },
            { text: "Temporarily absent", correct: false },
            { text: "Extremely expensive", correct: false }
        ]
    },

    {
        question: "What does 'Obsolete' mean?",
        difficulty: "Hard",
        explanation: "Obsolete means no longer useful, relevant, or in general use because something newer has replaced it.",
        answers: [
            { text: "Modern and advanced", correct: false },
            { text: "No longer in use", correct: true },
            { text: "Highly popular", correct: false },
            { text: "Recently developed", correct: false }
        ]
    },

    {
        question: "Choose the synonym of 'Eloquent'.",
        difficulty: "Hard",
        explanation: "Eloquent means fluent or persuasive in speaking or writing.",
        answers: [
            { text: "Inarticulate", correct: false },
            { text: "Persuasive and expressive", correct: true },
            { text: "Silent", correct: false },
            { text: "Confusing", correct: false }
        ]
    },

    {
        question: "What is the meaning of 'Scrutinize'?",
        difficulty: "Hard",
        explanation: "Scrutinize means to examine something very carefully and closely.",
        answers: [
            { text: "Ignore completely", correct: false },
            { text: "Examine carefully", correct: true },
            { text: "Destroy quickly", correct: false },
            { text: "Copy exactly", correct: false }
        ]
    },

    {
        question: "Choose the antonym of 'Benevolent'.",
        difficulty: "Hard",
        explanation: "Benevolent means kind and generous. Malevolent means having or showing ill will, making it an opposite.",
        answers: [
            { text: "Kind", correct: false },
            { text: "Generous", correct: false },
            { text: "Malevolent", correct: true },
            { text: "Helpful", correct: false }
        ]
    },

    {
        question: "What does 'Tenacious' mean?",
        difficulty: "Hard",
        explanation: "Tenacious means persistent and determined, especially when facing difficulties.",
        answers: [
            { text: "Easily discouraged", correct: false },
            { text: "Persistent and determined", correct: true },
            { text: "Careless and relaxed", correct: false },
            { text: "Uncertain and hesitant", correct: false }
        ]
    },

    {
        question: "Choose the best meaning of 'Arduous'.",
        difficulty: "Hard",
        explanation: "Arduous describes something requiring considerable effort and energy because it is difficult or tiring.",
        answers: [
            { text: "Easy and effortless", correct: false },
            { text: "Difficult and demanding", correct: true },
            { text: "Short and simple", correct: false },
            { text: "Enjoyable and relaxing", correct: false }
        ]
    }

],

    // ========================================
// C PROGRAMMING
// ========================================

C: [

    {
        question: "Which symbol is used to end a statement in C?",
        difficulty: "Easy",
        explanation: "Most C statements end with a semicolon (;).",
        answers: [
            { text: ".", correct: false },
            { text: ";", correct: true },
            { text: ":", correct: false },
            { text: ",", correct: false }
        ]
    },

    {
        question: "Which function is used to display output in C?",
        difficulty: "Easy",
        explanation: "The printf() function from the standard input/output library is commonly used to display output.",
        answers: [
            { text: "print()", correct: false },
            { text: "display()", correct: false },
            { text: "printf()", correct: true },
            { text: "output()", correct: false }
        ]
    },

    {
        question: "Which header file is required for printf()?",
        difficulty: "Easy",
        explanation: "printf() is declared in the standard input/output header file stdio.h.",
        answers: [
            { text: "conio.h", correct: false },
            { text: "stdlib.h", correct: false },
            { text: "stdio.h", correct: true },
            { text: "string.h", correct: false }
        ]
    },

    {
        question: "Which data type is commonly used to store an integer in C?",
        difficulty: "Easy",
        explanation: "The int data type is used to store whole-number values.",
        answers: [
            { text: "float", correct: false },
            { text: "char", correct: false },
            { text: "int", correct: true },
            { text: "double", correct: false }
        ]
    },

    {
        question: "Which symbol is used to declare a pointer in C?",
        difficulty: "Easy",
        explanation: "The asterisk (*) is used when declaring a pointer, such as int *ptr.",
        answers: [
            { text: "&", correct: false },
            { text: "*", correct: true },
            { text: "#", correct: false },
            { text: "@", correct: false }
        ]
    },

    {
        question: "Which loop is guaranteed to execute at least once?",
        difficulty: "Easy",
        explanation: "A do-while loop executes its body before checking the condition, so it runs at least once.",
        answers: [
            { text: "for", correct: false },
            { text: "while", correct: false },
            { text: "do-while", correct: true },
            { text: "if", correct: false }
        ]
    },

    {
        question: "Which keyword is used to return a value from a function?",
        difficulty: "Easy",
        explanation: "The return keyword ends a function and can provide a value to the caller.",
        answers: [
            { text: "send", correct: false },
            { text: "return", correct: true },
            { text: "output", correct: false },
            { text: "break", correct: false }
        ]
    },

    {
        question: "Which operator is used to find the remainder of a division?",
        difficulty: "Easy",
        explanation: "The modulus operator (%) returns the remainder after integer division.",
        answers: [
            { text: "/", correct: false },
            { text: "//", correct: false },
            { text: "%", correct: true },
            { text: "\\", correct: false }
        ]
    },

    {
        question: "What is the output of printf(\"%d\", 10 + 5);?",
        difficulty: "Medium",
        explanation: "The expression 10 + 5 evaluates to 15, which is printed using the %d format specifier.",
        answers: [
            { text: "10", correct: false },
            { text: "15", correct: true },
            { text: "5", correct: false },
            { text: "105", correct: false }
        ]
    },

    {
        question: "Which format specifier is commonly used to print an integer in C?",
        difficulty: "Medium",
        explanation: "The %d format specifier is commonly used with printf() to display an integer.",
        answers: [
            { text: "%c", correct: false },
            { text: "%f", correct: false },
            { text: "%d", correct: true },
            { text: "%s", correct: false }
        ]
    },

    {
        question: "Which format specifier is used to print a character?",
        difficulty: "Medium",
        explanation: "The %c format specifier is used to print a single character.",
        answers: [
            { text: "%d", correct: false },
            { text: "%c", correct: true },
            { text: "%s", correct: false },
            { text: "%f", correct: false }
        ]
    },

    {
        question: "Which keyword is used to define a constant variable in C?",
        difficulty: "Medium",
        explanation: "The const keyword specifies that the value of a variable should not be modified after initialization.",
        answers: [
            { text: "constant", correct: false },
            { text: "fixed", correct: false },
            { text: "const", correct: true },
            { text: "final", correct: false }
        ]
    },

    {
        question: "What is the index of the first element in a C array?",
        difficulty: "Medium",
        explanation: "C arrays use zero-based indexing, so the first element is at index 0.",
        answers: [
            { text: "0", correct: true },
            { text: "1", correct: false },
            { text: "-1", correct: false },
            { text: "Depends on the array", correct: false }
        ]
    },

    {
        question: "Which function is used to calculate the length of a string?",
        difficulty: "Medium",
        explanation: "The strlen() function from string.h returns the number of characters in a string before the null character.",
        answers: [
            { text: "length()", correct: false },
            { text: "size()", correct: false },
            { text: "strlen()", correct: true },
            { text: "strsize()", correct: false }
        ]
    },

    {
        question: "Which keyword is used to allocate memory dynamically in C?",
        difficulty: "Medium",
        explanation: "The malloc() function, declared in stdlib.h, is commonly used for dynamic memory allocation.",
        answers: [
            { text: "alloc", correct: false },
            { text: "malloc", correct: true },
            { text: "memory", correct: false },
            { text: "new", correct: false }
        ]
    },

    {
        question: "Which function releases dynamically allocated memory?",
        difficulty: "Medium",
        explanation: "The free() function releases memory previously allocated dynamically.",
        answers: [
            { text: "delete()", correct: false },
            { text: "remove()", correct: false },
            { text: "free()", correct: true },
            { text: "release()", correct: false }
        ]
    },

    {
        question: "Which operator is used to access the value stored at a pointer address?",
        difficulty: "Medium",
        explanation: "The dereference operator (*) accesses the value stored at the address held by a pointer.",
        answers: [
            { text: "&", correct: false },
            { text: "*", correct: true },
            { text: "->", correct: false },
            { text: ".", correct: false }
        ]
    },

    {
        question: "Which statement is used to skip the current iteration of a loop?",
        difficulty: "Medium",
        explanation: "The continue statement skips the remaining statements in the current iteration and proceeds to the next iteration.",
        answers: [
            { text: "skip", correct: false },
            { text: "break", correct: false },
            { text: "continue", correct: true },
            { text: "next", correct: false }
        ]
    },

    {
        question: "What is the output of the following expression: 5 % 2?",
        difficulty: "Hard",
        explanation: "5 divided by 2 leaves a remainder of 1, so the modulus operation produces 1.",
        answers: [
            { text: "0", correct: false },
            { text: "1", correct: true },
            { text: "2", correct: false },
            { text: "2.5", correct: false }
        ]
    },

    {
        question: "What is the output of: int x = 10; printf(\"%d\", x++);?",
        difficulty: "Hard",
        explanation: "The post-increment operator returns the current value before incrementing it. Therefore, 10 is printed and x becomes 11 afterward.",
        answers: [
            { text: "10", correct: true },
            { text: "11", correct: false },
            { text: "9", correct: false },
            { text: "Error", correct: false }
        ]
    },

    {
        question: "Which storage class makes a local variable retain its value between function calls?",
        difficulty: "Hard",
        explanation: "A static local variable retains its stored value between function calls.",
        answers: [
            { text: "auto", correct: false },
            { text: "register", correct: false },
            { text: "static", correct: true },
            { text: "extern", correct: false }
        ]
    },

    {
        question: "What does a NULL pointer represent?",
        difficulty: "Hard",
        explanation: "A NULL pointer is a pointer value that does not point to a valid object or function.",
        answers: [
            { text: "A pointer to the first memory location", correct: false },
            { text: "A pointer that points to no valid object", correct: true },
            { text: "A pointer containing zero characters", correct: false },
            { text: "A pointer to a string", correct: false }
        ]
    },

    {
        question: "Which operator is used to access a structure member through a pointer?",
        difficulty: "Hard",
        explanation: "The arrow operator (->) is used to access a structure or union member through a pointer.",
        answers: [
            { text: ".", correct: false },
            { text: "::", correct: false },
            { text: "->", correct: true },
            { text: "&", correct: false }
        ]
    },

    {
        question: "What is the purpose of the sizeof operator in C?",
        difficulty: "Hard",
        explanation: "The sizeof operator determines the size in bytes of a type or object.",
        answers: [
            { text: "Returns the number of variables", correct: false },
            { text: "Returns the memory size in bytes", correct: true },
            { text: "Returns the value of a variable", correct: false },
            { text: "Allocates memory", correct: false }
        ]
    },

    {
        question: "Which function is commonly used to compare two strings in C?",
        difficulty: "Hard",
        explanation: "The strcmp() function from string.h compares two strings lexicographically.",
        answers: [
            { text: "compare()", correct: false },
            { text: "strcmp()", correct: true },
            { text: "strcompare()", correct: false },
            { text: "equals()", correct: false }
        ]
    }

],

    // ========================================
// APTITUDE
// ========================================

Aptitude: [
    // ---------- EASY (8) ----------

    {
        question: "What is 25% of 200?",
        difficulty: "Easy",
        explanation: "25% = 25/100 = 1/4. Therefore, 1/4 × 200 = 50.",
        answers: [
            { text: "25", correct: false },
            { text: "40", correct: false },
            { text: "50", correct: true },
            { text: "75", correct: false }
        ]
    },

    {
        question: "If a pen costs ₹20, how much will 5 pens cost?",
        difficulty: "Easy",
        explanation: "Cost of 5 pens = 20 × 5 = ₹100.",
        answers: [
            { text: "₹80", correct: false },
            { text: "₹90", correct: false },
            { text: "₹100", correct: true },
            { text: "₹120", correct: false }
        ]
    },

    {
        question: "What is the average of 10, 20 and 30?",
        difficulty: "Easy",
        explanation: "Average = (10 + 20 + 30) / 3 = 60 / 3 = 20.",
        answers: [
            { text: "15", correct: false },
            { text: "20", correct: true },
            { text: "25", correct: false },
            { text: "30", correct: false }
        ]
    },

    {
        question: "A number increased by 10 gives 25. What is the number?",
        difficulty: "Easy",
        explanation: "Let the number be x. x + 10 = 25, so x = 15.",
        answers: [
            { text: "10", correct: false },
            { text: "15", correct: true },
            { text: "20", correct: false },
            { text: "35", correct: false }
        ]
    },

    {
        question: "What is the HCF of 12 and 18?",
        difficulty: "Easy",
        explanation: "Factors of 12 include 1, 2, 3, 4, 6, 12 and factors of 18 include 1, 2, 3, 6, 9, 18. The highest common factor is 6.",
        answers: [
            { text: "3", correct: false },
            { text: "6", correct: true },
            { text: "9", correct: false },
            { text: "12", correct: false }
        ]
    },

    {
        question: "What is the next number in the series: 2, 4, 6, 8, ?",
        difficulty: "Easy",
        explanation: "The series increases by 2 each time. Therefore, the next number is 10.",
        answers: [
            { text: "9", correct: false },
            { text: "10", correct: true },
            { text: "11", correct: false },
            { text: "12", correct: false }
        ]
    },

    {
        question: "A shirt costs ₹500 and is sold for ₹600. What is the profit?",
        difficulty: "Easy",
        explanation: "Profit = Selling Price − Cost Price = 600 − 500 = ₹100.",
        answers: [
            { text: "₹50", correct: false },
            { text: "₹75", correct: false },
            { text: "₹100", correct: true },
            { text: "₹150", correct: false }
        ]
    },

    {
        question: "If 5 workers can complete a task in 10 days, how many worker-days are required?",
        difficulty: "Easy",
        explanation: "Total worker-days = Number of workers × Number of days = 5 × 10 = 50 worker-days.",
        answers: [
            { text: "15", correct: false },
            { text: "25", correct: false },
            { text: "50", correct: true },
            { text: "100", correct: false }
        ]
    },

    // ---------- MEDIUM (9) ----------

    {
        question: "A number is increased by 20% and becomes 240. What was the original number?",
        difficulty: "Medium",
        explanation: "120% of the original number = 240. Original = 240 / 1.2 = 200.",
        answers: [
            { text: "180", correct: false },
            { text: "200", correct: true },
            { text: "220", correct: false },
            { text: "240", correct: false }
        ]
    },

    {
        question: "The ratio of boys to girls in a class is 3:2. If there are 30 boys, how many girls are there?",
        difficulty: "Medium",
        explanation: "3 parts = 30, so 1 part = 10. Girls = 2 × 10 = 20.",
        answers: [
            { text: "15", correct: false },
            { text: "20", correct: true },
            { text: "25", correct: false },
            { text: "30", correct: false }
        ]
    },

    {
        question: "A train travels 180 km in 3 hours. What is its average speed?",
        difficulty: "Medium",
        explanation: "Speed = Distance / Time = 180 / 3 = 60 km/h.",
        answers: [
            { text: "45 km/h", correct: false },
            { text: "50 km/h", correct: false },
            { text: "60 km/h", correct: true },
            { text: "75 km/h", correct: false }
        ]
    },

    {
        question: "Find the simple interest on ₹5,000 at 10% per annum for 2 years.",
        difficulty: "Medium",
        explanation: "SI = (P × R × T) / 100 = (5000 × 10 × 2) / 100 = ₹1,000.",
        answers: [
            { text: "₹500", correct: false },
            { text: "₹750", correct: false },
            { text: "₹1,000", correct: true },
            { text: "₹1,500", correct: false }
        ]
    },

    {
        question: "A shopkeeper buys an item for ₹800 and sells it for ₹920. What is the profit percentage?",
        difficulty: "Medium",
        explanation: "Profit = 920 − 800 = ₹120. Profit% = (120/800) × 100 = 15%.",
        answers: [
            { text: "10%", correct: false },
            { text: "12%", correct: false },
            { text: "15%", correct: true },
            { text: "20%", correct: false }
        ]
    },

    {
        question: "A can complete a job in 12 days and B can complete it in 18 days. How long will they take together?",
        difficulty: "Medium",
        explanation: "A's rate = 1/12 and B's rate = 1/18. Combined rate = 1/12 + 1/18 = 5/36. Time = 36/5 = 7.2 days.",
        answers: [
            { text: "6 days", correct: false },
            { text: "7.2 days", correct: true },
            { text: "8 days", correct: false },
            { text: "9 days", correct: false }
        ]
    },

    {
        question: "The average of 5 numbers is 24. If four numbers are 20, 22, 26 and 28, what is the fifth number?",
        difficulty: "Medium",
        explanation: "Total = 24 × 5 = 120. Sum of four numbers = 96. Fifth number = 120 − 96 = 24.",
        answers: [
            { text: "22", correct: false },
            { text: "24", correct: true },
            { text: "26", correct: false },
            { text: "28", correct: false }
        ]
    },

    {
        question: "A father is 3 times as old as his son. Their total age is 48 years. What is the son's age?",
        difficulty: "Medium",
        explanation: "Let son's age = x. Father's age = 3x. Therefore, 4x = 48, so x = 12.",
        answers: [
            { text: "10 years", correct: false },
            { text: "12 years", correct: true },
            { text: "14 years", correct: false },
            { text: "16 years", correct: false }
        ]
    },

    {
        question: "What is the probability of getting an even number when a fair die is rolled once?",
        difficulty: "Medium",
        explanation: "Even outcomes are 2, 4 and 6, giving 3 favorable outcomes out of 6. Probability = 3/6 = 1/2.",
        answers: [
            { text: "1/6", correct: false },
            { text: "1/3", correct: false },
            { text: "1/2", correct: true },
            { text: "2/3", correct: false }
        ]
    },

    // ---------- HARD (8) ----------

    {
        question: "A sum of money amounts to ₹12,100 in 2 years at 10% compound interest per annum. What is the principal?",
        difficulty: "Hard",
        explanation: "A = P(1 + R/100)^T. Therefore, 12,100 = P(1.1)^2 = 1.21P. Hence P = 12,100 / 1.21 = ₹10,000.",
        answers: [
            { text: "₹8,000", correct: false },
            { text: "₹9,000", correct: false },
            { text: "₹10,000", correct: true },
            { text: "₹11,000", correct: false }
        ]
    },

    {
        question: "A train 120 m long passes a pole in 6 seconds. What is its speed?",
        difficulty: "Hard",
        explanation: "Speed = Distance / Time = 120/6 = 20 m/s. Converting to km/h: 20 × 18/5 = 72 km/h.",
        answers: [
            { text: "60 km/h", correct: false },
            { text: "72 km/h", correct: true },
            { text: "80 km/h", correct: false },
            { text: "90 km/h", correct: false }
        ]
    },

    {
        question: "A mixture contains milk and water in the ratio 5:2. If 14 litres of water is added, the ratio becomes 5:4. What was the original quantity of milk?",
        difficulty: "Hard",
        explanation: "Let milk = 5x and water = 2x. After adding 14 litres, 5x/(2x + 14) = 5/4. Thus 20x = 10x + 70, so x = 7. Milk = 5 × 7 = 35 litres.",
        answers: [
            { text: "28 litres", correct: false },
            { text: "30 litres", correct: false },
            { text: "35 litres", correct: true },
            { text: "40 litres", correct: false }
        ]
    },

    {
        question: "In how many ways can 5 different books be arranged on a shelf?",
        difficulty: "Hard",
        explanation: "The number of arrangements of 5 different objects is 5! = 5 × 4 × 3 × 2 × 1 = 120.",
        answers: [
            { text: "60", correct: false },
            { text: "100", correct: false },
            { text: "120", correct: true },
            { text: "150", correct: false }
        ]
    },

    {
        question: "A man travels 60 km at 30 km/h and another 60 km at 60 km/h. What is his average speed for the entire journey?",
        difficulty: "Hard",
        explanation: "Total distance = 120 km. Time taken = 60/30 + 60/60 = 2 + 1 = 3 hours. Average speed = 120/3 = 40 km/h.",
        answers: [
            { text: "30 km/h", correct: false },
            { text: "40 km/h", correct: true },
            { text: "45 km/h", correct: false },
            { text: "50 km/h", correct: false }
        ]
    },

    {
        question: "If x + 1/x = 5, what is x² + 1/x²?",
        difficulty: "Hard",
        explanation: "Squaring both sides: (x + 1/x)² = x² + 2 + 1/x². Therefore, 25 = x² + 2 + 1/x², giving x² + 1/x² = 23.",
        answers: [
            { text: "21", correct: false },
            { text: "22", correct: false },
            { text: "23", correct: true },
            { text: "25", correct: false }
        ]
    },

    {
        question: "Two numbers are in the ratio 4:5 and their LCM is 180. What is their HCF?",
        difficulty: "Hard",
        explanation: "Let the numbers be 4x and 5x. Since they are relatively prime apart from x, LCM = 20x. Therefore, 20x = 180, so x = 9. Hence HCF = 9.",
        answers: [
            { text: "6", correct: false },
            { text: "9", correct: true },
            { text: "12", correct: false },
            { text: "15", correct: false }
        ]
    },

    {
        question: "A and B together can complete a job in 8 days. A alone can complete it in 12 days. How many days will B alone take?",
        difficulty: "Hard",
        explanation: "Combined rate = 1/8. A's rate = 1/12. B's rate = 1/8 − 1/12 = 1/24. Therefore, B alone takes 24 days.",
        answers: [
            { text: "18 days", correct: false },
            { text: "20 days", correct: false },
            { text: "24 days", correct: true },
            { text: "30 days", correct: false }
        ]    
    }
]
};



// ========================================
// VARIABLES
// ========================================

const dashboardScreen =
    document.getElementById("dashboard-screen");

const setupScreen =
    document.getElementById("setup-screen");

const quizScreen =
    document.getElementById("quiz-screen");

const resultScreen =
    document.getElementById("result-screen");

const themeBtn =
    document.getElementById("theme-btn");

const practiceBtn =
    document.getElementById("practice-btn");

const mockBtn =
    document.getElementById("mock-btn");

const setupBackBtn =
    document.getElementById("setup-back-btn");

const beginTestBtn =
    document.getElementById("begin-test-btn");

const restartBtn =
    document.getElementById("restart-btn");

const dashboardBtn =
    document.getElementById("dashboard-btn");

const nextBtn =
    document.getElementById("next-btn");

const questionElement =
    document.getElementById("question");

const answerButtons =
    document.getElementById("answer-buttons");

const questionNumber =
    document.getElementById("question-number");

const scoreElement =
    document.getElementById("score");

const progressBar =
    document.getElementById("progress-bar");

const finalScore =
    document.getElementById("final-score");

const resultMessage =
    document.getElementById("result-message");

const resultPercentage =
    document.getElementById("result-percentage");

const quizMode =
    document.getElementById("quiz-mode");

const timerElement =
    document.getElementById("timer");

const explanationBox =
    document.getElementById("explanation-box");

const explanationText =
    document.getElementById("explanation-text");

const difficultyButtons =
    document.querySelectorAll(".difficulty-btn");


// ========================================
// QUIZ STATE
// ========================================

let currentQuestionIndex = 0;

let score = 0;

let selectedSubject = "Python";

let selectedQuestionCount = 10;

let selectedDifficulty = "Mixed";

let testMode = "Practice";

let currentQuestions = [];
let userAnswers = [];

let timerInterval = null;
let questionTimerInterval = null;

let elapsedSeconds = 0;
let questionTimeLeft = 30;

// ========================================
// THEME
// ========================================

themeBtn.addEventListener("click", toggleTheme);


function toggleTheme() {

    document.body.classList.toggle("dark");

    const isDark =
        document.body.classList.contains("dark");

    themeBtn.textContent =
        isDark ? "☀️" : "🌙";

    localStorage.setItem(
        "quizTheme",
        isDark ? "dark" : "light"
    );
}


const savedTheme =
    localStorage.getItem("quizTheme");

if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeBtn.textContent = "☀️";
}


// ========================================
// PRACTICE TEST
// ========================================

practiceBtn.addEventListener("click", () => {

    testMode = "Practice";

    openSetupScreen();

});


// ========================================
// MOCK TEST
// ========================================

mockBtn.addEventListener("click", () => {

    testMode = "Mock";

    openSetupScreen();

});


// ========================================
// SUBJECT CARDS
// ========================================

const subjectCards =
    document.querySelectorAll(".subject-card");


subjectCards.forEach(card => {

    card.addEventListener("click", () => {

        selectedSubject =
            card.dataset.subject;

        testMode = "Practice";

        openSetupScreen();

        selectSetupSubject(selectedSubject);

    });

});


// ========================================
// OPEN SETUP SCREEN
// ========================================

function openSetupScreen() {

    dashboardScreen.classList.add("hide");

    resultScreen.classList.add("hide");

    quizScreen.classList.add("hide");

    setupScreen.classList.remove("hide");

    document.getElementById("setup-title").textContent =
        testMode === "Mock"
            ? "Configure Mock Test"
            : "Configure Practice Test";

    document.getElementById("setup-description").textContent =
        testMode === "Mock"
            ? "Choose a subject, difficulty and number of questions."
            : "Choose a subject, difficulty and number of questions.";
}


// ========================================
// SELECT SUBJECT IN SETUP
// ========================================

const setupSubjects =
    document.querySelectorAll(".setup-subject");


setupSubjects.forEach(button => {

    button.addEventListener("click", () => {

        selectedSubject =
            button.dataset.subject;

        selectSetupSubject(selectedSubject);

    });

});


function selectSetupSubject(subject) {

    setupSubjects.forEach(button => {

        button.classList.remove("selected");

        if (button.dataset.subject === subject) {

            button.classList.add("selected");

        }

    });

}


// ========================================
// QUESTION COUNT
// ========================================

const countButtons =
    document.querySelectorAll(".count-btn");


countButtons.forEach(button => {

    button.addEventListener("click", () => {

        selectedQuestionCount =
            Number(button.dataset.count);

        countButtons.forEach(btn => {

            btn.classList.remove("selected");

        });

        button.classList.add("selected");

    });

});


document
    .querySelector('[data-count="10"]')
    .classList.add("selected");


// ========================================
// DIFFICULTY SELECTION
// ========================================

difficultyButtons.forEach(button => {

    button.addEventListener("click", () => {

        difficultyButtons.forEach(btn => {

            btn.classList.remove("selected");

        });

        button.classList.add("selected");

        selectedDifficulty =
            button.dataset.difficulty;

    });

});


// Default difficulty

const defaultDifficulty =
    document.querySelector(
        '[data-difficulty="Mixed"]'
    );

if (defaultDifficulty) {

    defaultDifficulty.classList.add("selected");

}


// Default subject

selectSetupSubject("Python");


// ========================================
// BACK TO DASHBOARD FROM SETUP
// ========================================

setupBackBtn.addEventListener("click", () => {

    setupScreen.classList.add("hide");

    dashboardScreen.classList.remove("hide");

});


// ========================================
// BEGIN TEST
// ========================================

beginTestBtn.addEventListener(
    "click",
    startTest
);


function startTest() {

    const availableQuestions =
        questionBank[selectedSubject];

    if (!availableQuestions) {

        alert(
            "Questions are not available for this subject yet."
        );

        return;
    }


    // ========================================
    // FILTER BY DIFFICULTY
    // ========================================

    let filteredQuestions =
        [...availableQuestions];


    if (selectedDifficulty !== "Mixed") {

        filteredQuestions =
            filteredQuestions.filter(
                question =>
                    question.difficulty ===
                    selectedDifficulty
            );

    }


    // ========================================
    // CHECK AVAILABLE QUESTIONS
    // ========================================

    if (filteredQuestions.length === 0) {

        alert(
            `There are no ${selectedDifficulty} questions available for ${selectedSubject} yet.`
        );

        return;
    }


    // ========================================
    // QUESTION COUNT
    // ========================================

    const count =
        Math.min(
            selectedQuestionCount,
            filteredQuestions.length
        );


    // ========================================
    // RANDOMIZE QUESTIONS
    // ========================================

    currentQuestions =
        [...filteredQuestions]
            .sort(() => Math.random() - 0.5)
            .slice(0, count);


    currentQuestionIndex = 0;

    score = 0;

    userAnswers = [];

    elapsedSeconds = 0;


    scoreElement.textContent =
        "Score: 0";


    quizMode.textContent =
        `${testMode.toUpperCase()} TEST`;


    dashboardScreen.classList.add("hide");

    setupScreen.classList.add("hide");

    resultScreen.classList.add("hide");

    quizScreen.classList.remove("hide");


stopTimer();
elapsedSeconds = 0;


showQuestion();

} 


// ========================================
// SHOW QUESTION
// ========================================

function showQuestion() {

    answerButtons.innerHTML = "";

    nextBtn.style.display = "none";


    // Hide old explanation

    explanationBox.classList.add("hide");

    explanationText.textContent = "";


    const currentQuestion =
        currentQuestions[currentQuestionIndex];


    questionNumber.textContent =
        `Question ${currentQuestionIndex + 1} of ${currentQuestions.length}`;


    questionElement.textContent =
        currentQuestion.question;


    // Create answer buttons

    currentQuestion.answers.forEach(answer => {

        const button =
            document.createElement("button");

        button.textContent =
            answer.text;

        button.classList.add("answer-btn");


        if (answer.correct) {

            button.dataset.correct =
                "true";

        }


        button.addEventListener(
            "click",
            selectAnswer
        );


        answerButtons.appendChild(button);

    });


    // Progress

    const progress =
        ((currentQuestionIndex + 1)
            / currentQuestions.length) * 100;


    progressBar.style.width =
        `${progress}%`;

    startTimer();

}


// ========================================
// SELECT ANSWER
// ========================================
function selectAnswer(event) {

    stopTimer();

    const selectedButton = event.currentTarget;

    const selectedAnswer = selectedButton.textContent;

    const currentQuestion =
        currentQuestions[currentQuestionIndex];

    const correctAnswer =
        currentQuestion.answers.find(
            answer => answer.correct
        ).text;

    userAnswers[currentQuestionIndex] =
        selectedAnswer;


    // ========================================
    // MOCK TEST
    // ========================================

    if (testMode === "Mock") {

        selectedButton.classList.add("selected");

        const allButtons =
            Array.from(answerButtons.children);

        allButtons.forEach(button => {
            button.disabled = true;
        });

        nextBtn.style.display = "inline-block";

        return;
    }


    // ========================================
    // PRACTICE TEST
    // ========================================

    const isCorrect =
        selectedAnswer === correctAnswer;

    if (isCorrect) {

        score++;

        selectedButton.classList.add("correct");

    } else {

        selectedButton.classList.add("wrong");

        const allButtons =
            Array.from(answerButtons.children);

        allButtons.forEach(button => {

            if (
                button.dataset.correct ===
                "true"
            ) {

                button.classList.add("correct");

            }

        });

        explanationText.textContent =
            currentQuestion.explanation;

        explanationBox.classList.remove("hide");
    }


    // Disable all answer buttons

    Array.from(answerButtons.children)
        .forEach(button => {
            button.disabled = true;
        });


    // Show next button

    nextBtn.style.display =
        "inline-block";
}


// ========================================
// NEXT QUESTION
// ========================================

nextBtn.addEventListener(
    "click",
    nextQuestion
);


function nextQuestion() {

    stopTimer();

    currentQuestionIndex++;

    if (currentQuestionIndex < currentQuestions.length) {

        showQuestion();

    } else {

        showResult();

    }

}


// ========================================
// TIMER
// ========================================

function startTimer() {
    stopTimer();

    questionTimeLeft = 30;

    updateQuestionTimer();

    questionTimerInterval =
        setInterval(() => {

            questionTimeLeft--;

            updateQuestionTimer();

            if (questionTimeLeft <= 0) {
                clearInterval(questionTimerInterval);
                questionTimerInterval = null;

                handleQuestionTimeout();
            }

        }, 1000);
}


function updateTimer() {

    const minutes =
        Math.floor(
            elapsedSeconds / 30
        );

    const seconds =
        elapsedSeconds % 30;


    timerElement.textContent =
        `⏱️ ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}


function stopTimer() {

    if (timerInterval) {

        clearInterval(timerInterval);

        timerInterval = null;

    }

    if (questionTimerInterval) {

        clearInterval(questionTimerInterval);

        questionTimerInterval = null;

    }

}
function updateQuestionTimer() {

    const minutes =
        Math.floor(questionTimeLeft / 30);

    const seconds =
        questionTimeLeft % 30;

    timerElement.textContent =
        `⏱️ ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;


    if (questionTimeLeft <= 10) {

        timerElement.classList.add("timer-warning");

    } else {

        timerElement.classList.remove("timer-warning");

    }

}


function handleQuestionTimeout() {

    userAnswers[currentQuestionIndex] =
        "Not answered";

    const allButtons =
        Array.from(answerButtons.children);

    allButtons.forEach(button => {

        button.disabled = true;

        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }

    });

    nextBtn.style.display = "inline-block";

    setTimeout(() => {
    nextQuestion();
}, 1000);
}

// ========================================
// REVIEW ANSWERS
// ========================================

function showReviewAnswers() {

    const reviewContainer =
        document.getElementById("review-container");

    reviewContainer.innerHTML = "";

    currentQuestions.forEach((question, index) => {

        const userAnswer =
            userAnswers[index] || "Not answered";

        const correctAnswer =
            question.answers.find(
                answer => answer.correct
            ).text;

        const isCorrect =
            userAnswer === correctAnswer;

        const reviewCard =
            document.createElement("div");

        reviewCard.className =
            `review-card ${isCorrect ? "review-correct" : "review-wrong"}`;

        reviewCard.innerHTML = `
            <div class="review-question">
                <span>Question ${index + 1}</span>
                <p>${question.question}</p>
            </div>

            <div class="review-answer">
                <strong>Your Answer:</strong>
                <span>${userAnswer}</span>
            </div>

            ${
                !isCorrect
                    ? `
                    <div class="review-answer correct-answer">
                        <strong>Correct Answer:</strong>
                        <span>${correctAnswer}</span>
                    </div>
                    `
                    : ""
            }

            <div class="review-explanation">
                <strong>Explanation:</strong>
                <p>${question.explanation}</p>
            </div>
        `;

        reviewContainer.appendChild(reviewCard);
    });
}

function showResult() {

    stopTimer();

    quizScreen.classList.add("hide");
    resultScreen.classList.remove("hide");

    const total =
        currentQuestions.length;

    const percentage =
        Math.round(
            (score / total) * 100
        );

    const wrong =
        total - score;

    // ================================
    // BASIC RESULT
    // ================================

    finalScore.textContent =
        `${score} / ${total}`;

    resultPercentage.textContent =
        `${percentage}%`;

    // ================================
    // RESULT BREAKDOWN
    // ================================

    document.getElementById(
        "result-correct"
    ).textContent = score;

    document.getElementById(
        "result-wrong"
    ).textContent = wrong;

    document.getElementById(
        "result-accuracy"
    ).textContent =
        `${percentage}%`;

    // ================================
    // TIME TAKEN
    // ================================

    const minutes =
        Math.floor(elapsedSeconds / 30);

    const seconds =
        elapsedSeconds % 30;

    document.getElementById(
        "result-time"
    ).textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    // ================================
    // PERFORMANCE MESSAGE
    // ================================

    if (percentage === 100) {

        resultMessage.textContent =
            "Outstanding! Perfect score! 🏆";

        document.getElementById(
            "performance-text"
        ).textContent =
            "Excellent! You answered every question correctly. Keep maintaining this level.";

    }

    else if (percentage >= 80) {

        resultMessage.textContent =
            "Excellent performance! Keep it up! 🎉";

        document.getElementById(
            "performance-text"
        ).textContent =
            "Great performance! You have a strong understanding of this subject.";

    }

    else if (percentage >= 60) {

        resultMessage.textContent =
            "Great job! A little more practice will make you even better! 👍";

        document.getElementById(
            "performance-text"
        ).textContent =
            "Good progress! Review the questions you missed and keep practicing.";

    }

    else if (percentage >= 40) {

        resultMessage.textContent =
            "Good attempt! Keep practicing and improve your score! 💪";

        document.getElementById(
            "performance-text"
        ).textContent =
            "You are making progress. Focus on your weaker areas and practice regularly.";

    }

    else {

        resultMessage.textContent =
            "Keep learning and practicing. You can definitely improve! 🚀";

        document.getElementById(
            "performance-text"
        ).textContent =
            "Don't give up! Review the concepts and try another test to improve your score.";

    }

    // ================================
    // SAVE STATISTICS
    // ================================

    saveStatistics(
        total,
        percentage
    );

    saveSubjectScore(
    selectedSubject,
    percentage
);

// Show answer review
showReviewAnswers();

}

// ========================================
// RESTART TEST
// ========================================

restartBtn.addEventListener(
    "click",
    () => {

        resultScreen.classList.add("hide");

        quizScreen.classList.remove("hide");

        startTest();

    }
);


// ========================================
// DASHBOARD BUTTON
// ========================================

dashboardBtn.addEventListener(
    "click",
    () => {

        stopTimer();

        resultScreen.classList.add("hide");

        quizScreen.classList.add("hide");

        setupScreen.classList.add("hide");

        dashboardScreen.classList.remove("hide");

        updateStatistics();

    }
);


// ========================================
// STATISTICS
// ========================================

function saveStatistics(
    totalQuestions,
    percentage
) {

    let attempts =
        Number(
            localStorage.getItem(
                getUserKey("attempts")
            )
        ) || 0;


    let solved =
        Number(
            localStorage.getItem(
                getUserKey("questionsSolved")
            )
        ) || 0;


    let best =
        Number(
            localStorage.getItem(
                getUserKey("bestAccuracy")
            )
        ) || 0;


    attempts++;

    solved += totalQuestions;

    best =
        Math.max(
            best,
            percentage
        );


    localStorage.setItem(
        getUserKey("attempts"),
        attempts
    );

    localStorage.setItem(
        getUserKey("questionsSolved"),
        solved
    );

    localStorage.setItem(
        getUserKey("bestAccuracy"),
        best
    );


    updateStatistics();

}

// ========================================
// UPDATE STATISTICS
// ========================================

function updateStatistics() {

    const attempts =
        Number(
            localStorage.getItem(
                getUserKey("attempts")
            )
        ) || 0;


    const solved =
        Number(
            localStorage.getItem(
                getUserKey("questionsSolved")
            )
        ) || 0;


    const best =
        Number(
            localStorage.getItem(
                getUserKey("bestAccuracy")
            )
        ) || 0;


    document.getElementById(
        "total-attempts"
    ).textContent =
        attempts;


    document.getElementById(
        "questions-solved"
    ).textContent =
        solved;


    document.getElementById(
        "best-accuracy"
    ).textContent =
        `${best}%`;

}

// ========================================
// UPDATE SUBJECT SCORES
// ========================================

function updateSubjectScores() {

    subjectCards.forEach(card => {

        const subject =
            card.dataset.subject;


        const best =
            Number(
                localStorage.getItem(
                    getUserKey(`best-${subject}`)
                )
            ) || 0;


        const scoreElement =
            card.querySelector(
                `[data-score="${subject}"]`
            );


        if (scoreElement) {

            scoreElement.textContent =
                `${best}%`;

        }

    });

}

// ========================================
// SAVE SUBJECT SCORE
// ========================================

function saveSubjectScore(
    subject,
    percentage
) {

    const key =
        getUserKey(`best-${subject}`);

    const currentBest =
        Number(
            localStorage.getItem(key)
        ) || 0;


    if (percentage > currentBest) {

        localStorage.setItem(
            key,
            percentage
        );

    }


    updateSubjectScores();

}
// ========================================
// INITIAL LOAD
// ========================================

if (currentUser) {

    showDashboard();

} else {

    authScreen.classList.remove("hide");

    dashboardScreen.classList.add("hide");
    setupScreen.classList.add("hide");
    quizScreen.classList.add("hide");
    resultScreen.classList.add("hide");

    showLogin();

}