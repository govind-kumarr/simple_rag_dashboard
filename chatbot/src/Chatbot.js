export function attachChatBotToBody() {
  // CSS class constants
  const CHATBOT_CONTAINER_CLASS = "chatbot_container_1b9d6bcd";
  const CHATBOT_HEADER_CLASS = "chatbot_header_1b9d6bcd";
  const CHATBOT_HEADER_LEFT_CLASS = "chatbot_header_left_1b9d6bcd";
  const CHATBOT_HEADER_LEFT_AVATAR_CLASS = "chatbot_header_left_avatar_1b9d6bcd";
  const CHATBOT_HEADER_LEFT_NAME_CLASS = "chatbot_header_left_name_1b9d6bcd";
  const CHATBOT_HEADER_RIGHT_CLASS = "chatbot_header_right_1b9d6bcd";
  const CHATBOT_BODY_CLASS = "chatbot_body_1b9d6bcd";
  const CHATBOT_OPEN_BUTTON_CLASS = "chatbot_open_button_1b9d6bcd";
  const HIDDEN_CLASS = "hidden";
  const AVATAR_IMAGE_SRC = "./images/Group.png";
  const AVATAR_ALT_TEXT = "avatar";
  const CHATBOT_NAME = "Dolapoadeade";

  // Create the chatbot container
  var chatbotContainer = document.createElement("div");
  chatbotContainer.classList.add(CHATBOT_CONTAINER_CLASS, HIDDEN_CLASS);
  chatbotContainer.setAttribute("role", "dialog");
  chatbotContainer.setAttribute("aria-modal", "true");
  chatbotContainer.setAttribute("aria-labelledby", "chatbot-header-name");

  // Create the chatbot header
  var chatbotHeader = document.createElement("div");
  chatbotHeader.classList.add(CHATBOT_HEADER_CLASS);

  // Create the left side of the header
  var leftHeader = document.createElement("div");
  leftHeader.classList.add(CHATBOT_HEADER_LEFT_CLASS);

  // Create the avatar
  var avatar = document.createElement("div");
  avatar.classList.add(CHATBOT_HEADER_LEFT_AVATAR_CLASS);
  var avatarImg = document.createElement("img");
  avatarImg.setAttribute("src", AVATAR_IMAGE_SRC);
  avatarImg.setAttribute("alt", AVATAR_ALT_TEXT);
  avatar.appendChild(avatarImg);

  // Create the name
  var name = document.createElement("div");
  name.classList.add(CHATBOT_HEADER_LEFT_NAME_CLASS);
  var nameText = document.createElement("p");
  nameText.textContent = CHATBOT_NAME;
  nameText.id = "chatbot-header-name";
  name.appendChild(nameText);

  leftHeader.appendChild(avatar);
  leftHeader.appendChild(name);

  // Create the right side of the header
  var rightHeader = document.createElement("div");
  rightHeader.classList.add(CHATBOT_HEADER_RIGHT_CLASS);

  var closeButton = document.createElement("button");
  closeButton.setAttribute("aria-label", "Close Chatbot");
  var closeButtonIcon = document.createElement("i");
  closeButtonIcon.classList.add("fa-solid", "fa-xmark");
  closeButton.appendChild(closeButtonIcon);

  rightHeader.appendChild(closeButton);

  chatbotHeader.appendChild(leftHeader);
  chatbotHeader.appendChild(rightHeader);

  // Create the chatbot body
  var chatbotBody = document.createElement("div");
  chatbotBody.classList.add(CHATBOT_BODY_CLASS);

  // You can create other elements within chatbot body similarly

  chatbotContainer.appendChild(chatbotHeader);
  chatbotContainer.appendChild(chatbotBody);

  // Append the chatbot container to the document
  var fragment = document.createDocumentFragment();
  fragment.appendChild(chatbotContainer);

  // Create the chatbot open button
  var openButton = document.createElement("button");
  openButton.classList.add(CHATBOT_OPEN_BUTTON_CLASS);
  openButton.setAttribute("aria-label", "Open Chatbot");

  var openButtonIcon = document.createElement("span");
  var openButtonIconElement = document.createElement("i");
  openButtonIconElement.classList.add("fa-solid", "fa-message");
  openButtonIcon.appendChild(openButtonIconElement);

  openButton.appendChild(openButtonIcon);

  // Append the open button to the document
  fragment.appendChild(openButton);
  document.body.appendChild(fragment);

  // Event listeners for opening and closing the chatbot
  openButton.addEventListener("click", () => {
    chatbotContainer.classList.remove(HIDDEN_CLASS);
  });

  closeButton.addEventListener("click", () => {
    chatbotContainer.classList.add(HIDDEN_CLASS);
  });

  return { chatbotContainer, openButton };
}
