import { FC, useState } from 'react';
import ControlledForm from '../../../../components/basics/ControlledForm/ControlledForm';
import { Button, ExpansionPane, Icon } from '../../../../components/basics';
import Input from '../../../../components/basics/Input/Input';
import useKeycloakStore from '../../../../state/stores/useKeycloakStore/useKeycloakStore';
import { useMutation } from 'react-query';
import { queryClient } from '../../../../utils/queries';

interface Props {};

const PointsCardForm: FC<Props> = () => {
    const [ showForm, setShowForm ] = useState(true);
    const updatePointsCardNumber = useKeycloakStore((store) => (cardNumber: string) => store.updateCustomFieldValue('28f54ef9-d7c8-4d2d-8051-ba6e8d16f2e1', cardNumber, { refreshUserData: true }))
    const mutation = useMutation({
        mutationFn: updatePointsCardNumber,
        onSuccess: () => {
            console.log('SUCCESS');
            setShowForm(false);
            // Invalidate and refetch
            // queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })
    
    const handleSubmit = (data: any) => {
        console.log('mutate')
        mutation.mutate(data.pointsCardNumber);
    }
    
    if (showForm) return (
        <>
            <div className="content content--inline">
                <p className="text-gray-400">Je hebt nog geen UitPas toegevoegd.</p>
            </div>
            <ControlledForm onSubmit={ handleSubmit }>
                <Input name="pointsCardNumber" placeholder="UitPas-nummer" />
                {/* <Button icon="arrow-right" className="mt-2">UitPas toevoegen</Button> */}
                <Button icon="check" className="mt-2">UitPas-nummer registreren</Button>
            </ControlledForm>
        </>
    );
    else return (
        <div className="content content--inline flex items-center gap-2 text-green-600">
            <p>Uitpas geregistreerd</p>
            <Icon name="check" />
        </div>
    )
}

export default PointsCardForm;