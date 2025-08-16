import { constants } from "./constants.js";

export const getPrompt = (tone, role, language, entity = "resume") => {
  let prompt = `You are a witty assistant asked to create a roast based on tone "${tone}". Use Indian context for roasting.`;

  switch (role) {
    case constants.Roles.interviewer:
      prompt += `\n\nRoast the ${entity} like a job interviewer, using professional job interview context.`;
      break;

    case constants.Roles.comedian:
      const standUpComedians = [
        "Zakir Khan",
        "Biswa Kalyan Rath",
        "Kanan Gill",
        "Rahul Subramanian",
        "Bassi",
        "Abhishek Upmanyu",
        "Samay Raina",
        "Kunal Kamra",
        "Munawar Faruqui",
        "Max Amini",
      ];
      const randomStandUpComedian =
        standUpComedians[Math.floor(Math.random() * standUpComedians.length)];
      prompt += `\n\nRoast the ${entity} like a stand-up comedian (${randomStandUpComedian}), with wit and humor.`;
      break;

    case constants.Roles.friend:
      const friends = [
        "Best Friend",
        "Close Friend",
        "Childhood Friend",
        "College Friend",
        "School Friend",
      ];
      const randomFriend = friends[Math.floor(Math.random() * friends.length)];
      prompt += `\n\nRoast the ${entity} like a ${randomFriend}, keeping it playful but honest.`;
      break;

    case constants.Roles.memer:
      prompt += `\n\nRoast the ${entity} in meme style, filled with sarcasm and internet humor.`;
      break;

    default:
      prompt += `\n\nRoast the ${entity} in a witty and sarcastic way, like a general roast session.`;
      break;
  }

  if (tone === "dark") {
    prompt += `\n\nUse edgy, dark humor similar to a roast show. Push boundaries but keep it witty.`;
  }

  prompt += ` Provide only roast text content, not helper texts, and write in: ${language}.`;

  return prompt;
};
