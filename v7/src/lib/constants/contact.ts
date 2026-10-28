import { IconName } from "@/components/basics/Icon/Icon";
import { CmsStaff } from "../actions/queries/staff";

interface StaffMemberContactMethod {
  type: string;
  title: (staffMember: CmsStaff) => string | undefined;
  description?: (staffMember: CmsStaff) => string | undefined;
  hrefBase: string;
  iconName: IconName;
}

export const STAFFMEMBER_CONTACT_METHODS: StaffMemberContactMethod[] = [
  {
    type: "sms",
    title: () => "Stuur een SMS",
    hrefBase: "sms:",
    iconName: "message-line"
  },
  {
    type: "whatsapp",
    title: () => "Gebruik WhatsApp",
    description: () =>
      "Het is niet gegarandeerd dat iedereen WhatsApp gebruikt",
    hrefBase: "https://wa.me/",
    iconName: "whatsapp-line"
  },

  {
    type: "call",
    title: () => "Telefoneren",
    description: (staffMember) =>
      staffMember.phoneNumber
        ? `Bel direct naar ${staffMember.phoneNumber}`
        : undefined,
    hrefBase: "tel:",
    iconName: "phone-line"
  }
];
