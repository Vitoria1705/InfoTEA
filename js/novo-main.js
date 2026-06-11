let currentSlide = 0;
const totalSlides = 6;

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const navEl = document.getElementById('nav-' + id);
  if (navEl) navEl.classList.add('active');
  window.scrollTo(0, 0);

  document.querySelectorAll('.auth-success').forEach(el => el.style.display = 'none');

  // Hide FAB on chat, login, cadastro
  const fab = document.getElementById('chatFab');
  fab.style.display = ['chat','login','cadastro'].includes(id) ? 'none' : 'flex';
}

function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}

function nextSlide() {
  if (currentSlide < totalSlides - 1) {
    document.getElementById('slide-' + currentSlide).classList.remove('active');
    currentSlide++;
    document.getElementById('slide-' + currentSlide).classList.add('active');
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    document.getElementById('slide-' + currentSlide).classList.remove('active');
    currentSlide--;
    document.getElementById('slide-' + currentSlide).classList.add('active');
  }
}

function enviarContato() {
  const nome = document.getElementById('c-nome').value.trim();
  const email = document.getElementById('c-email').value.trim();
  if (!nome || !email) {
    alert('Preencha nome e e-mail.');
    return;
  }
  document.getElementById('form-ok').style.display = 'block';
  document.getElementById('c-nome').value = '';
  document.getElementById('c-email').value = '';
  document.getElementById('c-assunto').value = '';
  document.getElementById('c-msg').value = '';
}

// Chat IA
function quickChat(msg) {
  document.getElementById('chat-input').value = msg;
  sendChat();
}

async function sendChat() {
  const input = document.getElementById('chat-input');
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';

  const box = document.getElementById('chat-messages');

  // User bubble
  const userDiv = document.createElement('div');
  userDiv.style.cssText = 'background:var(--blue);color:white;border-radius:12px;padding:12px 18px;max-width:80%;align-self:flex-end;font-size:.9rem;margin-left:auto;';
  userDiv.textContent = msg;
  box.appendChild(userDiv);
  box.scrollTop = box.scrollHeight;

  // Loading
  const loadDiv = document.createElement('div');
  loadDiv.style.cssText = 'background:white;border:1px solid var(--gray-200);border-radius:12px;padding:14px 18px;max-width:85%;font-size:.9rem;color:var(--gray-400);';
  loadDiv.innerHTML = '<strong style="color:var(--blue);display:block;margin-bottom:4px;font-size:.75rem;">✦ Assistente InfoTEA</strong>Estou pensando...';
  box.appendChild(loadDiv);
  box.scrollTop = box.scrollHeight;

  try {
    setTimeout(() => {
      const lowerMsg = msg.toLowerCase();
      let resposta = '';

      if (lowerMsg.includes('o que é tea') || lowerMsg.includes('o que é autismo') || lowerMsg.includes('tea é')) {
        resposta = 'O TEA é uma forma de neurodiversidade. Ele reúne características de interação social, comunicação e comportamento repetitivo. Cada pessoa autista é única, e o objetivo é entender seu jeito de ser com respeito e apoio.';
      } else if (lowerMsg.includes('sinal') && lowerMsg.includes('bebê') || lowerMsg.includes('sinais') && lowerMsg.includes('bebê') || lowerMsg.includes('bebês')) {
        resposta = 'Em bebês, alguns sinais comuns incluem: pouco contato visual, atraso ou perda de fala, padrões repetitivos de movimento e sensibilidade a sons e texturas. Se estiver em dúvida, converse com um pediatra ou profissional de desenvolvimento infantil.';
      } else if (lowerMsg.includes('direito') || lowerMsg.includes('lei') || lowerMsg.includes('cobertura') || lowerMsg.includes('plano')) {
        resposta = 'No Brasil, pessoas com TEA têm proteção legal, como a Lei Berenice Piana e a Lei Brasileira de Inclusão. Isso inclui direito a atendimento especializado, educação inclusiva, carteira de prioridade e, em muitos casos, cobertura de terapias pelos planos de saúde.';
      } else if (lowerMsg.includes('diagnóstico') || lowerMsg.includes('diagnosticar') || lowerMsg.includes('avaliar')) {
        resposta = 'O diagnóstico de TEA é clínico e feito por profissionais especializados, como neuropediatras, psiquiatras infantis e neuropsicólogos. Geralmente inclui observação do comportamento, histórico de desenvolvimento e avaliações de comunicação.';
      } else if (lowerMsg.includes('rotina') || lowerMsg.includes('casa') || lowerMsg.includes('dia a dia') || lowerMsg.includes('ansiedade')) {
        resposta = 'Uma rotina previsível ajuda muito. Use quadros visuais, horários claros e espaço para descanso sensorial. Pequenas mudanças feitas com antecedência também ajudam a criança a se sentir mais segura e tranquila.';
      } else if (lowerMsg.includes('como posso ajudar') || lowerMsg.includes('ajudar meu filho') || lowerMsg.includes('ajudar minha filha')) {
        resposta = 'Acolhimento e escuta ativa são essenciais. Fale com carinho, mantenha a rotina e peça ajuda a profissionais. Cada passo de apoio faz diferença na confiança da criança.';
      } else {
        resposta = 'Essa é uma boa pergunta. Ainda não tenho uma resposta completa para esse tema, mas posso ajudar com TEA, sinais, diagnóstico, direitos, rotina e apoio familiar. Você pode tentar perguntar de outra forma?';
      }

      loadDiv.innerHTML = '<strong style="color:var(--blue);display:block;margin-bottom:4px;font-size:.75rem;">✦ Assistente InfoTEA</strong>' + resposta.replace(/\n/g, '<br>');
      box.scrollTop = box.scrollHeight;
    }, 1000);
  } catch (e) {
    loadDiv.innerHTML = '<strong style="color:var(--blue);display:block;margin-bottom:4px;font-size:.75rem;">✦ Assistente InfoTEA</strong>Erro ao processar. Tente novamente.';
  }
}

function showHomeSuccess(message) {
  const homeToast = document.getElementById('home-toast');
  homeToast.textContent = message;
  homeToast.style.display = 'block';
  setTimeout(() => {
    homeToast.style.display = 'none';
  }, 5000);
}

function loginSuccess() {
  const name = document.getElementById('login-name').value.trim();
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value.trim();
  if (!name || !email || !password) {
    alert('Preencha nome, e-mail e senha para continuar.');
    return;
  }

  document.getElementById('userNameDisplay').textContent = name;
  document.getElementById('userGreeting').style.display = 'flex';
  showPage('home');
  showHomeSuccess(`Login realizado com sucesso. Olá, ${name}!`);
}

function cadastroSuccess() {
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value.trim();
  if (!name || !email || !password) {
    alert('Preencha nome, e-mail e senha para concluir o cadastro.');
    return;
  }

  document.getElementById('userNameDisplay').textContent = name;
  document.getElementById('userGreeting').style.display = 'flex';
  showPage('home');
  showHomeSuccess(`Conta criada com sucesso. Olá, ${name}!`);
}
