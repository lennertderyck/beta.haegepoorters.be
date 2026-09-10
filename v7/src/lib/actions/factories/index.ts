import CreateQueryFactory from "../../../../packages/fetch/query";

export const ADMIN_API_BASE_URL =
  "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga";

const groepsAdminRequest = new Request(ADMIN_API_BASE_URL, {
  headers: {
    Authorization: ""
  }
});

export const AdminQueryFactory = CreateQueryFactory(groepsAdminRequest, {
  get enable() {
    console.log("AdminQueryFactory enable check");
    return false;
  }
});
