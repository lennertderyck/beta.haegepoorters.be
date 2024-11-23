import classNames from 'classnames';
import dayjs from 'dayjs';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { EventItemSkeleton } from '../../../modules/MainModule/pages/EventsPage/EventItemLoader';
import { Button, ExpansionPane, Icon, Loader } from '../../basics';
import ControlledForm from '../../basics/ControlledForm/ControlledForm';
import Input from '../../basics/Input/Input';
import { dateInputLikeFormatter } from '../../basics/Input/Input.utils';
import EventListItem from '../EventListItem/EventListItem';

const EventItemPreview = () => {
  const formContext = useFormContext();
  const values = formContext.watch();
  
  const startDate = dayjs(values.startDate);
  const endDate = dayjs(values.endDate);
  
  return (
    <>
      <EventItemSkeleton animated={ false } contentPreview={ false } />
      <EventListItem 
        event={{
          title: values.title,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          type: values.type,
          body: values.body
        }}
      />
      <EventItemSkeleton animated={ false } contentPreview={ false } />
    </>
  )
}

const FormContent: FC<{loading: boolean, onDelete?: () => void, mode: 'create' | 'edit'}> = ({ loading, onDelete }) => {
  const formContext = useFormContext();
    
  const selectedType = formContext.watch('type');
  const multiple = ['weekend', 'camp'].includes(selectedType);
      
  return (
    <div className={classNames('flyover', loading && 'flyover--active')}>
      <div className="flyover__bridge flex flex-col items-center gap-2">
        <Loader size="1.3rem" />
        <span className="label">Wijzigingen opslaan</span>
      </div>
      <div className="flyover__main">
        <div className="flex flex-row gap-4">
          <label className="mb-4 flex-1">
            <span>Type activiteit</span>
            <Input name="type" type="select">
              <option value="default">Vergadering</option>
              <option value="weekend">Weekend</option>
              <option value="camp">Kamp</option>
              <option value="none">Geen vergadering</option>
            </Input>
          </label>
          <label className={classNames('mb-4 flex-1', selectedType === 'none' && 'opacity-50')}>
            <span>Titel</span>
            <Input name="title" />
          </label>
        </div>
        <div className="">
          <div className="flex flex-row gap-4">
            <label className="mb-4 flex-1">
              <span>Startdatum</span>
              <Input name="startDate" type="datetime-local" />
            </label>
          </div>
          <ExpansionPane active={ multiple } className="flex-1">
            <div className="flex flex-row gap-2 align-baseline mb-4">
              <Icon name="corner-down-right" size="1.6rem" className="mb-2 text-red-500" />
              <label className="flex-1">
                <span>Einddatum</span>
                <Input name="endDate" type="datetime-local" />
              </label>
            </div>
          </ExpansionPane>
        </div>  
        <label>
          <span>Omschrijving</span>
          <Input name="body" type="textarea"/>
        </label>
        <div className="flex flex-row justify-between mt-4">
          <div className="flex flex-row gap-4">
            <Button type="button" theme="simple" onClick={onDelete}>Verwijderen</Button>
            <Button type="reset" theme="simple">Annuleren</Button>
          </div>
          <div className="flex gap-4">
            <Button type="submit" className="ml-auto">Opslaan</Button>
            <label className="!flex gap-2 items-center">
              <Input type="checkbox" name="saveAndCreate" />
              <span className="label">Opslaan & nieuw maken</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

interface Props {
  loading?: boolean;
  onReset?: () => void;
  onSumbit?: (values: any) => void;
  onDelete?: () => void;
  mode: 'create' | 'edit';
  defaultValues: {
    title: string;
    startDate: string;
    endDate: string;
    type: string;
    body: string;
  };
};

const EventEditorFormPageContent: FC<Props> = ({ loading, onReset, onSumbit, onDelete, defaultValues, mode }) => {   
  const formattedDefaultValues = {
    ...defaultValues,
    startDate: dateInputLikeFormatter(defaultValues.startDate, 'datetime-local'),
    endDate: dateInputLikeFormatter(defaultValues.startDate, 'datetime-local'),
  }
    
  return (
    <ControlledForm
      onReset={onReset}
      onSubmit={onSumbit}
      defaultValues={formattedDefaultValues}
    >
      <div className="grid grid-cols-12 lg:gap-24">
        <div className="col-span-12 lg:col-span-7">
          <FormContent loading={loading || false} onDelete={onDelete} mode={mode} />
        </div>
        <div className="hidden lg:block col-span-12 lg:col-span-5">
          <EventItemPreview />
        </div>
      </div>
    </ControlledForm>
  )
}

export default EventEditorFormPageContent;