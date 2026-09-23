"use client";

import Button from "@/components/basics/Button/Button";
import Icon from "@/components/basics/Icon/Icon";
import { ComponentProps, FC, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { importStaffMutation, StaffImportItem, StaffMutationBody } from "./actions";
import { getImportTypeFromImportItem } from "./ImportList.utils";

export interface ImportListFormModel {
  importByStaffId: Record<string, string[]>;
  importByReference: Record<string, string[]>;
}

interface Props extends ComponentProps<"form"> {
  importListData: StaffImportItem[];
}

const ImportListFormProvider: FC<Props> = ({
  importListData,
  ...otherProps
}) => {
  const defaultValuesForRoleSelectInput =
    importListData.reduce<ImportListFormModel>(
      (acc, importRow) => {
        const { importType, importKey } =
          getImportTypeFromImportItem(importRow);

        const accumulatedDataForImportType = acc[importType];

        /**
         * We don't use reference for everything,
         * otherwise we need to fetch every staff id for each mutation
         */

        return {
          ...acc,
          [importType]: {
            ...accumulatedDataForImportType,
            [importKey]: importRow.defaultImportRoles.flatMap((role) => {
              return role._id;
            })
          }
        };
      },
      {
        importByStaffId: {},
        importByReference: {}
      }
    );

  const methods = useForm<ImportListFormModel>({
    defaultValues: {
      ...defaultValuesForRoleSelectInput
    }
  });

  const onSubmit = async (values: ImportListFormModel) => {
    try {
      const mutations = importListData.map<StaffMutationBody>((importRow) => {
        const { importType, importKey } =
          getImportTypeFromImportItem(importRow);

        const importTypeGroup = values[importType];
        const roles = importTypeGroup[importKey];

        return {
          id: importRow.staff?._id || null,
          firstName: importRow.profile.firstName,
          lastName: importRow.profile.lastName,
          groepsadministratieReference: importRow.groepsadministratieReference,
          roles
        };
      });

      console.log("IMPORT STARTING", mutations);
      const response = await importStaffMutation({
        importData: mutations
      });
      console.log("IMPORT DONE", response);
    } catch (error) {
      console.error("Somehting went wrong with import");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} {...otherProps} />
    </FormProvider>
  );
};

export const ImportListFormSubmit = () => {
  const [state, setState] = useState<null | "UNCONFIRMED" | "CONFIRMED">(null);

  return (
    <Button
      type="submit"
      variant={state === null ? "tertiary" : "primary"}
      onClick={() => {
        const isConfirmed = confirm(
          "Wil je verder gaan met het importeren van deze leidingsverdeling?"
        );

        if (isConfirmed) {
        } else
          alert("Import geannuleerd. Je kan nog eventuele wijzigingen maken.");
      }}
    >
      {state === null ? (
        <>
          Leiding importeren <Icon name="arrow-right-line" />
        </>
      ) : (
        <>
          Bevestig <Icon name="arrow-right-line" />
        </>
      )}
    </Button>
  );
};

export default ImportListFormProvider;
