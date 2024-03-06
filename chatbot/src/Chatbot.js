export function attachChatBotToBody() {
  // Create the chatbot container
  var chatbotContainer = document.createElement("div");
  chatbotContainer.classList.add("chatbot_container_1b9d6bcd", "hidden");

  // Create the chatbot header
  var chatbotHeader = document.createElement("div");
  chatbotHeader.classList.add("chatbot_header_1b9d6bcd");

  // Create the left side of the header
  var leftHeader = document.createElement("div");
  leftHeader.classList.add("chatbot_header_left_1b9d6bcd");

  // Create the avatar
  var avatar = document.createElement("div");
  avatar.classList.add("chatbot_header_left_avatar_1b9d6bcd");
  var avatarImg = document.createElement("img");
  avatarImg.setAttribute("src", "./images/Group.png");
  avatarImg.setAttribute("alt", "avatar");
  avatar.appendChild(avatarImg);

  // Create the name
  var name = document.createElement("div");
  name.classList.add("chatbot_header_left_name_1b9d6bcd");
  var nameText = document.createElement("p");
  nameText.textContent = "Dolapoadeade";
  name.appendChild(nameText);

  leftHeader.appendChild(avatar);
  leftHeader.appendChild(name);

  // Create the right side of the header
  var rightHeader = document.createElement("div");
  rightHeader.classList.add("chatbot_header_right_1b9d6bcd");

  var closeButton = document.createElement("span");
  var closeButtonIcon = document.createElement("i");
  closeButtonIcon.classList.add("fa-solid", "fa-xmark");
  closeButton.appendChild(closeButtonIcon);

  rightHeader.appendChild(closeButton);

  chatbotHeader.appendChild(leftHeader);
  chatbotHeader.appendChild(rightHeader);

  // Create the chatbot body
  var chatbotBody = document.createElement("div");
  chatbotBody.classList.add("chatbot_body_1b9d6bcd");

  // You can create other elements within chatbot body similarly

  chatbotContainer.appendChild(chatbotHeader);
  chatbotContainer.appendChild(chatbotBody);

  // Append the chatbot container to the document
  // document.body.appendChild(chatbotContainer);

  // Create the chatbot open button
  var openButton = document.createElement("div");
  openButton.classList.add("chatbot_open_button_1b9d6bcd");

  var openButtonIcon = document.createElement("span");
  var openButtonIconElement = document.createElement("i");
  openButtonIconElement.classList.add("fa-solid", "fa-message");
  openButtonIcon.appendChild(openButtonIconElement);

  openButton.appendChild(openButtonIcon);

  // Append the open button to the document
  // document.body.appendChild(openButton);

  return { chatbotContainer, openButton };
}
