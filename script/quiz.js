let currentQuestion = 0;
let scores = { E: 0, I: 0, S: 0, N: 0 };

function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question-box").innerText = q.question;

  const optionsBox = document.getElementById("options-box");
  optionsBox.innerHTML = "";
  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt.text;
    btn.className = "option";
    btn.onclick = () => {
      scores[opt.type]++;
      currentQuestion++;
      if (currentQuestion < questions.length) {
        showQuestion();
      } else {
        moveToResult(scores);
      }
    };
    optionsBox.appendChild(btn);
  });
}

function moveToResult(scores) {
  // 단순화: 각 축에서 득표가 많은 쪽을 기준으로 결정
  const EvsI = scores.E >= scores.I ? "E" : "I";
  const SvsN = scores.S >= scores.N ? "S" : "N";

  // 결과 페이지를 4개로 제한할 것이므로 이 두 축으로 조합
  const resultKey = `${EvsI}${SvsN}`;

  // 해당 결과 페이지로 이동
  window.location.href = `result_${resultKey}.html`;
}

document.getElementById("next-btn").style.display = "none";
showQuestion();
