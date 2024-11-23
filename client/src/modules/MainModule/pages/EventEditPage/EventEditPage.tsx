import { useMutation, useQuery } from "@tanstack/react-query";
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Loader } from '../../../../components/basics';
import EventEditorFormPageContent from '../../../../components/elements/EventEditorFormPageContent/EventEditorFormPageContent';
import { deleteActivityMutation, updateActivityMutation } from '../../requests/events/mutations';
import { getActivityByIdQuery } from '../../requests/events/queries';

interface Props {};

const EventEditPage: FC<Props> = () => {
  const navigate = useNavigate();
  const params = useParams<any>();
  const activityQuery = useQuery(getActivityByIdQuery(String(params.groupId), String(params.activityId)));
  const activityMutation = useMutation(updateActivityMutation(String(params.groupId), String(params.activityId)));
  const activityDeletion = useMutation(deleteActivityMutation(String(params.groupId), String(params.activityId)))
  
  const handleOnSubmit = (data: any) => {
    activityMutation.mutate({
      body: data.body,
      endDate: data.endDate,
      startDate: data.startDate,
      title: data.title,
      type: data.type,
    }, {
      onSuccess: () => {
        if (data.saveAndCreate) {
          navigate(0);
        } else {
          navigate(`../${params.groupId}`);
        }
      }
    })
  }
  
  const handleDelete = () => {
    activityDeletion.mutate({}, {
      onSuccess: () => {
        navigate(`../${params.groupId}`);
      }
    })
  }
  
  const isPending = activityMutation.isPending || activityDeletion.isPending;
    
  return (
    <div className="page page--wide">
      <div className="page__header">
        <Button to={`../${params.groupId}`} icon="arrow-left" iconPlacement="start">Terug naar Kapoenen</Button>
        <h1 className="page__title !font-medium mt-12">Bewerk <span className="font-bold">"{activityQuery?.data?.title}"</span></h1>
        {activityQuery.isLoading && (
          <div className="flex flex-row gap-2">
            <Loader size="1.3rem" />
            <span className="label">Activiteit laden...</span>
          </div>
        )}
      </div>
      <div className="page__content">
        {activityQuery.data && (
          <EventEditorFormPageContent
            mode="edit"
            loading={isPending}
            onReset={() => navigate(-1)} 
            onDelete={handleDelete}
            onSumbit={handleOnSubmit}
            defaultValues={{
              title: activityQuery.data.title,
              startDate: activityQuery.data.startDate,
              endDate: activityQuery.data.endDate,
              type: 'default',
              body: activityQuery.data.body
            }} 
          />
        )}
    </div>
  </div>
  )
}

export default EventEditPage;