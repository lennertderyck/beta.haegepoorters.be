import { useMutation } from "@tanstack/react-query";
import dayjs from 'dayjs';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createEventMutation } from '../../../modules/MainModule/requests/events/mutations';
import EventEditorFormPageContent from '../../elements/EventEditorFormPageContent/EventEditorFormPageContent';

interface Props {};

const CreateNewEventPage: FC<Props> = () => {
  const navigate = useNavigate();
  const params = useParams<any>();
  const mutation = useMutation(
    createEventMutation(String(params.groupId))
  );
  
  const handleOnSubmit = (data: any) => {
    mutation.mutate({
      body: data.body,
      endDate: data.endDate,
      startDate: data.startDate,
      title: data.title,
      type: data.type,
      group: String(params.groupId)
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
  
  const startDate = dayjs().set('hour', 14).set('minutes', 0).format('YYYY-MM-DDTHH:mm');
  
  return (
    <div className="page page--wide">
      <div className="page__header">
        <h1 className="page__title">
          Nieuwe activiteit
        </h1>
      </div>
      <div className="page__content">
        <EventEditorFormPageContent
          mode="create"
          onReset={() => navigate(`../${params.groupId}`)} 
          onSumbit={handleOnSubmit}
          loading={mutation.isPending}
          defaultValues={{
            title: '',
            startDate: startDate,
            endDate: dayjs().add(2, 'days').format('YYYY-MM-DDTHH:mm'),
            type: 'default',
            body: ''
          }} 
        />
      </div>
    </div>
  )
}

export default CreateNewEventPage;