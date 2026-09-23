import { StaffImportItem } from "./actions";

interface ImportTypeFromImportItem {
  importType: "importByStaffId" | "importByReference";
  importKey: string;
}

export const getImportTypeFromImportItem = (
  importItem: StaffImportItem
): ImportTypeFromImportItem => {
  return {
    importType: !!importItem.staff ? "importByStaffId" : "importByReference",
    importKey: !!importItem.staff
      ? importItem.staff._id
      : importItem.groepsadministratieReference
  };
};
