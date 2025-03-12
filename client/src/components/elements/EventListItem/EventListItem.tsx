import classNames from 'classnames';
import dayjs from 'dayjs';
import { FC, useMemo } from 'react';
import { MULTI_DAY_EVENT_TYPES } from '../../../utils/data/events';
import { Button, ExpansionPane } from '../../basics';
import styles from './EventListItem.module.scss';

interface Props {
  event: {
    startDate: string;
    endDate: string;
    title: string;
    type: string;
    body: any;
  },
  editable?: boolean;
};

const EventListItem: FC<Props> = ({ event, editable }) => {
  const startDate = dayjs(event.startDate);
  const endDate = dayjs(event.endDate);
    
  const title = useMemo(() => {
    switch (event.type) {
      case 'none':
        return 'Geen vergadering';
      case 'camp':
        return 'Kamp: ' + event.title;
      case 'weekend':
        return 'Weekend: ' + event.title;
      case 'multi':
        return 'Meerdaagse: ' + event.title;
      default:
        return event.title;
    }
  }, [event.type, event.title]);
  
  const multiple = MULTI_DAY_EVENT_TYPES.includes(event.type);
    
  return (
    <div className={styles.container}>
      <div className={styles.dot} />
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <h5 className={styles.title}>
              <span>{ startDate.format('DD MMMM YYYY') }</span>
              <ExpansionPane active={multiple}><>&nbsp;tot {endDate.format('DD MMMM')}</></ExpansionPane>
            </h5>
            <ExpansionPane active={!!title}>
              <h4 className={styles.subtitle}>{title}</h4>
            </ExpansionPane>
          </div>
          {editable && <div className={styles.editButton}>
            <Button>Bewerken</Button>
          </div>}
        </div>
        <ExpansionPane active={!!event.body}>
          <div className={classNames(styles.body, 'content')}>
            <p>{event.body}</p>
          </div>
        </ExpansionPane>
      </div>
    </div>
  )
}

export default EventListItem;