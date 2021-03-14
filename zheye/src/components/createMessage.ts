import Message from "@/components/Message.vue";
import { createApp } from "vue";

export type MessageType = "success" | "error" | "default";

export const createMessage = (
  message: string,
  type: MessageType,
  delayTime = 2000,
) => {
  const messageInstance = createApp(Message, { message, type });
  const mountNode = document.createElement("div");
  document.body.appendChild(mountNode);
  messageInstance.mount(mountNode);

  setTimeout(() => {
    messageInstance.unmount(mountNode);
    document.body.removeChild(mountNode);
  }, delayTime);
};
