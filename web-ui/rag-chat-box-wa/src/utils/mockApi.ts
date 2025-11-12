// Mock API service to simulate chat responses
export interface ChatResponse {
  message: string;
  timestamp: string;
}

// Sample responses for different question types
const responses = [
  "That's a great question! Let me help you with that.",
  "I understand what you're asking. Here's what I think...",
  "Thanks for reaching out! Based on your question, I'd suggest...",
  "Interesting! Let me provide you with some information about that.",
  "I'm here to help! Here's my answer to your query.",
  "Great to hear from you! Regarding your question...",
  "That's an excellent point. Let me explain...",
  "I appreciate your question. Here's what you need to know:",
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function sendMessage(message: string): Promise<ChatResponse> {
  // Simulate network delay (1-2 seconds)
  await delay(1000 + Math.random() * 1000);
  
  // Select a random response
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  
  // Generate timestamp
  const now = new Date();
  const timestamp = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
  
  return {
    message: randomResponse,
    timestamp,
  };
}

function getAnswerFromAPI(message: string): Promise<ChatResponse> {
  try {
    const res = await axios.post("http://127.0.0.1:5001/ask", { question: message });
    const data = res.data;

    // Normalize backend response (plain string or list)
    const botText = Array.isArray(data.answer)
      ? data.answer.map((a) => a.text).join("\n")
      : data.answer;

    const botMessage = { sender: "bot", text: botText };
    setMessages((prev) => [...prev, botMessage]);
  } catch (err) {
    console.error("Error:", err);
    const errorMsg = { sender: "bot", text: "⚠️ Server error. Try again later." };
    setMessages((prev) => [...prev, errorMsg]);
  }
}

// Simulate streaming or long responses
export async function sendMessageWithContext(message: string): Promise<ChatResponse> {
  await delay(1500 + Math.random() * 1000);
  
  let response = '';
  
  // Generate contextual responses based on keywords
  if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
    response = "Hello! How can I assist you today?";
  } else if (message.toLowerCase().includes('help')) {
    response = "I'm here to help! Feel free to ask me any questions and I'll do my best to assist you.";
  } else if (message.toLowerCase().includes('how are you')) {
    response = "I'm doing great, thank you for asking! How can I help you today?";
  } else if (message.toLowerCase().includes('thank')) {
    response = "You're welcome! Feel free to ask if you have any other questions.";
  } else if (message.toLowerCase().includes('bye')) {
    response = "Goodbye! Have a great day!";
  } else {
    response = responses[Math.floor(Math.random() * responses.length)];
  }
  
  const now = new Date();
  const timestamp = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
  
  return {
    message: response,
    timestamp,
  };
}
