import { ActivityTypes } from "../../../modules/MainModule/requests/events/queries";

export const activityTitleParser = (type: ActivityTypes, title: string) => {
  const divider = title?.length > 0 ? ': ' : '';
  
  switch (type) {
    case 'none':
      return 'Geen vergadering';
    case 'camp':
      return 'Kamp' + divider + title;
    case 'weekend':
      return 'Weekend' + divider + title;
    case 'multi':
      return 'Meerdaagse' + divider + title;
    default:
      return title;
  }
}