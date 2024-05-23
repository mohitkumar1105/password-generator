const passwordtext = document.getElementById("password-text")
const copyMsg = document.getElementById("copyMsg")
const copyicon = document.getElementById("copy-icon")
const passwordlength = document.getElementById("password-length")
const slider = document.querySelector("#slider")
const uppercase = document.getElementById("uppercase")
const lowercase = document.getElementById("lowercase")
const numbers = document.getElementById("numbers")
const symbols = document.getElementById("symbols")
const indicator = document.getElementById("indicator")
const passwordgenerator = document.getElementById("password-generator")
const symbolsCheck = "!@#$%^&*()_+-=[]{}|;:',.<>?/`~"
const allcheckBox = document.querySelectorAll("input[type=checkbox]")



let randomlyPasswordLength = 10;
let randomlyPassword = "";
let checkCount = 0;




const randomly = () => {
    passwordlength.innerText = randomlyPasswordLength;
    passwordtext.value = randomlyPassword
}
randomly()


const setindigator = (color, shadow) => {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = shadow


}


const getInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min
}

const generateRandomNumber = () => {
    return getInteger(0, 9)
}

const generateUppercase = () => {
    return String.fromCharCode(getInteger(65, 90))
}

const generateLowercase = () => {
    return String.fromCharCode(getInteger(97, 122))
}

console.log(generateLowercase())

const generateSymbol = () => {

    let randomSymbol = getInteger(0, symbolsCheck.length)
    return symbolsCheck.charAt(randomSymbol)
}

function shufflePassword(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    let str = ""

    array.forEach((el) => (str += el))
    return str
}

function handleCheckBox() {
    checkCount = 0;
    allcheckBox.forEach((checkBox) => {
        if (checkBox.checked) {
            checkCount++
        }
    })

    if (randomlyPasswordLength < checkCount) {
        randomlyPasswordLength = checkCount
        randomly()
    }
}


allcheckBox.forEach((checkBox) => {
    checkBox.addEventListener("change", handleCheckBox)
})



const calcStrength = () => {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSymbols = false;

    if (uppercase.checked) {
        hasUpper = true;
    }

    if (lowercase.checked) {
        hasLower = true;
    }

    if (numbers.checked) {
        hasNum = true;
    }

    if (symbols.checked) {
        hasSymbols = true;
    }


    if (hasUpper && hasLower && (hasNum || hasSymbols) && randomlyPasswordLength >= 8) {
        setindigator("#0f0", "box-shadow: 2px 1px 4px 2px ")
    } else if ((hasLower || hasUpper) && (hasSymbols || hasNum) && randomlyPasswordLength <= 6) {
        setindigator("red")

    } else {
        setindigator("0f00")
    }
}



async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordtext.value);
            
        
            copyMsg.style.cssText = " visibility:visible; transform:scale(1)";
            setTimeout(() => {
                copyMsg.style.visibility = "hidden"
    
            },1000)
        

        


    }
    catch (e) {
        copyMsg.innerHTML = "failed"
    }

}

function inputSlider(e) {
    randomlyPasswordLength = e.target.value;
    randomly()
}

slider.addEventListener('input', inputSlider)



copyicon.addEventListener("click", () => {
    if (randomlyPasswordLength > 0) {
        copyContent()
    }
})

passwordgenerator.addEventListener("click", () => {

    if (checkCount < 0) return;

    if (randomlyPasswordLength < checkCount) {
        randomlyPasswordLength = checkCount
        randomly()

    }

    password = ""

    funArr = [];

    if (uppercase.checked)
        funArr.push(generateUppercase)

    if (lowercase.checked)
        funArr.push(generateLowercase)

    if (numbers.checked)
        funArr.push(generateRandomNumber)

    if (symbols.checked)
        funArr.push(generateSymbol)

    //compulasary addition

    for (let i = 0; i < funArr.length; i++) {
        password += funArr[i]()
    }
    console.log("compulasary")


    //remaining addition

    for (let i = 0; i < randomlyPasswordLength - funArr.length; i++) {
        let randIndex = getInteger(0, funArr.length)
        password += funArr[randIndex]()
    }
    console.log("addition")

    password = shufflePassword(Array.from(password))

    passwordtext.value = password

    calcStrength()
})