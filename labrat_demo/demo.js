const apiKey = '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'; // Add your API key here

const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatOutput = document.getElementById('chat-output');

const generateChatBubble = (text, isUser) => {
  const chatBubble = document.createElement('div');
  chatBubble.className = `chat-bubble${isUser ? ' user' : ''}`;

  const chatBubbleText = document.createElement('p');
  chatBubbleText.innerText = text;

  chatBubble.appendChild(chatBubbleText);

  return chatBubble;
};

const generateLoadingBubble = () => {
  const chatBubble = document.createElement('div');
  chatBubble.className = 'chat-bubble loading';

  const chatBubbleDots = document.createElement('div');
  chatBubbleDots.className = 'chat-bubble-dots';

  for (let i = 0; i < 3; i++) {
    const chatBubbleDot = document.createElement('span');
    chatBubbleDots.appendChild(chatBubbleDot);
  }

  chatBubble.appendChild(chatBubbleDots);

  return chatBubble;
};

const getChatResponse = async (text) => {
  chatOutput.appendChild(generateLoadingBubble());

  const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`, // Uses the apiKey variable to set the authorization header
    },
    body: JSON.stringify({
      prompt: `Q: Hi, I'm having an issue with my computer. Can you help?\nA: Sure, what's the problem?\nQ: ${text}\nA:`, // Uses the text variable to complete the prompt
      max_tokens: 60,
      temperature: 0.7,
    }),
  });

  const responseJson = await response.json();
  const chatResponse = responseJson.choices[0].text.trim();

  chatOutput.removeChild(chatOutput.lastChild);

  return chatResponse;
};

chatForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const userInput = chatInput.value.trim();

  if (userInput !== '') {
    chatInput.value = '';
    chatOutput.appendChild(generateChatBubble(userInput, true));

    const chatResponse = await getChatResponse(userInput);
    chatOutput.appendChild(generateChatBubble(chatResponse, false));

    chatOutput.scrollTop = chatOutput.scrollHeight;
  }
});
