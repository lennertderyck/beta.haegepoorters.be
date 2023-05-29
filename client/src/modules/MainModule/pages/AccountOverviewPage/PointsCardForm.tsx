import { FC, useState } from 'react';
import ControlledForm from '../../../../components/basics/ControlledForm/ControlledForm';
import { Button, ExpansionPane } from '../../../../components/basics';
import Input from '../../../../components/basics/Input/Input';
import useKeycloakStore from '../../../../state/stores/useKeycloakStore/useKeycloakStore';
import { useMutation } from 'react-query';
import { queryClient } from '../../../../utils/queries';

interface Props {};

const PointsCardForm: FC<Props> = () => {
    const [ showForm, setShowForm ] = useState(true);
    const updatePointsCardNumber = useKeycloakStore((store) => (cardNumber: string) => store.updateCustomFieldValue('28f54ef9-d7c8-4d2d-8051-ba6e8d16f2e1', cardNumber))
    const mutation = useMutation({
        mutationFn: updatePointsCardNumber,
        onSuccess: () => {
            console.log('SUCCESS')
            setShowForm(false);
            // Invalidate and refetch
            // queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })
    
    const handleSubmit = (data: any) => {
        mutation.mutate(data.pointsCardNumber);
    }
    
    return (
        <>
            <ExpansionPane active={ showForm }>
                <ControlledForm onSubmit={ handleSubmit }>
                    <Input name="pointsCardNumber" placeholder="UitPas-nummer" />
                </ControlledForm>
            </ExpansionPane>
            <Button icon="arrow-right" className="mt-2">UitPas toevoegen</Button>
        </>
    )
}

export default PointsCardForm;