"use client";

import { ActivityTypes } from "@/lib/server/queries/activities";
import {
    createContext,
    Dispatch,
    FC,
    PropsWithChildren,
    SetStateAction,
    use,
    useActionState,
    useState
} from "react";
import { ActivityFormState, ActivityFormSubmitState } from "./ActivityForm";

interface ActivityContextProviderState {
  activityType: ActivityTypes | null;
  title: string;
  formState: ActivityFormState;
  isFormActionSubmitting: boolean;
  setTitle: Dispatch<SetStateAction<ActivityContextProviderState["title"]>>;
  setActivityType: Dispatch<
    SetStateAction<ActivityContextProviderState["activityType"]>
  >;
}

const ActivityContextProvider =
  createContext<ActivityContextProviderState | null>(null);

const useActivityContext = () => {
  const context = use(ActivityContextProvider);

  if (!context) {
    throw new Error(
      "useActivityContext must be used within an ActivityContextProvider"
    );
  }
  return context;
};

interface ActivityFormProviderProps extends PropsWithChildren {
  defaultValue: ActivityFormState;
  action: (reaction: ActivityFormSubmitState) => Promise<void>;
  intent: "create" | "update";
}

const ActivityFormProvider: FC<ActivityFormProviderProps> = ({
  action,
  defaultValue,
  children
}) => {
  const [activityType, setActivityType] = useState<ActivityTypes | null>(
    defaultValue?.type
  );
  const [title, setTitle] = useState(defaultValue.title);

  const [formState, formAction, isFormActionSubmitting] = useActionState(
    async (_formState: ActivityFormState, formData: FormData) => {
      const entries = Object.fromEntries(
        formData.entries().map(([key, value]) => [key, value.toString()])
      );

      const newState: ActivityFormSubmitState = {
        title,
        body: entries.body,
        type: entries.type as ActivityTypes,
        startDate: entries.startDate,
        endDate: entries.endDate
      };

      await action(newState);
      setActivityType(defaultValue.type);
      setTitle(defaultValue.title);

      return newState;
    },
    defaultValue
  );

  return (
    <ActivityContextProvider
      value={{
        formState,
        activityType,
        title,
        isFormActionSubmitting,
        setTitle,
        setActivityType
      }}
    >
      <form action={formAction}> {children}</form>
    </ActivityContextProvider>
  );
};

export { useActivityContext };
export default ActivityFormProvider;
