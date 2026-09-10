import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Icon, Loader } from "../../../../../components/basics";
import ProtectedRoute from "../../../../../components/elements/ProtectedRoute/ProtectedRoute";
import { getGroupsQuery } from "../../../requests/events/queries";

interface Props {}

const EventEditorOverviewPage: FC<Props> = () => {
    const groupsQuery = useQuery(getGroupsQuery);

    return (
        <div className="page">
            <div className="page__header">
                <h1 className="page__title">Haegeprekerke bewerken</h1>
            </div>
            <ProtectedRoute staffOnly view="blocked">
                <div className="page__content">
                    {groupsQuery.isLoading && (
                        <div className="flex flex-row gap-2">
                            <Loader size="1.3rem" />
                            <span className="label">Groepen laden</span>
                        </div>
                    )}
                    <div>
                        {groupsQuery.data?.map((group: any, index: number) => (
                            <div key={index}>
                                <Link
                                    to={group.abbr}
                                    className="flex justify-between border-b-2 border-gray-200 py-4"
                                >
                                    <div>
                                        <h4 className="text-lg font-semibold">
                                            {group.name}
                                        </h4>
                                    </div>
                                    <Icon name="arrow-right" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </ProtectedRoute>
        </div>
    );
};

export default EventEditorOverviewPage;
