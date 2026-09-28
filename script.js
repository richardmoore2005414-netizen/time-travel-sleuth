/**
 * Time-Travel Sleuth — Game Engine
 * Handles screens, timer, scoring, and question flow.
 * Question bank lives in questions.js (window.QUESTIONS).
 */

(function () {
  'use strict';

  // ----- Config -----
  const TIME_PER_QUESTION = 25; // seconds
  const POINTS_CORRECT = 100;
  const POINTS_FAST_BONUS = 25; // if answered with > 50% time left

  // ----- State -----
  let questions = [];
  let currentIndex = 0;
  let score = 0;
  let correctCount = 0;
  let timerId = null;
  let timeLeft = TIME_PER_QUESTION;
  let totalTimeUsed = 0;
  let questionStartTime = 0;
  let answering = false;

  // ----- DOM -----
  const screens = {
    home: document.getElementById('home'),
    game: document.getElementById('game'),
    results: document.getElementById('results')
  };

  const els = {
    btnStart: document.getElementById('btn-start'),
    btnRestart: document.getElementById('btn-restart'),
    btnHome: document.getElementById('btn-home'),
    scoreValue: document.getElementById('score-value'),
    timerValue: document.getElementById('timer-value'),
    clockFace: document.querySelector('.clock-face'),
    progressValue: document.getElementById('progress-value'),
    questionText: document.getElementById('question-text'),
    options: document.getElementById('options'),
    feedback: document.getElementById('feedback'),
    finalScore: document.getElementById('final-score'),
    finalCorrect: document.getElementById('final-correct'),
    finalTime: document.getElementById('final-time'),
    verdict: document.getElementById('verdict')
  };

  // ----- Helpers -----
  function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[name].classList.add('active');
  }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function stopTimer() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  function startTimer() {
    stopTimer();
    timeLeft = TIME_PER_QUESTION;
    questionStartTime = Date.now();
    updateTimerDisplay();
    els.clockFace.classList.remove('urgent');

    timerId = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();
      if (timeLeft <= 5) {
        els.clockFace.classList.add('urgent');
      }
      if (timeLeft <= 0) {
        stopTimer();
        handleTimeout();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    els.timerValue.textContent = Math.max(0, timeLeft);
  }

  function updateHUD() {
    els.scoreValue.textContent = score;
    els.progressValue.textContent = `${currentIndex + 1}/${questions.length}`;
  }

  // ----- Game Flow -----
  function startGame() {
    const bank = (typeof window.QUESTIONS !== 'undefined' && Array.isArray(window.QUESTIONS))
      ? window.QUESTIONS
      : [];

    if (bank.length === 0) {
      alert('No questions found. Please add questions to questions.js');
      return;
    }

    questions = shuffle(bank);
    currentIndex = 0;
    score = 0;
    correctCount = 0;
    totalTimeUsed = 0;
    answering = false;

    showScreen('game');
    loadQuestion();
  }

  function loadQuestion() {
    answering = false;
    els.feedback.hidden = true;
    els.feedback.className = 'feedback';
    els.feedback.textContent = '';

    const q = questions[currentIndex];
    els.questionText.textContent = q.question;
    updateHUD();

    els.options.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];

    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'option-btn';
      btn.innerHTML = `<span class="letter">${letters[i]}.</span>${opt}`;
      btn.dataset.index = i;
      btn.addEventListener('click', () => handleAnswer(i));
      els.options.appendChild(btn);
    });

    startTimer();
  }

  function handleAnswer(selectedIndex) {
    if (answering) return;
    answering = true;
    stopTimer();

    const elapsed = Math.min(TIME_PER_QUESTION, Math.round((Date.now() - questionStartTime) / 1000));
    totalTimeUsed += elapsed;

    const q = questions[currentIndex];
    const isCorrect = selectedIndex === q.correct;
    const buttons = els.options.querySelectorAll('.option-btn');

    buttons.forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.correct) btn.classList.add('correct');
      if (i === selectedIndex && !isCorrect) btn.classList.add('wrong');
    });

    if (isCorrect) {
      correctCount++;
      let points = POINTS_CORRECT;
      if (timeLeft > TIME_PER_QUESTION * 0.5) {
        points += POINTS_FAST_BONUS;
      }
      score += points;
      showFeedback(true, q.explanation);
    } else {
      showFeedback(false, q.explanation);
    }

    updateHUD();
    setTimeout(nextQuestion, 1600);
  }

  function handleTimeout() {
    if (answering) return;
    answering = true;
    totalTimeUsed += TIME_PER_QUESTION;

    const q = questions[currentIndex];
    const buttons = els.options.querySelectorAll('.option-btn');
    buttons.forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.correct) btn.classList.add('correct');
    });

    showFeedback(false, q.explanation || 'Time ran out!');
    setTimeout(nextQuestion, 1600);
  }

  function showFeedback(correct, explanation) {
    els.feedback.hidden = false;
    els.feedback.className = 'feedback ' + (correct ? 'correct' : 'wrong');
    const base = correct ? 'Correct!' : 'Not quite.';
    els.feedback.textContent = explanation ? `${base} ${explanation}` : base;
  }

  function nextQuestion() {
    currentIndex++;
    if (currentIndex >= questions.length) {
      endGame();
    } else {
      loadQuestion();
    }
  }

  function endGame() {
    stopTimer();
    showScreen('results');

    els.finalScore.textContent = score;
    els.finalCorrect.textContent = `${correctCount}/${questions.length}`;
    els.finalTime.textContent = `${totalTimeUsed}s`;

    const pct = questions.length ? Math.round((correctCount / questions.length) * 100) : 0;
    let verdictText = '';
    if (pct >= 90) verdictText = 'Master Sleuth — the past holds no secrets from you.';
    else if (pct >= 70) verdictText = 'Seasoned Investigator — a fine performance.';
    else if (pct >= 50) verdictText = 'Promising Rookie — keep digging through the archives.';
    else verdictText = 'The case remains open. Brush up on your history and try again.';
    els.verdict.textContent = verdictText;
  }

  // ----- Events -----
  els.btnStart.addEventListener('click', startGame);
  els.btnRestart.addEventListener('click', startGame);
  els.btnHome.addEventListener('click', () => {
    stopTimer();
    showScreen('home');
  });

  // Prevent accidental zoom on double-tap for some mobile browsers
  document.addEventListener('dblclick', (e) => e.preventDefault(), { passive: false });
})();
