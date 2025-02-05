let valor = 0;
let hasSword = false;
let goblinKills = 0;
let orcKills = 0;
let dragonKills = 0;
let activeQuest = null; // Текущий квест
let armor = 1; // Базовый шанс победы без брони (1.00)

document.getElementById("train").addEventListener("click", () => {
    valor++;
    document.getElementById("valor").textContent = valor;
});

// Покупка меча
document.getElementById("buySword").addEventListener("click", () => {
    if (valor >= 10 && !hasSword) {
        valor -= 10;
        hasSword = true;
        document.getElementById("valor").textContent = valor;
        document.getElementById("inventory").textContent = "Инвентарь: Меч";
    } else {
        alert(hasSword ? "Ты уже купил меч!" : "Не хватает доблести!");
    }
});

// Функция покупки брони
function buyArmor(type) {
    if (type === "leather" && valor >= 15) {
        valor -= 15;
        armor = 1.25; // Кожаная броня
        document.getElementById("valor").textContent = valor;
        document.getElementById("inventory").textContent = "Инвентарь: Кожаная броня";
    } else if (type === "silver" && valor >= 30) {
        valor -= 30;
        armor = 2.5; // Серебряная броня
        document.getElementById("valor").textContent = valor;
        document.getElementById("inventory").textContent = "Инвентарь: Серебряная броня";
    } else if (type === "gold" && valor >= 50) {
        valor -= 50;
        armor = 5; // Золотая броня
        document.getElementById("valor").textContent = valor;
        document.getElementById("inventory").textContent = "Инвентарь: Золотая броня";
    } else {
        alert("Недостаточно доблести для покупки брони!");
    }
}

// Функция битвы
function fightMonster(monster, baseWinChance, reward, counter) {
    if (!hasSword) {
        alert("Тебе нужен меч!");
        return;
    }

    // Учитываем броню, умножая шанс победы на armor
    let winChance = baseWinChance * armor;
    let chance = Math.random();
    if (chance < winChance) {
        // Всплывающее окно с победой
        alert(`Ты победил ${monster}!`);
        valor += reward;
        counter++;  // Увеличиваем количество убитых монстров
        document.getElementById("valor").textContent = valor;
        checkQuestProgress(); // Проверка выполнения квеста
    } else {
        alert(`${monster} победил тебя...`);
    }
}

// Битвы
document.getElementById("fightGoblin").addEventListener("click", () => {
    goblinKills++;
    fightMonster("гоблину", 0.7, 5, goblinKills);
});
document.getElementById("fightOrc").addEventListener("click", () => {
    orcKills++;
    fightMonster("орку", 0.5, 10, orcKills);
});
document.getElementById("fightDragon").addEventListener("click", () => {
    dragonKills++;
    fightMonster("дракону", 0.3, 30, dragonKills);
});

// Функция выбора квеста
function selectQuest(quest) {
    activeQuest = quest;
    document.getElementById("questText").textContent = `Текущий квест: ${quest.description}`;
    document.getElementById("questResult").textContent = "Заверши квест, убив нужное количество монстров!";
}

// Проверка выполнения квеста
function checkQuestProgress() {
    if (!activeQuest) return;

    // Условие выполнения квеста
    if (activeQuest.condition()) {
        document.getElementById("questResult").textContent = `Квест выполнен! (+${activeQuest.reward} доблести)`;
        valor += activeQuest.reward;
        document.getElementById("valor").textContent = valor;
        activeQuest = null; // Завершаем квест
    }
}

// Квесты
const quests = [
    {
        description: "Победи 3 гоблинов",
        condition: () => goblinKills >= 3,
        reward: 10
    },
    {
        description: "Победи 2 орков",
        condition: () => orcKills >= 2,
        reward: 15
    },
    {
        description: "Убей дракона",
        condition: () => dragonKills >= 1,
        reward: 50
    }
];

// Привязываем кнопки к квестам
document.getElementById("quest1").addEventListener("click", () => selectQuest(quests[0]));
document.getElementById("quest2").addEventListener("click", () => selectQuest(quests[1]));
document.getElementById("quest3").addEventListener("click", () => selectQuest(quests[2]));

// Привязка кнопок для покупки брони
document.getElementById("buyLeatherArmor").addEventListener("click", () => buyArmor("leather"));
document.getElementById("buySilverArmor").addEventListener("click", () => buyArmor("silver"));
document.getElementById("buyGoldArmor").addEventListener("click", () => buyArmor("gold"));
</script>