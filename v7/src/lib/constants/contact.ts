import { IconName } from "@/components/basics/Icon/Icon";

export const STAFFMEMBER_CONTACT_METHODS = [
  {
    type: "whatsapp",
    description: "Gebruik WhatsApp",
    hrefBase: "https://wa.me/",
    iconName: "whatsapp-line"
  },
  {
    type: "sms",
    description: "Stuur een SMS",
    hrefBase: "sms:",
    iconName: "message-line"
  },
  {
    type: "call",
    description: "Telefoneren",
    hrefBase: "tel:",
    iconName: "phone-line"
  }
] satisfies readonly {
  type: string;
  description: string;
  hrefBase: string;
  iconName: IconName;
}[];
