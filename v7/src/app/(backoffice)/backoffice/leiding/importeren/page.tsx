import Article, {
    ArticleContent,
    ArticleDescription,
    ArticleHeader,
    ArticleHeaderContainer,
    ArticleTitle
} from "@/components/basics/Article/Article";
import { getCmsRolesQuery } from "@/lib/actions/queries";
import { FC } from "react";
import { getStaffImportListQuery } from "./actions";
import DeleteAllStaffButton from "./DeleteAllStaffButton";
import ImportList, {
    ImportListColumn,
    ImportListContent,
    ImportListHeader,
    ImportListHeaderColumn,
    ImportListRow
} from "./ImportList";
import { getImportTypeFromImportItem } from "./ImportList.utils";
import ImportListFormProvider, {
    ImportListFormSubmit
} from "./ImportListFormProvider";
import ImportListRoleSelect from "./ImportListRoleSelect";

const STATUS_SEARCH_PARAMETER_KEY = "status";
const STATUS_CONFIRM_VALUE = "bevestig";

interface Props {}

const Page: FC<PageProps<"/backoffice/leiding/importeren">> = async ({
  searchParams
}) => {
  const { [STATUS_SEARCH_PARAMETER_KEY]: statusParam } = await searchParams;

  const rolesResponse = await getCmsRolesQuery();
  const importList = await getStaffImportListQuery();

  const isConfirmStatus = statusParam === STATUS_CONFIRM_VALUE;

  return (
    <Article>
      <ArticleHeader>
        <ArticleHeaderContainer>
          <ArticleTitle>Leiding importeren</ArticleTitle>
          <ArticleDescription>
            Wijzig de leidingsverdeling door deze op te halen bij de
            Groepsadministratie
          </ArticleDescription>
        </ArticleHeaderContainer>
      </ArticleHeader>
      <ArticleContent>
        <section>
          <DeleteAllStaffButton />
          <ImportListFormProvider
            className="relative"
            importListData={importList}
          >
            <ImportList>
              <ImportListHeader className="sticky top-0 bg-white shadow-[inset_0_-1px_0_var(--color-neutral-200)]">
                <ImportListHeaderColumn className="align-bottom">
                  Naam
                </ImportListHeaderColumn>
                <ImportListHeaderColumn>
                  <p>Voorgestelde functies</p>
                  <p className="font-normal font-serif text-lg">
                    Wijzig functies indien nodig.
                  </p>
                </ImportListHeaderColumn>
              </ImportListHeader>
              <ImportListContent>
                {importList.map((importItem) => {
                  const { importType, importKey } =
                    getImportTypeFromImportItem(importItem);

                  const fieldName = `${importType}.${importKey}`;

                  return (
                    <ImportListRow
                      key={importItem.groepsadministratieReference}
                      className="not-last:border-b border-b-neutral-100"
                    >
                      <ImportListColumn>
                        <p className="font-medium leading-5">
                          {importItem.profile.firstName}{" "}
                          {importItem.profile.lastName}
                        </p>
                        <p className="font-serif">
                          <>{importItem.groepsadministratieReference}</>
                        </p>
                      </ImportListColumn>
                      <ImportListColumn>
                        <ImportListRoleSelect
                          name={fieldName}
                          roles={rolesResponse.map((role) => ({
                            label: role.label,
                            value: role._id
                          }))}
                        />
                      </ImportListColumn>
                    </ImportListRow>
                  );
                })}
              </ImportListContent>
            </ImportList>
            <div className="sticky bottom-0 bg-white p-4 border-t border-neutral-200 flex justify-end">
              <ImportListFormSubmit />
            </div>
          </ImportListFormProvider>
        </section>
      </ArticleContent>
    </Article>
  );
};

export default Page;
