import { attachChatBotToBody } from "./Chatbot.js";

function afterChatInitialized() {
  const chatContainer = document.querySelector(".chatbot_container_1b9d6bcd");
  const chatBody = document.querySelector(".chatbot_body_1b9d6bcd");
  const closeButton = document.querySelector(".chatbot_header_right_1b9d6bcd span");
  const chatbotOpenButton = document.querySelector(".chatbot_open_button_1b9d6bcd span");

  // Function to add AI response
  function addAIResponse(message) {
    const messageBox = chatBody.lastChild;
    const ai_message = messageBox.querySelector(".ai_message p");
    ai_message.textContent = message;
  }

  // Function to scroll to the bottom
  function scrollToLastMessage() {
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  // Function to submit user message
  async function submitUserMessage(inputBox) {
    const message = inputBox.value;
    if (!message) return;

    addUserMessage(message);
    scrollToLastMessage();
    inputBox.value = "";
    const clearTypingEffect = addAIMessage("");
    scrollToLastMessage();
    await new Promise((res) => {
      setTimeout(() => {
        res();
        clearTypingEffect();
        addAIResponse("Thanks for submitting your question! We'll reach out to you soon!");
        scrollToLastMessage();
      }, 5000);
    });
  }

  // Function to add AI message
  function addAIMessage(message) {
    const answerBox = document.createElement("div");
    answerBox.classList.add("answer_box_1b9d6bcd");

    const aiAvatarDiv = document.createElement("div");
    aiAvatarDiv.classList.add("ai_avatar");

    const avatarImage = document.createElement("img");
    avatarImage.src = "./images/Group.png";
    avatarImage.alt = "avatar";

    aiAvatarDiv.appendChild(avatarImage);

    const aiMessageDiv = document.createElement("div");
    aiMessageDiv.classList.add("ai_message");

    const paragraph = document.createElement("p");
    paragraph.textContent = message;

    aiMessageDiv.appendChild(paragraph);

    answerBox.appendChild(aiAvatarDiv);
    answerBox.appendChild(aiMessageDiv);

    chatBody.appendChild(answerBox);

    return typingEffect(paragraph);
  }

  // Function to display typing effect
  function typingEffect(element) {
    let dots = "";
    const interval = setInterval(() => {
      if (dots.length < 3) {
        dots += ".";
      } else {
        dots = "";
      }
      element.textContent = "Emily Typing" + dots;
    }, 200);

    return function () {
      clearInterval(interval);
    };
  }

  // Function to add user message to UI
  function addUserMessage(messageText) {
    const messageBox = document.createElement("div");
    messageBox.classList.add("message_box_1b9d6bcd");

    const senderDiv = document.createElement("div");
    senderDiv.classList.add("sender");

    const messageTextDiv = document.createElement("div");
    messageTextDiv.classList.add("message_text");

    const paragraph = document.createElement("p");
    paragraph.textContent = messageText;

    messageTextDiv.appendChild(paragraph);

    messageBox.appendChild(senderDiv);
    messageBox.appendChild(messageTextDiv);

    chatBody.appendChild(messageBox);
  }

  // Function to add chatbot footer
  function addChatBotFooter() {
    if (isElementPresent(".chatbot_footer_1b9d6bcd")) return;

    const chatbotFooter = document.createElement("div");
    chatbotFooter.classList.add("chatbot_footer_1b9d6bcd");

    const inputDiv = document.createElement("div");
    inputDiv.classList.add("chatbot_footer_input_1b9d6bcd");

    const inputBox = document.createElement("input");
    inputBox.id = "chatbot_footer_input_box_1b9d6bcd";
    inputBox.type = "text";
    inputBox.placeholder = "Enter message...";
    inputBox.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        submitUserMessage(inputBox);
      }
    });

    inputDiv.appendChild(inputBox);

    const sendDiv = document.createElement("div");
    sendDiv.classList.add("chatbot_footer_send_1b9d6bcd");

    const sendButton = document.createElement("span");
    sendButton.id = "send_button_1b9d6bcd";
    sendButton.addEventListener("click", () => submitUserMessage(inputBox));

    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-paper-plane");

    sendButton.appendChild(icon);
    sendDiv.appendChild(sendButton);

    chatbotFooter.appendChild(inputDiv);
    chatbotFooter.appendChild(sendDiv);

    chatContainer.appendChild(chatbotFooter);
  }

  // Function to save user info
  function saveUserInfo(userInfo) {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }

  // Function to remove rating container
  function removeRatingContainer() {
    const elem = isElementPresent(".chatbot_rating_container_1b9d6bcd");
    if (elem) elem.remove();
  }

  // Function to handle star rating events
  function addRatingContainerEvents() {
    const stars = document.querySelectorAll(".rating_star_1b9d6bcd");
    let rating = 0; // Variable to store the user's rating

    // Function to handle star hover
    function handleStarHover(event) {
      const starIndex = Array.from(stars).indexOf(event.currentTarget);
      for (let i = 0; i <= starIndex; i++) {
        stars[i].classList.add("rating_golden_star");
      }
      for (let i = starIndex + 1; i < stars.length; i++) {
        stars[i].classList.remove("rating_golden_star");
      }
    }

    // Function to handle star click
    function handleStarClick(event) {
      rating = Array.from(stars).indexOf(event.currentTarget) + 1;
    }

    // Function to handle form submission
    function handleSubmit(event) {
      event.preventDefault();
      console.log("Rating submitted:", rating);
      let userInfo = getUserInfo();
      userInfo = { ...userInfo, rating };
      saveUserInfo(userInfo);
      removeRatingContainer();
      addChatBotFooter();
      addAIMessage()();
      addAIResponse("Hi, How can I help you?");
    }

    // Add event listeners to stars
    stars.forEach((star) => {
      star.addEventListener("mouseenter", handleStarHover);
      star.addEventListener("mouseleave", () => {
        stars.forEach((s) => s.classList.remove("rating_golden_star"));
        for (let i = 0; i < rating; i++) {
          stars[i].classList.add("rating_golden_star");
        }
      });
      star.addEventListener("click", handleStarClick);
    });

    // Add event listener to form submit button
    const submitButton = document.querySelector(".chatbot_rating_submit_1b9d6bcd button");
    submitButton.addEventListener("click", handleSubmit);
  }

  // Function to attach rating container
  function attachRatingContainer() {
    const form = document.createElement("form");
    form.classList.add("chatbot_rating_container_1b9d6bcd");

    const closeRatingSpan = document.createElement("span");
    closeRatingSpan.classList.add("close_rating_1b9d6bcd");

    const closeRatingIcon = document.createElement("i");
    closeRatingIcon.classList.add("fa-solid", "fa-xmark");

    closeRatingSpan.appendChild(closeRatingIcon);
    form.appendChild(closeRatingSpan);

    closeRatingSpan.addEventListener("click", () => {
      form.remove();
    });

    const heading = document.createElement("h2");
    heading.textContent = "Rate us:";

    const starsContainer = document.createElement("div");
    starsContainer.classList.add("rating_stars_container_1b9d6bcd");

    for (let i = 0; i < 5; i++) {
      const starSpan = document.createElement("span");
      starSpan.classList.add("rating_star_1b9d6bcd");

      const starIcon = document.createElement("i");
      starIcon.classList.add("fa-solid", "fa-star");
      starSpan.appendChild(starIcon);

      starsContainer.appendChild(starSpan);
    }

    const submitContainer = document.createElement("div");
    submitContainer.classList.add("chatbot_rating_submit_1b9d6bcd");

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Submit";

    form.appendChild(heading);
    form.appendChild(starsContainer);
    submitContainer.appendChild(submitButton);
    form.appendChild(submitContainer);

    chatBody.appendChild(form);

    addRatingContainerEvents();
  }

  // Function to attach customer registration form
  function attachCustomerRegistrationForm() {
    const form = document.createElement("form");
    form.classList.add("customer_register_form_1b9d6bcd");

    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.classList.add("cust_regist_email_1b9d6bcd");
    emailInput.placeholder = "Email";
    emailInput.required = true;

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.classList.add("cust_regist_name_1b9d6bcd");
    nameInput.placeholder = "Name";
    nameInput.required = true;

    const submitButton = document.createElement("button");
    submitButton.id = "cust_regist_submit_1b9d6bcd";
    submitButton.type = "submit";
    submitButton.textContent = "Submit";

    form.appendChild(emailInput);
    form.appendChild(nameInput);
    form.appendChild(submitButton);

    chatBody.appendChild(form);
  }

  // Function to add customer registration events
  function addCustomerRegEvents() {
    const customer_register_form = document.querySelector(".customer_register_form_1b9d6bcd");

    function addCustomerRegistration(e) {
      e.preventDefault();
      const fieldValues = validateCustRegForm();
      if (fieldValues) {
        saveUserInfo(fieldValues);
        addChatBotFooter();
        customer_register_form.remove();
        const clearTypingEffect = addAIMessage();
        clearTypingEffect();
        addAIResponse("Registration Completed!");
        addWelcomeMessage();
        return;
      }

      console.log("Invalid values passed");
    }

    function validateCustRegForm() {
      const emailInput = customer_register_form.querySelector(".cust_regist_email_1b9d6bcd");
      const nameInput = customer_register_form.querySelector(".cust_regist_name_1b9d6bcd");

      const { value: email } = emailInput;
      const { value: name } = nameInput;

      if (!email || !name) return false;

      emailInput.value = "";
      nameInput.value = "";

      return { email, name };
    }

    customer_register_form.addEventListener("submit", addCustomerRegistration);
  }

  // Function to get user info from localStorage
  function getUserInfo() {
    return JSON.parse(localStorage.getItem("userInfo"));
  }

  // Function to check if user is registered
  function checkIfRegistered() {
    const userInfo = getUserInfo();
    if (!userInfo && !isElementPresent(".customer_register_form_1b9d6bcd")) {
      chatBody.innerHTML = "";
      attachCustomerRegistrationForm();
      addCustomerRegEvents();
    } else if (userInfo) {
      const chatContent = chatBody.childNodes;
      if (chatContent.length === 0 || chatContent === null) addWelcomeMessage();
    }
  }

  // Handle close button click
  closeButton.addEventListener("click", () => {
    if (!isElementPresent(".chatbot_rating_container_1b9d6bcd")) {
      chatBody.innerHTML = "";
      attachRatingContainer();
    } else {
      closeChatBot();
      addChatBotOpenButton();
    }
  });

  // Check if an element is present
  function isElementPresent(selector) {
    return chatContainer.querySelector(selector);
  }

  // Handle chatbot open button click
  chatbotOpenButton.addEventListener("click", openChatBot);

  function removeChatBotOpenButton() {
    chatbotOpenButton.classList.add("hidden");
  }

  function addChatBotOpenButton() {
    chatbotOpenButton.classList.remove("hidden");
  }

  // Function to open chatbot
  function openChatBot() {
    const isChatBotPresent = isElementPresent(".chatbot_container_1b9d6bcd");
    if (!isChatBotPresent) {
      removeChatBotOpenButton();
      const chatBot = document.querySelector(".chatbot_container_1b9d6bcd");
      const isChatbotHidden = chatBot.classList.contains("hidden");
      if (isChatbotHidden) chatBot.classList.remove("hidden");
      checkIfRegistered();
    }
  }

  // Function to add welcome message
  function addWelcomeMessage() {
    addAIMessage()();
    addAIResponse("Hi Sir, How can I help you?");
    addChatBotFooter();
  }

  // Function to close chatbot
  function closeChatBot() {
    console.log("close chat bot");
    chatContainer.classList.add("hidden");
  }
}

export function initializeChat(baseUrl) {
  console.log({ baseUrl });
  const { chatbotContainer, openButton } = attachChatBotToBody();
  document.body.appendChild(chatbotContainer);
  document.body.appendChild(openButton);
  afterChatInitialized();
}
