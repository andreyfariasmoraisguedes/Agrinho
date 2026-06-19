const appliances = document.querySelectorAll(".appliance");

const energyDisplay = document.getElementById("energy");
const timerDisplay = document.getElementById("timer");
const targetDisplay = document.getElementById("target");
const levelDisplay = document.getElementById("level");
const message = document.getElementById("message");

let level = 1;
let timer;
let timeLeft = 60;

const targets = [15, 10, 8, 12, 6, 14, 9, 5, 7, 4];
let target = targets[0];

function calculateEnergy(){

    let total = 0;

    appliances.forEach(appliance => {

        if(appliance.classList.contains("on")){
            total += Number(appliance.dataset.consumption);
        }

    });

    energyDisplay.textContent = total;

    return total;
}

function startTimer(){

    clearInterval(timer);

    timeLeft = 60;
    timerDisplay.textContent = timeLeft;

    timer = setInterval(()=>{

        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if(timeLeft <= 0){

            clearInterval(timer);

            const energy = calculateEnergy();

            if(energy <= target){

                nextLevel();

            }else{

                message.innerHTML =
                "❌ Você perdeu! Tente novamente.";

                restartLevel();
            }
        }

    },1000);
}

function nextLevel(){

    message.innerHTML =
    `🏆 Fase ${level} concluída!`;

    level++;

    if(level > targets.length){

        target = Math.floor(Math.random()*12)+4;

    }else{

        target = targets[level-1];
    }

    setTimeout(()=>{

        levelDisplay.textContent = level;
        targetDisplay.textContent = target;

        resetAppliances();

        startTimer();

        message.innerHTML =
        `⚡ Nova meta: menos de ${target} kWh`;

    },2000);
}

function restartLevel(){

    setTimeout(()=>{

        resetAppliances();
        startTimer();

        message.innerHTML =
        "🔄 Nova tentativa!";

    },2500);
}

function resetAppliances(){

    appliances.forEach(appliance=>{

        appliance.classList.remove("off");
        appliance.classList.add("on");

        appliance.querySelector("button").textContent =
        "Desligar";

    });

    calculateEnergy();
}

appliances.forEach(appliance=>{

    const button = appliance.querySelector("button");

    button.addEventListener("click",()=>{

        appliance.classList.toggle("on");
        appliance.classList.toggle("off");

        if(appliance.classList.contains("on")){
            button.textContent = "Desligar";
        }else{
            button.textContent = "Ligar";
        }

        calculateEnergy();

    });

});

targetDisplay.textContent = target;
calculateEnergy();
startTimer();
