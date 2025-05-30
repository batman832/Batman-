document.addEventListener('DOMContentLoaded', () => {
    // Animação do Título Principal
    const titleElement = document.querySelector('.animated-title');
    const titleText = "Ciência da Computação";
    let titleIndex = 0;

    function typeTitle() {
        if (titleIndex < titleText.length) {
            titleElement.textContent += titleText.charAt(titleIndex);
            titleIndex++;
            setTimeout(typeTitle, 100); // Velocidade de digitação (ms)
        }
    }
    typeTitle(); // Inicia a animação

    // Revelação de Conteúdo ao Rolar
    const contentBlocks = document.querySelectorAll('.content-block, .quiz-block'); // Inclui o quiz-block
    const checkVisibility = () => {
        contentBlocks.forEach(block => {
            const rect = block.getBoundingClientRect();
            const triggerPoint = window.innerHeight * 0.90; // 90% da altura da viewport

            if (rect.top < triggerPoint && rect.bottom > 0) {
                block.classList.add('visible');
                block.classList.remove('hidden');
            }
        });
    };
    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Chama uma vez para verificar elementos já visíveis ao carregar

    // Nova Animação de Fundo (Código Binário/Partículas)
    const canvas = document.getElementById('bgCanvas');
    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;
    let letters = '01'; // Caracteres para a animação de código binário
    let columns = width / 20; // Largura de cada "coluna" de código (20px por caractere)
    let drops = [];

    // Inicializa as posições de cada "gota" de código
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    function drawBackgroundAnimation() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = varComputedStyle('--neon-green');
        ctx.font = '20px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = letters.charAt(Math.floor(Math.random() * letters.length));
            ctx.fillText(text, i * 20, drops[i] * 20);

            if (drops[i] * 20 > height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    function varComputedStyle(prop) {
        return getComputedStyle(document.documentElement).getPropertyValue(prop);
    }

    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        columns = width / 20;
        drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
    });

    canvas.width = width;
    canvas.height = height;
    setInterval(drawBackgroundAnimation, 33);


    // Lógica do Quiz
    const quizQuestions = [
        {
            question: "Qual área da Ciência da Computação foca na eficiência de algoritmos?",
            options: ["Cibersegurança", "Redes de Computadores", "Algoritmos e Estruturas de Dados", "Gráficos Computacionais"],
            correct: "Algoritmos e Estruturas de Dados"
        },
        {
            question: "Qual termo descreve máquinas que aprendem e tomam decisões?",
            options: ["Sistemas Operacionais", "Inteligência Artificial e Machine Learning", "Engenharia de Software", "Computação Gráfica"],
            correct: "Inteligência Artificial e Machine Learning"
        },
        {
            question: "O que a Cibersegurança busca proteger?",
            options: ["Hardware e cabos", "Dados e sistemas contra ameaças", "Algoritmos complexos", "Processos industriais"],
            correct: "Dados e sistemas contra ameaças"
        }
    ];

    const quizContainer = document.getElementById('quiz-container');
    const quizResult = document.getElementById('quiz-result');

    function loadQuiz() {
        quizQuestions.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question-block'); // Para organizar perguntas

            const questionText = document.createElement('p');
            questionText.classList.add('question');
            questionText.textContent = `${index + 1}. ${q.question}`;
            questionDiv.appendChild(questionText);

            const optionsContainer = document.createElement('div');
            optionsContainer.classList.add('options-container');

            q.options.forEach(option => {
                const optionButton = document.createElement('button');
                optionButton.classList.add('option-button');
                optionButton.textContent = option;
                optionButton.addEventListener('click', () => selectOption(optionButton, q.correct, optionsContainer));
                optionsContainer.appendChild(optionButton);
            });
            questionDiv.appendChild(optionsContainer);
            quizContainer.appendChild(questionDiv);
        });
    }

    function selectOption(selectedButton, correctAnswer, optionsContainer) {
        // Desabilita todos os botões daquela pergunta após uma seleção
        Array.from(optionsContainer.children).forEach(button => {
            button.disabled = true;
            if (button.textContent === correctAnswer) {
                button.classList.add('correct');
            } else {
                button.classList.add('wrong');
            }
        });

        // Mostra a mensagem de resultado para a pergunta
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('result-message');
        if (selectedButton.textContent === correctAnswer) {
            resultDiv.classList.add('correct');
            resultDiv.textContent = "Correto! 🎉";
        } else {
            resultDiv.classList.add('wrong');
            resultDiv.textContent = "Incorreto. Tente novamente! 😔";
        }
        optionsContainer.parentNode.insertBefore(resultDiv, optionsContainer.nextSibling);
    }

    loadQuiz(); // Carrega o quiz ao carregar a página
});