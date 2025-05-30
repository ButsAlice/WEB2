class Model {
    constructor() {
        this.totalQuestions = 12; // Загальна кількість питань
    }

    /**
     * Перевіряє відповіді користувача і повертає результат.
     * @param {number} rightAnswers - Кількість правильних відповідей.
     * @param {number} countAnsweredQuestions - Кількість питань, на які була дана відповідь.
     * @returns {string} - Текст результату.
     */
    checkAnswers(rightAnswers, countAnsweredQuestions) {
        if (countAnsweredQuestions < this.totalQuestions) {
            return `Every question needs to be answered. You answered ${countAnsweredQuestions} out of ${this.totalQuestions}.`;
        } else {
            if (rightAnswers > 7) {
                return `Your result is ${rightAnswers}/${this.totalQuestions}. Your stress level is high, we recommend consulting a therapist!`;
            } else {
                return `Your result is ${rightAnswers}/${this.totalQuestions}. Well done!`;
            }
        }
    }
}

class View {
    constructor() {
        this.submitButton = document.getElementById("submitQuiz");
        this.resultDisplay = document.getElementById("result");
    }

    /**
     * Збирає відповіді користувача.
     * @returns {{rightAnswers: number, countAnsweredQuestions: number}} - Об'єкт з кількістю + відповідей та відповідей на питання.
     */
    getUsersAnswers() {
        let rightAnswers = 0;
        let answeredQuestions = new Set(); // Використовуємо Set для відстеження унікальних питань, на які відповіли

        // Отримуємо всі радіо кнопки
        const radioButtons = document.querySelectorAll('input[type="radio"]');

        radioButtons.forEach(radio => {
            if (radio.checked) {
                // Додаємо ім'я групи (питання) до Set, щоб порахувати, скільки питань було відповідено
                answeredQuestions.add(radio.name);
                // Перевіряємо, чи ця відповідь є +
                if (radio.dataset.correct === "true") {
                    rightAnswers++;
                }
            }
        });

        return {
            rightAnswers: rightAnswers,
            countAnsweredQuestions: answeredQuestions.size
        };
    }

    /**
     * Відображає результат користувачу.
     * @param {string} message - Повідомлення для відображення.
     */
    displayResult(message) {
        this.resultDisplay.innerHTML = message;
        this.resultDisplay.style.display = "block";
    }

    /**
     * Додає обробник подій для кнопки відправки.
     * @param {Function} handler - Функція, яка буде викликана при натисканні кнопки.
     */
    bindSubmitQuiz(handler) {
        this.submitButton.addEventListener("click", handler);
    }
}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Прив'язуємо метод обробки відправки до кнопки
        this.view.bindSubmitQuiz(this.handleSubmitQuiz.bind(this));
    }

    /**
     * Обробляє відправку форми вікторини.
     */
    handleSubmitQuiz() {
        const { rightAnswers, countAnsweredQuestions } = this.view.getUsersAnswers();
        const resultText = this.model.checkAnswers(rightAnswers, countAnsweredQuestions);
        this.view.displayResult(resultText);
    }
}

// Ініціалізація MVC
document.addEventListener("DOMContentLoaded", () => {
    const app = new Controller(new Model(), new View());
});