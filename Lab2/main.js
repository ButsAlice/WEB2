class Model {
    constructor() {
        this.totalQuestions = 12; // �������� ������� ������
    }

    /**
     * �������� ������ ����������� � ������� ���������.
     * @param {number} rightAnswers - ʳ������ ���������� ��������.
     * @param {number} countAnsweredQuestions - ʳ������ ������, �� �� ���� ���� �������.
     * @returns {string} - ����� ����������.
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
     * ����� ������ �����������.
     * @returns {{rightAnswers: number, countAnsweredQuestions: number}} - ��'��� � ������� + �������� �� �������� �� �������.
     */
    getUsersAnswers() {
        let rightAnswers = 0;
        let answeredQuestions = new Set(); // ������������� Set ��� ���������� ��������� ������, �� �� �������

        // �������� �� ���� ������
        const radioButtons = document.querySelectorAll('input[type="radio"]');

        radioButtons.forEach(radio => {
            if (radio.checked) {
                // ������ ��'� ����� (�������) �� Set, ��� ����������, ������ ������ ���� ���������
                answeredQuestions.add(radio.name);
                // ����������, �� �� ������� � +
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
     * ³������� ��������� �����������.
     * @param {string} message - ����������� ��� �����������.
     */
    displayResult(message) {
        this.resultDisplay.innerHTML = message;
        this.resultDisplay.style.display = "block";
    }

    /**
     * ���� �������� ���� ��� ������ ��������.
     * @param {Function} handler - �������, ��� ���� ��������� ��� ��������� ������.
     */
    bindSubmitQuiz(handler) {
        this.submitButton.addEventListener("click", handler);
    }
}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // ����'����� ����� ������� �������� �� ������
        this.view.bindSubmitQuiz(this.handleSubmitQuiz.bind(this));
    }

    /**
     * �������� �������� ����� ��������.
     */
    handleSubmitQuiz() {
        const { rightAnswers, countAnsweredQuestions } = this.view.getUsersAnswers();
        const resultText = this.model.checkAnswers(rightAnswers, countAnsweredQuestions);
        this.view.displayResult(resultText);
    }
}

// ����������� MVC
document.addEventListener("DOMContentLoaded", () => {
    const app = new Controller(new Model(), new View());
});